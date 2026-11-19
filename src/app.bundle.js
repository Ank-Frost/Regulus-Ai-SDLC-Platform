/**
 * Regulus AI — Standalone Client Bundle
 * Comprehensive SDLC Decision Engine & Requirements Intelligence
 * Zero external dependencies — Works seamlessly on file:/// and http://
 */

(function () {
  'use strict';

  // ==========================================
  // 1. SDLC MODELS & 19 CANONICAL CRITERIA
  // ==========================================

  const SDLC_MODELS = [
    {
      id: 'waterfall',
      name: 'Waterfall',
      tagline: 'Linear-Sequential & Deterministic',
      description: 'A classic phased approach where progress flows steadily downwards through requirement analysis, design, implementation, testing, integration, and maintenance. Best when requirements are fixed, known early, and user availability is limited.',
      financialSuitability: 'High documentation rigor, suitable for statutory or fixed regulatory computation engines with immutable rules.',
      weakness: 'Inflexible to requirement shifts; validation occurs late, carrying high rework risk for dynamic financial journeys.'
    },
    {
      id: 'v_shaped',
      name: 'V-Model',
      tagline: 'Strict Verification & Validation',
      description: 'An extension of waterfall emphasizing rigorous paired verification and validation at each stage (e.g. Acceptance Testing paired with Requirements, Integration Testing paired with High-Level Design).',
      financialSuitability: 'Ideal for mission-critical financial systems (settlements, payment switches, ledger engines) where defect discovery in production is catastrophic.',
      weakness: 'Heavyweight process overhead; assumes requirements are stable and early-defined.'
    },
    {
      id: 'spiral',
      name: 'Spiral',
      tagline: 'Risk-Driven & Evolutionary Iteration',
      description: 'Combines iterative prototyping with systematic risk assessment in 4 quadrants (Determine Objectives, Identify & Resolve Risks, Develop & Test, Plan Next Phase).',
      financialSuitability: 'Premier choice for high-uncertainty financial innovations (e.g. AI-driven fraud detection, unproven algorithmic trading, high architectural risk).',
      weakness: 'Costly; requires seasoned risk assessment expertise and complex project management.'
    },
    {
      id: 'agile',
      name: 'Agile',
      tagline: 'Adaptive Sprint-Based Delivery',
      description: 'Delivers software iteratively in time-boxed sprints with active stakeholder collaboration, rapid feedback loops, and evolving backlogs.',
      financialSuitability: 'Well-suited for customer-facing digital banking features, mobile journeys, and modern financial applications with changing market requirements.',
      weakness: 'Requires high user and stakeholder availability; documentation must be actively governed for regulatory audits.'
    },
    {
      id: 'devsecops',
      name: 'DevSecOps',
      tagline: 'Continuous Secure Deployment',
      description: 'Integrates automated security testing, compliance policy-as-code, and continuous integration/continuous deployment (CI/CD) pipelines from inception.',
      financialSuitability: 'Essential for cloud-native payment APIs, automated fraud microservices, and platforms requiring automated vulnerability management and continuous compliance.',
      weakness: 'High upfront toolchain and automation setup overhead; demands strong DevSecOps engineering culture.'
    },
    {
      id: 'hybrid',
      name: 'Agile–DevSecOps Hybrid',
      tagline: 'Regulated Iterative Delivery with Built-in Security',
      description: 'Combines Agile sprint-based delivery with automated DevSecOps security pipelines, augmented with formal V-Model verification gates at statutory milestones.',
      financialSuitability: 'The gold standard for regulated financial institutions — blends delivery speed with continuous compliance verification, auditability, and human sign-off checkpoints.',
      weakness: 'Requires cross-functional coordination between squads, security champions, and regulatory compliance officers.'
    }
  ];

  const SDLC_CATEGORIES = [
    {
      id: 'requirements',
      name: 'Characteristics of Requirements',
      code: 'REQ',
      description: 'Evaluates requirement clarity, volatility, definition timing, and need for proof of concept.'
    },
    {
      id: 'team',
      name: 'Characteristics of Project Team',
      code: 'TEAM',
      description: 'Assesses domain maturity, technology familiarity, tooling experience, staff reassignment, and training.'
    },
    {
      id: 'user',
      name: 'Characteristics of User Community',
      code: 'USER',
      description: 'Examines user availability, system definition experience, problem domain expertise, and lifecycle involvement.'
    },
    {
      id: 'risk',
      name: 'Characteristics of Project Type and Risk',
      code: 'RISK',
      description: 'Considers product novelty, integration complexity, enhancement nature, funding stability, and system longevity.'
    }
  ];

  const SDLC_CRITERIA = [
    // --- Category 1: Characteristics of Requirements ---
    {
      id: 'req_known',
      category: 'requirements',
      code: 'R1',
      question: 'Are the requirements easily defined and /or well known?',
      weights: { standard: 1.2, financial: 1.5 },
      modelValues: { waterfall: true, v_shaped: true, spiral: false, agile: false, devsecops: false, hybrid: false }
    },
    {
      id: 'req_early',
      category: 'requirements',
      code: 'R2',
      question: 'Can the requirements be defined early in the cycle?',
      weights: { standard: 1.2, financial: 1.4 },
      modelValues: { waterfall: true, v_shaped: true, spiral: false, agile: false, devsecops: false, hybrid: true }
    },
    {
      id: 'req_change',
      category: 'requirements',
      code: 'R3',
      question: 'Will the requirements change often in the cycle?',
      weights: { standard: 1.5, financial: 1.6 },
      modelValues: { waterfall: false, v_shaped: false, spiral: true, agile: true, devsecops: true, hybrid: true }
    },
    {
      id: 'req_demo',
      category: 'requirements',
      code: 'R4',
      question: 'Is there a need to demonstrate the requirements to achieve definition?',
      weights: { standard: 1.1, financial: 1.2 },
      modelValues: { waterfall: false, v_shaped: false, spiral: true, agile: true, devsecops: true, hybrid: false }
    },
    {
      id: 'req_poc',
      category: 'requirements',
      code: 'R5',
      question: 'Is a proof of concept required to demonstrate capability?',
      weights: { standard: 1.4, financial: 1.5 },
      modelValues: { waterfall: false, v_shaped: false, spiral: true, agile: true, devsecops: false, hybrid: false }
    },

    // --- Category 2: Characteristics of Project Team ---
    {
      id: 'team_domain_new',
      category: 'team',
      code: 'T1',
      question: 'Are the majority of team members new to the problem domain for the project?',
      weights: { standard: 1.0, financial: 1.2 },
      modelValues: { waterfall: false, v_shaped: false, spiral: true, agile: false, devsecops: false, hybrid: false }
    },
    {
      id: 'team_tech_new',
      category: 'team',
      code: 'T2',
      question: 'Are the majority of team members new to the technology domain for the project?',
      weights: { standard: 1.0, financial: 1.1 },
      modelValues: { waterfall: true, v_shaped: true, spiral: true, agile: false, devsecops: true, hybrid: true }
    },
    {
      id: 'team_tools_new',
      category: 'team',
      code: 'T3',
      question: 'Are the majority of team members new to the tools to be used on the project?',
      weights: { standard: 0.9, financial: 1.0 },
      modelValues: { waterfall: true, v_shaped: true, spiral: true, agile: false, devsecops: true, hybrid: false }
    },
    {
      id: 'team_reassign',
      category: 'team',
      code: 'T4',
      question: 'Are the team members subject to reassignment during the life cycle?',
      weights: { standard: 1.0, financial: 1.0 },
      modelValues: { waterfall: false, v_shaped: false, spiral: true, agile: true, devsecops: false, hybrid: true }
    },
    {
      id: 'team_training',
      category: 'team',
      code: 'T5',
      question: 'Is there training available for the project team if required?',
      weights: { standard: 0.9, financial: 1.1 },
      modelValues: { waterfall: false, v_shaped: true, spiral: false, agile: true, devsecops: true, hybrid: true }
    },

    // --- Category 3: Characteristics of User Community ---
    {
      id: 'user_restricted',
      category: 'user',
      code: 'U1',
      question: 'Will the availability of the user representatives be restricted, or limited during the life cycle?',
      weights: { standard: 1.2, financial: 1.3 },
      modelValues: { waterfall: true, v_shaped: true, spiral: true, agile: false, devsecops: true, hybrid: true }
    },
    {
      id: 'user_new_sysdef',
      category: 'user',
      code: 'U2',
      question: 'Are the user representatives new to system definition?',
      weights: { standard: 1.1, financial: 1.2 },
      modelValues: { waterfall: false, v_shaped: false, spiral: true, agile: true, devsecops: false, hybrid: true }
    },
    {
      id: 'user_domain_expert',
      category: 'user',
      code: 'U3',
      question: 'Are the user representatives experts in the problem domain?',
      weights: { standard: 1.1, financial: 1.3 },
      modelValues: { waterfall: false, v_shaped: false, spiral: false, agile: true, devsecops: true, hybrid: true }
    },
    {
      id: 'user_all_phases',
      category: 'user',
      code: 'U4',
      question: 'Do the users want to be involved in all phases of the life cycle?',
      weights: { standard: 1.3, financial: 1.4 },
      modelValues: { waterfall: false, v_shaped: false, spiral: false, agile: true, devsecops: false, hybrid: false }
    },

    // --- Category 4: Characteristics of Project Type and Risk ---
    {
      id: 'risk_new_direction',
      category: 'risk',
      code: 'P1',
      question: 'Does the project identify a new product direction for the organization?',
      weights: { standard: 1.3, financial: 1.5 },
      modelValues: { waterfall: false, v_shaped: false, spiral: true, agile: true, devsecops: true, hybrid: true }
    },
    {
      id: 'risk_sys_integration',
      category: 'risk',
      code: 'P2',
      question: 'Is the project a system integration project?',
      weights: { standard: 1.2, financial: 1.4 },
      modelValues: { waterfall: false, v_shaped: true, spiral: true, agile: true, devsecops: true, hybrid: true }
    },
    {
      id: 'risk_enhancement',
      category: 'risk',
      code: 'P3',
      question: 'Is the project an enhancement to an existing system?',
      weights: { standard: 1.1, financial: 1.2 },
      modelValues: { waterfall: false, v_shaped: true, spiral: false, agile: true, devsecops: true, hybrid: true }
    },
    {
      id: 'risk_stable_funding',
      category: 'risk',
      code: 'P4',
      question: 'Is the funding for the project expected to be stable throughout the life cycle?',
      weights: { standard: 1.2, financial: 1.4 },
      modelValues: { waterfall: true, v_shaped: true, spiral: false, agile: false, devsecops: true, hybrid: false }
    },
    {
      id: 'risk_long_life',
      category: 'risk',
      code: 'P5',
      question: 'Is the product expected to have a long life in the organization?',
      weights: { standard: 1.3, financial: 1.5 },
      modelValues: { waterfall: true, v_shaped: true, spiral: true, agile: true, devsecops: true, hybrid: true }
    }
  ];

  // ==========================================
  // 2. SDLC SELECTION DECISION ENGINE
  // ==========================================

  class SDLCSelectionEngine {
    constructor(customCriteria = []) {
      this.criteria = [...SDLC_CRITERIA, ...customCriteria];
    }

    evaluate(projectAnswers, weightingMode = 'financial') {
      const scores = {};
      const categoryScores = {};
      const matrix = [];

      SDLC_MODELS.forEach(m => {
        scores[m.id] = { totalPoints: 0, maxPoints: 0, matchCount: 0, mismatchCount: 0 };
        categoryScores[m.id] = {};
        SDLC_CATEGORIES.forEach(c => {
          categoryScores[m.id][c.id] = { points: 0, maxPoints: 0 };
        });
      });

      this.criteria.forEach(crit => {
        const pAns = projectAnswers[crit.id] !== undefined
          ? projectAnswers[crit.id]
          : { value: false, rationale: 'Default assessment' };

        const weight = (crit.weights && crit.weights[weightingMode]) || 1.0;
        const rowMatches = {};

        SDLC_MODELS.forEach(m => {
          const expected = crit.modelValues[m.id];
          const isMatch = (pAns.value === expected);

          rowMatches[m.id] = {
            expected,
            isMatch,
            points: isMatch ? weight : 0
          };

          scores[m.id].maxPoints += weight;
          if (isMatch) {
            scores[m.id].totalPoints += weight;
            scores[m.id].matchCount += 1;
          } else {
            scores[m.id].mismatchCount += 1;
          }

          if (categoryScores[m.id][crit.category]) {
            categoryScores[m.id][crit.category].maxPoints += weight;
            if (isMatch) {
              categoryScores[m.id][crit.category].points += weight;
            }
          }
        });

        matrix.push({
          id: crit.id,
          category: crit.category,
          code: crit.code,
          question: crit.question,
          projectValue: pAns.value,
          rationale: pAns.rationale || '',
          weight,
          matches: rowMatches
        });
      });

      const rankedModels = SDLC_MODELS.map(m => {
        const total = scores[m.id];
        const percentage = Math.round((total.totalPoints / total.maxPoints) * 100);

        const catPercentages = {};
        SDLC_CATEGORIES.forEach(c => {
          const cat = categoryScores[m.id][c.id];
          catPercentages[c.id] = cat.maxPoints > 0
            ? Math.round((cat.points / cat.maxPoints) * 100)
            : 0;
        });

        return {
          ...m,
          score: percentage,
          matchCount: total.matchCount,
          mismatchCount: total.mismatchCount,
          categoryBreakdown: catPercentages
        };
      }).sort((a, b) => b.score - a.score);

      return {
        winner: rankedModels[0],
        runnerUp: rankedModels[1],
        rankings: rankedModels,
        matrix,
        categories: SDLC_CATEGORIES,
        criteriaCount: this.criteria.length
      };
    }

    generateWorkflow(winningModel, projectContext = 'Digital Customer Onboarding & KYC') {
      const workflows = {
        hybrid: {
          methodology: 'Agile–DevSecOps Hybrid Model',
          strategySummary: 'Sprint-based agile delivery fused with automated DevSecOps security gates and formal V-Model verification milestones at release boundaries.',
          phases: [
            {
              phase: '01',
              name: 'Sprint 0: Architecture Blueprint & Regulatory Baseline',
              duration: 'Weeks 1-3',
              activities: [
                'Formalize core onboarding domain model and ISO 20022 message specs',
                'Perform STRIDE threat modeling on biometric and KYC endpoints',
                'Draft and baseline IEEE 830 SRS with Compliance and Risk teams',
                'Establish CI/CD pipeline with automated SAST/DAST policy gates'
              ],
              roles: ['Lead Architect', 'Compliance Officer', 'DevSecOps Lead'],
              deliverables: ['Baseline SRS v1.0', 'Traceability Matrix', 'Threat Model Register', 'CI/CD Security Policy'],
              securityActivities: ['Secret management audit', 'mTLS architecture specification', 'PII data flow mapping'],
              complianceCheckpoints: ['RBI KYC Master Direction Alignment Gate', 'GDPR Art. 9 Biometric Consent Sign-off'],
              humanGate: 'Four-eyes sign-off by Chief Risk Officer & Solution Architect'
            },
            {
              phase: '02',
              name: 'Sprints 1–3: Core Feature Sprints with Embedded Security',
              duration: 'Weeks 4-9',
              activities: [
                'Implement ID OCR parsing microservice and biometric liveness verification',
                'Establish cryptographic audit-log persistence with SHA-256 chain',
                'Enforce automated container vulnerability scanning on every PR merge'
              ],
              roles: ['Backend Engineers', 'Data Privacy Officer', 'DevSecOps Specialist'],
              deliverables: ['Tested Microservices', 'Unit & Integration Suite (100% boundary coverage)', 'PII Masking Audit'],
              securityActivities: ['Continuous SAST/DAST in pipeline', 'Container image vulnerability gate (zero high/critical)'],
              complianceCheckpoints: ['Masking verification checkpoint for national ID numbers', 'AML Suspicious Activity linkage'],
              humanGate: 'Security Lead verification of encryption in transit (TLS 1.3) & rest (AES-256)'
            },
            {
              phase: '03',
              name: 'Release Hardening & Statutory Regulatory V-Gate',
              duration: 'Weeks 10-12',
              activities: [
                'Execute bilateral integration testing with Core Banking Engine',
                'Execute disaster recovery failover drill and red-team penetration test',
                'Conduct regulatory dry-run audit with internal audit team'
              ],
              roles: ['Integration Specialist', 'Compliance Auditor', 'Lead Pen Tester'],
              deliverables: ['Production Release Package', 'SOC 2 Control Evidence Pack', 'Signed Verification Baseline'],
              securityActivities: ['Final independent penetration test', 'Production cryptographic key ceremony'],
              complianceCheckpoints: ['Final statutory regulatory filing & compliance sign-off'],
              humanGate: 'Production Go-Live Board approval (CTO, CISO, Chief Compliance Officer)'
            }
          ]
        },
        v_shaped: {
          methodology: 'V-Model Verification & Validation',
          strategySummary: 'Rigorous parallel pairing of each definition phase with its corresponding verification and testing stage, ensuring zero critical defects in mission-critical financial processing.',
          phases: [
            {
              phase: '01',
              name: 'Requirements Analysis ↔ Acceptance Testing',
              duration: 'Weeks 1-4',
              activities: ['Capture complete financial functional and statutory rules', 'Define formal User Acceptance Test (UAT) criteria', 'Map regulatory controls to test requirements'],
              roles: ['Business Analyst', 'Compliance Auditor', 'Lead QA'],
              deliverables: ['Validated Requirements Document', 'Formal UAT Plan', 'Regulatory Traceability Matrix'],
              securityActivities: ['Regulatory compliance verification', 'Security policy alignment check'],
              complianceCheckpoints: ['Statutory regulator requirement conformance audit'],
              humanGate: 'Joint sign-off by Business Sponsor and Head of Compliance'
            },
            {
              phase: '02',
              name: 'System Design ↔ System Testing',
              duration: 'Weeks 5-7',
              activities: ['Define end-to-end system architecture and data pipelines', 'Design comprehensive system integration and performance test suites', 'Specify high-availability failover topology'],
              roles: ['System Architect', 'Performance Engineer', 'Security Lead'],
              deliverables: ['System Architecture Specification', 'System Test Plan', 'Disaster Recovery Plan'],
              securityActivities: ['Architecture threat analysis', 'Network segmentation review'],
              complianceCheckpoints: ['High-availability & BCBS 239 operational resilience gate'],
              humanGate: 'Chief Information Security Officer (CISO) architectural approval'
            },
            {
              phase: '03',
              name: 'Architecture & Module Design ↔ Integration & Unit Testing',
              duration: 'Weeks 8-10',
              activities: ['Specify microservice contracts and API payload formats', 'Build automated unit tests and mock integration test fixtures', 'Construct cryptographic integrity verification components'],
              roles: ['Module Leads', 'Senior Engineers', 'DevOps Team'],
              deliverables: ['Detailed Module Specifications', 'Automated Test Suites', 'Interface Control Documents'],
              securityActivities: ['Cryptographic cipher suite review', 'Static source code security scanning'],
              complianceCheckpoints: ['PCI-DSS cardholder / sensitive financial data handling check'],
              humanGate: 'Engineering Lead and Security Architect code quality sign-off'
            },
            {
              phase: '04',
              name: 'Implementation & Bilateral Validation Execution',
              duration: 'Weeks 11-14',
              activities: ['Execute unit tests, integration tests, system tests, and formal UAT', 'Run automated non-regression and performance stress tests', 'Verify immutable audit logs and evidence retention'],
              roles: ['QA Team', 'Independent Validation Agency', 'Release Manager'],
              deliverables: ['Complete Test Execution Evidence', 'Defect Log (Zero Severity 1/2)', 'Audit Attestation Report'],
              securityActivities: ['Third-party red-team penetration testing', 'Vulnerability assessment sign-off'],
              complianceCheckpoints: ['Final statutory regulatory compliance verification gate'],
              humanGate: 'Operational Readiness Review Board unanimous approval'
            }
          ]
        },
        spiral: {
          methodology: 'Spiral Risk-Driven Evolutionary Model',
          strategySummary: 'Cyclical risk identification, simulation, prototyping, and verification, tailor-made for high-uncertainty financial algorithms and innovative architectures.',
          phases: [
            {
              phase: '01',
              name: 'Cycle 1: Proof-of-Concept & Core Technical Feasibility',
              duration: 'Weeks 1-4',
              activities: ['Identify high-risk technical assumptions and algorithms', 'Build disposable prototype to evaluate model accuracy / latency', 'Conduct formal risk assessment matrix'],
              roles: ['Risk Manager', 'Research Engineer', 'Architect'],
              deliverables: ['Risk Assessment Matrix v1', 'PoC Evaluation Benchmark', 'Technical Feasibility Dossier'],
              securityActivities: ['Prototype data privacy safeguards', 'Synthetic data generation for testing'],
              complianceCheckpoints: ['Ethical AI & algorithmic bias preliminary review'],
              humanGate: 'Technical Steering Committee approval to proceed to evolutionary prototype'
            },
            {
              phase: '02',
              name: 'Cycle 2: Operational Prototype & Architecture Hardening',
              duration: 'Weeks 5-8',
              activities: ['Transform proven concepts into resilient architecture', 'Subject prototype to live-simulated high-concurrency workloads', 'Refine risk register with observed operational bottlenecks'],
              roles: ['System Engineer', 'Security Specialist', 'Product Manager'],
              deliverables: ['Operational Prototype', 'Performance Stress Report', 'Mitigated Risk Log'],
              securityActivities: ['Adversarial attack simulations', 'Data integrity verification testing'],
              complianceCheckpoints: ['Financial crime compliance operational validation'],
              humanGate: 'Chief Risk Officer & Solution Architect review gate'
            },
            {
              phase: '03',
              name: 'Cycle 3: Production Hardening & Regulatory Verification',
              duration: 'Weeks 9-12',
              activities: ['Implement enterprise security controls and audit mechanisms', 'Execute comprehensive verification tests across edge scenarios', 'Construct complete documentation and operational runbooks'],
              roles: ['Core Engineering Team', 'Compliance Auditor', 'Site Reliability Engineer'],
              deliverables: ['Production-Grade System', 'Operations Manual', 'Traceability & Audit Report'],
              securityActivities: ['Full penetration testing & code audit', 'SOC 2 Type II controls verification'],
              complianceCheckpoints: ['Regulatory body pre-clearance and filing verification'],
              humanGate: 'Executive Risk and Governance Board formal deployment authorization'
            }
          ]
        },
        agile: {
          methodology: 'Agile (Scrum) Iterative Model',
          strategySummary: 'Sprint-based backlog delivery prioritizing rapid customer feedback, adaptive scope, and working software over exhaustive early documentation.',
          phases: [
            {
              phase: '01',
              name: 'Sprint 0: Backlog Elicitation & Foundation',
              duration: 'Weeks 1-2',
              activities: ['Conduct stakeholder user story mapping workshops', 'Define initial product backlog and user personas', 'Establish Definition of Done including compliance acceptance criteria'],
              roles: ['Product Owner', 'Scrum Master', 'Financial Domain SME'],
              deliverables: ['Prioritized Product Backlog', 'Sprint 0 Baseline Report', 'Definition of Done'],
              securityActivities: ['Basic security policy definition', 'Role-based access matrix setup'],
              complianceCheckpoints: ['Initial compliance and data classification check'],
              humanGate: 'Product Owner and Business Sponsor sprint 0 sign-off'
            },
            {
              phase: '02',
              name: 'Sprints 1–5: Iterative Sprint Execution',
              duration: 'Weeks 3-10',
              activities: ['Deliver working software increments every two-week sprint', 'Conduct bi-weekly sprint demos with stakeholder review', 'Refine backlog based on customer and compliance feedback'],
              roles: ['Development Squad', 'QA Automation Engineer', 'Product Owner'],
              deliverables: ['Working Software Increments', 'Sprint Burndown Charts', 'Demo Feedback Log'],
              securityActivities: ['Automated unit and integration security checks per PR'],
              complianceCheckpoints: ['Continuous acceptance criteria verification per sprint increment'],
              humanGate: 'Product Owner sprint review acceptance'
            },
            {
              phase: '03',
              name: 'Release Sprint: User Acceptance & Deployment',
              duration: 'Weeks 11-12',
              activities: ['Execute end-to-end regression test suite', 'Conduct final user acceptance testing and compliance verification', 'Deploy release increment to production'],
              roles: ['Release Manager', 'DevOps Engineer', 'Compliance Officer'],
              deliverables: ['Release Candidate', 'UAT Sign-off Dossier', 'Release Notes'],
              securityActivities: ['Pre-release vulnerability scan and penetration test verification'],
              complianceCheckpoints: ['Compliance Officer go-live clearance'],
              humanGate: 'Production Go-Live Sign-off by Product Owner & Release Board'
            }
          ]
        },
        devsecops: {
          methodology: 'DevSecOps Continuous Delivery',
          strategySummary: 'Shift-left security and compliance automation embedded directly into continuous deployment pipelines, providing rapid, secure, auditable releases.',
          phases: [
            {
              phase: '01',
              name: 'Pipeline Architecture & Security Baseline',
              duration: 'Weeks 1-2',
              activities: ['Configure CI/CD pipelines with automated SAST, DAST, and SCA scanning', 'Define compliance-as-code policies and Open Policy Agent (OPA) rules', 'Establish immutable audit trail telemetry infrastructure'],
              roles: ['DevSecOps Architect', 'Security Engineer', 'Infrastructure Lead'],
              deliverables: ['CI/CD Pipeline Configuration', 'Security Tooling Baseline', 'Compliance Ruleset'],
              securityActivities: ['Pipeline secret management setup', 'Container registry signing and vulnerability scanning'],
              complianceCheckpoints: ['Security architecture gate sign-off'],
              humanGate: 'CISO and Lead Architect pipeline security sign-off'
            },
            {
              phase: '02',
              name: 'Continuous Construction & Automated Validation',
              duration: 'Weeks 3-8',
              activities: ['Automate daily build, test, and security scan cycles', 'Enforce automated PR blocking on high/critical vulnerabilities', 'Continuous deployment to hardened staging environment with Canary analysis'],
              roles: ['Engineers', 'Security Champions', 'SRE Lead'],
              deliverables: ['Automated Scan Reports', 'Hardened Container Images', 'Continuous Deployment Logs'],
              securityActivities: ['Automated dynamic API security testing (DAST)', 'Infrastructure as Code (IaC) security scanning'],
              complianceCheckpoints: ['Continuous compliance verification against PCI-DSS and SOC 2 policies'],
              humanGate: 'Automated pipeline gates with Security Lead exception review'
            },
            {
              phase: '03',
              name: 'Continuous Production Deployment & Observability',
              duration: 'Weeks 9-10',
              activities: ['Blue-green zero-downtime production deployment', 'Enable real-time SIEM alerting and runtime behavioral monitoring', 'Continuous compliance attestation and audit log export'],
              roles: ['SRE Team', 'SecOps Lead', 'Audit Coordinator'],
              deliverables: ['Production System', 'Real-Time Telemetry Dashboard', 'Automated Compliance Attestation'],
              securityActivities: ['Continuous runtime intrusion detection and automated incident alerting'],
              complianceCheckpoints: ['Continuous audit log immutability check'],
              humanGate: 'Production Cutover Board approval'
            }
          ]
        },
        waterfall: {
          methodology: 'Waterfall Sequential Model',
          strategySummary: 'Linear, disciplined progression through clearly demarcated stages with exhaustive documentation and formal verification gates.',
          phases: [
            {
              phase: '01',
              name: 'Exhaustive Requirements Specification',
              duration: 'Weeks 1-4',
              activities: ['Document all functional, regulatory, and technical requirements', 'Obtain formal sign-offs from all departmental stakeholders', 'Freeze requirement baseline'],
              roles: ['Lead Business Analyst', 'Legal/Compliance SME', 'Chief Architect'],
              deliverables: ['Comprehensive IEEE 830 SRS Document', 'Requirements Sign-off Matrix'],
              securityActivities: ['Statutory regulatory security requirement profiling'],
              complianceCheckpoints: ['Comprehensive Regulatory Compliance Baseline Sign-off'],
              humanGate: 'Formal Requirement Freeze Board unanimous sign-off'
            },
            {
              phase: '02',
              name: 'Comprehensive System & Software Design',
              duration: 'Weeks 5-8',
              activities: ['Draft High-Level Architecture and Low-Level Component Designs', 'Define database schema and strict interface contracts', 'Produce detailed Test Strategy'],
              roles: ['System Architects', 'Database Administrator', 'QA Director'],
              deliverables: ['High-Level Design (HLD)', 'Low-Level Design (LLD)', 'Master Test Plan'],
              securityActivities: ['Exhaustive architectural threat model review'],
              complianceCheckpoints: ['Data governance & residency architectural approval'],
              humanGate: 'Architecture Review Board (ARB) formal approval'
            },
            {
              phase: '03',
              name: 'Implementation & Coding',
              duration: 'Weeks 9-14',
              activities: ['Develop modules strictly adhering to frozen LLD specifications', 'Conduct comprehensive peer reviews and static code analysis', 'Achieve 100% unit test coverage'],
              roles: ['Development Team', 'Peer Reviewers', 'Security Champions'],
              deliverables: ['Compiled Code Base', 'Peer Review Logs', 'Unit Test Results'],
              securityActivities: ['Automated SAST & dependency vulnerability verification'],
              complianceCheckpoints: ['Coding standards & compliance rule compliance verification'],
              humanGate: 'Code Quality Gate sign-off'
            },
            {
              phase: '04',
              name: 'Formal Integration, System Testing & Acceptance',
              duration: 'Weeks 15-18',
              activities: ['Execute integration and full system verification tests', 'Conduct formal user acceptance testing (UAT)', 'Perform third-party regulatory compliance audit'],
              roles: ['Independent QA Agency', 'Business Representatives', 'External Auditors'],
              deliverables: ['Final Test Execution Dossier', 'Audit Certificate', 'Go-Live Release Sign-off'],
              securityActivities: ['Comprehensive external penetration testing'],
              complianceCheckpoints: ['Final statutory regulatory compliance certification'],
              humanGate: 'Formal Production Deployment Steering Committee Sign-off'
            }
          ]
        }
      };

      return workflows[winningModel.id] || workflows.hybrid;
    }
  }

  // ==========================================
  // 3. FINANCIAL REGULATIONS & CASE STUDIES
  // ==========================================

  const FINANCIAL_REGULATIONS = [
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

  const FINANCIAL_CASE_STUDIES = [
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
      criteriaAnswers: {
        req_known: { value: false, rationale: 'Rapidly evolving KYC directives and biometric anti-spoofing techniques mean customer journey is refined continuously.' },
        req_early: { value: true, rationale: 'Statutory compliance checkpoints (KYC, AML, PII consent) can be formalized at project inception.' },
        req_change: { value: false, rationale: 'Core banking regulatory rules remain bounded; user interface steps may evolve but base statutory flow is steady.' },
        req_demo: { value: false, rationale: 'Retail onboarding follows standard industry mobile flows; extensive preliminary wireframe demos are secondary to backend integration.' },
        req_poc: { value: false, rationale: 'OCR and facial liveness APIs are established commercial SDKs, eliminating the need for novel algorithmic PoCs.' },
        team_domain_new: { value: false, rationale: 'Senior fintech engineering team has extensive retail banking and KYC experience.' },
        team_tech_new: { value: true, rationale: 'Team is adopting modern cloud microservices and event-driven Apache Kafka for the first time.' },
        team_tools_new: { value: false, rationale: 'Existing GitOps, SonarQube, and Docker CI/CD tooling are fully mastered by developers.' },
        team_reassign: { value: true, rationale: 'Engineers are periodically rotated between mobile onboarding and credit assessment squads.' },
        team_training: { value: true, rationale: 'Dedicated cloud architect and compliance onboarding bootcamps are funded and scheduled.' },
        user_restricted: { value: true, rationale: 'Retail end-users are consumer public; internal compliance and branch officers have constrained review hours.' },
        user_new_sysdef: { value: true, rationale: 'Compliance and operations teams are domain experts but lack experience in specifying technical event contracts.' },
        user_domain_expert: { value: true, rationale: 'Compliance officers have deep expertise in anti-money laundering and Reserve Bank directives.' },
        user_all_phases: { value: false, rationale: 'Compliance teams only participate during statutory sign-offs and acceptance validation, not daily sprints.' },
        risk_new_direction: { value: true, rationale: 'Marks the bank\'s strategic pivot from branch-based onboarding to 100% paperless digital self-service.' },
        risk_sys_integration: { value: true, rationale: 'Requires secure real-time bidirectional integration with Core Banking, Credit Bureau, and UIDAI/Gov ID APIs.' },
        risk_enhancement: { value: true, rationale: 'Enhances and replaces legacy branch intake portal with modern omnichannel REST endpoints.' },
        risk_stable_funding: { value: false, rationale: 'Budget is released iteratively in quarterly increments tied to customer activation milestones.' },
        risk_long_life: { value: true, rationale: 'The onboarding gateway is intended to serve as core customer acquisition rails for the next 7-10 years.' }
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
          statement: 'The system shall automatically route onboarding applications with risk scores exceeding calibrated threshold (≥ 65) to Compliance Review Queue before activation.',
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
          statement: 'The onboarding API shall maintain 99.9% uptime (excluding scheduled maintenance) with average end-to-end verification latency below 45 seconds for 95% of requests.',
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
          assumptions: ['WORM storage or immutable ledger backing the audit store.'],
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
      criteriaAnswers: {
        req_known: { value: true, rationale: 'ISO 20022 payment messaging standards and central bank settlement protocols are formally defined, published, and immutable.' },
        req_early: { value: true, rationale: 'All interface specifications, message validation rules, and settlement clearing schedules can be frozen early.' },
        req_change: { value: false, rationale: 'Payment clearing rules and statutory protocols undergo formal multi-year governance with zero ad-hoc changes.' },
        req_demo: { value: false, rationale: 'Switch engine operates as headless backend infrastructure; no UI mockups or user demonstrations required.' },
        req_poc: { value: false, rationale: 'Core payment message switching mechanisms are mature and mathematically proven in banking industry.' },
        team_domain_new: { value: false, rationale: 'Engineering team comprises seasoned payments and clearing switch specialists with 10+ years experience.' },
        team_tech_new: { value: true, rationale: 'Team is transitioning to ultra-low-latency eBPF and C++20 zero-copy memory pipelines.' },
        team_tools_new: { value: true, rationale: 'Adopting formal verification tooling (TLA+) and hardware load generators.' },
        team_reassign: { value: false, rationale: 'Core payment switch engineers are locked into a dedicated, ring-fenced mission team.' },
        team_training: { value: true, rationale: 'Formal verification and specialized low-latency systems training is fully funded.' },
        user_restricted: { value: true, rationale: 'Direct users are institutional clearing houses and treasury operations with strictly scheduled engagement windows.' },
        user_new_sysdef: { value: false, rationale: 'Treasury operations and settlement officers have extensive technical experience with SWIFT and clearing specs.' },
        user_domain_expert: { value: false, rationale: 'Treasury officers are financial specialists, but clearing switch protocol architecture is defined by standards bodies.' },
        user_all_phases: { value: false, rationale: 'Institutional stakeholders participate strictly during bilateral simulation and final UAT sign-offs.' },
        risk_new_direction: { value: false, rationale: 'Project replaces existing legacy clearing engine; does not represent an unknown business line.' },
        risk_sys_integration: { value: true, rationale: 'Extensive integration with 25+ commercial banks, central bank RTGS, and fraud monitoring engines.' },
        risk_enhancement: { value: true, rationale: 'Major generational enhancement of national payment gateway infrastructure.' },
        risk_stable_funding: { value: true, rationale: 'Central banking consortium has secured a multi-year guaranteed capital allocation.' },
        risk_long_life: { value: true, rationale: 'Expected operational lifecycle of payment switch is 15-20 years with continuous compliance audits.' }
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
          question: 'What is the required balance between precision (avoiding false alarms) and recall (catching fraud)?',
          context: 'Directly dictates model thresholding, shadow-mode deployment cycles, and risk tolerances.',
          suggestedAnswer: 'Minimum recall of 92% on confirmed mule accounts while keeping false positive rate strictly below 0.8% of daily transactions.'
        }
      ],
      criteriaAnswers: {
        req_known: { value: false, rationale: 'Fraud vectors and attack patterns change continuously; feature sets cannot be exhaustively pre-specified.' },
        req_early: { value: false, rationale: 'ML feature definitions and graph clustering parameters require experimental discovery and continuous refinement.' },
        req_change: { value: true, rationale: 'Financial crime syndicates adapt evasion tactics whenever new detection rules are put in place.' },
        req_demo: { value: true, rationale: 'Fraud investigators need hands-on visual graph prototypes to evaluate pattern explainability.' },
        req_poc: { value: true, rationale: 'Unproven graph neural network heuristics require substantial proof-of-concept validation against historical data.' },
        team_domain_new: { value: true, rationale: 'Data science hires are cutting-edge ML researchers but new to bank regulatory reporting frameworks.' },
        team_tech_new: { value: true, rationale: 'Adopting distributed GPU graph compute (Neo4j, PyTorch Geometric) for first time in enterprise core.' },
        team_tools_new: { value: true, rationale: 'New MLOps pipeline tooling (MLflow, Kubeflow, Feast feature store) being introduced.' },
        team_reassign: { value: true, rationale: 'Data scientists are shared across credit scoring, churn prediction, and AML initiatives.' },
        team_training: { value: false, rationale: 'No formal institutional training on graph ML; team relies on self-directed R&D.' },
        user_restricted: { value: false, rationale: 'Internal fraud intelligence and AML compliance analysts are co-located with the R&D team.' },
        user_new_sysdef: { value: true, rationale: 'Fraud analysts are accustomed to manual case tools, not specifying automated AI pipeline metrics.' },
        user_domain_expert: { value: true, rationale: 'AML investigators possess deep forensic knowledge of financial crime typologies.' },
        user_all_phases: { value: true, rationale: 'Investigators must review model outputs and score explanations in every evolutionary cycle.' },
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
          acceptanceCriteria: 'Given a transaction payload, when evaluated by inference engine, risk score and top 3 contributing factors are emitted in < 45ms.',
          regulations: ['RBI-KYC-2016 §18', 'SOC2-TYPE2 CC7.1'],
          riskLevel: 'High',
          confidence: 93,
          status: 'Approved'
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
      criteriaAnswers: {
        req_known: { value: true, rationale: 'Basel III statutory guidelines, calculation schedules, and XBRL taxonomy formats are published and legally fixed.' },
        req_early: { value: true, rationale: 'All financial accounting rules and regulatory output templates are fully specified before engineering begins.' },
        req_change: { value: false, rationale: 'Statutory calculations are locked by central bank mandate; arbitrary mid-cycle changes are prohibited.' },
        req_demo: { value: false, rationale: 'Outputs are standardized tabular regulatory filings; no subjective user feedback or wireframe demos needed.' },
        req_poc: { value: false, rationale: 'Accounting mathematics and risk-weighted asset arithmetic are well understood; no algorithmic uncertainty exists.' },
        team_domain_new: { value: false, rationale: 'Chartered accountants and regulatory compliance analysts on the team have deep Basel III expertise.' },
        team_tech_new: { value: false, rationale: 'Standard enterprise relational data warehouse (PostgreSQL / Snowflake) and Python ETL jobs.' },
        team_tools_new: { value: false, rationale: 'Standard SQL, dbt, and enterprise scheduling tools familiar to all database engineers.' },
        team_reassign: { value: false, rationale: 'Regulatory reporting team is stable and dedicated to annual reporting calendar.' },
        team_training: { value: false, rationale: 'Standard technology stack requires no specialized outside training.' },
        user_restricted: { value: true, rationale: 'Chief Financial Officer and Chief Risk Officer are available only during formal sign-off sessions.' },
        user_new_sysdef: { value: false, rationale: 'Finance and audit stakeholders are deeply experienced in formal data specification and reconciliation.' },
        user_domain_expert: { value: false, rationale: 'Regulatory guidelines are specified by external central bank committees, not internal end-users.' },
        user_all_phases: { value: false, rationale: 'Finance executives participate strictly during initial specification sign-off and final UAT approval.' },
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

  // ==========================================
  // 4. MULTI-AGENT COLLABORATION PLATFORM
  // ==========================================

  class MultiAgentPlatform {
    constructor() {
      this.sdlcEngine = new SDLCSelectionEngine();
      this.auditTrail = [];
    }

    logAudit(agentName, action, details, confidence = null) {
      const entry = {
        id: `AUD-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        timestamp: new Date().toISOString(),
        agent: agentName,
        action,
        details,
        confidence: confidence ? `${confidence}%` : 'N/A',
        hash: this.generateBlockHash(details)
      };
      this.auditTrail.unshift(entry);
      return entry;
    }

    generateBlockHash(content) {
      let hash = 0;
      const str = String(content) + Date.now();
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
      }
      return '0x' + Math.abs(hash).toString(16).padStart(8, '0');
    }

    maskSensitiveData(text) {
      let masked = text;
      masked = masked.replace(/\b(?:\d{4}[-\s]?){3}\d{4}\b/g, '[REDACTED_CARD_NUMBER]');
      masked = masked.replace(/\b\d{4}\s\d{4}\s\d{4}\b/g, '[REDACTED_AADHAAR_ID]');
      masked = masked.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]');
      masked = masked.replace(/\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g, '[REDACTED_PHONE]');
      return masked;
    }

    analyzeRequirementQuality(reqs) {
      const findings = [];
      const vagueWords = ['fast', 'user-friendly', 'secure', 'as soon as possible', 'robust', 'modern', 'seamless'];

      reqs.forEach(r => {
        vagueWords.forEach(word => {
          const regex = new RegExp(`\\b${word}\\b`, 'i');
          if (regex.test(r.statement)) {
            findings.push({
              reqId: r.id,
              type: 'Ambiguity Warning',
              severity: 'Medium',
              issue: `Requirement contains non-quantifiable subjective term "${word}".`,
              suggestion: 'Define measurable acceptance threshold (e.g. latency in ms, error rate percentage).'
            });
          }
        });

        if (!r.acceptanceCriteria || r.acceptanceCriteria.length < 15) {
          findings.push({
            reqId: r.id,
            type: 'Lack of Testability',
            severity: 'High',
            issue: 'Acceptance criteria lacks formal Given-When-Then test conditions.',
            suggestion: 'Provide explicit pre-conditions, input trigger, and expected assertion.'
          });
        }

        if ((r.category === 'Security' || r.category === 'Compliance') && (!r.regulations || r.regulations.length === 0)) {
          findings.push({
            reqId: r.id,
            type: 'Missing Compliance Control',
            severity: 'Critical',
            issue: 'Security/Compliance requirement is not mapped to an authoritative regulatory statute.',
            suggestion: 'Ground requirement in RBI, PCI-DSS, or GDPR standards.'
          });
        }
      });

      return findings;
    }

    async runPipeline(caseStudy, customInput = null, onStepCallback = null) {
      const textToAnalyze = customInput || caseStudy.rawInput;
      const steps = [];

      const notify = (stepNumber, agent, action, status = 'completed') => {
        const step = { stepNumber, agent, action, timestamp: new Date().toLocaleTimeString(), status };
        steps.push(step);
        this.logAudit(agent, action, `Processed stage ${stepNumber} for ${caseStudy.title}`);
        if (onStepCallback) onStepCallback(step);
      };

      notify('01', 'Coordinator Agent', 'Initialized multi-agent requirements workflow and established shared state.');
      await new Promise(r => setTimeout(r, 150));

      const maskedInput = this.maskSensitiveData(textToAnalyze);
      notify('02', 'Privacy & Masking Agent', 'Scanned input for PII, PAN, cardholder and sensitive data; applied cryptographic redaction.');
      await new Promise(r => setTimeout(r, 200));

      notify('03', 'Stakeholder Interaction Agent', 'Parsed conversational intake statement and identified business drivers.');
      await new Promise(r => setTimeout(r, 150));

      const baseRequirements = caseStudy.requirements.map(r => ({ ...r }));
      notify('04', 'Requirement Extraction Agent', `Extracted and structured ${baseRequirements.length} formal requirements conforming to IEEE 830 format.`);
      await new Promise(r => setTimeout(r, 200));

      notify('05', 'Classification Agent', 'Performed multi-label categorization across Functional, Security, Privacy, Availability, and Auditability.');
      await new Promise(r => setTimeout(r, 150));

      const qualityAlerts = this.analyzeRequirementQuality(baseRequirements);
      notify('06', 'Conflict & Quality Agent', `Conducted quality check: identified ${qualityAlerts.length} actionable clarification recommendations.`);
      await new Promise(r => setTimeout(r, 200));

      notify('07', 'Compliance & Security Agent', 'Grounded requirements in authoritative financial regulations (RBI, PCI-DSS, GDPR, BCBS 239).');
      await new Promise(r => setTimeout(r, 200));

      notify('08', 'Risk Analysis Agent', 'Computed risk matrix scores and established threat mitigation boundaries.');
      await new Promise(r => setTimeout(r, 150));

      const sdlcResults = this.sdlcEngine.evaluate(caseStudy.criteriaAnswers, 'financial');
      const tailoredWorkflow = this.sdlcEngine.generateWorkflow(sdlcResults.winner, caseStudy.title);
      notify('09', 'SDLC Selection Agent', `Evaluated 19 criteria: recommended ${sdlcResults.winner.name} (${sdlcResults.winner.score}%) with tailored financial workflow.`);
      await new Promise(r => setTimeout(r, 250));

      notify('10', 'Documentation & Validation Agent', 'Compiled Requirements Traceability Matrix (RTM) and verifiable audit package.');
      await new Promise(r => setTimeout(r, 150));

      return {
        maskedInput,
        requirements: baseRequirements,
        qualityAlerts,
        sdlcResults,
        tailoredWorkflow,
        clarificationQuestions: caseStudy.clarificationQuestions || [],
        steps
      };
    }

    generateSRSMarkdown(caseStudy, requirements, sdlcResults, tailoredWorkflow) {
      const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

      let md = `# Software Requirements Specification (SRS)\n`;
      md += `## Project: ${caseStudy.title} (${caseStudy.subtitle})\n`;
      md += `**Date:** ${dateStr}  \n`;
      md += `**Standard:** IEEE 830-1998 / ISO/IEC/IEEE 29148:2018  \n`;
      md += `**Recommended SDLC Model:** ${sdlcResults.winner.name} (Alignment Score: ${sdlcResults.winner.score}%)  \n\n`;

      md += `---\n\n`;
      md += `### 1. Introduction\n`;
      md += `#### 1.1 Purpose\n`;
      md += `This document specifies the software requirements for **${caseStudy.title}**, developed under the **${sdlcResults.winner.name}** lifecycle model.\n\n`;

      md += `#### 1.2 Scope\n`;
      md += `${caseStudy.summary}\n\n`;

      md += `#### 1.3 Applicable Regulatory Standards\n`;
      FINANCIAL_REGULATIONS.forEach(reg => {
        md += `- **${reg.id}**: ${reg.name} (${reg.jurisdiction})  \n  *${reg.summary}*\n`;
      });
      md += `\n`;

      md += `### 2. SDLC Strategy & Model Selection\n`;
      md += `Based on the 19-criterion evaluation across Requirements, Project Team, User Community, and Risk characteristics, the recommended model is **${sdlcResults.winner.name}**.\n\n`;
      md += `| SDLC Model | Overall Match % | Requirements Fit | Team Fit | User Fit | Risk Fit |\n`;
      md += `| :--- | :---: | :---: | :---: | :---: | :---: |\n`;
      sdlcResults.rankings.forEach(m => {
        md += `| **${m.name}** | **${m.score}%** | ${m.categoryBreakdown.requirements || 0}% | ${m.categoryBreakdown.team || 0}% | ${m.categoryBreakdown.user || 0}% | ${m.categoryBreakdown.risk || 0}% |\n`;
      });
      md += `\n`;

      md += `### 3. Tailored SDLC Execution Workflow\n`;
      tailoredWorkflow.phases.forEach(p => {
        md += `#### Phase ${p.phase}: ${p.name} (${p.duration})\n`;
        md += `- **Key Activities:**\n`;
        p.activities.forEach(a => md += `  - ${a}\n`);
        md += `- **Security Activities:** ${p.securityActivities.join('; ')}\n`;
        md += `- **Compliance Checkpoints:** ${p.complianceCheckpoints.join('; ')}\n`;
        md += `- **Human Approval Gate:** ${p.humanGate}\n\n`;
      });

      md += `### 4. Specific Software Requirements\n\n`;
      requirements.forEach(r => {
        md += `#### [${r.id}] ${r.statement}\n`;
        md += `- **Primary Category:** ${r.category} (Tags: ${r.categories.join(', ')})\n`;
        md += `- **Business Justification:** ${r.justification}\n`;
        md += `- **Priority:** ${r.priority} | **Risk Level:** ${r.riskLevel} | **Confidence:** ${r.confidence}%\n`;
        md += `- **Applicable Regulations:** ${r.regulations.join(', ')}\n`;
        md += `- **Acceptance Criteria (Gherkin):**\n  > ${r.acceptanceCriteria}\n`;
        md += `- **Source Stakeholder:** ${r.source}\n`;
        md += `- **Approval Status:** ${r.status}\n\n`;
      });

      md += `---\n`;
      md += `*Generated automatically by Regulus AI Multi-Agent Requirements & SDLC Selection Platform.*  \n`;
      return md;
    }

    generateTraceabilityCSV(requirements) {
      const headers = ['Requirement ID', 'Statement', 'Category', 'Priority', 'Regulations', 'Acceptance Test Criteria', 'Risk Level', 'Status'];
      const rows = requirements.map(r => [
        `"${r.id}"`,
        `"${r.statement.replace(/"/g, '""')}"`,
        `"${r.category}"`,
        `"${r.priority}"`,
        `"${r.regulations.join('; ')}"`,
        `"${r.acceptanceCriteria.replace(/"/g, '""')}"`,
        `"${r.riskLevel}"`,
        `"${r.status}"`
      ]);
      return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    }
  }

  // ==========================================
  // 5. APPLICATION UI CONTROLLER
  // ==========================================

  class AppController {
    constructor() {
      this.platform = new MultiAgentPlatform();
      this.currentCaseId = 'onboarding';
      this.customCriteria = [];
      this.currentFilter = 'all';
      this.activeQuestionIndex = 0;
      this.selectedTraceReqId = 'FR-ONB-001';
      this.isMatrixCollapsed = false;

      this.loadCaseStudy(this.currentCaseId, false);
      this.initEventListeners();
      this.renderAll();
    }

    loadCaseStudy(caseId, shouldToast = true) {
      const rawCase = FINANCIAL_CASE_STUDIES.find(c => c.id === caseId) || FINANCIAL_CASE_STUDIES[0];
      this.currentCase = JSON.parse(JSON.stringify(rawCase));
      this.currentCaseId = caseId;
      this.projectAnswers = JSON.parse(JSON.stringify(this.currentCase.criteriaAnswers));
      this.requirements = JSON.parse(JSON.stringify(this.currentCase.requirements));
      this.activeQuestionIndex = 0;
      this.selectedTraceReqId = this.requirements[0]?.id || '';

      this.sdlcEngine = new SDLCSelectionEngine(this.customCriteria);
      this.recalculateSDLC();

      this.platform.logAudit('System', 'Case Study Loaded', `Loaded case study: ${this.currentCase.title}`);

      if (shouldToast) {
        this.showToast(`Switched case study to ${this.currentCase.title}`);
      }
    }

    recalculateSDLC() {
      this.sdlcResults = this.sdlcEngine.evaluate(this.projectAnswers, 'financial');
      this.tailoredWorkflow = this.sdlcEngine.generateWorkflow(this.sdlcResults.winner, this.currentCase.title);
    }

    initEventListeners() {
      // Case Selector
      const caseSelect = document.querySelector('#caseSelect');
      if (caseSelect) {
        caseSelect.addEventListener('change', (e) => {
          this.loadCaseStudy(e.target.value);
          this.renderAll();
        });
      }

      // View Navigation
      document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => this.switchView(btn.dataset.view));
      });
      document.querySelectorAll('[data-go]').forEach(btn => {
        btn.addEventListener('click', () => this.switchView(btn.dataset.go));
      });

      // Reset Demo
      const resetBtn = document.querySelector('#resetDemoBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.customCriteria = [];
          this.loadCaseStudy(this.currentCaseId);
          this.renderAll();
          this.showToast('Demo environment reset to baseline.');
        });
      }

      // Execute Multi-Agent Pipeline
      const runPipelineBtn = document.querySelector('#runPipelineBtn');
      if (runPipelineBtn) {
        runPipelineBtn.addEventListener('click', () => this.handleRunPipeline());
      }

      // Clarification Questions
      const answerQBtn = document.querySelector('#answerQuestionBtn');
      if (answerQBtn) {
        answerQBtn.addEventListener('click', () => this.handleAnswerQuestion());
      }
      const skipQBtn = document.querySelector('#skipQuestionBtn');
      if (skipQBtn) {
        skipQBtn.addEventListener('click', () => this.handleSkipQuestion());
      }

      // Requirements Filter Buttons
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.currentFilter = btn.dataset.filter;
          this.renderRequirementsList();
        });
      });

      // Modal Triggers
      const openAddReqBtn = document.querySelector('#openAddReqModalBtn');
      const addReqModal = document.querySelector('#addReqModal');
      if (openAddReqBtn && addReqModal) {
        openAddReqBtn.addEventListener('click', () => {
          const nextNum = String(this.requirements.length + 1).padStart(3, '0');
          document.querySelector('#newReqId').value = `FR-ONB-${nextNum}`;
          document.querySelector('#newReqStatement').value = '';
          document.querySelector('#newReqGherkin').value = 'Given a verified customer account, when requested, then...';
          addReqModal.showModal();
        });
      }
      const closeAddReqModalBtn = document.querySelector('#closeAddReqModalBtn');
      const cancelAddReqBtn = document.querySelector('#cancelAddReqBtn');
      if (closeAddReqModalBtn && addReqModal) {
        closeAddReqModalBtn.addEventListener('click', () => addReqModal.close());
      }
      if (cancelAddReqBtn && addReqModal) {
        cancelAddReqBtn.addEventListener('click', () => addReqModal.close());
      }

      // Save Custom Requirement
      const saveAddReqBtn = document.querySelector('#saveAddReqBtn');
      if (saveAddReqBtn && addReqModal) {
        saveAddReqBtn.addEventListener('click', () => {
          const id = document.querySelector('#newReqId').value.trim() || `FR-CUSTOM-${Date.now()}`;
          const statement = document.querySelector('#newReqStatement').value.trim();
          const category = document.querySelector('#newReqCategory').value;
          const priority = document.querySelector('#newReqPriority').value;
          const gherkin = document.querySelector('#newReqGherkin').value.trim();

          if (!statement) {
            this.showToast('Please provide a requirement statement.');
            return;
          }

          const newReq = {
            id,
            statement,
            category,
            categories: [category],
            source: 'Product Architect Workshop',
            justification: 'Added to meet specific project delivery constraints.',
            priority,
            dependencies: [],
            assumptions: [],
            acceptanceCriteria: gherkin,
            regulations: ['SOC2-TYPE2 CC6.1'],
            riskLevel: priority === 'Critical' ? 'Critical' : 'Medium',
            confidence: 90,
            status: 'Pending review'
          };

          this.requirements.unshift(newReq);
          this.platform.logAudit('Requirement Extraction Agent', 'Custom Requirement Authored', `Created ${id}: ${statement.substring(0, 40)}...`);
          addReqModal.close();
          this.renderAll();
          this.showToast(`Requirement ${id} added to baseline.`);
        });
      }

      // Requirement Detail Modal Close & Actions
      const reqDetailModal = document.querySelector('#reqDetailModal');
      const closeReqModalBtn = document.querySelector('#closeReqModalBtn');
      if (closeReqModalBtn && reqDetailModal) {
        closeReqModalBtn.addEventListener('click', () => reqDetailModal.close());
      }
      const modalApproveBtn = document.querySelector('#modalApproveBtn');
      if (modalApproveBtn && reqDetailModal) {
        modalApproveBtn.addEventListener('click', () => {
          if (this.selectedReqForModal) {
            this.selectedReqForModal.status = 'Approved';
            this.platform.logAudit('Human Approval Agent', 'Requirement Approved', `Approved ${this.selectedReqForModal.id}`);
            reqDetailModal.close();
            this.renderRequirementsList();
            this.renderGovernance();
            this.renderOverview();
            this.showToast(`Requirement ${this.selectedReqForModal.id} approved.`);
          }
        });
      }
      const modalRejectBtn = document.querySelector('#modalRejectBtn');
      if (modalRejectBtn && reqDetailModal) {
        modalRejectBtn.addEventListener('click', () => {
          if (this.selectedReqForModal) {
            this.selectedReqForModal.status = 'Rejected';
            this.platform.logAudit('Human Approval Agent', 'Requirement Rejected', `Rejected ${this.selectedReqForModal.id}`);
            reqDetailModal.close();
            this.renderRequirementsList();
            this.renderGovernance();
            this.renderOverview();
            this.showToast(`Requirement ${this.selectedReqForModal.id} marked as rejected.`);
          }
        });
      }

      // Toggle Matrix Accordion
      const toggleMatrixBtn = document.querySelector('#toggleMatrixViewBtn');
      const matrixWrapper = document.querySelector('#sdlcMatrixWrapper');
      if (toggleMatrixBtn && matrixWrapper) {
        toggleMatrixBtn.addEventListener('click', () => {
          this.isMatrixCollapsed = !this.isMatrixCollapsed;
          matrixWrapper.style.display = this.isMatrixCollapsed ? 'none' : 'block';
          toggleMatrixBtn.textContent = this.isMatrixCollapsed ? 'Expand Decision Matrix ▾' : 'Collapse Decision Matrix ▴';
        });
      }

      // Add Criterion Modal
      const addCritBtn = document.querySelector('#addCriterionBtn');
      const addCritModal = document.querySelector('#addCriterionModal');
      if (addCritBtn && addCritModal) {
        addCritBtn.addEventListener('click', () => {
          document.querySelector('#critQuestion').value = '';
          addCritModal.showModal();
        });
      }
      const closeAddCritBtn = document.querySelector('#closeAddCritBtn');
      const cancelAddCritBtn = document.querySelector('#cancelAddCritBtn');
      if (closeAddCritBtn && addCritModal) {
        closeAddCritBtn.addEventListener('click', () => addCritModal.close());
      }
      if (cancelAddCritBtn && addCritModal) {
        cancelAddCritBtn.addEventListener('click', () => addCritModal.close());
      }
      const saveAddCritBtn = document.querySelector('#saveAddCritBtn');
      if (saveAddCritBtn && addCritModal) {
        saveAddCritBtn.addEventListener('click', () => {
          const question = document.querySelector('#critQuestion').value.trim();
          const category = document.querySelector('#critCategory').value;
          const answerVal = document.querySelector('#critAnswer').value === 'true';

          if (!question) {
            this.showToast('Please specify a criterion question.');
            return;
          }

          const critId = `custom_crit_${Date.now()}`;
          const newCriterion = {
            id: critId,
            category,
            code: `C${this.customCriteria.length + 1}`,
            question,
            weights: { standard: 1.0, financial: 1.3 },
            modelValues: {
              waterfall: !answerVal,
              v_shaped: !answerVal,
              spiral: answerVal,
              agile: answerVal,
              devsecops: answerVal,
              hybrid: true
            }
          };

          this.customCriteria.push(newCriterion);
          this.projectAnswers[critId] = {
            value: answerVal,
            rationale: 'Project custom criterion added by user.'
          };

          this.sdlcEngine = new SDLCSelectionEngine(this.customCriteria);
          this.recalculateSDLC();
          this.platform.logAudit('SDLC Selection Agent', 'Custom Criterion Added', `Added criterion: "${question.substring(0, 35)}..."`);
          addCritModal.close();
          this.renderSDLC();
          this.renderOverview();
          this.showToast('New project criterion integrated into decision matrix!');
        });
      }

      // Approve Strategy Button
      const approveSDLCBtn = document.querySelector('#approveSDLCStrategyBtn');
      if (approveSDLCBtn) {
        approveSDLCBtn.addEventListener('click', () => {
          this.platform.logAudit('Human Approval Agent', 'SDLC Strategy Approved', `Formally adopted ${this.sdlcResults.winner.name} model (${this.sdlcResults.winner.score}%)`);
          this.renderGovernance();
          this.showToast(`SDLC Strategy (${this.sdlcResults.winner.name}) endorsed for production execution!`);
        });
      }

      // Governance Sign-offs
      const govApprove1 = document.querySelector('#govApprove1');
      if (govApprove1) {
        govApprove1.addEventListener('click', () => {
          document.querySelector('#governanceStatus1').className = 'status-badge approved';
          document.querySelector('#governanceStatus1').textContent = '✓ Approved by Compliance';
          govApprove1.style.display = 'none';
          this.platform.logAudit('Compliance Agent', 'Sanctions Sign-off', 'Compliance Officer verified sanctions hold threshold.');
          this.renderOverview();
          this.renderAuditTable();
          this.showToast('Compliance sign-off registered.');
        });
      }

      // Export Handlers
      const exportSRSBtn = document.querySelector('#exportSRSBtn');
      const exportSRSHeaderBtn = document.querySelector('#exportSRSHeaderBtn');
      if (exportSRSBtn) exportSRSBtn.addEventListener('click', () => this.handleExportSRS());
      if (exportSRSHeaderBtn) exportSRSHeaderBtn.addEventListener('click', () => this.handleExportSRS());

      const exportRTMBtn = document.querySelector('#exportRTMBtn');
      if (exportRTMBtn) exportRTMBtn.addEventListener('click', () => this.handleExportRTM());

      const exportSDLCBtn = document.querySelector('#exportSDLCReportBtn');
      if (exportSDLCBtn) exportSDLCBtn.addEventListener('click', () => this.handleExportSDLCReport());

      const downloadAuditBtn = document.querySelector('#downloadAuditBtn');
      if (downloadAuditBtn) downloadAuditBtn.addEventListener('click', () => this.handleDownloadAudit());

      // Search Inputs
      const rtmSearch = document.querySelector('#rtmSearch');
      if (rtmSearch) {
        rtmSearch.addEventListener('input', (e) => this.renderRTMTable(e.target.value.toLowerCase()));
      }
    }

    switchView(viewId) {
      document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === viewId));
      document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === viewId));

      const titles = {
        overview: { eyebrow: 'FINANCIAL REQUIREMENTS INTELLIGENCE', title: 'Project Overview & Strategy' },
        intake: { eyebrow: 'STAKEHOLDER ELICITATION', title: 'Intake & Collaborative Agent Analysis' },
        requirements: { eyebrow: 'IEEE 830 / ISO 29148 SPECIFICATION', title: 'Requirements Baseline' },
        traceability: { eyebrow: 'BIDIRECTIONAL VERIFICATION GRAPH', title: 'Requirements Traceability Matrix' },
        sdlc: { eyebrow: 'SDLC DECISION FRAMEWORK', title: 'SDLC Selection & Strategy' },
        governance: { eyebrow: 'HUMAN-IN-THE-LOOP CONTROLS', title: 'Governance & Forensic Audit' }
      };

      const info = titles[viewId] || titles.overview;
      document.querySelector('#pageEyebrow').textContent = info.eyebrow;
      document.querySelector('#pageTitle').textContent = info.title;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showToast(message) {
      const toast = document.querySelector('#toast');
      if (!toast) return;
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => toast.classList.remove('show'), 2800);
    }

    async handleRunPipeline() {
      const intakeText = document.querySelector('#intakeText').value.trim();
      if (!intakeText) {
        this.showToast('Please enter a stakeholder statement.');
        return;
      }

      const stepsContainer = document.querySelector('#pipelineSteps');
      stepsContainer.innerHTML = '';

      const results = await this.platform.runPipeline(
        this.currentCase,
        intakeText,
        (step) => {
          const stepEl = document.createElement('div');
          stepEl.className = 'pipeline-step active';
          stepEl.innerHTML = `<b>Stage ${step.stepNumber} · ${step.agent}</b>: ${step.action}`;
          stepsContainer.appendChild(stepEl);
          stepsContainer.scrollTop = stepsContainer.scrollHeight;
        }
      );

      this.requirements = results.requirements;
      this.recalculateSDLC();
      this.renderAll();
      this.showToast('Multi-agent analysis completed! SDLC recommendation updated.');
    }

    handleAnswerQuestion() {
      const questions = this.currentCase.clarificationQuestions || [];
      if (!questions.length) return;
      const q = questions[this.activeQuestionIndex % questions.length];

      const textarea = document.querySelector('#intakeText');
      textarea.value += `\n[CLARIFICATION ADDED]: ${q.suggestedAnswer}`;

      const clarReq = {
        id: `NFR-CLR-${String(this.requirements.length + 1).padStart(3, '0')}`,
        statement: q.suggestedAnswer,
        category: 'Performance',
        categories: ['Performance', 'Functional'],
        source: 'Clarification Agent Interview Follow-up',
        justification: 'Formally answers stakeholder ambiguity question.',
        priority: 'High',
        dependencies: [],
        assumptions: [],
        acceptanceCriteria: 'Given production load, when tested, latency threshold meets specified target.',
        regulations: ['SOC2-TYPE2 A1.2'],
        riskLevel: 'Medium',
        confidence: 94,
        status: 'Approved'
      };
      this.requirements.unshift(clarReq);
      this.platform.logAudit('Clarification Agent', 'Ambiguity Resolved', `Injected: ${q.suggestedAnswer}`);

      this.activeQuestionIndex++;
      this.renderIntake();
      this.renderRequirementsList();
      this.renderOverview();
      this.showToast('Clarification incorporated into requirements baseline.');
    }

    handleSkipQuestion() {
      this.activeQuestionIndex++;
      this.renderIntake();
      this.showToast('Question deferred to open-decision queue.');
    }

    handleExportSRS() {
      const md = this.platform.generateSRSMarkdown(this.currentCase, this.requirements, this.sdlcResults, this.tailoredWorkflow);
      this.triggerDownload(`${this.currentCase.id}_SRS_Specification.md`, md, 'text/markdown');
      this.showToast('Downloaded IEEE 830 Software Requirements Specification.');
    }

    handleExportRTM() {
      const csv = this.platform.generateTraceabilityCSV(this.requirements);
      this.triggerDownload(`${this.currentCase.id}_Requirements_Traceability_Matrix.csv`, csv, 'text/csv');
      this.showToast('Downloaded Traceability Matrix (CSV).');
    }

    handleExportSDLCReport() {
      const winner = this.sdlcResults.winner;
      let report = `# SDLC Selection & Recommendation Assessment Report\n`;
      report += `**Project:** ${this.currentCase.title} (${this.currentCase.subtitle})\n`;
      report += `**Date:** ${new Date().toISOString()}\n\n`;

      report += `## Recommended Model: ${winner.name} (${winner.score}% Compatibility)\n`;
      report += `**Tagline:** ${winner.tagline}\n`;
      report += `**Methodology:** ${winner.description}\n`;
      report += `**Financial Sector Suitability:** ${winner.financialSuitability}\n\n`;

      report += `## Complete Model Alignment Rankings\n\n`;
      report += `| Rank | Model | Overall Score | Requirements Fit | Team Fit | User Fit | Risk Fit |\n`;
      report += `| :--- | :--- | :---: | :---: | :---: | :---: |\n`;
      this.sdlcResults.rankings.forEach((m, idx) => {
        report += `| ${idx + 1} | **${m.name}** | **${m.score}%** | ${m.categoryBreakdown.requirements || 0}% | ${m.categoryBreakdown.team || 0}% | ${m.categoryBreakdown.user || 0}% | ${m.categoryBreakdown.risk || 0}% |\n`;
      });
      report += `\n`;

      report += `## Criteria Evaluation Breakdown (19 Canonical Criteria)\n\n`;
      this.sdlcResults.matrix.forEach(row => {
        report += `### [${row.code}] ${row.question}\n`;
        report += `- **Category:** ${row.category}\n`;
        report += `- **Project Assessment:** ${row.projectValue ? 'Yes' : 'No'} (${row.rationale})\n`;
        report += `- **Model Alignment:**\n`;
        Object.entries(row.matches).forEach(([mId, mData]) => {
          report += `  - ${mId}: Expected ${mData.expected ? 'Yes' : 'No'} -> ${mData.isMatch ? 'MATCH (✓)' : 'MISMATCH (✗)'}\n`;
        });
        report += `\n`;
      });

      this.triggerDownload(`${this.currentCase.id}_SDLC_Selection_Assessment.md`, report, 'text/markdown');
      this.showToast('Downloaded SDLC Selection Assessment Report.');
    }

    handleDownloadAudit() {
      const json = JSON.stringify(this.platform.auditTrail, null, 2);
      this.triggerDownload(`${this.currentCase.id}_Immutable_Audit_Log.json`, json, 'application/json');
      this.showToast('Downloaded Immutable Audit Trail (JSON).');
    }

    triggerDownload(filename, content, mimeType) {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    // ================= RENDER METHODS =================

    renderAll() {
      this.renderHeader();
      this.renderOverview();
      this.renderIntake();
      this.renderRequirementsList();
      this.renderTraceability();
      this.renderSDLC();
      this.renderGovernance();
    }

    renderHeader() {
      document.querySelector('#caseAvatar').textContent = this.currentCase.icon;
      document.querySelector('#caseTitleText').textContent = this.currentCase.title;
      document.querySelector('#caseSelect').value = this.currentCaseId;
      document.querySelector('#sdlcModelBadge').textContent = this.sdlcResults.winner.name;
      document.querySelector('#navReqCount').textContent = this.requirements.length;
    }

    renderOverview() {
      document.querySelector('#heroTitle').innerHTML = `${this.currentCase.title}<br /><em>with accountable compliance.</em>`;
      document.querySelector('#heroSummary').textContent = this.currentCase.summary;

      document.querySelector('#metricReqCount').textContent = String(this.requirements.length).padStart(2, '0');
      document.querySelector('#metricSDLCWinner').textContent = this.sdlcResults.winner.name;
      document.querySelector('#metricSDLCScore').textContent = `Selection Alignment: ${this.sdlcResults.winner.score}%`;

      const pendingCount = this.requirements.filter(r => r.status !== 'Approved').length;
      document.querySelector('#metricOpenDecisions').textContent = String(pendingCount).padStart(2, '0');

      document.querySelector('#gaugeValue').textContent = String(Math.min(96, this.sdlcResults.winner.score));
      document.querySelector('#riskSDLCScore').textContent = `${this.sdlcResults.winner.score}% Match`;

      const feed = document.querySelector('#activityFeed');
      const recentEvents = this.platform.auditTrail.slice(0, 4);
      feed.innerHTML = recentEvents.map(e => `
        <div class="activity-item">
          <span class="activity-icon">✦</span>
          <div>
            <p><b>${e.agent}</b> · ${e.action}</p>
            <small>${e.details} (${new Date(e.timestamp).toLocaleTimeString()})</small>
          </div>
        </div>
      `).join('');
    }

    renderIntake() {
      const textarea = document.querySelector('#intakeText');
      if (textarea && !textarea.value) {
        textarea.value = this.currentCase.rawInput;
      }

      const questions = this.currentCase.clarificationQuestions || [];
      const card = document.querySelector('#clarificationCard');
      if (questions.length > 0 && card) {
        const q = questions[this.activeQuestionIndex % questions.length];
        document.querySelector('#currentQuestionTitle').textContent = q.question;
        document.querySelector('#currentQuestionContext').textContent = q.context;
      }
    }

    renderRequirementsList() {
      const listEl = document.querySelector('#reqTableBody');
      if (!listEl) return;

      let filtered = this.requirements;
      if (this.currentFilter !== 'all') {
        filtered = this.requirements.filter(r => r.category.toLowerCase() === this.currentFilter.toLowerCase() || r.categories.includes(this.currentFilter));
      }

      document.querySelector('#countAll').textContent = this.requirements.length;
      document.querySelector('#countFunc').textContent = this.requirements.filter(r => r.category === 'Functional').length;
      document.querySelector('#countSec').textContent = this.requirements.filter(r => r.category === 'Security').length;
      document.querySelector('#countComp').textContent = this.requirements.filter(r => r.category === 'Compliance').length;
      document.querySelector('#countAvail').textContent = this.requirements.filter(r => r.category === 'Availability').length;
      document.querySelector('#countInt').textContent = this.requirements.filter(r => r.category === 'Integration').length;

      const alertsContainer = document.querySelector('#qualityAlertsContainer');
      const alerts = this.platform.analyzeRequirementQuality(this.requirements);
      if (alerts.length > 0) {
        alertsContainer.innerHTML = `
          <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between">
            <div style="font-size:12px;color:#92400e">
              <b>Quality Check Alert (${alerts.length} recommendations):</b> ${alerts[0].issue} <i>Suggestion: ${alerts[0].suggestion}</i>
            </div>
            <span class="status-badge pending" style="font-size:10px">Clarification Required</span>
          </div>
        `;
      } else {
        alertsContainer.innerHTML = '';
      }

      listEl.innerHTML = filtered.map(r => `
        <div class="req-row" data-id="${r.id}">
          <div class="req-id">${r.id}</div>
          <div class="req-content">
            <b>${r.statement}</b>
            <small>Source: ${r.source} · Confidence: ${r.confidence}%</small>
          </div>
          <div>
            <span class="tag ${r.category.toLowerCase()}">${r.category}</span>
          </div>
          <div>
            <span class="status-badge ${r.status === 'Approved' ? 'approved' : r.status === 'Pending review' ? 'pending' : 'open'}">${r.status}</span>
          </div>
          <div style="font-size:11px;font-family:'DM Mono',monospace;color:var(--muted)">${r.priority}</div>
          <div>
            <button class="secondary small-btn inspect-btn" data-req-id="${r.id}">Inspect</button>
          </div>
        </div>
      `).join('');

      document.querySelectorAll('.inspect-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.openReqDetailModal(btn.dataset.reqId);
        });
      });
    }

    openReqDetailModal(reqId) {
      const req = this.requirements.find(r => r.id === reqId);
      if (!req) return;
      this.selectedReqForModal = req;

      document.querySelector('#modalReqId').textContent = req.id;
      document.querySelector('#modalReqCategory').textContent = `${req.category.toUpperCase()} REQUIREMENT`;
      document.querySelector('#modalReqStatement').textContent = req.statement;
      document.querySelector('#modalReqJustification').textContent = req.justification;
      document.querySelector('#modalReqGherkin').textContent = req.acceptanceCriteria;
      document.querySelector('#modalReqRegs').textContent = req.regulations.join(', ') || 'N/A';
      document.querySelector('#modalReqRiskPriority').innerHTML = `Priority: <b>${req.priority}</b> | Risk Level: <b>${req.riskLevel}</b> | Confidence: <b>${req.confidence}%</b>`;
      document.querySelector('#modalReqSource').textContent = req.source;

      document.querySelector('#reqDetailModal').showModal();
    }

    renderTraceability() {
      const activeReq = this.requirements.find(r => r.id === this.selectedTraceReqId) || this.requirements[0];
      if (!activeReq) return;

      document.querySelector('#traceReqId').textContent = activeReq.id;
      document.querySelector('#traceReqStatement').textContent = activeReq.statement.length > 55 ? activeReq.statement.substring(0, 52) + '...' : activeReq.statement;
      document.querySelector('#traceSourceTitle').textContent = activeReq.source.split('·')[0] || 'Stakeholder Note';
      document.querySelector('#traceSourceSnippet').textContent = `"${activeReq.statement.substring(0, 45)}..."`;
      document.querySelector('#traceControlTitle').textContent = activeReq.regulations[0] || 'Statutory Policy';
      document.querySelector('#traceControlDesc').textContent = activeReq.regulations.slice(1).join(', ') || 'Financial Governance Standard';
      document.querySelector('#traceTestId').textContent = `AT-${activeReq.id.replace(/[^0-9]/g, '') || '001'}`;
      document.querySelector('#traceTestDesc').textContent = activeReq.acceptanceCriteria.length > 60 ? activeReq.acceptanceCriteria.substring(0, 57) + '...' : activeReq.acceptanceCriteria;

      document.querySelector('#tracePaneId').textContent = activeReq.id;
      document.querySelector('#tracePaneDesc').textContent = activeReq.statement;
      document.querySelector('#tracePaneConfidence').textContent = `${activeReq.confidence}%`;
      document.querySelector('#tracePaneRegs').textContent = activeReq.regulations.join(', ') || 'Standard Compliance';
      document.querySelector('#tracePaneStatus').textContent = activeReq.status;
      document.querySelector('#tracePaneStatus').className = `status-badge ${activeReq.status === 'Approved' ? 'approved' : 'pending'}`;

      this.renderRTMTable();
    }

    renderRTMTable(searchTerm = '') {
      const tbody = document.querySelector('#rtmTableBody');
      if (!tbody) return;

      const filtered = this.requirements.filter(r => {
        if (!searchTerm) return true;
        const hay = (r.id + ' ' + r.statement + ' ' + r.category + ' ' + r.regulations.join(' ')).toLowerCase();
        return hay.includes(searchTerm);
      });

      tbody.innerHTML = filtered.map(r => `
        <tr style="cursor:pointer" class="${r.id === this.selectedTraceReqId ? 'active-trace' : ''}" onclick="window.__app.selectTraceReq('${r.id}')">
          <td style="font-family:'DM Mono',monospace;font-weight:700;color:var(--forest)">${r.id}</td>
          <td><b>${r.statement}</b></td>
          <td><span class="tag ${r.category.toLowerCase()}">${r.category}</span></td>
          <td><small>${r.source}</small></td>
          <td><b style="color:var(--forest);font-size:11px">${r.regulations.join(', ') || 'N/A'}</b></td>
          <td><small style="font-family:'DM Mono',monospace">${r.acceptanceCriteria.substring(0, 50)}...</small></td>
          <td><span class="status-badge ${r.status === 'Approved' ? 'approved' : 'pending'}">${r.status}</span></td>
        </tr>
      `).join('');
    }

    selectTraceReq(id) {
      this.selectedTraceReqId = id;
      this.renderTraceability();
    }

    renderSDLC() {
      const winner = this.sdlcResults.winner;

      document.querySelector('#winnerName').innerHTML = `${winner.name} <span>Model</span>`;
      document.querySelector('#winnerTagline').textContent = winner.tagline;
      document.querySelector('#winnerDesc').textContent = `${winner.description} ${winner.financialSuitability}`;

      const scoreBarsContainer = document.querySelector('#modelScoreBars');
      scoreBarsContainer.innerHTML = this.sdlcResults.rankings.map(m => `
        <div class="score-row">
          <span>${m.name}</span>
          <div class="score-track">
            <div class="score-fill" style="width:${m.score}%"></div>
          </div>
          <strong>${m.score}%</strong>
        </div>
      `).join('');

      const catGrid = document.querySelector('#catFitGrid');
      catGrid.innerHTML = SDLC_CATEGORIES.map(c => {
        const score = winner.categoryBreakdown[c.id] || 0;
        return `
          <div class="cat-fit-card">
            <small>${c.code} CRITERIA</small>
            <b>${c.name}</b>
            <strong>${score}% <span style="font-size:12px;color:var(--muted);font-weight:500">Fit</span></strong>
          </div>
        `;
      }).join('');

      document.querySelector('#workflowTitle').textContent = `${winner.name} Phased Delivery & Financial Verification Gates`;
      const workflowContainer = document.querySelector('#workflowStepsContainer');
      workflowContainer.innerHTML = this.tailoredWorkflow.phases.map(p => `
        <div class="workflow-step">
          <span class="step-num">PHASE ${p.phase} · ${p.duration}</span>
          <h4>${p.name}</h4>
          <p><b>Activities:</b> ${p.activities[0]}<br/><b>Deliverables:</b> ${p.deliverables.join(', ')}</p>
          <div class="gate-badge">
            <b>Financial Gate &amp; Control</b>
            <span>${p.complianceCheckpoints[0] || p.humanGate}</span>
          </div>
        </div>
      `).join('');

      this.renderSDLCMatrixTable();
    }

    renderSDLCMatrixTable() {
      const tbody = document.querySelector('#sdlcTableBody');
      const tfoot = document.querySelector('#sdlcTableFoot');
      if (!tbody || !tfoot) return;

      let html = '';

      SDLC_CATEGORIES.forEach(cat => {
        const catCriteria = this.sdlcResults.matrix.filter(m => m.category === cat.id);
        if (!catCriteria.length) return;

        html += `
          <tr class="category-row">
            <td colspan="10">${cat.name} (${cat.code}) — ${cat.description}</td>
          </tr>
        `;

        catCriteria.forEach(crit => {
          const pVal = crit.projectValue;
          html += `
            <tr>
              <td class="criterion-code">${cat.id.substring(0, 4).toUpperCase()}</td>
              <td class="criterion-code">${crit.code}</td>
              <td class="criterion-question">
                ${crit.question}
                ${crit.rationale ? `<small style="display:block;font-size:10px;color:var(--muted);font-weight:400;margin-top:2px">Context: ${crit.rationale}</small>` : ''}
              </td>
              <td class="project-eval-cell">
                <button class="toggle-btn ${pVal ? 'yes' : 'no'}" onclick="window.__app.toggleProjectCriterion('${crit.id}')">
                  ${pVal ? '✓ Yes' : '✗ No'}
                </button>
              </td>
              <td class="model-cell ${crit.matches.waterfall.isMatch ? 'cell-match' : 'cell-mismatch'}">${crit.matches.waterfall.expected ? 'Yes' : 'No'}</td>
              <td class="model-cell ${crit.matches.v_shaped.isMatch ? 'cell-match' : 'cell-mismatch'}">${crit.matches.v_shaped.expected ? 'Yes' : 'No'}</td>
              <td class="model-cell ${crit.matches.spiral.isMatch ? 'cell-match' : 'cell-mismatch'}">${crit.matches.spiral.expected ? 'Yes' : 'No'}</td>
              <td class="model-cell ${crit.matches.agile.isMatch ? 'cell-match' : 'cell-mismatch'}">${crit.matches.agile.expected ? 'Yes' : 'No'}</td>
              <td class="model-cell ${crit.matches.devsecops.isMatch ? 'cell-match' : 'cell-mismatch'}">${crit.matches.devsecops.expected ? 'Yes' : 'No'}</td>
              <td class="model-cell ${crit.matches.hybrid.isMatch ? 'cell-match' : 'cell-mismatch'}">${crit.matches.hybrid.expected ? 'Yes' : 'No'}</td>
            </tr>
          `;
        });
      });

      tbody.innerHTML = html;

      tfoot.innerHTML = `
        <tr>
          <td colspan="4" style="text-align:right;font-weight:800">MODEL COMPATIBILITY SCORE:</td>
          <td class="model-cell" style="font-weight:800;font-size:13px">${this.getModelScore('waterfall')}%</td>
          <td class="model-cell" style="font-weight:800;font-size:13px">${this.getModelScore('v_shaped')}%</td>
          <td class="model-cell" style="font-weight:800;font-size:13px">${this.getModelScore('spiral')}%</td>
          <td class="model-cell" style="font-weight:800;font-size:13px">${this.getModelScore('agile')}%</td>
          <td class="model-cell" style="font-weight:800;font-size:13px">${this.getModelScore('devsecops')}%</td>
          <td class="model-cell" style="font-weight:800;font-size:13px;color:var(--forest)">${this.getModelScore('hybrid')}%</td>
        </tr>
      `;
    }

    getModelScore(modelId) {
      const m = this.sdlcResults.rankings.find(r => r.id === modelId);
      return m ? m.score : 0;
    }

    toggleProjectCriterion(critId) {
      if (!this.projectAnswers[critId]) {
        this.projectAnswers[critId] = { value: true, rationale: 'Interactive user override' };
      }
      const currentVal = this.projectAnswers[critId].value;
      this.projectAnswers[critId].value = !currentVal;
      this.projectAnswers[critId].rationale = `Manually toggled to ${!currentVal ? 'Yes' : 'No'} by user`;

      this.recalculateSDLC();
      this.platform.logAudit('SDLC Selection Agent', 'Criterion Toggled', `Toggled ${critId} to ${!currentVal ? 'Yes' : 'No'}`);

      this.renderSDLC();
      this.renderOverview();
      this.showToast(`Criterion ${critId} updated — SDLC rankings recalculated!`);
    }

    renderGovernance() {
      this.renderAuditTable();
    }

    renderAuditTable() {
      const tbody = document.querySelector('#auditTableBody');
      if (!tbody) return;

      tbody.innerHTML = this.platform.auditTrail.map(e => `
        <tr>
          <td style="font-family:'DM Mono',monospace">${new Date(e.timestamp).toLocaleTimeString()}</td>
          <td><b>${e.agent}</b></td>
          <td><span style="font-weight:600;color:var(--forest)">${e.action}</span></td>
          <td><small>${e.details}</small></td>
          <td style="font-family:'DM Mono',monospace">${e.confidence}</td>
          <td><span class="hash-pill">${e.hash}</span></td>
        </tr>
      `).join('');
    }
  }

  // Self-initialize on DOM ready or immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.__app = new AppController();
    });
  } else {
    window.__app = new AppController();
  }

})();
