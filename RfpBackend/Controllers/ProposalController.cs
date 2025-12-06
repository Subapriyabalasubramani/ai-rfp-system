using Microsoft.AspNetCore.Mvc;
using RfpBackend.Data;
using RfpBackend.Models;
using RfpBackend.Services;
using Microsoft.EntityFrameworkCore;

namespace RfpBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProposalController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly AiService _aiService;

        public ProposalController(AppDbContext db, AiService aiService)
        {
            _db = db;
            _aiService = aiService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddProposal(Guid rfpId, Guid vendorId, [FromBody] string text)
        {
            var extracted = await _aiService.ExtractProposalDetails(text);

            var proposal = new Proposal
            {
                Id = Guid.NewGuid(),
                RfpId = rfpId,
                VendorId = vendorId,
                ProposalText = text,
                Price = extracted["price"]?.ToObject<decimal?>() ?? 0,
                DeliveryDays = extracted["deliveryDays"]?.ToObject<int?>() ?? 0,
                Warranty = extracted["warranty"]?.ToString(),
                SpecMatchScore = extracted["specMatchScore"]?.ToObject<int?>() ?? 0,
                RiskFactor = extracted["riskFactor"]?.ToObject<double?>() ?? 0,
                FinalScore = extracted["finalScore"]?.ToObject<int?>() ?? 0
            };

            _db.Proposals.Add(proposal);
            await _db.SaveChangesAsync();

            return Ok(proposal);
        }

        [HttpGet("by-rfp/{rfpId}")]
        public IActionResult GetProposalsByRfp(Guid rfpId)
        {
            var proposals = _db.Proposals
                .Where(p => p.RfpId == rfpId)
                .ToList();

            return Ok(proposals);
        }


    }
}
