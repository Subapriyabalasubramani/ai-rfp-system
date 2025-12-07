# Future Enhancements

These are improvements planned or possible for a next version:

## 1. Automated Inbound Emails

- Use Brevo webhooks or an IMAP listener.
- Automatically read vendor replies and feed them into `/proposal/add`.
- Attachments (PDF, Excel) could be parsed using document AI.

## 2. Vendor Portal

- Allow vendors to log in to a portal.
- Submit proposals via a form instead of email.
- Real-time validation of required fields.

## 3. Advanced Scoring

- Weight different factors:
  - Price vs DeliveryDays vs Warranty vs RiskFactor.
- Let the user configure scoring weights per RFP.
- Provide breakdown of why a vendor scored higher.

## 4. Better UI/UX

- Filters, sorting, and search on RFP and proposal lists.
- More detailed comparison views with charts.
- Activity log (who sent what, when).

## 5. Production Hardening

- Add authentication & authorization.
- Migrate from SQLite to a production DB (e.g., PostgreSQL).
- Add logging, monitoring, error tracking.
