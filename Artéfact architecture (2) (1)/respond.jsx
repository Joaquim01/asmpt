// Standalone Respond view — rendered when URL hash is #r=<token>.
// Pulls the questionnaire + recipient straight from the central store
// (same browser/localStorage; spec notes this limitation).
function Respond({ token }) {
  const { state, submitResponse, sharedHydrated, sharedAvailable } = useStore();

  // Locate the questionnaire and recipient by token
  let foundQ = null, foundR = null;
  (state.questionnaires || []).forEach(q => (q.recipients || []).forEach(r => {
    if (r.token === token) { foundQ = q; foundR = r; }
  }));

  const [answers, setAnswers] = useState({});       // for non-per-app questions: { [qid]: value }
  const [perApp, setPerApp] = useState({});         // for per-app questions: { [appId]: { [qid]: value } }
  const [appIdx, setAppIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // While the central store is hydrating from shared storage, show a brief
  // loading state so we don't false-positive into "Invalid link".
  if (!foundQ && !sharedHydrated) {
    return (
      <RespondShell>
        <div style={{ padding: 60, textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#64748b", letterSpacing: ".18em", fontWeight: 600 }}>LOADING SURVEY…</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 400, marginTop: 10, letterSpacing: "-0.025em", color: "#0f172a" }}>One moment.</h2>
          <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 14 }}>Fetching the latest survey definition from shared storage…</p>
          <div style={{ marginTop: 24, width: 240, height: 3, background: "#f1f5f9", margin: "24px auto 0", overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: 3, width: 80, background: "#dc2626", animation: "respond-slide 1.1s linear infinite" }} />
          </div>
          <style>{`@keyframes respond-slide { 0% { left: -80px } 100% { left: 240px } }`}</style>
        </div>
      </RespondShell>
    );
  }

  if (!foundQ || !foundR) {
    return (
      <RespondShell>
        <div style={{ padding: 60, textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", letterSpacing: ".18em", fontWeight: 600 }}>INVALID LINK</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 400, marginTop: 10, letterSpacing: "-0.025em" }}>This survey link is not recognised.</h2>
          <p style={{ fontSize: 14, color: "#64748b", marginTop: 14 }}>Token: <code style={{ fontFamily: "var(--font-mono)", fontSize: 12, background: "#fef2f2", padding: "2px 6px", color: "#dc2626" }}>{token || "(empty)"}</code></p>
          {!sharedAvailable && (
            <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 14, maxWidth: 460, margin: "14px auto 0", lineHeight: 1.55 }}>
              Note: this build does not have shared storage available, so survey links only work on the same machine as the admin who created them.
            </p>
          )}
        </div>
      </RespondShell>
    );
  }
  if (foundR.responded || submitted) {
    return (
      <RespondShell>
        <div style={{ padding: 60, textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#16a34a", letterSpacing: ".18em", fontWeight: 600 }}>SUBMITTED · THANK YOU</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 400, marginTop: 10, letterSpacing: "-0.025em" }}>Your responses have been recorded.</h2>
          <p style={{ fontSize: 14, color: "#64748b", marginTop: 14 }}>You may close this tab.</p>
        </div>
      </RespondShell>
    );
  }
  if (foundQ.status === "closed") {
    return (
      <RespondShell>
        <div style={{ padding: 60, textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", letterSpacing: ".18em", fontWeight: 600 }}>CLOSED</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 400, marginTop: 10, letterSpacing: "-0.025em" }}>This survey is no longer accepting responses.</h2>
        </div>
      </RespondShell>
    );
  }

  const perAppQs = foundQ.questions.filter(q => q.per_app);
  const globalQs = foundQ.questions.filter(q => !q.per_app);
  const targetApps = (foundQ.target_apps || []).map(id => state.apps.find(a => a.id === id)).filter(Boolean);
  const totalSteps = (targetApps.length > 0 && perAppQs.length > 0 ? targetApps.length : 0) + (globalQs.length > 0 ? 1 : 0);

  function setAnswer(qid, v) { setAnswers(a => ({ ...a, [qid]: v })); }
  function setPerAppAnswer(appId, qid, v) { setPerApp(p => ({ ...p, [appId]: { ...(p[appId] || {}), [qid]: v } })); }

  function canSubmit() {
    // All required questions must have a value
    const missing = [];
    globalQs.forEach(q => { if (q.required && (answers[q.id] == null || answers[q.id] === "" || (Array.isArray(answers[q.id]) && answers[q.id].length === 0))) missing.push(q.text); });
    targetApps.forEach(app => perAppQs.forEach(q => { if (q.required && (!perApp[app.id] || perApp[app.id][q.id] == null || perApp[app.id][q.id] === "" || (Array.isArray(perApp[app.id][q.id]) && perApp[app.id][q.id].length === 0))) missing.push(`${app.name}: ${q.text}`); }));
    return missing;
  }

  function submit() {
    const missing = canSubmit();
    if (missing.length > 0) { alert("Missing required answers:\n• " + missing.slice(0, 6).join("\n• ")); return; }
    // Submit one response per app, plus one global response if there are global questions
    if (targetApps.length > 0 && perAppQs.length > 0) {
      targetApps.forEach(app => {
        const a = { ...perApp[app.id] };
        // include globals in each (or only once on the global call)
        submitResponse(foundQ.id, foundR.id, app.id, a);
      });
    }
    if (globalQs.length > 0) {
      submitResponse(foundQ.id, foundR.id, null, answers);
    }
    setSubmitted(true);
  }

  const isPerAppStep = appIdx < targetApps.length && perAppQs.length > 0;
  const currentApp = isPerAppStep ? targetApps[appIdx] : null;
  const currentQs = isPerAppStep ? perAppQs : globalQs;

  return (
    <RespondShell q={foundQ} recipient={foundR}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#dc2626", letterSpacing: ".18em", fontWeight: 700, marginBottom: 6 }}>
          {isPerAppStep ? `APPLICATION ${appIdx + 1} OF ${targetApps.length}` : "GENERAL QUESTIONS"} · {Math.min(appIdx + 1, totalSteps)} / {totalSteps}
        </div>
        {/* Progress bar */}
        <div style={{ height: 6, background: "#f1f5f9", marginBottom: 16 }}>
          <div style={{ width: `${((appIdx + 1) / Math.max(1, totalSteps)) * 100}%`, height: 6, background: "#dc2626", transition: "width .2s" }} />
        </div>
        {isPerAppStep && (
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#94a3b8", letterSpacing: ".12em" }}>{currentApp.id} · {currentApp.scor_domain}</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 500, color: "#0f172a", letterSpacing: "-0.025em", lineHeight: 1.1 }}>{currentApp.name}</h2>
            {currentApp.description && <p style={{ fontSize: 13.5, color: "#64748b", marginTop: 8, maxWidth: 720, lineHeight: 1.55 }}>{currentApp.description}</p>}
          </div>
        )}
        {!isPerAppStep && globalQs.length > 0 && (
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 500, color: "#0f172a", letterSpacing: "-0.025em" }}>A few more general questions</h2>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {currentQs.map((q, i) => {
          const value = isPerAppStep ? (perApp[currentApp.id] || {})[q.id] : answers[q.id];
          const setValue = v => isPerAppStep ? setPerAppAnswer(currentApp.id, q.id, v) : setAnswer(q.id, v);
          return <RespondQuestion key={q.id} q={q} index={i} value={value} onChange={setValue} />;
        })}
      </div>

      <div style={{ marginTop: 32, display: "flex", justifyContent: "space-between", paddingTop: 22, borderTop: "1px solid #e2e8f0" }}>
        <button onClick={() => setAppIdx(i => Math.max(0, i - 1))} disabled={appIdx === 0} style={ghostBtn}>← Previous</button>
        {appIdx + 1 < totalSteps
          ? <button onClick={() => setAppIdx(i => i + 1)} style={primaryBtn}>Next →</button>
          : <button onClick={submit} style={primaryBtn}>✓ Submit responses</button>}
      </div>
    </RespondShell>
  );
}

function RespondShell({ q, recipient, children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#fafbfc", padding: "32px 20px 80px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <header style={{ paddingBottom: 24, borderBottom: "1px solid #e2e8f0", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 24, height: 24, background: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "#fff" }}>A</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>Artéfact</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#94a3b8", letterSpacing: ".12em", marginLeft: 6 }}>ASMPT · SMT</span>
          </div>
          {q && <>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", letterSpacing: ".18em", fontWeight: 600, marginTop: 18 }}>SURVEY · {q.id}</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 400, marginTop: 6, letterSpacing: "-0.03em", color: "#0f172a", lineHeight: 1.05 }}>{q.title}</h1>
            {q.description && <p style={{ fontSize: 14, color: "#475569", marginTop: 10, lineHeight: 1.55, maxWidth: 660 }}>{q.description}</p>}
            {recipient && !q.anonymous && (
              <div style={{ marginTop: 14, fontFamily: "var(--font-mono)", fontSize: 11, color: "#64748b", letterSpacing: ".04em" }}>
                Responding as <strong style={{ color: "#0f172a" }}>{recipient.name}</strong> · {recipient.site}{recipient.department ? " · " + recipient.department : ""}
              </div>
            )}
          </>}
        </header>
        <main style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "32px 36px" }}>
          {children}
        </main>
        <footer style={{ marginTop: 24, fontFamily: "var(--font-mono)", fontSize: 10.5, color: "#94a3b8", letterSpacing: ".06em", textAlign: "center" }}>
          Your responses are stored in the Artéfact tool. Thanks for taking the time.
        </footer>
      </div>
    </div>
  );
}

function RespondQuestion({ q, index, value, onChange }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#dc2626", letterSpacing: ".12em", fontWeight: 700, marginBottom: 4 }}>Q{index + 1}{q.required && " · REQUIRED"}</div>
      <div style={{ fontSize: 16, fontWeight: 500, color: "#0f172a", marginBottom: 14, lineHeight: 1.4 }}>{q.text}</div>

      {q.type === "scale" && <ScaleInput q={q} value={value} onChange={onChange} />}
      {q.type === "single" && <SingleInput q={q} value={value} onChange={onChange} />}
      {q.type === "multi"  && <MultiInput q={q} value={value || []} onChange={onChange} />}
      {q.type === "text"   && (q.multiline
        ? <textarea value={value || ""} onChange={e => onChange(e.target.value)} placeholder="Type your answer…" style={{ ...inputStyle, minHeight: 90, fontFamily: "var(--font-sans)", fontSize: 14, resize: "vertical" }} />
        : <input value={value || ""} onChange={e => onChange(e.target.value)} placeholder="Type your answer…" style={{ ...inputStyle, fontSize: 14 }} />)}
      {q.type === "matrix" && <div style={{ padding: 14, background: "#fef3c7", color: "#92400e", fontFamily: "var(--font-mono)", fontSize: 11 }}>Matrix questions not supported on this respondent UI — please use scale / single / multi.</div>}
    </div>
  );
}

function ScaleInput({ q, value, onChange }) {
  const min = q.scale_min || 1, max = q.scale_max || 5;
  const opts = []; for (let i = min; i <= max; i++) opts.push(i);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${opts.length}, 1fr)`, gap: 6 }}>
        {opts.map(o => {
          const sel = value === o;
          return (
            <button key={o} onClick={() => onChange(o)} style={{
              padding: "14px 0", background: sel ? "#0f172a" : "#fff", color: sel ? "#fff" : "#0f172a",
              border: "1px solid " + (sel ? "#0f172a" : "#cbd5e1"), cursor: "pointer",
              fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500,
            }}>{o}</button>
          );
        })}
      </div>
      {q.labels && q.labels.length === 2 && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontFamily: "var(--font-mono)", fontSize: 10.5, color: "#94a3b8", letterSpacing: ".06em" }}>
          <span>{q.labels[0]}</span>
          <span>{q.labels[1]}</span>
        </div>
      )}
    </div>
  );
}
function SingleInput({ q, value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {(q.options || []).map(o => {
        const sel = value === o;
        return (
          <button key={o} onClick={() => onChange(o)} style={{
            padding: "12px 16px", textAlign: "left", background: sel ? "#fef2f2" : "#fff", color: "#0f172a",
            border: "1px solid " + (sel ? "#dc2626" : "#cbd5e1"), cursor: "pointer",
            fontFamily: "inherit", fontSize: 14, display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid " + (sel ? "#dc2626" : "#cbd5e1"), background: sel ? "#dc2626" : "transparent", flexShrink: 0 }} />
            {o}
          </button>
        );
      })}
    </div>
  );
}
function MultiInput({ q, value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {(q.options || []).map(o => {
        const sel = value.includes(o);
        return (
          <button key={o} onClick={() => onChange(sel ? value.filter(x => x !== o) : [...value, o])} style={{
            padding: "12px 16px", textAlign: "left", background: sel ? "#fef2f2" : "#fff", color: "#0f172a",
            border: "1px solid " + (sel ? "#dc2626" : "#cbd5e1"), cursor: "pointer",
            fontFamily: "inherit", fontSize: 14, display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ width: 16, height: 16, border: "2px solid " + (sel ? "#dc2626" : "#cbd5e1"), background: sel ? "#dc2626" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontFamily: "var(--font-mono)" }}>{sel && "✓"}</span>
            {o}
          </button>
        );
      })}
    </div>
  );
}

window.Respond = Respond;
