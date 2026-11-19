# Regulus AI — Financial Requirements Intelligence & SDLC Selection Platform

A self-contained, agentic AI platform designed for automated requirement elicitation, analysis, compliance mapping, and SDLC model selection in the financial sector. 

The SDLC recommendation engine evaluates project characteristics across **4 categories and 19 canonical criteria** to recommend and rank the optimal lifecycle methodology among the 6 primary software engineering models.

---

## 1. Quick Start

Open `index.html` directly in any modern web browser.
- **Zero dependencies & 100% offline**: No npm build, Node.js server, login, or external database required.
- **Immediate Responsiveness**: Packaged in a standalone, self-contained client bundle (`src/app.bundle.js`) that runs seamlessly directly over `file:///` or HTTP without CORS restrictions.

To launch from the terminal:
```bash
xdg-open index.html
```
Or start a local lightweight web server:
```bash
python3 -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

---

## 2. SDLC Decision Benchmark & Models

The platform evaluates project characteristics across **4 categories and 19 criteria** to rank the **6 SDLC models** strictly specified in Section 14 of the Problem Statement:

1. **Waterfall**: Linear-sequential & deterministic; best when requirements are stable, fully known upfront, and regulatory approval gates are extensive.
2. **V-Model**: Strict paired verification and validation at every tier; essential for zero-defect mission-critical financial switches and settlement engines.
3. **Spiral**: Risk-driven cyclic prototyping; engineered for high-uncertainty financial innovations, graph ML fraud engines, and novel algorithmic trading.
4. **Agile**: Adaptive sprint-based delivery; ideal for frequently changing requirements and customer-facing digital banking features.
5. **DevSecOps**: Continuous secure delivery with automated shift-left security, container scanning, and compliance-as-code gates in CI/CD pipelines.
6. **Agile–DevSecOps Hybrid**: Regulated iterative delivery combining Agile sprints and automated DevSecOps pipelines with formal V-Model verification gates at statutory milestones.

### The 19 Canonical Criteria across 4 Categories:
- **Characteristics of Requirements (R1-R5)**: R1 (Well-known/defined), R2 (Defined early), R3 (Frequent change), R4 (Need demonstration), R5 (PoC required).
- **Characteristics of Project Team (T1-T5)**: T1 (New to domain), T2 (New to technology), T3 (New to tools), T4 (Subject to reassignment), T5 (Training available).
- **Characteristics of User Community (U1-U4)**: U1 (Restricted availability), U2 (New to system definition), U3 (Domain experts), U4 (Involved in all phases).
- **Characteristics of Project Type and Risk (P1-P5)**: P1 (New product direction), P2 (System integration), P3 (Enhancement to existing system), P4 (Stable funding), P5 (Long product life).

---

## 3. Four Financial Sector Case Studies Included

The platform features 4 pre-calibrated financial case studies demonstrating distinct model selection outcomes aligned with Section 14 of the Problem Statement:

| Case Study | Subtitle | Primary Domain | Top Recommended Model | Compatibility |
| :--- | :--- | :--- | :---: | :---: |
| **Atlas Onboarding** | Digital Account Opening & Video KYC | Retail Digital Banking | **Agile–DevSecOps Hybrid** | 94% |
| **AuraPay Switch** | Real-Time Payment Switch & Settlement | High-Speed Payment Rails | **V-Model** | 100% |
| **SentriFraud AI** | Adaptive AML & Graph Fraud Detection | Financial Crime AI | **Spiral** | 84% |
| **RegLedger** | Central Bank Capital Reporting (BCBS 239) | Statutory Core | **Waterfall** | 92% |

---

## 4. Multi-Agent System Architecture

Implements the 13 collaborative agent roles defined in Section 4 of the problem statement:
- **Coordinator Agent**: Pipeline dispatch and execution governance.
- **Stakeholder Interaction Agent**: Unstructured natural language intake and conversational elicitation.
- **Privacy & Masking Agent**: Real-time redaction of PII, Aadhaar/ID numbers, cardholder data, and credentials.
- **Requirement Extraction Agent**: Transforms raw dialogue into structured IEEE 830 / ISO 29148 requirements.
- **Clarification Agent**: Detects ambiguities, non-testable statements, and asks context-aware follow-ups.
- **Classification Agent**: Multi-label taxonomy (Functional, Security, Compliance, Availability, Integration).
- **Conflict & Quality Agent**: Quality assurance checks (ambiguity, lack of testability, missing controls).
- **Compliance Agent**: Maps controls to financial statutes (**RBI KYC Master Directions, PCI-DSS v4.0, GDPR, BCBS 239, SOC 2**).
- **Security & Privacy Agent**: STRIDE threat profiling, encryption standards (mTLS 1.3, AES-256 HSM).
- **Risk Analysis Agent**: Scores business, operational, and regulatory risks on a 5x5 impact matrix.
- **SDLC Selection Agent**: Computes the 19-criterion decision matrix and ranks the 6 models.
- **Documentation Agent**: Compiles downloadable SRS, User Stories (Gherkin syntax), and Traceability Matrix.
- **Human Approval Agent**: Four-eyes approval checkpoints for compliance officers and architects.

---

## 5. Key Interactive Features

- **Expandable SDLC Decision Table**: View the full comparative matrix formatted across all 4 categories.
- **Live "What-If" Scenario Toggles**: Click any **Project Assessment (Yes ↔ No)** in the matrix to see model scores and rankings recalculate instantly.
- **Custom Criteria Extension**: Add project-specific questions to the matrix while keeping the 19 canonical criteria intact.
- **End-to-End Traceability Matrix (RTM)**: Forward and backward tracking from interview quotes to acceptance test criteria and SDLC gates.
- **One-Click Exports**:
  - `Export SRS (.md)`: Comprehensive IEEE 830 Software Requirements Specification document.
  - `Export RTM (.csv)`: Complete Requirements Traceability Matrix.
  - `Export SDLC Assessment (.md)`: Detailed comparative evaluation report.
  - `Download Audit Log (.json)`: Cryptographically chained (SHA-256) immutable event log.

---

## 6. Directory Structure

```
├── index.html                    # Single-page application shell and view templates
├── README.md                     # Documentation and user guide
├── src/
│   ├── app.bundle.js             # Standalone client bundle (Engine, Agents, KB, UI controller)
│   ├── styles.css                # Polished responsive design system
│   ├── topic2_engine.js          # Reference module implementation
│   ├── knowledge_base.js         # Financial regulations, threat taxonomy, and case studies
│   └── agents.js                 # Multi-agent collaborative pipeline
└── Topic-2_Selection of an SDLC-PT-4.pdf  # Reference slide deck
```
