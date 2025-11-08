using System.Net.Http.Json;
using Polly;
using Polly.Retry;

namespace BillingService.Services {
    public class InventoryClient {
        private readonly HttpClient _http;
        private readonly AsyncRetryPolicy _retryPolicy;

        public InventoryClient(HttpClient http) {
            _http = http;
            _retryPolicy = Policy.Handle<Exception>()
                                 .WaitAndRetryAsync(3, attempt => TimeSpan.FromSeconds(1));
        }

        public async Task<bool> ReserveAsync(int productId, int qty) {
            
            try {
                var response = await _retryPolicy.ExecuteAsync(() =>
                  _http.PostAsync($"/api/products/{productId}/reserve?qty={qty}", null)
                );
                return response.IsSuccessStatusCode;
            } catch {
                return false;
            }
        }
    }
}
