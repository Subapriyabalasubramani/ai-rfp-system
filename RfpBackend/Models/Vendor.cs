using System;
using System.Collections.Generic;

namespace RfpBackend.Models
{
    public class Vendor
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";
        public string ContactEmail { get; set; } = "";
        public string? Phone { get; set; }
        public string? Notes { get; set; }

        public List<Proposal> Proposals { get; set; } = new();
    }
}
