using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Options;
using RfpBackend.Models;
using RfpBackend.Settings;

namespace RfpBackend.Services
{
    public class EmailService
    {
        private readonly EmailSettings _settings;

        public EmailService(IOptions<EmailSettings> settings)
        {
            _settings = settings.Value;
        }

        public async Task SendRfpEmail(Vendor vendor, Rfp rfp)
        {
            using var client = new SmtpClient(_settings.SmtpServer, _settings.Port)
            {
                Credentials = new NetworkCredential(_settings.Username, _settings.Password),
                EnableSsl = true
            };

            string subject = $"RFP Request: {rfp.Title}";
            string body = $@"
Hello {vendor.Name},

You have been invited to submit a proposal for:

RFP Title: {rfp.Title}
Budget: {rfp.Budget}
Delivery Days: {rfp.DeliveryDays}

Please reply to this email with your proposal details.

Thank you,
Procurement Team
";

            if (string.IsNullOrEmpty(_settings.SenderEmail))
            {
                throw new InvalidOperationException("SenderEmail is not configured.");
            }

            var mailMessage = new MailMessage(_settings.SenderEmail, vendor.ContactEmail, subject, body);

            await client.SendMailAsync(mailMessage);
        }
    }
}
