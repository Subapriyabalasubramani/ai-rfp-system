**AI-Powered RFP Management System**

A full-stack web application that enables procurement teams to streamline vendor sourcing through AI automation.
This project was developed as part of the SDE Assignment – AI-Powered RFP Management System.

## Features:

 Create RFPs from natural language using AI (OpenRouter LLM)
 Vendor management (Add & View vendors)
 Send RFPs via email (Brevo API)
 Receive vendor responses (manual copy input) & AI parsing
 Automatically store structured proposals
 Compare proposals & auto-highlight the best vendor
 SQLite for lightweight persistence
 End-to-end single-user workflow

Tech Stack
Layer	                  Technology
Frontend	         React (Create React App)
Backend	            .NET 8 Web API (net10.0)
Database	                SQLite
Email Service	           Brevo API
AI Service	             OpenRouter API
Development Tools	  Visual Studio Code + GitHub

## Project Structure:
ai-rfp-system/
│
├── RfpBackend/         # Backend API Project
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   ├── appsettings.example.json
│   ├── appsettings.Development.example.json
│   └── ...
│
└── RfpFrontend/        # React Frontend
    ├── src/
    └── ...

## Installation & Setup:

Clone the Repository
git clone https://github.com/Subapriyabalasubramani/ai-rfp-system.git
cd ai-rfp-system

# Backend Setup
cd RfpBackend

Configure API Keys:

Copy example config files

copy appsettings.example.json appsettings.json
copy appsettings.Development.example.json appsettings.Development.json

Edit both new files and provide

Key          	Purpose
OpenRouter:   ApiKey AI text extraction
Brevo:        ApiKey Sending emails

These files are ignored by Git for security

**Run Backend**

dotnet restore
dotnet run

Backend running at:

http://localhost:5172

# Frontend Setup:

cd ../RfpFrontend
npm install
npm start

Frontend running at:

http://localhost:3000

## AI Usage Overview:

Stage	                  What AI Does
RFP Creation	     Extract requirements from user prompt
Proposal Parsing	 Structure price, quantity, delivery terms
Comparison	         AI-supported evaluation & scoring

Powered by OpenRouter LLMs

## Email Workflow:

Action	               Tech Used
Send RFP emails	       Brevo API
Receive Responses	   Manual copy → AI parsing into DB

## Database Schema:

Table	       Description
RFPs	     Procurement requests
Vendors	     Vendor master records
Proposals	 Vendor responses parsed by AI

Stored using SQLite for simplicity.

## Proposal Comparison:

Displays vendors side-by-side
Highlights best vendor in green
Shows AI-evaluated score 

## Security Notes:

Sensitive files are ignored using .gitignore

appsettings.json
appsettings.Development.json
.env
*.db

##  Documentation

Additional details are documented in the `/docs` folder:

- [API Documentation](./docs/API.md)
- [Architecture](./docs/Architecture.md)
- [Key Decisions & Assumptions](./docs/Decisions.md)
- [Future Enhancements](./docs/FutureEnhancements.md)
