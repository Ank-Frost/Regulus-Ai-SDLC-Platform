/**
 * Financial Knowledge Base & Case Studies
 * Provides domain regulations, risk profiles, and 4 representative case studies:
 * 1. Digital Customer Onboarding & Video KYC (Atlas Onboarding) -> Favors Agile–DevSecOps Hybrid
 * 2. Real-Time Payment Switch & Settlement Engine (AuraPay Switch) -> Favors V-Shaped
 * 3. AI-Powered AML & Real-Time Fraud Engine (SentriFraud) -> Favors Spiral
 * 4. Regulatory Capital Reporting Engine (RegLedger BCBS 239) -> Favors Waterfall / V-Shaped
 */

export const FINANCIAL_REGULATIONS = [
  {
    id: 'RBI-KYC-2016',
    name: 'RBI Master Direction - Know Your Customer (KYC) Directions',
    jurisdiction: 'India (Reserve Bank of India)',
    summary: 'Mandates customer identification procedures, Video KYC (V-CIP), Aadhaar e-KYC, face liveness detection, and geo-tagging requirements.',
    keyArticles: ['Section 14: Customer Due Diligence', 'Section 18: Video-based Customer Identification Process (V-CIP)', 'Section 54: Record Management']
  },
  {
    id: 'PCI-DSS-V4',
    name: 'Payment Card Industry Data Security Standard v4.0',
    jurisdiction: 'Global (PCI SSC)',
    summary: 'Specifies requirements for protecting cardholder data (CHD), strong encryption in transit and at rest, multi-factor authentication, and continuous security testing.',
    keyArticles: ['Requirement 3: Protect Stored Account Data', 'Requirement 8: Identify Users and Authenticate Access', 'Requirement 10: Log and Monitor All Access']
  },
  {
    id: 'GDPR-EU',
    name: 'General Data Protection Regulation (Regulation 2016/679)',
    jurisdiction: 'European Union / Cross-Border',
    summary: 'Strict regulations regarding processing of personal data, special category biometric processing, right to erasure, data protection by design, and 72-hour breach reporting.',
    keyArticles: ['Article 9: Processing of Special Categories (Biometrics)', 'Article 25: Data Protection by Design and by Default', 'Article 32: Security of Processing']
  },
  {
    id: 'BCBS-239',
    name: 'Basel Committee on Banking Supervision - Principles for Effective Risk Data Aggregation',
    jurisdiction: 'Global (Bank for International Settlements)',
    summary: 'Governance, data architecture, accuracy, completeness, timeliness, and adaptability requirements for statutory regulatory capital reporting.',
    keyArticles: ['Principle 1: Governance', 'Principle 3: Accuracy & Integrity', 'Principle 4: Completeness', 'Principle 5: Timeliness']
  },
  {
    id: 'SOC2-TYPE2',
    name: 'Service Organization Control 2 (Trust Services Criteria)',
    jurisdiction: 'Global (AICPA)',
    summary: 'Auditable controls across Security, Availability, Processing Integrity, Confidentiality, and Privacy over extended operational periods.',
    keyArticles: ['CC6.1: Logical Access Controls', 'CC7.1: Vulnerability Management', 'A1.2: System Availability & Redundancy']
  }
];

