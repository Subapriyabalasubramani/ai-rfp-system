using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace RfpBackend.Services
{
    public class AiService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private const string OpenRouterEndpoint = "https://openrouter.ai/api/v1/chat/completions";

        public AiService(IConfiguration config)
        {
            _httpClient = new HttpClient();
            _apiKey = config["OpenRouter:ApiKey"] 
                      ?? throw new ArgumentNullException("OpenRouter:ApiKey not found in configuration");
        }

        private async Task<JObject> CallOpenRouterAsync(string prompt, string model = "openai/gpt-3.5-turbo")
        {
            var payload = new
            {
                model = model,
                messages = new[]
                {
                    new { role = "user", content = prompt }
                },
                temperature = 0.2,
                max_tokens = 512
            };

            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");

            var response = await _httpClient.PostAsync(OpenRouterEndpoint, content);
            var responseString = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"OpenRouter API error: {responseString}");
            }

            var outer = JObject.Parse(responseString);
            var message = outer["choices"]?[0]?["message"]?["content"]?.ToString();
            if (string.IsNullOrWhiteSpace(message))
            {
                throw new Exception($"OpenRouter returned empty content. Full response: {responseString}");
            }

            return JObject.Parse(message);
        }

        public async Task<JObject> ExtractRfpDetails(string text)
        {
            string prompt = $@"
You are an assistant.  
Extract a JSON object containing these fields from the procurement request text below:

- title (short string)  
- items: array of objects with 'name', 'qty', 'specs'  
- budget: number (USD)  
- deliveryDays: integer (days)  
- paymentTerms: string  

Return **only valid JSON**.  
If any field is missing in text, fill with a default (e.g. budget = 0, items = []).  
Procurement request:
""{text}""
";
            return await CallOpenRouterAsync(prompt);
        }

        public async Task<JObject> ExtractProposalDetails(string text)
        {
            string prompt = $@"
You are an assistant that reads vendor proposals.  
Extract a JSON object containing:

- price (number, USD)  
- deliveryDays (integer days)  
- warranty (string)  
- specMatchScore (0-100 integer)  
- riskFactor (0.0 - 1.0 float)  
- finalScore (0-100 integer)  

Return **only JSON**, nothing else.  
Vendor Proposal:
""{text}""
";
            return await CallOpenRouterAsync(prompt);
        }
    }
}
