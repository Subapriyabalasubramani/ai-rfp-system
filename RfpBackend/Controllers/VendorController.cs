using Microsoft.AspNetCore.Mvc;
using RfpBackend.Data;
using RfpBackend.Models;

namespace RfpBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VendorController : ControllerBase
    {
        private readonly AppDbContext _db;

        public VendorController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetVendors()
        {
            var vendors = _db.Vendors.ToList();
            return Ok(vendors);
        }

        [HttpPost]
        public IActionResult CreateVendor(Vendor vendor)
        {
            vendor.Id = Guid.NewGuid();
            _db.Vendors.Add(vendor);
            _db.SaveChanges();
            return Ok(vendor);
        }
    }
}
