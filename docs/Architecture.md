# Architecture

## High-Level System Architecture

User (Procurement)
        ↓
React Frontend (RfpFrontend)
        ↓ HTTP
.NET Web API (RfpBackend, TargetFramework: net10.0)
        ↓
 ┌───────────────┬───────────────┐
 │ SQLite DB     │ OpenRouter AI │
 │ (RFP/Vendor/  │ (LLM parsing) │
 │  Proposal)    └──────┬────────┘
 └───────────────┬──────┘
                 ↓
            Brevo Email API


### Data Flow (End-to-End)

User describes need in natural language in the UI.

Frontend calls **POST** `/api/rfp/create-from-text`.

Backend uses AiService (OpenRouter) to extract:

Items
Budget
Delivery days
Payment terms
Structured RFP is stored in SQLite.

User selects vendors and calls **POST** `/api/rfp/send/{rfpId}`.

Backend uses EmailService (Brevo) to send emails to vendor addresses.

Vendor replies by email → user copies the response text into the app.

Frontend sends text to **POST** `/api/proposal/add?rfpId=&vendorId=`.

Backend again uses AiService to extract:

Price
DeliveryDays
Warranty
SpecMatchScore
RiskFactor
FinalScore

Proposals are saved in the Proposals table.

Frontend fetches proposals via **GET** `/api/proposal/by-rfp/{rfpId}` and displays a comparison view.

Best vendor (e.g., highest FinalScore / lowest price) is highlighted in green.

## Data Model (Simplified)

**RFP**

Id (Guid)
Title
Budget (decimal)
DeliveryDays (int)
PaymentTerms (string)
ItemsJson (string – serialized items)
OriginalText (string)
Status (Draft / Sent / etc.)

**Vendor**

Id (Guid)
Name
ContactEmail
Phone
Proposal
Id (Guid)
RfpId (Guid)
VendorId (Guid)
ProposalText (string)
Price (decimal)
DeliveryDays (int)
Warranty (string)
SpecMatchScore (int)
RiskFactor (double)
FinalScore (int)
