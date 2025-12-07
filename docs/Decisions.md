# Key Design Decisions & Assumptions

## Single User

- The system is designed for a single procurement user.
- No authentication / multi-tenant support is implemented, as it was out of scope.

## Inbound Email Handling

- Vendor replies are received in an email inbox.
- The procurement user copies the email content and pastes it into the app.
- This text is sent to `POST /proposal/add` for AI parsing.
- This keeps the implementation simple while still satisfying the requirement:
  - “Vendor responses can be messy… use AI to extract important details.”

## Database Choice: SQLite

- SQLite is file-based and easy to run locally.
- No external DB server setup required for reviewers.
- Good enough for a demo, single-user system.

## AI Usage

- OpenRouter is used to:
  - Extract structured RFP details from natural language.
  - Extract structured proposal details from free-form vendor replies.
- Prompting is designed to return JSON with fields like:
  - price, deliveryDays, warranty, specMatchScore, riskFactor, finalScore.

## Comparison Logic

- Proposals are compared using:
  - Price
  - DeliveryDays
  - SpecMatchScore / FinalScore
- The “best” proposal is highlighted in green in the UI.
- The system can easily support more complex scoring in the future.

## Email Sending

- Brevo is used as the email provider.
- RFP details are sent in a readable format to the vendor email.
- Email tracking (opens, clicks, etc.) is not implemented, per non-goals.
