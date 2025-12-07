API Documentation

Base URL: `http://localhost:5172/api`

## RFP APIs

### POST `/rfp/create-from-text`

Create an RFP from natural language using AI.

**Request body:**

{
  "text": "I need 20 laptops and 15 monitors with a budget of 50k"
}

**Success response(example)**

{
  "id": "GUID",
  "title": "Laptop & Monitor Procurement",
  "budget": 50000,
  "deliveryDays": 30,
  "paymentTerms": "Net 30",
  "itemsJson": "[ ... ]"
}


### GET `/rfp`
Returns all RFPs.

### POST `/rfp/send/{rfpId}`
Sends a selected RFP to a list of vendors by email (using Brevo).

**Request body:**

[
  "vendor-guid-1",
  "vendor-guid-2"
]

### POST `/vendor`
Create a new vendor.

**Request body:**

{
  "name": "Dell Supplier",
  "contactEmail": "dell@example.com",
  "phone": "1234567890"
}

**Response:**

Created vendor object with generated id.

### GET `/vendor`

Returns all vendors.

## Proposal APIs

### POST `/proposal/add?rfpId={rfpId}&vendorId={vendorId}`

Add a proposal for a given RFP and vendor.
The free-form text is parsed by AI into structured fields.

Request body (string):
We offer $47,000 with delivery in 28 days and 2 years warranty.

**Response:**
{
  "id": "GUID",
  "rfpId": "GUID",
  "vendorId": "GUID",
  "proposalText": "We offer $47,000 with delivery in 28 days and 2 years warranty.",
  "price": 47000,
  "deliveryDays": 28,
  "warranty": "2 years",
  "specMatchScore": 90,
  "riskFactor": 0.1,
  "finalScore": 92
}

### GET `/proposal/by-rfp/{rfpId}`

Returns all proposals for a given RFP.
The frontend uses this to compare vendors and highlight the best one.