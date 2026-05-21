// QUESTIONNAIRE TEMPLATES — 3 ready-to-go question sets.
// Each question item: { id, text, type, options?, scale_min?, scale_max?, required, per_app? }
// per_app = true → asked once per target application; false = once per recipient.

const QUESTIONNAIRE_TEMPLATES = [
  {
    id: "utility",
    name: "Application Utility Assessment",
    description: "Daily-use perception of an application by its real users. Score per app on 8 dimensions.",
    target_audience: "End users · all sites",
    lang: "EN",
    questions: [
      { id: "q1", text: "Frequency of use — how often do you use this application?", type: "single", options: ["Daily", "Several times/week", "Weekly", "Monthly", "Never"], required: true, per_app: true },
      { id: "q2", text: "Process coverage — how well does this application cover your work processes?", type: "scale", scale_min: 1, scale_max: 5, labels: ["Very poor", "Excellent"], required: true, per_app: true },
      { id: "q3", text: "Data quality — how do you rate the quality of data in this application?", type: "scale", scale_min: 1, scale_max: 5, labels: ["Very poor", "Excellent"], required: true, per_app: true },
      { id: "q4", text: "Integration satisfaction — how well is it integrated with your other tools?", type: "scale", scale_min: 1, scale_max: 5, labels: ["Not at all", "Fully integrated"], required: true, per_app: true },
      { id: "q5", text: "Replaceability — could another application do this job better?", type: "single", options: ["Yes, immediately", "Yes, in the medium term", "No", "Don't know"], required: true, per_app: true },
      { id: "q6", text: "Pain points — what are the biggest problems with this application?", type: "text", required: false, per_app: true, multiline: true },
      { id: "q7", text: "Improvement suggestions — what would you change?", type: "text", required: false, per_app: true, multiline: true },
      { id: "q8", text: "Overall — how important is this application for your daily work?", type: "scale", scale_min: 1, scale_max: 5, labels: ["Not important", "Indispensable"], required: true, per_app: true },
    ],
  },
  {
    id: "cloud",
    name: "Cloud Migration Readiness",
    description: "Technical evaluation: availability, performance, perceived cost, migration concerns.",
    target_audience: "IT teams + key technical users",
    lang: "EN",
    questions: [
      { id: "c1", text: "How available is the application during your working hours?", type: "scale", scale_min: 1, scale_max: 5, labels: ["Often down", "Always available"], required: true, per_app: true },
      { id: "c2", text: "How is its performance under your typical workload?", type: "scale", scale_min: 1, scale_max: 5, labels: ["Very slow", "Snappy"], required: true, per_app: true },
      { id: "c3", text: "Perceived cost relative to value", type: "scale", scale_min: 1, scale_max: 5, labels: ["Too expensive", "Great value"], required: true, per_app: true },
      { id: "c4", text: "Cloud vs On-Premise preference for this app", type: "single", options: ["Cloud", "Hybrid", "On-Premise", "No preference"], required: true, per_app: true },
      { id: "c5", text: "Top migration concerns", type: "multi", options: ["Data security", "Downtime", "Cost increase", "User retraining", "Integration breakage", "Compliance"], required: false, per_app: true },
      { id: "c6", text: "Free text — comments on migration readiness", type: "text", required: false, per_app: true, multiline: true },
    ],
  },
  {
    id: "scor",
    name: "SCOR Process Coverage",
    description: "Which apps cover which SCOR domain? Satisfaction per domain.",
    target_audience: "SCM process owners",
    lang: "EN",
    questions: [
      { id: "s1", text: "Which application(s) do you use for PLAN activities?", type: "text", required: false, per_app: false },
      { id: "s2", text: "Plan — satisfaction with current tooling", type: "scale", scale_min: 1, scale_max: 5, labels: ["Very poor", "Excellent"], required: true, per_app: false },
      { id: "s3", text: "Which application(s) do you use for SOURCE?", type: "text", required: false, per_app: false },
      { id: "s4", text: "Source — satisfaction with current tooling", type: "scale", scale_min: 1, scale_max: 5, labels: ["Very poor", "Excellent"], required: true, per_app: false },
      { id: "s5", text: "Which application(s) do you use for MAKE?", type: "text", required: false, per_app: false },
      { id: "s6", text: "Make — satisfaction with current tooling", type: "scale", scale_min: 1, scale_max: 5, labels: ["Very poor", "Excellent"], required: true, per_app: false },
      { id: "s7", text: "Which application(s) do you use for DELIVER?", type: "text", required: false, per_app: false },
      { id: "s8", text: "Deliver — satisfaction with current tooling", type: "scale", scale_min: 1, scale_max: 5, labels: ["Very poor", "Excellent"], required: true, per_app: false },
      { id: "s9", text: "Which application(s) do you use for RETURN?", type: "text", required: false, per_app: false },
      { id: "s10", text: "Return — satisfaction with current tooling", type: "scale", scale_min: 1, scale_max: 5, labels: ["Very poor", "Excellent"], required: true, per_app: false },
      { id: "s11", text: "Free text — biggest gaps across the SCOR chain", type: "text", required: false, per_app: false, multiline: true },
    ],
  },
];

window.QUESTIONNAIRE_TEMPLATES = QUESTIONNAIRE_TEMPLATES;
