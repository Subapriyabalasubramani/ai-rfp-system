using Microsoft.AspNetCore.Mvc;
using RfpBackend.DTOs;
using RfpBackend.Models;
using RfpBackend.Data;
using RfpBackend.Services;
using Newtonsoft.Json;
using System.Linq;

namespace RfpBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RfpController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly AiService _aiService;
        private readonly EmailService _emailService;

        public RfpController(AppDbContext db, AiService aiService, EmailService emailService)
        {
            _db = db;
            _aiService = aiService;
            _emailService = emailService;
        }

        [HttpPost("create-from-text")]
        public async Task<IActionResult> CreateFromText(CreateRfpRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Text))
                return BadRequest("Text input required");

            var extracted = await _aiService.ExtractRfpDetails(request.Text);


            var rfp = new Rfp
            {
                Title = extracted["title"]?.ToString() ?? "Untitled RFP",
                Budget = extracted["price"]?.ToObject<decimal?>() ?? 0,
                DeliveryDays = extracted["deliveryDays"]?.ToObject<int?>() ?? 0,
                PaymentTerms = extracted["paymentTerms"]?.ToString() ?? "",
                ItemsJson = extracted["items"]?.ToString() ?? "[]",
                OriginalText = request.Text,
                Status = "Draft"
            };


            _db.Rfps.Add(rfp);
            await _db.SaveChangesAsync();

            return Ok(new RfpResponse
            {
                Id = rfp.Id,
                Title = rfp.Title,
                ItemsJson = rfp.ItemsJson,
                Budget = rfp.Budget,
                DeliveryDays = rfp.DeliveryDays,
                PaymentTerms = rfp.PaymentTerms
            });
        }


        [HttpPost("send/{id}")]
        public async Task<IActionResult> SendRfpToVendors(Guid id, [FromBody] List<Guid> vendorIds)
        {
            var rfp = _db.Rfps.Find(id);
            if (rfp == null) return NotFound("RFP not found");

            var vendors = _db.Vendors.Where(v => vendorIds.Contains(v.Id)).ToList();

            foreach (var vendor in vendors)
            {
                await _emailService.SendRfpEmail(vendor, rfp);
            }

            rfp.Status = "Sent";
            _db.SaveChanges();

            return Ok("Emails sent successfully");
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_db.Rfps.ToList());
        }

    }
}
