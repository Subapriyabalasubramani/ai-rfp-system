namespace RfpBackend.DTOs
{
    public class RfpResponse
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = "";
        public string ItemsJson { get; set; } = "[]";
        public decimal? Budget { get; set; }
        public int? DeliveryDays { get; set; }
        public string? PaymentTerms { get; set; }
    }
}
