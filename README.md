# Veroxa — AI Tax Assistant & Savings Guidance Platform

**Veroxa** is an AI-powered tax filing and savings guidance assistant built for non-experts. It helps individuals understand their tax situation using synthetic/demo financial data, compare Old vs New Tax Regimes, discover applicable tax deductions, evaluate government scheme eligibility, and interact with an explainable AI assistant.

---

## Critical Architectural Principle

> **THE LLM IS NOT THE SOURCE OF TRUTH FOR TAX CALCULATIONS OR ELIGIBILITY.**

```
User Input / Synthetic Persona / Document
                    │
                    ▼
          Normalized User Profile
                    │
                    ▼
      ┌───────────────────────────┐
      │ Deterministic Rule Engine │
      │  - Tax Engine             │
      │  - Deduction Engine       │
      │  - Scheme Engine          │
      │  - Explanation Engine     │
      └─────────────┬─────────────┘
                    │ Structured Results + Passed/Failed Conditions
                    ▼
          ┌───────────────────┐
          │ Explainability    │ ──► Direct UI Cards ("Why am I seeing this?")
          │ Data Structure    │
          └─────────┬─────────┘
                    │ Verified Context Only
                    ▼
          ┌───────────────────┐
          │  LLM Assistant    │ ──► Plain Language QA & Contextual Explanations
          └───────────────────┘
```

- **Rule Engine**: Computes exact tax liability, slab breakdowns, Section 80C/80D limits, Section 87A rebates, and scheme condition matching.
- **LLM Layer**: Only explains verified rule-engine findings in plain language. Never invents tax rules, thresholds, or eligibility logic.
- **Config-Driven**: All tax slabs, deduction limits, and government scheme criteria live in editable files in `/config/`.

---

## Tech Stack

- **Backend**: Node.js, Express, TypeScript, Jest
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons
- **AI Integration**: OpenAI / ASI One compatible API client with deterministic fallback

---

## Key Features

1. **Deterministic Tax Snapshot & Regime Comparison**: Side-by-side breakdown of Old vs New Tax Regime for FY 2024-25 (AY 2025-26) with step-by-step tax slab math.
2. **Chapter VI-A Deduction Evaluation**: Evaluates Section 80C (up to ₹1.5L), Section 80D (Health Insurance with Senior Citizen rules), Section 80CCD(1B) NPS (additional ₹50k), Section 24(b) Home Loan Interest, Section 80GG Rent, and Section 80TTA.
3. **Government Scheme Recommendations**: Evaluates eligibility for PPF, NPS, Sukanya Samriddhi Yojana (SSY), Senior Citizens Savings Scheme (SCSS), Mahila Samman Savings Certificate (MSSC), and Atal Pension Yojana (APY).
4. **"Why am I seeing this?" Explainability**: Modal drawers for every recommendation detailing passed/failed conditions, reported amounts, limits, and legal references.
5. **Synthetic Demo Personas**: Pre-packaged test profiles (Aarav, Priya, Ramesh, Vikram) to demonstrate different tax outcomes.
6. **Structured Document Parser**: Import sample JSON, CSV, or key-value text documents to populate user profiles.

---

## Quick Start

### 1. Configure Environment Variables
Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

To enable LLM explanations via ASI One, set your API key in `.env`:
```env
ASI_ONE_API_KEY=your_asi_one_api_key_here
ASI_ONE_BASE_URL=https://api.asi1.ai/v1
LLM_MODEL=asi1-mini
```
*(Note: If no API key is provided, Veroxa uses its built-in rule explanation generator seamlessly.)*

### 2. Start Backend & Frontend

```bash
# Terminal 1: Backend Server (Port 5000)
cd backend && npm run dev

# Terminal 2: Frontend App (Port 3000)
cd frontend && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Test Suite

```bash
cd backend && npm test
```

---

## Acceptance Criteria Verification

- [x] Application runs locally with one command.
- [x] Synthetic demo can be loaded.
- [x] Structured profile is generated.
- [x] Tax analysis works deterministically.
- [x] Deduction recommendations work deterministically.
- [x] Scheme recommendations work deterministically.
- [x] Every recommendation explains WHY.
- [x] Rules are editable through configuration files.
- [x] LLM cannot override rule-engine results.
- [x] AI explains results in plain language.
- [x] No real financial information is stored.
- [x] Educational disclaimer is clearly visible.
- [x] Automated tests cover important rule boundaries.
