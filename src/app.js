/**
 * Regulus AI — Application Controller
 * Orchestrates UI views, state management, multi-agent execution,
 * and the interactive Topic-2 SDLC Decision Matrix.
 */

import { Topic2Engine, TOPIC2_CATEGORIES } from './topic2_engine.js';
import { FINANCIAL_CASE_STUDIES } from './knowledge_base.js';
import { MultiAgentPlatform } from './agents.js';

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
    this.projectAnswers = JSON.parse(JSON.stringify(this.currentCase.topic2Answers));
    this.requirements = JSON.parse(JSON.stringify(this.currentCase.requirements));
    this.activeQuestionIndex = 0;
    this.selectedTraceReqId = this.requirements[0]?.id || '';

    this.topic2Engine = new Topic2Engine(this.customCriteria);
    this.recalculateSDLC();

    this.platform.logAudit('System', 'Case Study Loaded', `Loaded case study: ${this.currentCase.title}`);

    if (shouldToast) {
      this.showToast(`Switched case study to ${this.currentCase.title}`);
    }
  }

  recalculateSDLC() {
    this.topic2Results = this.topic2Engine.evaluate(this.projectAnswers, 'financial');
    this.tailoredWorkflow = this.topic2Engine.generateWorkflow(this.topic2Results.winner, this.currentCase.title);
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

    // Requirement Detail Modal Close & Action
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
    const matrixWrapper = document.querySelector('#topic2MatrixWrapper');
    if (toggleMatrixBtn && matrixWrapper) {
      toggleMatrixBtn.addEventListener('click', () => {
        this.isMatrixCollapsed = !this.isMatrixCollapsed;
        matrixWrapper.style.display = this.isMatrixCollapsed ? 'none' : 'block';
        toggleMatrixBtn.textContent = this.isMatrixCollapsed ? 'Expand Matrix ▾' : 'Collapse Matrix ▴';
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

        this.topic2Engine = new Topic2Engine(this.customCriteria);
        this.recalculateSDLC();
        this.platform.logAudit('SDLC Selection Agent', 'Custom Criterion Added', `Added criterion: "${question.substring(0, 35)}..."`);
        addCritModal.close();
        this.renderSDLC();
        this.renderOverview();
        this.showToast('New project criterion integrated into Topic-2 matrix!');
      });
    }

    // Approve Strategy Button
    const approveSDLCBtn = document.querySelector('#approveSDLCStrategyBtn');
    if (approveSDLCBtn) {
      approveSDLCBtn.addEventListener('click', () => {
        this.platform.logAudit('Human Approval Agent', 'SDLC Strategy Approved', `Formally adopted ${this.topic2Results.winner.name} model (${this.topic2Results.winner.score}%)`);
        this.renderGovernance();
        this.showToast(`SDLC Strategy (${this.topic2Results.winner.name}) endorsed for production execution!`);
      });
    }

    // Governance Approvals
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

    // Export Buttons
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

    // RTM Search Input
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
      sdlc: { eyebrow: 'NITK TOPIC-2 DECISION FRAMEWORK', title: 'SDLC Selection & Strategy' },
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
    this.showToast('Multi-agent analysis completed! Topic-2 SDLC evaluated.');
  }

  handleAnswerQuestion() {
    const questions = this.currentCase.clarificationQuestions || [];
    if (!questions.length) return;
    const q = questions[this.activeQuestionIndex % questions.length];

    const textarea = document.querySelector('#intakeText');
    textarea.value += `\n[CLARIFICATION ADDED]: ${q.suggestedAnswer}`;

    // Add corresponding requirement
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
    const md = this.platform.generateSRSMarkdown(this.currentCase, this.requirements, this.topic2Results, this.tailoredWorkflow);
    this.triggerDownload(`${this.currentCase.id}_SRS_Specification.md`, md, 'text/markdown');
    this.showToast('Downloaded IEEE 830 Software Requirements Specification.');
  }

  handleExportRTM() {
    const csv = this.platform.generateTraceabilityCSV(this.requirements);
    this.triggerDownload(`${this.currentCase.id}_Requirements_Traceability_Matrix.csv`, csv, 'text/csv');
    this.showToast('Downloaded Traceability Matrix (CSV).');
  }

  handleExportSDLCReport() {
    const winner = this.topic2Results.winner;
    let report = `# Topic-2 SDLC Decision & Recommendation Assessment Report\n`;
    report += `**Project:** ${this.currentCase.title} (${this.currentCase.subtitle})\n`;
    report += `**Evaluated Framework:** NITK CSE Topic-2 (Dr. Mahendra Pratap Singh)\n`;
    report += `**Date:** ${new Date().toISOString()}\n\n`;

    report += `## Recommended Model: ${winner.name} (${winner.score}% Compatibility)\n`;
    report += `**Tagline:** ${winner.tagline}\n`;
    report += `**Methodology:** ${winner.description}\n`;
    report += `**Financial Sector Suitability:** ${winner.financialSuitability}\n\n`;

    report += `## Complete Model Alignment Rankings (Topic-2)\n\n`;
    report += `| Rank | Model | Overall Score | Requirements Fit | Team Fit | User Fit | Risk Fit |\n`;
    report += `| :--- | :--- | :---: | :---: | :---: | :---: |\n`;
    this.topic2Results.rankings.forEach((m, idx) => {
      report += `| ${idx + 1} | **${m.name}** | **${m.score}%** | ${m.categoryBreakdown.requirements || 0}% | ${m.categoryBreakdown.team || 0}% | ${m.categoryBreakdown.user || 0}% | ${m.categoryBreakdown.risk || 0}% |\n`;
    });
    report += `\n`;

    report += `## Criteria Evaluation Breakdown (19 Topic-2 Criteria)\n\n`;
    this.topic2Results.matrix.forEach(row => {
      report += `### [${row.code}] ${row.question}\n`;
      report += `- **Category:** ${row.category}\n`;
      report += `- **Project Assessment:** ${row.projectValue ? 'Yes' : 'No'} (${row.rationale})\n`;
      report += `- **Model Alignment:**\n`;
      Object.entries(row.matches).forEach(([mId, mData]) => {
        report += `  - ${mId}: Expected ${mData.expected ? 'Yes' : 'No'} -> ${mData.isMatch ? 'MATCH (✓)' : 'MISMATCH (✗)'}\n`;
      });
      report += `\n`;
    });

    this.triggerDownload(`${this.currentCase.id}_Topic2_SDLC_Assessment.md`, report, 'text/markdown');
    this.showToast('Downloaded Topic-2 SDLC Assessment Report.');
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
    document.querySelector('#sdlcModelBadge').textContent = this.topic2Results.winner.name;
    document.querySelector('#navReqCount').textContent = this.requirements.length;
  }

  renderOverview() {
    document.querySelector('#heroTitle').innerHTML = `${this.currentCase.title}<br /><em>with accountable compliance.</em>`;
    document.querySelector('#heroSummary').textContent = this.currentCase.summary;

    document.querySelector('#metricReqCount').textContent = String(this.requirements.length).padStart(2, '0');
    document.querySelector('#metricSDLCWinner').textContent = this.topic2Results.winner.name;
    document.querySelector('#metricSDLCScore').textContent = `Topic-2 Alignment: ${this.topic2Results.winner.score}%`;

    const pendingCount = this.requirements.filter(r => r.status !== 'Approved').length;
    document.querySelector('#metricOpenDecisions').textContent = String(pendingCount).padStart(2, '0');

    // Risk Gauge and Telemetry
    document.querySelector('#gaugeValue').textContent = String(Math.min(96, this.topic2Results.winner.score));
    document.querySelector('#riskSDLCScore').textContent = `${this.topic2Results.winner.score}% Match`;

    // Activity Stream
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

    // Clarification Question Card
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

    // Count badges
    document.querySelector('#countAll').textContent = this.requirements.length;
    document.querySelector('#countFunc').textContent = this.requirements.filter(r => r.category === 'Functional').length;
    document.querySelector('#countSec').textContent = this.requirements.filter(r => r.category === 'Security').length;
    document.querySelector('#countComp').textContent = this.requirements.filter(r => r.category === 'Compliance').length;
    document.querySelector('#countAvail').textContent = this.requirements.filter(r => r.category === 'Availability').length;
    document.querySelector('#countInt').textContent = this.requirements.filter(r => r.category === 'Integration').length;

    // Quality alerts
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

    // Attach inspect click handlers
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

    // Detail Pane
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
    const winner = this.topic2Results.winner;

    // Hero Card
    document.querySelector('#winnerName').innerHTML = `${winner.name} <span>Model</span>`;
    document.querySelector('#winnerTagline').textContent = winner.tagline;
    document.querySelector('#winnerDesc').textContent = `${winner.description} ${winner.financialSuitability}`;

    // Score comparison bars for all 6 Topic-2 models
    const scoreBarsContainer = document.querySelector('#modelScoreBars');
    scoreBarsContainer.innerHTML = this.topic2Results.rankings.map(m => `
      <div class="score-row">
        <span>${m.name}</span>
        <div class="score-track">
          <div class="score-fill" style="width:${m.score}%"></div>
        </div>
        <strong>${m.score}%</strong>
      </div>
    `).join('');

    // Category Fit Grid
    const catGrid = document.querySelector('#catFitGrid');
    catGrid.innerHTML = TOPIC2_CATEGORIES.map(c => {
      const score = winner.categoryBreakdown[c.id] || 0;
      return `
        <div class="cat-fit-card">
          <small>${c.slideRef}</small>
          <b>${c.name}</b>
          <strong>${score}% <span style="font-size:12px;color:var(--muted);font-weight:500">Fit</span></strong>
        </div>
      `;
    }).join('');

    // Workflow Roadmap
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

    // Topic-2 Matrix Table
    this.renderTopic2Table();
  }

  renderTopic2Table() {
    const tbody = document.querySelector('#topic2TableBody');
    const tfoot = document.querySelector('#topic2TableFoot');
    if (!tbody || !tfoot) return;

    let html = '';

    TOPIC2_CATEGORIES.forEach(cat => {
      const catCriteria = this.topic2Results.matrix.filter(m => m.category === cat.id);
      if (!catCriteria.length) return;

      // Category Header Row
      html += `
        <tr class="category-row">
          <td colspan="10">${cat.name} (${cat.slideRef}) — ${cat.description}</td>
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

    // Table Footer with Total Scores
    tfoot.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:right;font-weight:800">SDLC OVERALL COMPATIBILITY MATCH:</td>
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
    const m = this.topic2Results.rankings.find(r => r.id === modelId);
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
    this.showToast(`Updated criterion ${critId} — SDLC rankings recalculated!`);
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

// Instantiate and expose globally for inline HTML event bindings
window.__app = new AppController();
