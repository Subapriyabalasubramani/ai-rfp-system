using System;
using System.Collections.Generic;

namespace RfpBackend.Models
{
    public class Rfp
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = "";
        public string OriginalText { get; set; } = "";
        public decimal? Budget { get; set; }
        public int? DeliveryDays { get; set; }
        public string? PaymentTerms { get; set; }
        public string ItemsJson { get; set; } = "[]";
        public string Status { get; set; } = "Draft";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        public List<Proposal> Proposals { get; set; } = new();
    }
}
