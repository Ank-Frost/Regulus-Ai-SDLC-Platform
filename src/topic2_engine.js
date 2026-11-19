/**
 * SDLC Decision Engine
 * Implements the 19 criteria across 4 categories conforming to the Problem Statement:
 * 1. Characteristics of Requirements (5 criteria)
 * 2. Characteristics of Project Team (5 criteria)
 * 3. Characteristics of User Community (4 criteria)
 * 4. Characteristics of Project Type and Risk (5 criteria)
 *
 * Evaluates the 6 Problem Statement SDLC models:
 * - Waterfall
 * - V-Model
 * - Spiral
 * - Agile
 * - DevSecOps
 * - Agile–DevSecOps Hybrid
 */

export const SDLC_MODELS = [{
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

export const TOPIC2_CATEGORIES = [
  {
    id: 'requirements',
    name: 'Characteristics of Requirements',
    slideRef: 'Topic-2 Slide 5',
    description: 'Evaluates requirement clarity, volatility, definition timing, and need for proof of concept.'
  },
  {
    id: 'team',
    name: 'Characteristics of Project Team',
    slideRef: 'Topic-2 Slide 6',
    description: 'Assesses domain maturity, technology familiarity, tooling experience, staff reassignment, and training.'
  },
  {
    id: 'user',
    name: 'Characteristics of User Community',
    slideRef: 'Topic-2 Slide 7',
    description: 'Examines user availability, system definition experience, problem domain expertise, and lifecycle involvement.'
  },
  {
    id: 'risk',
    name: 'Characteristics of Project Type and Risk',
    slideRef: 'Topic-2 Slide 8',
    description: 'Considers product novelty, integration complexity, enhancement nature, funding stability, and system longevity.'
  }
];

/**
 * The 19 Canonical Topic-2 Criteria with exact benchmark truth table
 * Values match Slide 5, 6, 7, 8 of "Selection of an SDLC-PT-4" exactly.
 */
export const SDLC_CRITERIA = [// --- Category 1: Characteristics of Requirements ---
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

export const TOPIC2_CRITERIA = SDLC_CRITERIA;

export class Topic2Engine {
  constructor(customCriteria = []) {
    this.criteria = [...TOPIC2_CRITERIA, ...customCriteria];
  }

  /**
   * Evaluates project criteria against the 6 Topic-2 models
   * @param {Object} projectAnswers - Map of criterion ID -> { value: boolean, rationale: string }
   * @param {string} weightingMode - 'financial' or 'standard'
   * @returns {Object} Full ranking, category breakdown, match matrix, and top recommendation
   */
  evaluate(projectAnswers, weightingMode = 'financial') {
    const scores = {};
    const categoryScores = {};
    const matrix = [];

    // Initialize scores
    SDLC_MODELS.forEach(m => {
      scores[m.id] = { totalPoints: 0, maxPoints: 0, matchCount: 0, mismatchCount: 0 };
      categoryScores[m.id] = {};
      TOPIC2_CATEGORIES.forEach(c => {
        categoryScores[m.id][c.id] = { points: 0, maxPoints: 0 };
      });
    });

    // Evaluate each criterion
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

        // Accumulate overall
        scores[m.id].maxPoints += weight;
        if (isMatch) {
          scores[m.id].totalPoints += weight;
          scores[m.id].matchCount += 1;
        } else {
          scores[m.id].mismatchCount += 1;
        }

        // Accumulate by category
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

    // Compile ranked results
    const rankedModels = SDLC_MODELS.map(m => {
      const total = scores[m.id];
      const percentage = Math.round((total.totalPoints / total.maxPoints) * 100);

      const catPercentages = {};
      TOPIC2_CATEGORIES.forEach(c => {
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

    const winner = rankedModels[0];
    const runnerUp = rankedModels[1];

    return {
      winner,
      runnerUp,
      rankings: rankedModels,
      matrix,
      categories: TOPIC2_CATEGORIES,
      criteriaCount: this.criteria.length
    };
  }

  /**
   * Generates a tailored financial SDLC workflow for the winning Topic-2 model
   * @param {Object} winningModel
   * @param {string} projectContext
   * @returns {Object} Phased execution plan with security & compliance gates
   */
  generateWorkflow(winningModel, projectContext = 'Digital Customer Onboarding & KYC') {
    const workflows = {hybrid: {
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

export const SDLCEngine = Topic2Engine;
export const SDLC_CATEGORIES = TOPIC2_CATEGORIES;
