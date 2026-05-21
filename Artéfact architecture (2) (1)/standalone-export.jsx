// Builds a 100% standalone HTML file containing the questionnaire form.
// Recipients open the .html in any browser, fill it out offline, then copy
// the resulting JSON (or scan its QR) and email it back. The admin pastes it
// into the "Import Responses" panel — see store.importResponse + Distribute.

function buildStandaloneHtml(q, targetApps, opts = {}) {
  // opts: { adminEmail, deadline }
  const data = {
    questionnaire_id: q.id,
    title: q.title || "Untitled questionnaire",
    description: q.description || "",
    lang: q.lang || "EN",
    deadline: opts.deadline || q.deadline || null,
    admin_email: opts.adminEmail || "",
    questions: (q.questions || []).map(qq => ({
      id: qq.id, text: qq.text, type: qq.type,
      required: !!qq.required, per_app: !!qq.per_app, multiline: !!qq.multiline,
      scale_min: qq.scale_min, scale_max: qq.scale_max,
      options: qq.options || [], labels: qq.labels || [], criteria: qq.criteria || [],
    })),
    target_apps: (targetApps || []).map(a => ({ id: a.id, name: a.name, scor_domain: a.scor_domain })),
  };
  // Safely embed JSON inside a <script> tag — replace `</` with `<\/` so a
  // stray closing tag inside a string can't break out of the script element.
  const json = JSON.stringify(data).replace(/<\/(script)/gi, '<\\/$1');

  // Note: we use ASMPT colours (indigo + slate + red accent) and IBM Plex / Inter
  // via CDN. CDNs ARE used (Google Fonts + qrcode-generator) — they are NOT
  // calls to the Artéfact app itself, so the survey works for any external user.
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(data.title)} · ASMPT SMT Survey</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root {
    --display:"Fraunces",Georgia,serif;
    --sans:"Inter",-apple-system,system-ui,sans-serif;
    --mono:"IBM Plex Mono",ui-monospace,monospace;
    --ink:#0f172a; --muted:#64748b; --border:#cbd5e1; --soft:#f1f5f9;
    --bg:#fafbfc; --card:#fff; --accent:#dc2626;
  }
  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;}
  body{font-family:var(--sans);background:var(--bg);color:var(--ink);-webkit-font-smoothing:antialiased;line-height:1.5;}
  .shell{max-width:880px;margin:0 auto;padding:48px 32px 96px;}
  .eyebrow{font-family:var(--mono);font-size:11px;color:var(--accent);letter-spacing:.18em;font-weight:700;text-transform:uppercase;}
  h1{font-family:var(--display);font-size:48px;font-weight:400;line-height:1.05;letter-spacing:-0.035em;margin:8px 0 14px;}
  h2{font-family:var(--display);font-size:24px;font-weight:500;letter-spacing:-0.02em;margin:0 0 12px;}
  .lead{font-size:15px;color:var(--muted);max-width:640px;line-height:1.6;margin-bottom:32px;}
  .rule{height:1px;background:var(--ink);margin:0 0 28px;}
  .card{background:var(--card);border:1px solid #e2e8f0;padding:24px;margin-bottom:18px;}
  .row{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:10px;}
  label.field{display:flex;flex-direction:column;gap:6px;font-size:13px;}
  label.field > span{font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.14em;text-transform:uppercase;font-weight:600;}
  input[type="text"],input[type="email"],select,textarea{font-family:inherit;font-size:14px;padding:9px 11px;border:1px solid var(--border);background:#fff;color:var(--ink);}
  textarea{resize:vertical;min-height:90px;line-height:1.55;}
  input:focus,select:focus,textarea:focus{outline:2px solid var(--ink);outline-offset:-1px;}
  .q-block{margin-bottom:24px;padding-bottom:24px;border-bottom:1px dotted var(--border);}
  .q-block:last-child{border-bottom:none;padding-bottom:0;margin-bottom:0;}
  .q-num{font-family:var(--mono);font-size:10px;color:var(--accent);letter-spacing:.14em;font-weight:700;}
  .q-text{font-size:15px;color:var(--ink);margin:6px 0 12px;font-weight:500;line-height:1.45;}
  .req{color:var(--accent);}
  .scale-row{display:flex;gap:6px;flex-wrap:wrap;}
  .scale-btn{flex:1;min-width:48px;padding:10px 4px;border:1px solid var(--border);background:#fff;color:var(--ink);font-family:var(--mono);font-size:13px;font-weight:600;cursor:pointer;transition:all .1s;}
  .scale-btn:hover{background:#f1f5f9;}
  .scale-btn.on{background:var(--ink);border-color:var(--ink);color:#fff;}
  .scale-labels{display:flex;justify-content:space-between;font-family:var(--mono);font-size:10px;color:var(--muted);margin-top:6px;letter-spacing:.04em;}
  .opt{display:flex;align-items:flex-start;gap:10px;padding:8px 10px;border:1px solid #e2e8f0;background:#fff;margin-bottom:4px;cursor:pointer;font-size:13.5px;}
  .opt:hover{background:#fafbfc;}
  .opt input{margin-top:3px;}
  .app-pill{display:inline-block;padding:3px 10px;background:#0f172a;color:#fff;font-family:var(--mono);font-size:10px;letter-spacing:.1em;font-weight:600;margin-bottom:14px;}
  .app-card{border:1px solid #e2e8f0;border-left:3px solid var(--accent);padding:18px;margin-bottom:14px;background:#fff;}
  .app-card h3{font-family:var(--display);font-size:20px;font-weight:500;letter-spacing:-0.02em;margin:0 0 4px;}
  .app-card .meta{font-family:var(--mono);font-size:10.5px;color:var(--muted);letter-spacing:.06em;margin-bottom:14px;}
  .progress{position:sticky;top:0;background:rgba(250,251,252,.92);backdrop-filter:saturate(120%) blur(8px);padding:14px 32px;margin:-48px -32px 28px;border-bottom:1px solid #e2e8f0;}
  .progress-bar{height:3px;background:var(--soft);overflow:hidden;}
  .progress-bar > div{height:3px;background:var(--accent);transition:width .2s;}
  .progress-text{font-family:var(--mono);font-size:10.5px;color:var(--muted);letter-spacing:.08em;margin-top:6px;text-transform:uppercase;font-weight:600;}
  .submit-bar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;}
  button.primary{padding:12px 24px;background:var(--ink);color:#fff;border:1px solid var(--ink);font-family:var(--mono);font-size:11.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:background .1s;}
  button.primary:hover{background:#000;}
  button.primary[disabled]{opacity:.4;cursor:not-allowed;}
  button.ghost{padding:10px 18px;background:#fff;border:1px solid var(--ink);color:var(--ink);font-family:var(--mono);font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;}
  .result-card{background:#0f172a;color:#fff;padding:28px;margin-top:24px;}
  .result-card h2{color:#fff;}
  .result-card .small{font-family:var(--mono);font-size:11px;color:#94a3b8;letter-spacing:.06em;}
  .result-card textarea{width:100%;background:#020617;color:#a5f3fc;border:1px solid #334155;font-family:var(--mono);font-size:11px;padding:14px;min-height:200px;line-height:1.5;}
  .result-card .row2{display:grid;grid-template-columns:1fr 220px;gap:24px;margin-top:18px;align-items:flex-start;}
  .result-card .qr-box{background:#fff;padding:12px;display:inline-block;}
  .result-card .copy-ok{color:#86efac;}
  .badge{display:inline-block;padding:4px 10px;background:#dc2626;color:#fff;font-family:var(--mono);font-size:10.5px;font-weight:700;letter-spacing:.14em;margin-bottom:14px;}
  .footer{margin-top:48px;font-family:var(--mono);font-size:10.5px;color:var(--muted);letter-spacing:.04em;text-align:center;line-height:1.7;}
  .footer strong{color:var(--ink);}
  .matrix{width:100%;border-collapse:collapse;font-size:13px;}
  .matrix th,.matrix td{padding:8px 10px;border:1px solid #e2e8f0;text-align:center;}
  .matrix th{background:#0f172a;color:#fff;font-family:var(--mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;font-weight:600;}
  .matrix td:first-child,.matrix th:first-child{text-align:left;background:#fafbfc;color:var(--ink);font-weight:500;}
  .matrix th:first-child{color:#fff;background:#0f172a;}
  .err{color:var(--accent);font-size:12px;margin-top:6px;}
  .alert{padding:14px 18px;background:#fef3c7;border-left:3px solid #ca8a04;color:#7c2d12;font-size:13px;line-height:1.55;margin-bottom:18px;}
  .alert strong{color:#7c2d12;}
  @media(max-width:640px){
    .shell{padding:32px 18px 64px;}
    h1{font-size:34px;}
    .row{grid-template-columns:1fr;}
    .result-card .row2{grid-template-columns:1fr;}
  }
</style>
</head>
<body>
<div class="shell">

  <div class="progress">
    <div class="progress-bar"><div id="pbar" style="width:0%"></div></div>
    <div class="progress-text" id="ptext">0 of 0 questions answered</div>
  </div>

  <div class="badge">ASMPT SMT · IT Architecture Survey</div>
  <div class="eyebrow">Application Assessment Questionnaire</div>
  <h1 id="qtitle"></h1>
  <p class="lead" id="qdesc"></p>
  <div class="rule"></div>

  <div class="alert">
    <strong>How this works:</strong> answer the questions below, click <em>Generate response</em>,
    then copy the JSON or scan the QR code. Send it back to the architecture team —
    your responses are imported into the central tool, where they feed the AI analysis.
  </div>

  <div class="card">
    <h2>About you</h2>
    <div class="row">
      <label class="field"><span>Your name *</span><input id="resp-name" type="text" required></label>
      <label class="field"><span>Email (optional)</span><input id="resp-email" type="email"></label>
      <label class="field"><span>Site *</span><select id="resp-site" required>
        <option value="">— pick a site —</option>
        <option value="MUC">Munich (MUC)</option>
        <option value="UK">United Kingdom (UK)</option>
        <option value="SGP">Singapore (SGP)</option>
        <option value="MAL">Malaysia (MAL)</option>
      </select></label>
      <label class="field"><span>Department / role</span><input id="resp-dept" type="text" placeholder="e.g. SCM, IT, Operations"></label>
    </div>
  </div>

  <div id="form-root"></div>

  <div class="submit-bar" style="margin-top:24px;">
    <button class="primary" id="submit-btn">Generate response →</button>
    <span id="form-err" class="err"></span>
  </div>

  <div id="result-root"></div>

  <div class="footer">
    <strong>ASMPT SMT — IT Architecture</strong><br>
    This file works offline. Once you generate the response, copy the JSON or scan the QR code
    and send it back to <span id="admin-email-display"></span> — that's it, no account needed.
  </div>
</div>

<script>
// Embedded questionnaire data ─────────────────────────────────────────────
const DATA = ${json};
const answers = {};         // { qid: value }            for non-per-app
const appAnswers = {};      // { appId: { qid: value } } for per-app
const root = document.getElementById("form-root");
document.getElementById("qtitle").textContent = DATA.title;
document.getElementById("qdesc").textContent = DATA.description || "";
document.getElementById("admin-email-display").textContent = DATA.admin_email || "the architecture team";
if (DATA.deadline) {
  const a = document.createElement("div");
  a.className = "alert";
  a.innerHTML = "<strong>Deadline:</strong> " + escapeHtml(DATA.deadline);
  root.parentNode.insertBefore(a, root);
}

// Split questions ──────────────────────────────────────────────────────────
const perAppQs = DATA.questions.filter(q => q.per_app);
const globalQs = DATA.questions.filter(q => !q.per_app);

// Render per-app blocks ────────────────────────────────────────────────────
if (perAppQs.length > 0 && DATA.target_apps.length > 0) {
  const section = document.createElement("div");
  section.className = "card";
  section.innerHTML = '<h2>Per-application questions</h2><p style="font-size:13px;color:#64748b;margin:-4px 0 16px;">Please answer for each application below. Skip an app if you do not use it.</p>';
  DATA.target_apps.forEach((app, ai) => {
    appAnswers[app.id] = {};
    const card = document.createElement("div");
    card.className = "app-card";
    card.innerHTML = '<h3>' + escapeHtml(app.name) + '</h3><div class="meta">' + escapeHtml(app.id) + ' · ' + escapeHtml(app.scor_domain || "") + '</div>';
    perAppQs.forEach((qq, qi) => {
      card.appendChild(renderQuestion(qq, "app:" + app.id + ":" + qq.id, (val) => {
        appAnswers[app.id][qq.id] = val;
        updateProgress();
      }));
    });
    section.appendChild(card);
  });
  root.appendChild(section);
}

// Render global questions ─────────────────────────────────────────────────
if (globalQs.length > 0) {
  const section = document.createElement("div");
  section.className = "card";
  section.innerHTML = '<h2>General questions</h2>';
  globalQs.forEach((qq, qi) => {
    section.appendChild(renderQuestion(qq, "g:" + qq.id, (val) => { answers[qq.id] = val; updateProgress(); }));
  });
  root.appendChild(section);
}

// Question renderer ────────────────────────────────────────────────────────
function renderQuestion(qq, key, onChange) {
  const wrap = document.createElement("div");
  wrap.className = "q-block";
  const num = document.createElement("div");
  num.className = "q-num";
  num.textContent = qq.type.toUpperCase();
  wrap.appendChild(num);
  const text = document.createElement("div");
  text.className = "q-text";
  text.innerHTML = escapeHtml(qq.text) + (qq.required ? ' <span class="req">*</span>' : "");
  wrap.appendChild(text);

  if (qq.type === "scale") {
    const min = qq.scale_min || 1, max = qq.scale_max || 5;
    const row = document.createElement("div");
    row.className = "scale-row";
    for (let v = min; v <= max; v++) {
      const b = document.createElement("button");
      b.type = "button"; b.className = "scale-btn"; b.textContent = String(v);
      b.dataset.v = String(v);
      b.onclick = () => {
        row.querySelectorAll(".scale-btn").forEach(x => x.classList.remove("on"));
        b.classList.add("on");
        onChange(v);
      };
      row.appendChild(b);
    }
    wrap.appendChild(row);
    if ((qq.labels || []).length >= 2) {
      const lab = document.createElement("div");
      lab.className = "scale-labels";
      lab.innerHTML = "<span>" + escapeHtml(qq.labels[0]) + "</span><span>" + escapeHtml(qq.labels[1]) + "</span>";
      wrap.appendChild(lab);
    }
  } else if (qq.type === "single") {
    (qq.options || []).forEach(opt => {
      const lab = document.createElement("label");
      lab.className = "opt";
      const input = document.createElement("input");
      input.type = "radio"; input.name = key; input.value = opt;
      input.onchange = () => onChange(opt);
      lab.appendChild(input);
      lab.appendChild(document.createTextNode(opt));
      wrap.appendChild(lab);
    });
  } else if (qq.type === "multi") {
    const sel = new Set();
    (qq.options || []).forEach(opt => {
      const lab = document.createElement("label");
      lab.className = "opt";
      const input = document.createElement("input");
      input.type = "checkbox"; input.value = opt;
      input.onchange = () => {
        if (input.checked) sel.add(opt); else sel.delete(opt);
        onChange([...sel]);
      };
      lab.appendChild(input);
      lab.appendChild(document.createTextNode(opt));
      wrap.appendChild(lab);
    });
  } else if (qq.type === "text") {
    if (qq.multiline) {
      const ta = document.createElement("textarea");
      ta.oninput = () => onChange(ta.value);
      wrap.appendChild(ta);
    } else {
      const i = document.createElement("input");
      i.type = "text";
      i.style.width = "100%";
      i.oninput = () => onChange(i.value);
      wrap.appendChild(i);
    }
  } else if (qq.type === "matrix") {
    const table = document.createElement("table");
    table.className = "matrix";
    const head = document.createElement("tr");
    head.innerHTML = "<th></th>" + (qq.criteria || []).map(c => "<th>" + escapeHtml(c) + "</th>").join("");
    table.appendChild(head);
    const matrixState = {};
    (DATA.target_apps || []).forEach(app => {
      matrixState[app.id] = {};
      const tr = document.createElement("tr");
      tr.innerHTML = "<td>" + escapeHtml(app.name) + "</td>";
      (qq.criteria || []).forEach(c => {
        const td = document.createElement("td");
        const sel = document.createElement("select");
        sel.innerHTML = '<option value="">—</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>';
        sel.onchange = () => {
          matrixState[app.id][c] = sel.value;
          onChange(matrixState);
        };
        td.appendChild(sel);
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
    wrap.appendChild(table);
  }
  return wrap;
}

// Progress meter ───────────────────────────────────────────────────────────
function totalRequired() {
  let n = 0;
  globalQs.forEach(q => { if (q.required) n++; });
  perAppQs.forEach(q => { if (q.required) n += DATA.target_apps.length; });
  return Math.max(n, DATA.questions.length); // at minimum count all questions
}
function answeredCount() {
  let n = 0;
  Object.keys(answers).forEach(k => { if (answers[k] !== undefined && answers[k] !== "" && !(Array.isArray(answers[k]) && answers[k].length === 0)) n++; });
  Object.values(appAnswers).forEach(o => Object.values(o).forEach(v => { if (v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0)) n++; }));
  return n;
}
function updateProgress() {
  const tot = totalRequired() || 1;
  const got = answeredCount();
  const pct = Math.min(100, Math.round(got / tot * 100));
  document.getElementById("pbar").style.width = pct + "%";
  document.getElementById("ptext").textContent = got + " of " + tot + " questions answered · " + pct + "%";
}
updateProgress();

// Submit ──────────────────────────────────────────────────────────────────
document.getElementById("submit-btn").addEventListener("click", () => {
  const name = document.getElementById("resp-name").value.trim();
  const email = document.getElementById("resp-email").value.trim();
  const site = document.getElementById("resp-site").value;
  const dept = document.getElementById("resp-dept").value.trim();
  const err = document.getElementById("form-err");
  if (!name || !site) { err.textContent = "Name and site are required."; return; }
  err.textContent = "";

  // Check required questions
  const missing = [];
  globalQs.forEach(q => { if (q.required && (answers[q.id] === undefined || answers[q.id] === "")) missing.push("Q: " + q.text.slice(0, 40)); });
  if (missing.length > 0 && !confirm("Some required questions are unanswered:\\n• " + missing.slice(0, 6).join("\\n• ") + "\\n\\nSubmit anyway?")) return;

  const payload = {
    questionnaire_id: DATA.questionnaire_id,
    questionnaire_title: DATA.title,
    respondent: { name, email, site, department: dept },
    submitted_at: new Date().toISOString(),
    responses: []
  };
  // Per-app responses
  DATA.target_apps.forEach(app => {
    if (Object.keys(appAnswers[app.id] || {}).length > 0) {
      payload.responses.push({ app_id: app.id, answers: appAnswers[app.id] });
    }
  });
  // Global response row (per spec)
  if (Object.keys(answers).length > 0) {
    payload.responses.push({ app_id: null, answers });
  }
  renderResult(payload);
});

function renderResult(payload) {
  const box = document.getElementById("result-root");
  const json = JSON.stringify(payload, null, 2);
  const compact = JSON.stringify(payload);
  box.innerHTML = '';
  const card = document.createElement("div");
  card.className = "result-card";
  card.innerHTML =
    '<div class="small">RESPONSE GENERATED · ' + new Date().toLocaleString() + '</div>' +
    '<h2>Thank you, ' + escapeHtml(payload.respondent.name) + '.</h2>' +
    '<p style="font-size:14px;color:#cbd5e1;margin:0 0 14px;max-width:560px;line-height:1.55;">' +
    'Copy the JSON below and email it back to <strong style="color:#fff;">' + escapeHtml(DATA.admin_email || "the architecture team") + '</strong>, ' +
    'or send a screenshot of the QR code. The admin imports it with one click.</p>' +
    '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;">' +
    '  <button class="primary" id="copy-json" style="background:#dc2626;border-color:#dc2626;">📋 Copy JSON</button>' +
    '  <button class="ghost" id="download-json" style="background:#fff;color:#0f172a;">⬇ Download .json</button>' +
    '  <a class="ghost" id="email-link" style="background:#fff;color:#0f172a;text-decoration:none;display:inline-flex;align-items:center;">📧 Email it back</a>' +
    '</div>' +
    '<div class="row2">' +
    '  <textarea id="json-out" readonly>' + escapeHtml(json) + '</textarea>' +
    '  <div>' +
    '    <div class="small" style="margin-bottom:8px;">QR (scan to capture JSON)</div>' +
    '    <div class="qr-box" id="qr-box">Generating…</div>' +
    '    <div class="small" style="margin-top:8px;line-height:1.5;">Large payloads may not fit in a QR — prefer copy/email.</div>' +
    '  </div>' +
    '</div>';
  box.appendChild(card);
  document.getElementById("copy-json").onclick = async () => {
    try {
      await navigator.clipboard.writeText(json);
      document.getElementById("copy-json").innerHTML = "✓ Copied";
      document.getElementById("copy-json").classList.add("copy-ok");
    } catch (e) {
      const ta = document.getElementById("json-out");
      ta.focus(); ta.select();
      document.execCommand("copy");
      document.getElementById("copy-json").innerHTML = "✓ Copied (fallback)";
    }
  };
  document.getElementById("download-json").onclick = () => {
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "response-" + DATA.questionnaire_id + "-" + safe(payload.respondent.name) + ".json"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };
  const subject = "Survey response: " + DATA.title + " — " + payload.respondent.name;
  const body = "Hi,\\n\\nPlease find my survey response below (JSON). Paste it into the Import Responses panel.\\n\\n----- BEGIN JSON -----\\n" + compact + "\\n----- END JSON -----\\n\\nBest,\\n" + payload.respondent.name;
  const mailHref = "mailto:" + encodeURIComponent(DATA.admin_email || "") + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  document.getElementById("email-link").href = mailHref;

  // Scroll the card into view (do NOT use scrollIntoView — manual scroll)
  setTimeout(() => window.scrollTo({ top: card.getBoundingClientRect().top + window.scrollY - 20, behavior: "smooth" }), 100);

  // Generate QR (graceful failure if CDN blocked)
  loadQr().then(qrcode => {
    try {
      const text = compact.length > 2000 ? "[Payload too large — please copy JSON instead]" : compact;
      const qr = qrcode(0, "L");
      qr.addData(text);
      qr.make();
      const cells = qr.getModuleCount();
      const size = 200; const cs = size / cells;
      let rects = "";
      for (let r = 0; r < cells; r++) for (let c = 0; c < cells; c++) {
        if (qr.isDark(r, c)) rects += '<rect x="' + (c*cs).toFixed(1) + '" y="' + (r*cs).toFixed(1) + '" width="' + cs.toFixed(1) + '" height="' + cs.toFixed(1) + '" fill="#0f172a"/>';
      }
      document.getElementById("qr-box").innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" shape-rendering="crispEdges"><rect width="' + size + '" height="' + size + '" fill="#fff"/>' + rects + '</svg>';
    } catch (e) {
      document.getElementById("qr-box").innerHTML = '<span style="color:#7c2d12;font-size:11px;">QR error · use copy instead</span>';
    }
  }).catch(() => {
    document.getElementById("qr-box").innerHTML = '<span style="color:#7c2d12;font-size:11px;">QR library unreachable · use copy instead</span>';
  });
}

let _qrPromise = null;
function loadQr() {
  if (window.qrcode) return Promise.resolve(window.qrcode);
  if (_qrPromise) return _qrPromise;
  _qrPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://unpkg.com/qrcode-generator@1.4.4/qrcode.js";
    s.onload = () => resolve(window.qrcode);
    s.onerror = () => reject(new Error("Failed to load QR library"));
    document.head.appendChild(s);
  });
  return _qrPromise;
}

function escapeHtml(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" })[c]);
}
function safe(s) { return String(s || "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase().slice(0, 40); }
</script>
</body>
</html>`;
}

function escapeHtml(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" })[c]);
}

function downloadStandaloneHtml(q, allApps, opts) {
  const targetApps = (q.target_apps || [])
    .map(id => allApps.find(a => a.id === id))
    .filter(Boolean);
  const html = buildStandaloneHtml(q, targetApps, opts || {});
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const safeName = String(q.title || q.id).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase().slice(0, 60) || q.id;
  a.href = url;
  a.download = `survey-${q.id}-${safeName}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

Object.assign(window, { buildStandaloneHtml, downloadStandaloneHtml });