export const FINANCIAL_CASE_STUDIES = [
  {
    id: 'onboarding',
    title: 'Atlas Onboarding',
    badge: 'Digital Banking',
    subtitle: 'Digital Account Opening & Video KYC Platform',
    icon: 'AO',
    summary: 'A mobile-first onboarding platform for retail banking customers incorporating automated government ID OCR extraction, biometric selfie liveness verification, compliance referral queues, and core banking integration.',
    rawInput: `We need a mobile-first digital account opening journey for retail customers. Customers should capture government ID and a live selfie to verify their identity. High-risk applications must be automatically held and routed to our compliance review team before activation. The service requires 99.9% availability and must integrate with our core banking platform. Biometric data must be explicitly consented to and encrypted end-to-end. We also need a full tamper-evident audit trail for regulatory inspections.`,
    clarificationQuestions: [
      {
        id: 'q1',
        question: 'What is the maximum acceptable turnaround time for automated identity verification?',
        context: 'Clarification needed between customer drop-off reduction (< 60s) vs multi-bureau external validation latency.',
        suggestedAnswer: 'Identity verification must complete in under 45 seconds for 95% of standard applications.'
      },
      {
        id: 'q2',
        question: 'How should the system handle intermittent core banking system downtime?',
        context: 'Affects requirement for asynchronous queuing, offline draft saving, and eventual consistency.',
        suggestedAnswer: 'Implement an idempotent queue that holds verified applications and syncs within 5 minutes of core banking recovery.'
      }
    ],
    topic2Answers: {
      // Requirements (Slide 5)
      req_known: { value: false, rationale: 'Rapidly evolving KYC directives and biometric anti-spoofing techniques mean customer journey is refined continuously.' },
      req_early: { value: true, rationale: 'Statutory compliance checkpoints (KYC, AML, PII consent) can be formalized at the project inception.' },
      req_change: { value: false, rationale: 'Core banking regulatory rules remain bounded; user interface steps may evolve but base statutory flow is steady.' },
      req_demo: { value: false, rationale: 'Retail onboarding follows standard industry mobile flows; extensive preliminary wireframe demos are secondary to backend integration.' },
      req_poc: { value: false, rationale: 'OCR and facial liveness APIs are established commercial SDKs, eliminating the need for novel algorithmic PoCs.' },

      // Project Team (Slide 6)
      team_domain_new: { value: false, rationale: 'Senior fintech engineering team has extensive retail banking and KYC experience.' },
      team_tech_new: { value: true, rationale: 'Team is adopting modern cloud microservices and event-driven Apache Kafka for the first time.' },
      team_tools_new: { value: false, rationale: 'Existing GitOps, SonarQube, and Docker CI/CD tooling are fully mastered by developers.' },
      team_reassign: { value: true, rationale: 'Engineers are periodically rotated between mobile onboarding and credit assessment squads.' },
      team_training: { value: true, rationale: 'Dedicated cloud architect and compliance onboarding bootcamps are funded and scheduled.' },

      // User Community (Slide 7)
      user_restricted: { value: true, rationale: 'Retail end-users are consumer public; internal compliance and branch officers have constrained review hours.' },
      user_new_sysdef: { value: true, rationale: 'Compliance and operations teams are domain experts but lack experience in specifying technical event contracts.' },
      user_domain_expert: { value: true, rationale: 'Compliance officers have deep expertise in anti-money laundering and Reserve Bank directives.' },
      user_all_phases: { value: false, rationale: 'Compliance teams only participate during statutory sign-offs and acceptance validation, not daily sprints.' },

      // Project Type & Risk (Slide 8)
      risk_new_direction: { value: true, rationale: 'Marks the bank\'s strategic pivot from branch-based onboarding to 100% paperless digital self-service.' },
      risk_sys_integration: { value: true, rationale: 'Requires secure real-time bidirectional integration with Core Banking, Credit Bureau, and UIDAI/Gov ID APIs.' },
      risk_enhancement: { value: true, rationale: 'Enhances and replaces the legacy branch intake portal with modern omnichannel REST endpoints.' },
      risk_stable_funding: { value: false, rationale: 'Budget is released iteratively in quarterly increments tied to customer activation milestones.' },
      risk_long_life: { value: true, rationale: 'The onboarding gateway is intended to serve as the core customer acquisition rails for the next 7-10 years.' }
    },
    requirements: [
      {
        id: 'FR-ONB-001',
        statement: 'The system shall extract customer demographic details from uploaded government ID cards using optical character recognition (OCR) with > 98% field accuracy.',
        category: 'Functional',
        categories: ['Functional', 'Integration'],
        source: 'Head of Digital Banking Interview · 24 Sep',
        justification: 'Automates customer onboarding, reducing manual data entry time from 15 minutes to under 30 seconds.',
        priority: 'High',
        dependencies: ['INT-ONB-005'],
        assumptions: ['Supported documents: Passport, Driver License, National ID with machine-readable zones.'],
        acceptanceCriteria: 'Given a valid ID photo with resolution ≥ 300 DPI, when submitted, then name, DOB, and ID number are extracted and auto-filled within 3 seconds.',
        regulations: ['RBI-KYC-2016 §14', 'GDPR-EU Art. 25'],
        riskLevel: 'Medium',
        confidence: 96,
        status: 'Approved'
      },
      {
        id: 'SEC-ONB-002',
        statement: 'The system shall encrypt all customer identity documents and biometric images in transit using TLS 1.3 and at rest using AES-256 with HSM-managed keys.',
        category: 'Security',
        categories: ['Security', 'Privacy'],
        source: 'Chief Information Security Officer (CISO) Policy Review',
        justification: 'Guarantees compliance with banking data confidentiality regulations and prevents exfiltration of customer PII.',
        priority: 'Critical',
        dependencies: [],
        assumptions: ['Cloud HSM cluster configured with FIPS 140-2 Level 3 certification.'],
        acceptanceCriteria: 'Given any incoming identity image payload, when stored in persistence layer, then data is encrypted at rest and unreadable without authorized KMS decrypt token.',
        regulations: ['PCI-DSS-V4 Req. 3', 'GDPR-EU Art. 32'],
        riskLevel: 'Critical',
        confidence: 98,
        status: 'Approved'
      },
      {
        id: 'CMP-ONB-003',
        statement: 'The system shall automatically route onboarding applications with risk scores exceeding the calibrated threshold (≥ 65) to the Compliance Review Queue before activation.',
        category: 'Compliance',
        categories: ['Compliance', 'Risk'],
        source: 'Chief Compliance Officer Policy Directive',
        justification: 'Prevents non-compliant customer activation and mitigates AML exposure for politically exposed persons (PEPs) or sanctions matches.',
        priority: 'Critical',
        dependencies: ['FR-ONB-001'],
        assumptions: ['Screening API integrates with updated OFAC, UN, and national sanctions lists.'],
        acceptanceCriteria: 'Given an application flagged with an AML or PEP match, when submitted, then account state transitions to PENDING_COMPLIANCE_REVIEW and notifies the duty officer.',
        regulations: ['RBI-KYC-2016 §18', 'SOC2-TYPE2 CC6.1'],
        riskLevel: 'High',
        confidence: 94,
        status: 'Pending review'
      },
      {
        id: 'NFR-ONB-004',
        statement: 'The onboarding API shall maintain 99.9% uptime (excluding scheduled maintenance) with an average end-to-end verification latency below 45 seconds for 95% of requests.',
        category: 'Availability',
        categories: ['Availability', 'Performance'],
        source: 'Operations SLA Specification v2.1',
        justification: 'Ensures high customer retention and prevents onboarding drop-offs during peak marketing campaigns.',
        priority: 'High',
        dependencies: ['INT-ONB-005'],
        assumptions: ['Third-party government ID verification API maintains SLA of < 3 seconds.'],
        acceptanceCriteria: 'Given 500 concurrent onboarding requests, when evaluated over a 1-hour window, then 95th percentile response latency is < 45 seconds and error rate is < 0.1%.',
        regulations: ['SOC2-TYPE2 A1.2'],
        riskLevel: 'Medium',
        confidence: 89,
        status: 'Approved'
      },
      {
        id: 'INT-ONB-005',
        statement: 'The system shall synchronize verified customer records and KYC dossiers with the core banking ledger via idempotent mutual-TLS REST microservices.',
        category: 'Integration',
        categories: ['Integration', 'Functional'],
        source: 'Core Banking Integration Specification',
        justification: 'Enables automated account creation and ledger generation without duplicate entries or manual reconciliation.',
        priority: 'High',
        dependencies: ['FR-ONB-001', 'CMP-ONB-003'],
        assumptions: ['Core banking sandbox accepts ISO 20022 customer master payload.'],
        acceptanceCriteria: 'Given an approved application, when dispatched to core banking API, then an account number is returned and stored within 2.5 seconds, supporting replay without duplication.',
        regulations: ['SOC2-TYPE2 CC7.1'],
        riskLevel: 'High',
        confidence: 92,
        status: 'Approved'
      },
      {
        id: 'PRV-ONB-006',
        statement: 'The system shall capture explicit, timestamped customer consent with localized disclosure text prior to collecting any biometric face or selfie data.',
        category: 'Privacy',
        categories: ['Privacy', 'Compliance'],
        source: 'Data Protection Officer (DPO) Guidance Note',
        justification: 'Strict legal mandate under GDPR Article 9 and national data protection statutes regarding biometric data processing.',
        priority: 'Critical',
        dependencies: [],
        assumptions: ['Consent records are stored with cryptographic non-repudiation proof.'],
        acceptanceCriteria: 'Given a customer opening the camera verification screen, when consent is not actively agreed to, then camera feed cannot be activated and submission is prevented.',
        regulations: ['GDPR-EU Art. 9', 'RBI-KYC-2016 §18'],
        riskLevel: 'High',
        confidence: 97,
        status: 'Approved'
      },
      {
        id: 'AUD-ONB-007',
        statement: 'The system shall record an append-only, tamper-evident audit log with SHA-256 block hashing for every verification event, compliance decision, and human override.',
        category: 'Auditability',
        categories: ['Auditability', 'Security'],
        source: 'Internal Audit & Regulatory Compliance Policy',
        justification: 'Provides undeniable forensic evidence for statutory central bank inspections and forensic fraud investigations.',
        priority: 'High',
        dependencies: [],
        assumptions: ['WORM (Write Once, Read Many) storage or immutable ledger backing the audit store.'],
        acceptanceCriteria: 'Given any human review action or automated state change, when logged, then entry contains actor ID, timestamp, prior state, new state, and cryptographic hash of previous entry.',
        regulations: ['RBI-KYC-2016 §54', 'SOC2-TYPE2 CC6.1'],
        riskLevel: 'Critical',
        confidence: 95,
        status: 'Approved'
      },
      {
        id: 'FR-ONB-008',
        statement: 'The system shall notify customers of identity verification outcomes and outstanding document requirements via real-time multi-channel SMS and push notifications.',
        category: 'Functional',
        categories: ['Functional', 'Usability'],
        source: 'Product Owner Requirements Note',
        justification: 'Keeps prospective account holders informed in real time, reducing inbound customer support calls.',
        priority: 'Medium',
        dependencies: ['FR-ONB-001'],
        assumptions: ['SMS gateway has fallback provider configuration.'],
        acceptanceCriteria: 'Given an application status update, when processed, then notification is dispatched to registered customer mobile number within 10 seconds.',
        regulations: ['SOC2-TYPE2 A1.2'],
        riskLevel: 'Low',
        confidence: 91,
        status: 'Open'
      }
    ]
  },
  {
    id: 'payments',
    title: 'AuraPay Switch',
    badge: 'Payment Rails',
    subtitle: 'Real-Time Payment Switch & Settlement Engine',
    icon: 'AP',
    summary: 'A mission-critical financial switch processing high-volume interbank credit transfers, ISO 20022 settlement messages, double-entry ledger updates, and cryptographic verification under strict sub-second SLAs.',
    rawInput: `We are building a real-time payment switch connecting commercial banks to the central settlement network. The switch must handle 10,000 transactions per second with 99.999% availability and sub-200ms latency. Strict adherence to ISO 20022 and PCI-DSS Level 1 is mandatory. Zero data loss and complete idempotency are non-negotiable. Verification and formal validation gates must be established at every stage before production deployment.`,
    clarificationQuestions: [
      {
        id: 'q1',
        question: 'What is the required Disaster Recovery (DR) Recovery Point Objective (RPO) and Recovery Time Objective (RTO)?',
        context: 'Critical for selecting synchronous active-active database replication versus high-availability failover topology.',
        suggestedAnswer: 'Zero RPO (zero transactional data loss) and RTO < 30 seconds across active-active redundant data centers.'
      }
    ],
    topic2Answers: {
      // Requirements (Slide 5)
      req_known: { value: true, rationale: 'ISO 20022 payment messaging standards and central bank settlement protocols are formally defined, published, and immutable.' },
      req_early: { value: true, rationale: 'All interface specifications, message validation rules, and settlement clearing schedules can be frozen early.' },
      req_change: { value: false, rationale: 'Payment clearing rules and statutory protocols undergo formal multi-year governance with zero ad-hoc changes.' },
      req_demo: { value: false, rationale: 'Switch engine operates as headless backend infrastructure; no UI mockups or user demonstrations required.' },
      req_poc: { value: false, rationale: 'Core payment message switching mechanisms are mature and mathematically proven in banking industry.' },

      // Project Team (Slide 6)
      team_domain_new: { value: false, rationale: 'Engineering team comprises seasoned payments and clearing switch specialists with 10+ years experience.' },
      team_tech_new: { value: true, rationale: 'Team is transitioning to ultra-low-latency eBPF and C++20 zero-copy memory pipelines.' },
      team_tools_new: { value: true, rationale: 'Adopting formal verification tooling (TLA+) and hardware load generators.' },
      team_reassign: { value: false, rationale: 'Core payment switch engineers are locked into a dedicated, ring-fenced mission team.' },
      team_training: { value: true, rationale: 'Formal verification and specialized low-latency systems training is fully funded.' },

      // User Community (Slide 7)
      user_restricted: { value: true, rationale: 'Direct users are institutional clearing houses and treasury operations with strictly scheduled engagement windows.' },
      user_new_sysdef: { value: false, rationale: 'Treasury operations and settlement officers have extensive technical experience with SWIFT and clearing specs.' },
      user_domain_expert: { value: false, rationale: 'Treasury officers are financial specialists, but clearing switch protocol architecture is defined by standards bodies.' },
      user_all_phases: { value: false, rationale: 'Institutional stakeholders participate strictly during bilateral simulation and final UAT sign-offs.' },

      // Project Type & Risk (Slide 8)
      risk_new_direction: { value: false, rationale: 'Project replaces existing legacy clearing engine; does not represent an unknown business line.' },
      risk_sys_integration: { value: true, rationale: 'Extensive integration with 25+ commercial banks, central bank RTGS, and fraud monitoring engines.' },
      risk_enhancement: { value: true, rationale: 'Major generational enhancement of national payment gateway infrastructure.' },
      risk_stable_funding: { value: true, rationale: 'Central banking consortium has secured a multi-year guaranteed capital allocation.' },
      risk_long_life: { value: true, rationale: 'Expected operational lifecycle of the payment switch is 15-20 years with continuous compliance audits.' }
    },
    requirements: [
      {
        id: 'FR-PAY-001',
        statement: 'The payment switch shall validate, authorize, and route ISO 20022 pacs.008 credit transfer messages within a maximum processing latency of 180ms at 10,000 TPS.',
        category: 'Performance',
        categories: ['Performance', 'Functional'],
        source: 'National Payment Gateway Clearing Specification',
        justification: 'Satisfies statutory central bank real-time gross settlement throughput and latency requirements.',
        priority: 'Critical',
        dependencies: [],
        assumptions: ['High-speed HSM hardware acceleration available for digital signatures.'],
        acceptanceCriteria: 'Given sustained load of 10,000 TPS, when measured at 99.9th percentile, then transaction processing latency does not exceed 180ms.',
        regulations: ['PCI-DSS-V4 Req. 3', 'SOC2-TYPE2 A1.2'],
        riskLevel: 'Critical',
        confidence: 99,
        status: 'Approved'
      },
      {
        id: 'SEC-PAY-002',
        statement: 'The system shall enforce end-to-end payload signing and mutual TLS 1.3 encryption with dedicated Hardware Security Modules (HSM) for PIN block translation.',
        category: 'Security',
        categories: ['Security', 'Compliance'],
        source: 'CISO Payment Security Architecture Baseline',
        justification: 'Mandatory requirement under PCI-DSS Level 1 and central bank cryptographic guidelines.',
        priority: 'Critical',
        dependencies: ['FR-PAY-001'],
        assumptions: ['Thales payShield 10K HSMs installed in paired data centers.'],
        acceptanceCriteria: 'Given an incoming transaction request, when inspected on wire, all cleartext cardholder and PIN data is encrypted and digitally signed.',
        regulations: ['PCI-DSS-V4 Req. 3', 'PCI-DSS-V4 Req. 8'],
        riskLevel: 'Critical',
        confidence: 98,
        status: 'Approved'
      },
      {
        id: 'REL-PAY-003',
        statement: 'The system shall provide zero transaction data loss (RPO = 0) and automatic hot-standby failover within 15 seconds (RTO < 30s) across dual active-active sites.',
        category: 'Availability',
        categories: ['Availability', 'Risk'],
        source: 'High Availability Architecture Standard',
        justification: 'Prevents systemic financial deadlock during catastrophic data center outage.',
        priority: 'Critical',
        dependencies: [],
        assumptions: ['Synchronous fiber inter-DC link with latency < 2ms.'],
        acceptanceCriteria: 'Given total failure of primary site node, when simulated, then secondary cluster assumes 100% clearing traffic with zero uncommitted transactions.',
        regulations: ['BCBS-239 Principle 3', 'SOC2-TYPE2 A1.2'],
        riskLevel: 'Critical',
        confidence: 95,
        status: 'Approved'
      }
    ]
  },
  {
    id: 'fraud',
    title: 'SentriFraud AI',
    badge: 'Risk & AI',
    subtitle: 'Real-Time Anti-Money Laundering & Graph Fraud Detection',
    icon: 'SF',
    summary: 'An advanced machine-learning and graph analytics platform for detecting evolving financial fraud typologies, mule accounts, and organized money laundering rings in streaming payment flows.',
    rawInput: `We need an adaptive AI/ML fraud detection engine that evaluates payment transactions in under 50ms. The system must discover unknown fraud rings using graph embeddings and behavioral heuristics. Because fraud typologies evolve daily, our algorithms must be continuously prototyped, tested against historical data, and calibrated. High uncertainty exists regarding false positive rates and regulatory explainability under model risk management guidelines.`,
    clarificationQuestions: [
      {
        id: 'q1',
        question: 'What is the required balance between precision (avoiding false alarms for valid customers) and recall (catching fraud)?',
        context: 'Directly dictates model thresholding, shadow-mode deployment cycles, and risk tolerances.',
        suggestedAnswer: 'Minimum recall of 92% on confirmed mule accounts while keeping false positive rate strictly below 0.8% of daily transactions.'
      }
    ],
    topic2Answers: {
      // Requirements (Slide 5)
      req_known: { value: false, rationale: 'Fraud vectors and attack patterns change continuously; feature sets cannot be exhaustively pre-specified.' },
      req_early: { value: false, rationale: 'ML feature definitions and graph clustering parameters require experimental discovery and continuous refinement.' },
      req_change: { value: true, rationale: 'Financial crime syndicates adapt evasion tactics whenever new detection rules are put in place.' },
      req_demo: { value: true, rationale: 'Fraud investigators need hands-on visual graph prototypes to evaluate pattern explainability.' },
      req_poc: { value: true, rationale: 'Unproven graph neural network heuristics require substantial proof-of-concept validation against historical data.' },

      // Project Team (Slide 6)
      team_domain_new: { value: true, rationale: 'Data science hires are cutting-edge ML researchers but new to bank regulatory reporting frameworks.' },
      team_tech_new: { value: true, rationale: 'Adopting distributed GPU graph compute (Neo4j, PyTorch Geometric) for first time in enterprise core.' },
      team_tools_new: { value: true, rationale: 'New MLOps pipeline tooling (MLflow, Kubeflow, Feast feature store) being introduced.' },
      team_reassign: { value: true, rationale: 'Data scientists are shared across credit scoring, churn prediction, and AML initiatives.' },
      team_training: { value: false, rationale: 'No formal institutional training on graph ML; team relies on self-directed R&D.' },

      // User Community (Slide 7)
      user_restricted: { value: false, rationale: 'Internal fraud intelligence and AML compliance analysts are co-located with the R&D team.' },
      user_new_sysdef: { value: true, rationale: 'Fraud analysts are accustomed to manual case tools, not specifying automated AI pipeline metrics.' },
      user_domain_expert: { value: true, rationale: 'AML investigators possess deep forensic knowledge of financial crime typologies.' },
      user_all_phases: { value: true, rationale: 'Investigators must review model outputs and score explanations in every evolutionary cycle.' },

      // Project Type & Risk (Slide 8)
      risk_new_direction: { value: true, rationale: 'Pioneers the bank\'s strategic shift toward autonomous AI-driven transaction risk decisioning.' },
      risk_sys_integration: { value: true, rationale: 'Must ingest from 12 heterogeneous core payment switches and customer account databases.' },
      risk_enhancement: { value: false, rationale: 'A brand-new AI engine replacing legacy static rule-based fraud systems.' },
      risk_stable_funding: { value: false, rationale: 'Innovation lab funding is allocated cyclically based on demonstrable fraud loss reduction metrics.' },
      risk_long_life: { value: true, rationale: 'The fraud intelligence core is expected to remain foundational for the institution over many years.' }
    },
    requirements: [
      {
        id: 'FR-FRD-001',
        statement: 'The system shall compute real-time fraud risk scores (0-1000) for streaming payment transactions within 45ms using temporal graph neural network inference.',
        category: 'Functional',
        categories: ['Functional', 'Performance'],
        source: 'Head of Financial Crime Intelligence',
        justification: 'Intercepts illicit fund transfers before settlement occurs without introducing perceptible customer friction.',
        priority: 'Critical',
        dependencies: [],
        assumptions: ['Transaction stream delivered via Apache Kafka with sub-10ms delivery guarantee.'],
        acceptanceCriteria: 'Given a transaction payload, when evaluated by the inference engine, risk score and top 3 contributing factors are emitted in < 45ms.',
        regulations: ['RBI-KYC-2016 §18', 'SOC2-TYPE2 CC7.1'],
        riskLevel: 'High',
        confidence: 93,
        status: 'Approved'
      },
      {
        id: 'CMP-FRD-002',
        statement: 'The AI decision engine shall provide human-interpretable SHAP (SHapley Additive exPlanations) values for every transaction flagged for suspicious activity reporting.',
        category: 'Compliance',
        categories: ['Compliance', 'Auditability'],
        source: 'Model Risk Management Policy Directive',
        justification: 'Mandatory under central bank algorithmic accountability and fair-lending explainability mandates.',
        priority: 'Critical',
        dependencies: ['FR-FRD-001'],
        assumptions: ['Explanation calculation is pre-compiled to run within the synchronous pipeline.'],
        acceptanceCriteria: 'Given any blocked transaction, when opened by an AML officer, then feature contribution weights are displayed with clear English explanations.',
        regulations: ['BCBS-239 Principle 3', 'GDPR-EU Art. 25'],
        riskLevel: 'High',
        confidence: 94,
        status: 'Pending review'
      }
    ]
  },
  {
    id: 'reporting',
    title: 'RegLedger Reporting',
    badge: 'Statutory Core',
    subtitle: 'Central Bank Regulatory Capital Reporting Engine (BCBS 239)',
    icon: 'RL',
    summary: 'A deterministic statutory compliance engine aggregating risk-weighted assets (RWA), liquidity coverage ratios (LCR), and capital adequacy disclosures for central bank quarterly filings.',
    rawInput: `We are building a central regulatory capital reporting engine to fulfill Basel III and BCBS 239 statutory obligations. The system must ingest ledger balances from our corporate, retail, and treasury cores at month-end, execute standardized capital calculation formulas mandated by the Reserve Bank, and produce certified audit files. The formulas and reporting templates are legally fixed by the regulator, requiring exhaustive verification, immutable audit records, and zero deviation.`,
    clarificationQuestions: [
      {
        id: 'q1',
        question: 'Will regulatory reporting formulas change outside of published annual central bank gazette updates?',
        context: 'Validates strict waterfall baseline stability versus evolutionary adjustments.',
        suggestedAnswer: 'Formulas are strictly frozen per central bank Master Directions; any revisions follow a formal 6-month gazette notice.'
      }
    ],
    topic2Answers: {
      // Requirements (Slide 5)
      req_known: { value: true, rationale: 'Basel III statutory guidelines, calculation schedules, and XBRL taxonomy formats are published and legally fixed.' },
      req_early: { value: true, rationale: 'All financial accounting rules and regulatory output templates are fully specified before engineering begins.' },
      req_change: { value: false, rationale: 'Statutory calculations are locked by central bank mandate; arbitrary mid-cycle changes are prohibited.' },
      req_demo: { value: false, rationale: 'Outputs are standardized tabular regulatory filings; no subjective user feedback or wireframe demos needed.' },
      req_poc: { value: false, rationale: 'Accounting mathematics and risk-weighted asset arithmetic are well understood; no algorithmic uncertainty exists.' },

      // Project Team (Slide 6)
      team_domain_new: { value: false, rationale: 'Chartered accountants and regulatory compliance analysts on the team have deep Basel III expertise.' },
      team_tech_new: { value: false, rationale: 'Standard enterprise relational data warehouse (PostgreSQL / Snowflake) and Python ETL jobs.' },
      team_tools_new: { value: false, rationale: 'Standard SQL, dbt, and enterprise scheduling tools familiar to all database engineers.' },
      team_reassign: { value: false, rationale: 'Regulatory reporting team is stable and dedicated to annual reporting calendar.' },
      team_training: { value: false, rationale: 'Standard technology stack requires no specialized outside training.' },

      // User Community (Slide 7)
      user_restricted: { value: true, rationale: 'Chief Financial Officer and Chief Risk Officer are available only during formal sign-off sessions.' },
      user_new_sysdef: { value: false, rationale: 'Finance and audit stakeholders are deeply experienced in formal data specification and reconciliation.' },
      user_domain_expert: { value: false, rationale: 'Regulatory guidelines are specified by external central bank committees, not internal end-users.' },
      user_all_phases: { value: false, rationale: 'Finance executives participate strictly during initial specification sign-off and final UAT approval.' },

      // Project Type & Risk (Slide 8)
      risk_new_direction: { value: false, rationale: 'Replaces legacy manual spreadsheet reporting; aligns with existing regulatory compliance functions.' },
      risk_sys_integration: { value: false, rationale: 'Operates as a centralized data repository ingesting standardized periodic flat-file feeds rather than synchronous enterprise integration bus.' },
      risk_enhancement: { value: false, rationale: 'A brand-new greenfield regulatory calculation repository rather than an enhancement of legacy code.' },
      risk_stable_funding: { value: true, rationale: 'Statutory compliance is legally mandatory; enterprise capital is guaranteed by Board of Directors.' },
      risk_long_life: { value: true, rationale: 'Statutory reporting engine is an enterprise pillar designed for 10-15 years of certified service.' }
    },
    requirements: [
      {
        id: 'FR-REP-001',
        statement: 'The engine shall aggregate daily transaction and ledger balances across all lines of business to calculate Risk-Weighted Assets (RWA) in strict compliance with Basel III standardized approach.',
        category: 'Functional',
        categories: ['Functional', 'Compliance'],
        source: 'Central Bank Capital Adequacy Guidelines',
        justification: 'Statutory obligation required to maintain commercial banking operational license.',
        priority: 'Critical',
        dependencies: [],
        assumptions: ['Ledger feeds arrive in standardized CSV/ODBC schema daily by 02:00 AM.'],
        acceptanceCriteria: 'Given complete month-end ledger data, when RWA calculation job runs, output balances reconcile to within 0.001% of audited general ledger.',
        regulations: ['BCBS-239 Principle 3', 'BCBS-239 Principle 4'],
        riskLevel: 'Critical',
        confidence: 99,
        status: 'Approved'
      }
    ]
  }
];
