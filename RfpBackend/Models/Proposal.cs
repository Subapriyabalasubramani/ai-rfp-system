using System;

namespace RfpBackend.Models
{
    public class Proposal
    {
        public Guid Id { get; set; }
        public Guid RfpId { get; set; }
        public Rfp Rfp { get; set; } = null!;
        public Guid VendorId { get; set; }
        public Vendor Vendor { get; set; } = null!;
        public string ProposalText { get; set; } = "";

        // AI Extracted Fields
        public decimal? Price { get; set; }
        public int? DeliveryDays { get; set; }
        public string? Warranty { get; set; }
        public int? SpecMatchScore { get; set; }
        public double? RiskFactor { get; set; }
        public int? FinalScore { get; set; }
    }
}
