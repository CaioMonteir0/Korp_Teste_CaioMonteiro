using System.Net.Http.Json;
using Polly;
using Polly.Retry;

namespace BillingService.Services
{
    public class InventoryClient
    {
        private readonly HttpClient _http;
        private readonly AsyncRetryPolicy _retryPolicy;

        public InventoryClient(HttpClient http)
        {
            _http = http;
            _retryPolicy = Policy.Handle<Exception>()
                                 .WaitAndRetryAsync(3, attempt => TimeSpan.FromSeconds(0.3));
        }

        public class OperationResult
        {
            public bool Success { get; set; }
            public string Message { get; set; } = "";
        }

        public async Task<OperationResult> ReserveAsync(int productId, int qty)
        {
            try
            {
                var response = await _retryPolicy.ExecuteAsync(() =>
                    _http.PostAsJsonAsync($"/api/products/{productId}/reserve", new { quantity = qty })
                );
                //captura cenário de produto não encontrado
                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    return new OperationResult
                    {
                        Success = false,
                        Message = $"O produto não existe mais no inventário."
                    };
                }

                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    return new OperationResult
                    {
                        Success = false,
                        Message = $"Falha ao reservar produto {productId}: {error}"
                    };
                }

                return new OperationResult { Success = true };
            }
            catch (HttpRequestException ex)
            {
                return new OperationResult
                {
                    Success = false,
                    Message = $"Erro de comunicação com InventoryService: {ex.Message}"
                };
            }
            catch (Exception ex)
            {
                return new OperationResult
                {
                    Success = false,
                    Message = $"Erro inesperado: {ex.Message}"
                };
            }
        }

        public async Task<int> GetBalance(int productId)
        {
            return await _http.GetFromJsonAsync<int>($"/api/products/{productId}/balance");
        }

        public async Task<string?> GetProductCode(int productId)
        {
            try
            {
                return await _retryPolicy.ExecuteAsync(async () =>
                {
                    var response = await _http.GetAsync($"/api/products/{productId}/code");

                    if (!response.IsSuccessStatusCode)
                        return null;

                    return await response.Content.ReadAsStringAsync();
                });
            }
            catch
            {
                return null;
            }
        }



    }
}
