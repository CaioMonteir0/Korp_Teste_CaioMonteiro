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
                                 .WaitAndRetryAsync(3, attempt => TimeSpan.FromSeconds(1));
        }

        public async Task<bool> ReserveAsync(int productId, int qty)
        {
            try
            {
                var response = await _retryPolicy.ExecuteAsync(() =>
                    _http.PostAsJsonAsync($"/api/products/{productId}/reserve", new { quantity = qty })
                );

                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"[Billing] Falha ao reservar produto {productId}: {error}");
                    return false;
                }

                return true;
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"[Billing] Erro de comunicação com InventoryService: {ex.Message}");
                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[Billing] Erro inesperado: {ex.Message}");
                return false;
            }
        }


    }
}
