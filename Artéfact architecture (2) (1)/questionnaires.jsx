// QUESTIONNAIRES — list, builder, distribution, results & AI analysis.
// All persisted in the central store. The respond view is a standalone screen
// reached via #r=<token>; see Respond() below — wired in app.jsx.

function Questionnaires({ onOpenApp }) {
  const { state, addQuestionnaire, updateQuestionnaire, deleteQuestionnaire, can } = useStore();
  const list = state.questionnaires || [];
  const [route, setRoute] = useState({ kind: "list" }); // list | builder | distribute | results
  const [showTemplate, setShowTemplate] = useState(false);

  function startFromTemplate(t) {
    const q = addQuestionnaire({
      title: t.name,
      description: t.description,
      template: t.id,
      lang: t.lang,
      questions: JSON.parse(JSON.stringify(t.questions)),
    });
    setRoute({ kind: "builder", id: q.id });
    setShowTemplate(false);
  }
  function startBlank() {
    const q = addQuestionnaire({});
    setRoute({ kind: "builder", id: q.id });
    setShowTemplate(false);
  }

  const cur = route.id ? list.find(q => q.id === route.id) : null;

  if (route.kind === "builder" && cur)   return <Builder q={cur} updateQ={p => updateQuestionnaire(cur.id, p)} back={() => setRoute({ kind: "list" })} goDistribute={() => setRoute({ kind: "distribute", id: cur.id })} goResults={() => setRoute({ kind: "results", id: cur.id })} />;
  if (route.kind === "distribute" && cur) return <Distribute q={cur} updateQ={p => updateQuestionnaire(cur.id, p)} back={() => setRoute({ kind: "builder", id: cur.id })} goResults={() => setRoute({ kind: "results", id: cur.id })} />;
  if (route.kind === "results" && cur)   return <Results q={cur} onOpenApp={onOpenApp} back={() => setRoute({ kind: "list" })} />;

  // LIST
  return (
    <div style={{ padding: "32px 40px 80px", maxWidth: 1500, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>§ 06 / Questionnaires</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 400, lineHeight: 1, letterSpacing: "-0.035em", color: "#0f172a" }}>Field data collection.</h1>
          <p style={{ marginTop: 12, fontSize: 14, color: "#475569", maxWidth: 760, lineHeight: 1.5 }}>
            Pick a template, customise the questions, send personal links to your users, collect answers — and let the AI analyst convert raw responses into scoring recommendations you can apply with one click.
          </p>
        </div>
        {can("edit") && <button onClick={() => setShowTemplate(true)} style={primaryBtn}>+ New questionnaire</button>}
      </div>
      <div style={{ height: 1, background: "#0f172a", marginBottom: 24 }} />

      {list.length === 0 ? (
        <EmptyState onPickTemplate={() => setShowTemplate(true)} onStartBlank={startBlank} />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 14 }}>
          {list.map(q => <QListCard key={q.id} q={q} onOpen={() => setRoute({ kind: "builder", id: q.id })}
            onResults={() => setRoute({ kind: "results", id: q.id })}
            onDistribute={() => setRoute({ kind: "distribute", id: q.id })}
            onDelete={() => { if (confirm("Delete questionnaire " + q.title + "?")) deleteQuestionnaire(q.id); }} />)}
        </div>
      )}

      {showTemplate && <TemplatePicker onClose={() => setShowTemplate(false)} onPick={startFromTemplate} onBlank={startBlank} />}
    </div>
  );
}

function EmptyState({ onPickTemplate, onStartBlank }) {
  return (
    <div style={{ background: "#fff", border: "1px dashed #cbd5e1", padding: 48, textAlign: "center", maxWidth: 720, margin: "40px auto 0" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", letterSpacing: ".18em", fontWeight: 600 }}>NOTHING YET</div>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 400, marginTop: 8, letterSpacing: "-0.03em" }}>No questionnaires</h3>
      <p style={{ fontSize: 13.5, color: "#64748b", marginTop: 10, lineHeight: 1.55 }}>Start from a template (utility, cloud readiness, SCOR coverage) or build one from scratch.</p>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 22 }}>
        <button onClick={onPickTemplate} style={primaryBtn}>Use a template</button>
        <button onClick={onStartBlank} style={ghostBtn}>Start blank</button>
      </div>
    </div>
  );
}

function QListCard({ q, onOpen, onResults, onDistribute, onDelete }) {
  const sent = (q.recipients || []).length;
  const got = (q.recipients || []).filter(r => r.responded).length;
  const rate = sent > 0 ? Math.round(got / sent * 100) : 0;
  const STATUS = { draft: { l: "DRAFT", c: "#64748b" }, active: { l: "ACTIVE", c: "#16a34a" }, closed: { l: "CLOSED", c: "#475569" }, analyzed: { l: "ANALYZED", c: "#7c3aed" } };
  const s = STATUS[q.status] || STATUS.draft;
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, fontWeight: 700, padding: "3px 7px", background: s.c, color: "#fff", letterSpacing: ".12em" }}>{s.l}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#94a3b8", letterSpacing: ".08em" }}>{q.id} · {(q.lang || "EN").toUpperCase()}</span>
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, color: "#0f172a", letterSpacing: "-0.02em", lineHeight: 1.15 }}>{q.title}</div>
        <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{(q.description || "").slice(0, 120)}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, padding: "10px 0", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", fontFamily: "var(--font-mono)" }}>
        <Stat n={q.questions?.length || 0} l="QUESTIONS" />
        <Stat n={(q.target_apps || []).length} l="APPS" />
        <Stat n={`${got}/${sent}`} l={`${rate}% RESP.`} />
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <button onClick={onOpen} style={{ ...ghostBtnSm, flex: 1 }}>Edit</button>
        <button onClick={onDistribute} style={{ ...ghostBtnSm, flex: 1 }}>Distribute</button>
        <button onClick={onResults} style={{ ...primaryBtn, padding: "7px 12px", fontSize: 10.5, flex: 1 }}>Results →</button>
        <button onClick={onDelete} style={{ ...ghostBtnSm, color: "#dc2626", borderColor: "#dc2626" }}>✕</button>
      </div>
    </div>
  );
}
function Stat({ n, l }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "#0f172a" }}>{n}</div>
      <div style={{ fontSize: 9.5, color: "#94a3b8", letterSpacing: ".12em", fontWeight: 600 }}>{l}</div>
    </div>
  );
}

function TemplatePicker({ onClose, onPick, onBlank }) {
  return (
    <Modal title="Start a questionnaire" onClose={onClose} footer={<button onClick={onClose} style={ghostBtn}>Cancel</button>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {QUESTIONNAIRE_TEMPLATES.map(t => (
          <button key={t.id} onClick={() => onPick(t)} style={{ textAlign: "left", padding: 18, background: "#fff", border: "1px solid #e2e8f0", cursor: "pointer", fontFamily: "inherit" }}
            onMouseEnter={e => e.currentTarget.style.background = "#fef2f2"}
            onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#dc2626", letterSpacing: ".15em", fontWeight: 700 }}>TEMPLATE · {t.id.toUpperCase()}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500, marginTop: 4, letterSpacing: "-0.02em" }}>{t.name}</div>
            <div style={{ fontSize: 12.5, color: "#475569", marginTop: 6, lineHeight: 1.5 }}>{t.description}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "#94a3b8", marginTop: 8, letterSpacing: ".06em" }}>{t.questions.length} questions · {t.target_audience}</div>
          </button>
        ))}
        <button onClick={onBlank} style={{ textAlign: "left", padding: 18, background: "#0f172a", color: "#fff", border: "1px solid #0f172a", cursor: "pointer", fontFamily: "inherit" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#fca5a5", letterSpacing: ".15em", fontWeight: 700 }}>FROM SCRATCH</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500, marginTop: 4, letterSpacing: "-0.02em" }}>Blank questionnaire</div>
          <div style={{ fontSize: 12.5, color: "#cbd5e1", marginTop: 6, lineHeight: 1.5 }}>Build your own questions from zero.</div>
        </button>
      </div>
    </Modal>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// BUILDER
// ════════════════════════════════════════════════════════════════════════════
function Builder({ q, updateQ, back, goDistribute, goResults }) {
  const { state } = useStore();
  const [draft, setDraft] = useState(q);
  useEffect(() => { setDraft(q); }, [q.id]);
  function set(patch) { const next = { ...draft, ...patch }; setDraft(next); updateQ(patch); }

  function addQuestion() {
    set({ questions: [...(draft.questions || []), { id: "n" + Date.now().toString(36), text: "New question", type: "scale", scale_min: 1, scale_max: 5, required: true, per_app: true }] });
  }
  function updateQuestion(i, patch) {
    const qs = draft.questions.map((q, j) => j === i ? { ...q, ...patch } : q);
    set({ questions: qs });
  }
  function removeQuestion(i) { set({ questions: draft.questions.filter((_, j) => j !== i) }); }
  function move(i, delta) {
    const qs = [...draft.questions]; const t = i + delta; if (t < 0 || t >= qs.length) return;
    [qs[i], qs[t]] = [qs[t], qs[i]]; set({ questions: qs });
  }

  return (
    <div style={{ padding: "32px 40px 80px", maxWidth: 1500, margin: "0 auto" }}>
      <PageHeader
        eyebrow={`§ 06 / Builder · ${q.id}`}
        title="Customise questionnaire"
        back={back}
        actions={<>
          <button onClick={goDistribute} style={ghostBtn}>Distribute →</button>
          <button onClick={goResults} style={primaryBtn}>Results</button>
        </>} />
      <div style={{ height: 1, background: "#0f172a", marginBottom: 24 }} />

      {/* Meta */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 22, marginBottom: 18 }}>
        <FormGrid>
          <Field label="Title"><input value={draft.title || ""} onChange={e => set({ title: e.target.value })} style={inputStyle} /></Field>
          <Field label="Language">
            <select value={draft.lang || "EN"} onChange={e => set({ lang: e.target.value })} style={inputStyle}><option>EN</option><option>DE</option><option>FR</option></select>
          </Field>
          <Field label="Anonymous responses">
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
              <input type="checkbox" checked={!!draft.anonymous} onChange={e => set({ anonymous: e.target.checked })} />
              <span>Hide respondent identity</span>
            </label>
          </Field>
          <Field label="Deadline">
            <input type="date" value={draft.deadline || ""} onChange={e => set({ deadline: e.target.value || null })} style={inputStyle} />
          </Field>
          <Field label="Status">
            <select value={draft.status || "draft"} onChange={e => set({ status: e.target.value })} style={inputStyle}>
              <option value="draft">Draft</option><option value="active">Active</option><option value="closed">Closed</option><option value="analyzed">Analyzed</option>
            </select>
          </Field>
        </FormGrid>
        <Field label="Description"><textarea value={draft.description || ""} onChange={e => set({ description: e.target.value })} style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} /></Field>
        <Field label={`Target applications (${(draft.target_apps || []).length} selected)`}>
          <AppPicker selected={draft.target_apps || []} onChange={ids => set({ target_apps: ids })} apps={state.apps} />
        </Field>
      </div>

      {/* Questions */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>Questions <span style={{ color: "#94a3b8", fontSize: 14 }}>· {(draft.questions || []).length}</span></h3>
          <button onClick={addQuestion} style={primaryBtn}>+ Add question</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {(draft.questions || []).map((q, i) => (
            <QuestionEditor key={q.id} q={q} index={i} onChange={p => updateQuestion(i, p)}
              onRemove={() => removeQuestion(i)} onUp={() => move(i, -1)} onDown={() => move(i, 1)} />
          ))}
          {(draft.questions || []).length === 0 && (
            <div style={{ padding: "32px 16px", textAlign: "center", color: "#94a3b8", fontSize: 13, border: "1px dashed #cbd5e1" }}>
              No questions yet. Click <strong>+ Add question</strong>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AppPicker({ selected, onChange, apps }) {
  const [search, setSearch] = useState("");
  const set = new Set(selected);
  const visible = apps.filter(a => !search || a.name.toLowerCase().includes(search.toLowerCase())).slice(0, 60);
  return (
    <div>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search apps to add…" style={{ ...inputStyle, marginBottom: 8 }} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
        {selected.map(id => {
          const a = apps.find(x => x.id === id);
          if (!a) return null;
          return (
            <span key={id} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 6px 4px 10px", background: "#0f172a", color: "#fff", fontSize: 11 }}>
              {a.name}
              <button onClick={() => onChange(selected.filter(x => x !== id))} style={{ background: "none", border: "none", color: "rgba(255,255,255,.7)", cursor: "pointer", padding: 0, fontSize: 10, fontFamily: "var(--font-mono)" }}>✕</button>
            </span>
          );
        })}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, maxHeight: 160, overflowY: "auto", padding: 4, border: "1px solid #f1f5f9" }}>
        {visible.map(a => set.has(a.id) ? null : (
          <button key={a.id} onClick={() => onChange([...selected, a.id])} style={{ padding: "3px 7px", background: "#fff", border: "1px solid #e2e8f0", fontSize: 11, cursor: "pointer", fontFamily: "inherit", color: "#475569" }}>
            + {a.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function QuestionEditor({ q, index, onChange, onRemove, onUp, onDown }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ border: "1px solid #e2e8f0", padding: 12 }}>
      <div style={{ display: "grid", gridTemplateColumns: "40px 1fr 180px auto", gap: 10, alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#dc2626", letterSpacing: ".08em" }}>Q{index + 1}</span>
        <input value={q.text} onChange={e => onChange({ text: e.target.value })} style={{ ...inputStyle, padding: "6px 8px" }} />
        <select value={q.type} onChange={e => onChange({ type: e.target.value })} style={{ ...inputStyle, padding: "6px 8px" }}>
          <option value="scale">Scale (1-5/1-10)</option>
          <option value="single">Single choice</option>
          <option value="multi">Multiple choice</option>
          <option value="text">Free text</option>
          <option value="matrix">Matrix</option>
        </select>
        <div style={{ display: "flex", gap: 4 }}>
          <button onClick={onUp} style={iconBtn}>↑</button>
          <button onClick={onDown} style={iconBtn}>↓</button>
          <button onClick={() => setExpanded(e => !e)} style={iconBtn}>{expanded ? "▴" : "▾"}</button>
          <button onClick={onRemove} style={{ ...iconBtn, color: "#dc2626" }}>✕</button>
        </div>
      </div>
      {expanded && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px dotted #cbd5e1", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            <input type="checkbox" checked={!!q.required} onChange={e => onChange({ required: e.target.checked })} /> Required
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            <input type="checkbox" checked={!!q.per_app} onChange={e => onChange({ per_app: e.target.checked })} /> Asked per app
          </label>
          {q.type === "text" && (
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
              <input type="checkbox" checked={!!q.multiline} onChange={e => onChange({ multiline: e.target.checked })} /> Multiline
            </label>
          )}
          {q.type === "scale" && <>
            <Field label="Min"><input type="number" value={q.scale_min || 1} onChange={e => onChange({ scale_min: parseInt(e.target.value) || 1 })} style={inputStyle} /></Field>
            <Field label="Max"><input type="number" value={q.scale_max || 5} onChange={e => onChange({ scale_max: parseInt(e.target.value) || 5 })} style={inputStyle} /></Field>
            <Field label="Labels (min,max)"><input value={(q.labels || []).join(",")} onChange={e => onChange({ labels: e.target.value.split(",").map(s => s.trim()) })} style={inputStyle} placeholder="Very poor,Excellent" /></Field>
          </>}
          {(q.type === "single" || q.type === "multi") && (
            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Options (one per line)"><textarea value={(q.options || []).join("\n")} onChange={e => onChange({ options: e.target.value.split("\n").map(s => s.trim()).filter(Boolean) })} style={{ ...inputStyle, minHeight: 70, fontFamily: "var(--font-sans)", fontSize: 13 }} /></Field>
            </div>
          )}
          {q.type === "matrix" && (
            <div style={{ gridColumn: "1 / -1", padding: 10, background: "#fef3c7", fontSize: 11, color: "#92400e", fontFamily: "var(--font-mono)", letterSpacing: ".04em" }}>
              Matrix type — apps in rows, criteria in columns. Rows come from the target_apps list; configure column criteria here: 
              <input value={(q.criteria || []).join(",")} onChange={e => onChange({ criteria: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                style={{ ...inputStyle, marginTop: 6, fontSize: 12 }} placeholder="Quality, Speed, Cost" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
const iconBtn = { padding: "4px 8px", border: "1px solid #cbd5e1", background: "#fff", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 12 };

// ════════════════════════════════════════════════════════════════════════════
// DISTRIBUTE — copy with feedback, Outlook (mailto), Teams (deep link), QR
// ════════════════════════════════════════════════════════════════════════════
function Distribute({ q, updateQ, back, goResults }) {
  const { state, importResponse, sharedAvailable } = useStore();
  const [recipients, setRecipients] = useState(q.recipients || []);
  const [form, setForm] = useState({ name: "", email: "", site: "MUC", department: "" });
  const [bcc, setBcc] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showFallback, setShowFallback] = useState(false);
  const [adminEmail, setAdminEmail] = useState(q.admin_email || "");
  useEffect(() => { setRecipients(q.recipients || []); setAdminEmail(q.admin_email || ""); }, [q.id]);

  function pushRecipients(items) {
    const next = [...recipients, ...items.map(r => ({ id: "rcp_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), responded: false, responded_at: null, token: makeToken(), ...r }))];
    setRecipients(next); updateQ({ recipients: next });
  }
  function removeRecipient(id) {
    const next = recipients.filter(r => r.id !== id);
    setRecipients(next); updateQ({ recipients: next });
    setSelectedIds(ids => ids.filter(x => x !== id));
  }
  function importByRole(role) {
    const list = state.users.filter(u => u.active && (role === "ALL" || u.role === role));
    pushRecipients(list.map(u => ({ name: u.name, email: u.email, site: u.sites[0] || "MUC", department: u.role })));
  }
  function toggleSel(id) { setSelectedIds(ids => ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]); }
  function selectAll() { setSelectedIds(recipients.map(r => r.id)); }
  function clearSel()  { setSelectedIds([]); }

  const baseLink = window.location.origin + window.location.pathname;
  function linkFor(token) { return `${baseLink}#r=${token}`; }

  const sent = recipients.length;
  const responded = recipients.filter(r => r.responded).length;
  const pending = sent - responded;

  function buildDistribution() {
    const targets = recipients.filter(r => !r.responded && (selectedIds.length === 0 || selectedIds.includes(r.id)));
    return targets;
  }
  function openOutlookBulk() {
    const t = buildDistribution();
    if (t.length === 0) return alert("No pending recipients. Add some in the table below.");
    if (t.length > 5 && !confirm(`Open ${t.length} mail drafts in sequence?`)) return;
    t.forEach((r, i) => {
      const subject = emailSubject(q);
      const body = emailBody(q, linkFor(r.token), r.name);
      const to = bcc ? "" : r.email;
      const bccPart = bcc ? `&bcc=${encodeURIComponent(r.email)}` : "";
      const url = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}${bccPart}`;
      setTimeout(() => window.open(url, "_blank"), i * 250);
    });
  }
  function openTeamsBulk() {
    const t = buildDistribution();
    if (t.length === 0) return alert("No pending recipients. Add some in the table below.");
    const users = t.map(r => r.email).filter(Boolean).join(",");
    const message = `Hi! Please complete this short survey for our SCM architecture review. Each of you has a personal link — please use yours (copy it from the email I'll send next).`;
    const url = `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(users)}&message=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }
  function copyFirstLink() {
    const t = buildDistribution();
    if (t.length === 0) return alert("No pending recipients yet. Add one in the table below — the link becomes available immediately.");
    const r = t[0];
    copyToClipboard(linkFor(r.token));
    alert(`Copied link for ${r.name}.\nPer-recipient links are also in the table below.`);
  }
  function downloadHtml() {
    downloadStandaloneHtml(q, state.apps, { adminEmail, deadline: q.deadline });
  }

  return (
    <div style={{ padding: "32px 40px 80px", maxWidth: 1500, margin: "0 auto" }}>
      <PageHeader eyebrow={`§ 06 / Distribute · ${q.id}`} title={q.title} back={back}
        actions={<button onClick={goResults} style={primaryBtn}>Results →</button>} />
      <div style={{ height: 1, background: "#0f172a", marginBottom: 24 }} />

      {/* Shared-storage availability banner */}
      <div style={{
        padding: "10px 16px", marginBottom: 18, fontSize: 12.5, lineHeight: 1.55,
        background: sharedAvailable ? "#dcfce7" : "#fef3c7",
        borderLeft: "3px solid " + (sharedAvailable ? "#16a34a" : "#ca8a04"),
        color: sharedAvailable ? "#14532d" : "#7c2d12",
      }}>
        <strong style={{ fontFamily: "var(--font-mono)", letterSpacing: ".06em", fontSize: 11 }}>
          {sharedAvailable ? "✓ SHARED MODE" : "⚠ LOCAL MODE"}
        </strong>{" "}
        {sharedAvailable
          ? "Survey links work for any recipient — responses arrive directly in this tool and refresh automatically."
          : "Shared storage is not available in this build. Survey links will only work on the same browser as this admin session — for true multi-user, deploy to an environment with shared artifact storage. Use the fallback panel below for an offline workflow."}
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid #e2e8f0", marginBottom: 18 }}>
        <KPICard label="Recipients" value={sent} />
        <KPICard label="Responses" value={responded} accent="#16a34a" />
        <KPICard label="Pending" value={pending} accent="#dc2626" />
        <KPICard label="Response rate" value={sent > 0 ? Math.round(responded / sent * 100) + "%" : "—"} />
      </div>

      {/* PRIMARY DISTRIBUTION PANEL — link-based */}
      <div style={{ background: "#fff", border: "1px solid #0f172a", padding: 22, marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#dc2626", letterSpacing: ".18em", fontWeight: 700, marginBottom: 4 }}>DISTRIBUTE · SURVEY LINK</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>Share a one-click survey link</h3>
            <p style={{ fontSize: 12.5, color: "#64748b", marginTop: 6, lineHeight: 1.55, maxWidth: 600 }}>
              Each recipient gets a personal <code style={{ fontFamily: "var(--font-mono)", background: "#fafbfc", padding: "1px 6px" }}>#r=&lt;token&gt;</code> link.
              They click, fill in the form, hit submit — done. Responses arrive in <strong style={{ color: "#0f172a" }}>Results</strong> automatically.
            </p>
            <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 10, lineHeight: 1.55 }}>
              {selectedIds.length > 0
                ? <><strong style={{ color: "#0f172a" }}>{selectedIds.length}</strong> recipient{selectedIds.length === 1 ? "" : "s"} selected for bulk send. </>
                : pending > 0
                  ? <>All <strong style={{ color: "#0f172a" }}>{pending}</strong> pending recipient{pending === 1 ? "" : "s"} will be targeted. </>
                  : <>Add at least one recipient below to enable bulk send.</>}
            </p>
            <label style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 6, fontSize: 12.5, color: "#475569" }}>
              <input type="checkbox" checked={bcc} onChange={e => setBcc(e.target.checked)} />
              Hide recipients from each other (Bcc)
            </label>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "stretch", minWidth: 240 }}>
            <button onClick={copyFirstLink} disabled={pending === 0} style={{ ...primaryBtn, background: pending === 0 ? "#94a3b8" : "#dc2626", borderColor: pending === 0 ? "#94a3b8" : "#dc2626", padding: "12px 18px", fontSize: 12, justifyContent: "center", textAlign: "center", cursor: pending === 0 ? "not-allowed" : "pointer" }}>
              📋 Copy survey link
            </button>
            <button onClick={openOutlookBulk} disabled={pending === 0} style={{ ...primaryBtn, opacity: pending === 0 ? .5 : 1, cursor: pending === 0 ? "not-allowed" : "pointer" }}>📧 Send via Outlook</button>
            <button onClick={openTeamsBulk} disabled={pending === 0} style={{ ...primaryBtn, background: "#6264a7", borderColor: "#6264a7", opacity: pending === 0 ? .5 : 1, cursor: pending === 0 ? "not-allowed" : "pointer" }}>💬 Send via Teams</button>
            <CopyButton text={`Subject: ${emailSubject(q)}\n\n${emailBody(q, "<PERSONAL LINK>", "<NAME>")}`} label="📋 Copy email template" labelCopied="✓ Copied" />
          </div>
        </div>
      </div>

      {/* Add recipients */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 22 }}>
          <h4 style={subH}>Add recipient manually</h4>
          <FormGrid>
            <Field label="Name"><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} /></Field>
            <Field label="Email"><input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} /></Field>
            <Field label="Site">
              <select value={form.site} onChange={e => setForm({ ...form, site: e.target.value })} style={inputStyle}>
                {state.sites.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </Field>
            <Field label="Department"><input value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} style={inputStyle} placeholder="e.g. SCM, IT, Operations" /></Field>
          </FormGrid>
          <button onClick={() => { if (!form.name.trim() || !form.email.trim()) return alert("Name and email required"); pushRecipients([form]); setForm({ name: "", email: "", site: form.site, department: form.department }); }} style={{ ...primaryBtn, marginTop: 4 }}>+ Add</button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 22 }}>
          <h4 style={subH}>Import from settings users</h4>
          <p style={{ fontSize: 12.5, color: "#64748b", marginBottom: 10 }}>Pull users by role from the Settings module.</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["ALL", "Admin", "Editor", "Viewer"].map(r => (
              <button key={r} onClick={() => importByRole(r)} style={ghostBtnSm}>Import {r}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Email template preview */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 22, marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <h4 style={subH}>Email template preview</h4>
          <CopyButton text={`Subject: ${emailSubject(q)}\n\n` + emailBody(q, "<PERSONAL LINK>", "<NAME>")} label="Copy full template" labelCopied="✓ Copied" compact />
        </div>
        <div style={{ padding: 14, background: "#fafbfc", border: "1px solid #e2e8f0", fontFamily: "var(--font-mono)", fontSize: 12, whiteSpace: "pre-wrap", color: "#475569", lineHeight: 1.55 }}>
{`Subject: ${emailSubject(q)}\n\n${emailBody(q, "<PERSONAL LINK>", "<NAME>")}`}
        </div>
      </div>

      {/* Recipients table */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", overflow: "hidden", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", padding: "8px 12px", background: "#fafbfc", borderBottom: "1px solid #e2e8f0", gap: 12 }}>
          <button onClick={selectAll} style={{ ...ghostBtnSm, fontSize: 10 }}>Select all</button>
          <button onClick={clearSel} style={{ ...ghostBtnSm, fontSize: 10 }}>Clear</button>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#94a3b8", letterSpacing: ".06em" }}>{selectedIds.length} selected · {pending} pending</span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#0f172a", color: "#fff" }}>
              {["", "Name", "Email", "Site", "Dept", "Status", "Actions"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recipients.map((r, i) => {
              const link = linkFor(r.token);
              const subject = emailSubject(q);
              const body = emailBody(q, link, r.name);
              const mailto = `mailto:${r.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
              const teamsUrl = `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(r.email || "")}&message=${encodeURIComponent(body)}`;
              const sel = selectedIds.includes(r.id);
              return (
                <tr key={r.id} style={{ borderBottom: "1px solid #f1f5f9", background: sel ? "#fef2f2" : i % 2 ? "#fafbfc" : "#fff" }}>
                  <td style={{ padding: "8px 12px" }}>
                    <input type="checkbox" checked={sel} onChange={() => toggleSel(r.id)} disabled={r.responded} />
                  </td>
                  <td style={{ padding: "8px 12px", fontSize: 13, fontWeight: 500, color: "#0f172a" }}>
                    {r.name}
                    {r.imported && <span style={{ marginLeft: 6, fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700, padding: "2px 5px", background: "#7c3aed", color: "#fff", letterSpacing: ".1em" }}>IMPORTED</span>}
                  </td>
                  <td style={{ padding: "8px 12px", fontFamily: "var(--font-mono)", fontSize: 12, color: "#475569" }}>{r.email || "—"}</td>
                  <td style={{ padding: "8px 12px" }}><SiteChips sites={[r.site]} /></td>
                  <td style={{ padding: "8px 12px", fontSize: 12, color: "#475569" }}>{r.department || "—"}</td>
                  <td style={{ padding: "8px 12px" }}>
                    {r.responded ? <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, padding: "3px 6px", background: "#16a34a", color: "#fff", letterSpacing: ".1em" }}>RESPONDED</span>
                                : <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, padding: "3px 6px", background: "#94a3b8", color: "#fff", letterSpacing: ".1em" }}>PENDING</span>}
                  </td>
                  <td style={{ padding: "8px 12px" }}>
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      {r.token && <CopyButton text={link} label="🔗" labelCopied="✓" compact title="Copy personal survey link" />}
                      <CopyButton text={`Subject: ${subject}\n\n${body}`} label="✉" labelCopied="✓" compact title="Copy email body+subject" />
                      <a href={mailto} style={iconBtn} title="Open in Outlook">📧</a>
                      <a href={teamsUrl} target="_blank" rel="noreferrer" style={iconBtn} title="Open Teams">💬</a>
                      {r.token && <button onClick={() => window.open(link, "_blank")} style={iconBtn} title="Preview survey">↗</button>}
                      <button onClick={() => removeRecipient(r.id)} style={{ ...iconBtn, color: "#dc2626" }} title="Remove">✕</button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {recipients.length === 0 && <tr><td colSpan="7" style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>No recipients yet.</td></tr>}
          </tbody>
        </table>
      </div>

      {/* ─── FALLBACK PANEL (collapsed by default) ─── */}
      <details open={showFallback} onToggle={e => setShowFallback(e.currentTarget.open)} style={{ background: "#fafbfc", border: "1px dashed #cbd5e1", padding: "12px 18px", marginBottom: 18 }}>
        <summary style={{ cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14 }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#94a3b8", letterSpacing: ".18em", fontWeight: 700 }}>OFFLINE FALLBACKS</div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, color: "#0f172a" }}>Download HTML &middot; Paste responses manually</span>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#64748b" }}>{showFallback ? "▴ hide" : "▾ show"}</span>
        </summary>
        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 16 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#dc2626", letterSpacing: ".14em", fontWeight: 700, marginBottom: 6 }}>OPTION A · STANDALONE HTML</div>
            <div style={{ fontSize: 13, color: "#0f172a", fontWeight: 500, marginBottom: 6 }}>Send the questionnaire as a file</div>
            <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.55, marginBottom: 10 }}>Use this only when the recipient cannot reach the live link (offline workshop, strict corporate firewall, anonymous in-person session). They fill it locally and email a JSON blob back.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10, maxWidth: 360 }}>
              <Field label="Admin email shown to respondents">
                <input value={adminEmail}
                  onChange={e => { setAdminEmail(e.target.value); updateQ({ admin_email: e.target.value }); }}
                  placeholder="e.g. architecture@asmpt.com" style={inputStyle} />
              </Field>
            </div>
            <button onClick={downloadHtml} style={ghostBtn}>⬇ Download standalone HTML</button>
          </div>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 16 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#7c3aed", letterSpacing: ".14em", fontWeight: 700, marginBottom: 6 }}>OPTION B · IMPORT JSON</div>
            <div style={{ fontSize: 13, color: "#0f172a", fontWeight: 500, marginBottom: 6 }}>Paste a JSON response received by email</div>
            <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.55, marginBottom: 10 }}>When a recipient sends back the JSON produced by the standalone file, paste it below to merge it into the central store.</p>
            <ImportResponsesPanel q={q} importResponse={importResponse} compact />
          </div>
        </div>
      </details>
    </div>
  );
}

// ─── Import Responses panel ──────────────────────────────────────────────────
function ImportResponsesPanel({ q, importResponse, compact }) {
  const [paste, setPaste] = useState("");
  const [feedback, setFeedback] = useState(null); // { ok, msg }
  const fileRef = useRef(null);

  // Build the import history straight from the responses table:
  // any response whose recipient.imported === true counts as "imported".
  const imported = (q.recipients || []).filter(r => r.imported);
  const importedCount = (q.responses || []).filter(r => r.imported || (q.recipients || []).find(x => x.id === r.recipient_id)?.imported).length;

  function doImport(raw) {
    setFeedback(null);
    if (!raw || !raw.trim()) { setFeedback({ ok: false, msg: "Paste a JSON payload first." }); return; }
    let payload;
    try {
      payload = JSON.parse(raw.trim());
    } catch (e) {
      // Be forgiving — try to extract first {...} block (users sometimes copy with email surrounding text)
      const m = raw.match(/\{[\s\S]*\}/);
      if (!m) { setFeedback({ ok: false, msg: "Could not parse JSON. Make sure you copied the full block." }); return; }
      try { payload = JSON.parse(m[0]); }
      catch (e2) { setFeedback({ ok: false, msg: "Invalid JSON: " + e2.message }); return; }
    }
    if (!payload || typeof payload !== "object") { setFeedback({ ok: false, msg: "Payload must be a JSON object." }); return; }
    if (payload.questionnaire_id && payload.questionnaire_id !== q.id) {
      const proceed = confirm(`This payload targets questionnaire "${payload.questionnaire_id}" but you are on "${q.id}". Import anyway?`);
      if (!proceed) return;
    }
    if (!payload.respondent || !payload.respondent.name) { setFeedback({ ok: false, msg: "Payload is missing respondent.name." }); return; }
    if (!Array.isArray(payload.responses) || payload.responses.length === 0) {
      // Tolerate a flat { answers: {} } shape
      if (payload.answers && typeof payload.answers === "object") {
        payload.responses = [{ app_id: null, answers: payload.answers }];
      } else {
        setFeedback({ ok: false, msg: "Payload has no responses[]." }); return;
      }
    }
    // Override the questionnaire_id to match the one we're viewing
    payload.questionnaire_id = q.id;
    const r = importResponse(payload);
    if (r.ok) {
      setFeedback({ ok: true, msg: `Imported ${r.count} response row${r.count === 1 ? "" : "s"} for ${payload.respondent.name} (${payload.respondent.site || "?"}).` });
      setPaste("");
    } else {
      setFeedback({ ok: false, msg: "Import failed." });
    }
  }

  function onFile(e) {
    const f = e.target.files?.[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => doImport(String(reader.result || ""));
    reader.readAsText(f);
    e.target.value = "";
  }

  const samplePayload = {
    questionnaire_id: q.id,
    respondent: { name: "<respondent name>", site: "MUC", email: "" },
    submitted_at: new Date().toISOString(),
    responses: [
      ...(q.target_apps || []).slice(0, 1).map(id => ({ app_id: id, answers: { "<question-id>": "<value>" } })),
      { app_id: null, answers: { "<question-id>": "<value>" } },
    ],
  };

  return (
    <div style={compact
      ? { background: "transparent", border: "none", padding: 0, marginBottom: 0 }
      : { background: "#fff", border: "1px solid #0f172a", padding: 22, marginBottom: 18 }}>
      {!compact && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, flexWrap: "wrap", marginBottom: 12 }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#7c3aed", letterSpacing: ".18em", fontWeight: 700, marginBottom: 4 }}>IMPORT RESPONSES</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>Paste the JSON your recipient sent back</h3>
            <p style={{ fontSize: 12.5, color: "#64748b", marginTop: 6, lineHeight: 1.55, maxWidth: 600 }}>
              When a respondent submits the standalone HTML, they paste their JSON into a reply email.
              Drop it here and we'll merge it into the central store — same source of truth used by Results and the AI analyst.
            </p>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#475569", textAlign: "right", lineHeight: 1.7 }}>
            <div><strong style={{ color: "#7c3aed" }}>{imported.length}</strong> imported respondent{imported.length === 1 ? "" : "s"}</div>
            <div><strong style={{ color: "#7c3aed" }}>{importedCount}</strong> imported response row{importedCount === 1 ? "" : "s"}</div>
          </div>
        </div>
      )}

      <textarea value={paste} onChange={e => setPaste(e.target.value)}
        placeholder={"Paste JSON here, e.g.\n\n" + JSON.stringify(samplePayload, null, 2)}
        style={{ ...inputStyle, width: "100%", minHeight: compact ? 110 : 160, fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.5 }} />

      <div style={{ marginTop: 10, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={() => doImport(paste)} style={{ ...primaryBtn, background: "#7c3aed", borderColor: "#7c3aed" }}>Import response</button>
        <button onClick={() => fileRef.current?.click()} style={ghostBtn}>⬆ Load .json file</button>
        <input ref={fileRef} type="file" accept=".json,application/json,text/plain" onChange={onFile} style={{ display: "none" }} />
        <button onClick={() => setPaste("")} style={ghostBtnSm}>Clear</button>
        {feedback && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, letterSpacing: ".06em",
            padding: "6px 10px",
            background: feedback.ok ? "#dcfce7" : "#fef2f2",
            color: feedback.ok ? "#14532d" : "#7f1d1d",
            border: "1px solid " + (feedback.ok ? "#86efac" : "#fecaca") }}>
            {feedback.ok ? "✓ " : "✕ "}{feedback.msg}
          </span>
        )}
      </div>

      {imported.length > 0 && !compact && (
        <div style={{ marginTop: 18, padding: "14px 16px", background: "#fafbfc", border: "1px solid #e2e8f0" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#7c3aed", letterSpacing: ".14em", fontWeight: 700, marginBottom: 8 }}>IMPORT HISTORY · LAST {Math.min(imported.length, 6)}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {imported.slice().reverse().slice(0, 6).map(r => {
              const rows = (q.responses || []).filter(x => x.recipient_id === r.id).length;
              return (
                <div key={r.id} style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr auto", gap: 14, fontSize: 12, alignItems: "center" }}>
                  <span style={{ fontWeight: 500, color: "#0f172a" }}>{r.name}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#475569" }}>{r.site} · {r.department || "External"}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#64748b" }}>{r.responded_at ? new Date(r.responded_at).toLocaleString() : "—"}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#7c3aed", fontWeight: 700 }}>{rows} row{rows === 1 ? "" : "s"}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {imported.length > 0 && compact && (
        <div style={{ marginTop: 10, fontFamily: "var(--font-mono)", fontSize: 10.5, color: "#7c3aed", letterSpacing: ".06em" }}>
          ✓ {imported.length} imported respondent{imported.length === 1 ? "" : "s"} · {importedCount} row{importedCount === 1 ? "" : "s"}
        </div>
      )}
    </div>
  );
}

function emailSubject(q) {
  return `Application Assessment Survey — ${q.title} — Action Required`;
}
function emailBody(q, link, recipientName) {
  return `Dear ${recipientName || "colleague"},

As part of our SCM architecture review at ASMPT SMT, we are evaluating the applications used across our sites. Your feedback is essential to make informed decisions.

Please take 5–10 minutes to complete the survey — just click the link below, fill in your answers, and hit Submit. Your responses are recorded automatically.

${link}
${q.deadline ? `\nDeadline: ${q.deadline}\n` : ""}
Your responses will help us:
• Identify improvement opportunities
• Prioritise our IT roadmap
• Ensure the right tools support your daily work

Thank you for your contribution.

Best regards,
${currentUserName()}
ASMPT SMT — IT Architecture Team`;
}
function currentUserName() {
  try { return JSON.parse(localStorage.getItem("asmpt_artefact_store_v5") || "{}").users?.find(u => u.id === JSON.parse(localStorage.getItem("asmpt_artefact_store_v5") || "{}").current_user_id)?.name || "Artéfact team"; } catch { return "Artéfact team"; }
}

function QrModal({ link, q, recipients, onClose }) {
  const [picked, setPicked] = useState("generic");
  const url = picked === "generic"
    ? (link + "<TOKEN>").replace("<TOKEN>", "")    // empty token = nav root; user explains it's the survey landing
    : recipients.find(r => r.id === picked) ? link + recipients.find(r => r.id === picked).token : link;
  const displayLink = picked === "generic"
    ? window.location.origin + window.location.pathname + "#r=<personal-token>"
    : url;
  return (
    <Modal title="QR code" onClose={onClose} footer={<button onClick={onClose} style={ghostBtn}>Close</button>}>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 24 }}>
        <div style={{ padding: 16, background: "#fafbfc", border: "1px solid #e2e8f0", display: "inline-block" }}>
          <QrCode text={picked === "generic" ? (window.location.origin + window.location.pathname) : url} size={220} />
        </div>
        <div>
          <Field label="Encode link for">
            <select value={picked} onChange={e => setPicked(e.target.value)} style={inputStyle}>
              <option value="generic">Generic survey URL (in-person workshop landing page)</option>
              {recipients.filter(r => !r.responded).map(r => (
                <option key={r.id} value={r.id}>{r.name} — personal link</option>
              ))}
            </select>
          </Field>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#475569", padding: "8px 12px", background: "#fef2f2", marginBottom: 14, wordBreak: "break-all" }}>{displayLink}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => downloadQrPng(picked === "generic" ? (window.location.origin + window.location.pathname) : url, 600, `survey-${q.id}-${picked}.png`)} style={primaryBtn}>↓ Download PNG</button>
            <CopyButton text={displayLink} label="Copy link" labelCopied="✓ Copied" />
          </div>
          <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 16, lineHeight: 1.55 }}>
            For a workshop, print the generic QR. For individual outreach, switch to a recipient and use their personal QR — each one carries its own token.
          </p>
        </div>
      </div>
    </Modal>
  );
}

function makeToken() {
  // 8 chars base36 token
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// ════════════════════════════════════════════════════════════════════════════
// RESULTS + AI ANALYSIS
// ════════════════════════════════════════════════════════════════════════════
function Results({ q, onOpenApp, back }) {
  const { state, addAiAnalysis, markAnalysisApplied, setAppField } = useStore();
  const [aiBusy, setAiBusy] = useState(false);
  const [aiError, setAiError] = useState(null);
  const analyses = (state.ai_analyses || []).filter(a => a.questionnaire_id === q.id).sort((a, b) => b.created_at.localeCompare(a.created_at));
  const [activeAnalysis, setActiveAnalysis] = useState(analyses[0] || null);
  useEffect(() => { setActiveAnalysis(analyses[0] || null); }, [analyses.length, q.id]);

  const sent = (q.recipients || []).length;
  const got = (q.recipients || []).filter(r => r.responded).length;

  // Group responses
  const stats = useMemo(() => {
    const out = { perQuestion: {}, perApp: {}, bySite: {} };
    (q.questions || []).forEach(qu => { out.perQuestion[qu.id] = []; });
    (q.responses || []).forEach(r => {
      const recipient = (q.recipients || []).find(x => x.id === r.recipient_id);
      const site = recipient?.site || "?";
      out.bySite[site] = (out.bySite[site] || 0) + 1;
      Object.entries(r.answers || {}).forEach(([qid, v]) => {
        if (!out.perQuestion[qid]) out.perQuestion[qid] = [];
        out.perQuestion[qid].push({ value: v, recipient: r.recipient_id, app: r.app_id });
      });
      if (r.app_id) {
        out.perApp[r.app_id] = out.perApp[r.app_id] || [];
        out.perApp[r.app_id].push(r);
      }
    });
    return out;
  }, [q]);

  async function runAi() {
    setAiBusy(true); setAiError(null);
    try {
      const data = buildAiPayload(q, state.apps);
      const prompt = `You are an EA / SCM analyst expert at ASMPT SMT (high-tech, multi-site Munich/UK/SGP/MAL). Context: AWS migration in progress, S/4HANA introduction, 137 SCM applications, TOGAF + SCOR framework.

Analyse the survey responses below and produce a single JSON object (no markdown, no commentary) matching this schema:
{
  "executive_summary": "3-5 sentences",
  "per_app_analysis": [{
    "app_id": "APP-...",
    "app_name": "...",
    "utility_score": 1-5,
    "satisfaction_score": 1-5,
    "pain_points": ["..."],
    "strengths": ["..."],
    "risk_level": "low|medium|high|critical",
    "recommendation": "Invest|Sustain|Replace|Eliminate",
    "recommendation_rationale": "...",
    "suggested_time_category": "Tolerate|Invest|Migrate|Eliminate",
    "suggested_pace_layer": "SoR|SoD|SoI"
  }],
  "cross_cutting_insights": ["..."],
  "site_comparison": { "gaps": ["..."], "best_practices": ["..."] },
  "priority_actions": [{ "action": "...", "impact": "high|medium|low", "effort": "high|medium|low", "apps_concerned": ["..."] }]
}

Survey data:
${JSON.stringify(data, null, 2)}`;
      const raw = await window.claude.complete(prompt);
      // Strip code fences if present
      const cleaned = raw.replace(/^```(?:json)?\s*|\s*```$/g, "").trim();
      let report;
      try { report = JSON.parse(cleaned); }
      catch (e) {
        // Try to extract first {...} block
        const m = cleaned.match(/\{[\s\S]*\}/);
        if (!m) throw new Error("Could not parse JSON from AI response");
        report = JSON.parse(m[0]);
      }
      const created = addAiAnalysis({ questionnaire_id: q.id, questionnaire_title: q.title, report, model: "claude-haiku-4-5" });
      setActiveAnalysis(created);
    } catch (e) {
      setAiError(String(e.message || e));
    } finally {
      setAiBusy(false);
    }
  }

  return (
    <div style={{ padding: "32px 40px 80px", maxWidth: 1700, margin: "0 auto" }}>
      <PageHeader eyebrow={`§ 06 / Results · ${q.id}`} title={q.title} back={back}
        actions={<>
          <button onClick={() => exportRespCsv(q)} style={ghostBtn}>↓ CSV</button>
          <button onClick={runAi} disabled={aiBusy || (q.responses || []).length === 0} style={(aiBusy || (q.responses || []).length === 0) ? { ...primaryBtn, opacity: .4, cursor: "not-allowed" } : primaryBtn}>
            {aiBusy ? "Analyzing…" : "✦ Analyze with AI"}
          </button>
        </>} />
      <div style={{ height: 1, background: "#0f172a", marginBottom: 24 }} />

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", border: "1px solid #e2e8f0", marginBottom: 24 }}>
        <KPICard label="Recipients" value={sent} />
        <KPICard label="Responses" value={got} accent="#16a34a" />
        <KPICard label="Response rate" value={sent > 0 ? Math.round(got / sent * 100) + "%" : "—"} />
        <KPICard label="Apps covered" value={Object.keys(stats.perApp).length} />
        <KPICard label="AI analyses" value={analyses.length} />
      </div>

      {aiError && (
        <div style={{ padding: 14, background: "#fef2f2", border: "1px solid #fecaca", color: "#7f1d1d", marginBottom: 18 }}>
          <strong>AI analysis failed: </strong>{aiError}
        </div>
      )}

      {(q.responses || []).length === 0 ? (
        <div style={{ padding: 60, background: "#fff", border: "1px dashed #cbd5e1", textAlign: "center", color: "#94a3b8" }}>
          No responses yet. Once recipients submit their answers, results & AI analysis become available.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <ResultsRaw q={q} stats={stats} sites={state.sites} />
          <ResultsByApp q={q} stats={stats} apps={state.apps} onOpenApp={onOpenApp} />
        </div>
      )}

      {activeAnalysis && (
        <AnalysisPanel a={activeAnalysis} analyses={analyses} setActive={setActiveAnalysis}
          markApplied={ids => markAnalysisApplied(activeAnalysis.id, ids)} setAppField={setAppField}
          apps={state.apps} onOpenApp={onOpenApp} />
      )}
    </div>
  );
}

function ResultsRaw({ q, stats, sites }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 22 }}>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, marginBottom: 14, letterSpacing: "-0.02em" }}>Per question</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {(q.questions || []).map((qu, i) => {
          const answers = stats.perQuestion[qu.id] || [];
          if (answers.length === 0) return null;
          return (
            <div key={qu.id}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#dc2626", letterSpacing: ".12em", fontWeight: 700 }}>Q{i + 1} · {answers.length} answer{answers.length === 1 ? "" : "s"}</div>
              <div style={{ fontSize: 13, color: "#0f172a", marginTop: 4, marginBottom: 8 }}>{qu.text}</div>
              {qu.type === "scale" && <ScaleDist answers={answers.map(a => parseFloat(a.value)).filter(v => !isNaN(v))} min={qu.scale_min || 1} max={qu.scale_max || 5} />}
              {(qu.type === "single") && <ChoiceDist answers={answers.map(a => a.value)} options={qu.options || []} />}
              {(qu.type === "multi")  && <ChoiceDist answers={answers.flatMap(a => Array.isArray(a.value) ? a.value : [a.value])} options={qu.options || []} />}
              {qu.type === "text"   && <TextSamples answers={answers.map(a => a.value).filter(Boolean)} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScaleDist({ answers, min, max }) {
  const buckets = {}; for (let i = min; i <= max; i++) buckets[i] = 0;
  answers.forEach(v => { buckets[Math.round(v)] = (buckets[Math.round(v)] || 0) + 1; });
  const total = answers.length;
  const avg = (answers.reduce((s, v) => s + v, 0) / Math.max(1, total)).toFixed(2);
  const maxCount = Math.max(...Object.values(buckets), 1);
  return (
    <div>
      <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 60, marginBottom: 4 }}>
        {Object.entries(buckets).map(([k, v]) => (
          <div key={k} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ height: (v / maxCount * 50) + "px", background: "#0f172a", width: "100%" }} title={`${v} answers`} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "#94a3b8" }}>{k}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#0f172a", fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", fontWeight: 600 }}>Average: {avg}/{max}</div>
    </div>
  );
}
function ChoiceDist({ answers, options }) {
  const tally = {}; options.forEach(o => tally[o] = 0); answers.forEach(a => { tally[a] = (tally[a] || 0) + 1; });
  const sum = answers.length || 1;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {Object.entries(tally).sort((a, b) => b[1] - a[1]).map(([o, n]) => (
        <div key={o}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 2 }}>
            <span style={{ color: "#0f172a" }}>{o}</span>
            <span style={{ fontFamily: "var(--font-mono)", color: "#475569" }}>{n} · {Math.round(n / sum * 100)}%</span>
          </div>
          <div style={{ height: 6, background: "#f1f5f9" }}><div style={{ width: (n / sum * 100) + "%", height: 6, background: "#0f172a" }} /></div>
        </div>
      ))}
    </div>
  );
}
function TextSamples({ answers }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 160, overflow: "auto", padding: 8, background: "#fafbfc", border: "1px solid #f1f5f9" }}>
      {answers.slice(0, 8).map((a, i) => (
        <div key={i} style={{ fontSize: 12, color: "#475569", lineHeight: 1.5, padding: "4px 0", borderBottom: i < 7 ? "1px dotted #cbd5e1" : "none" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#dc2626", marginRight: 6, letterSpacing: ".12em" }}>"</span>{a}
        </div>
      ))}
      {answers.length > 8 && <div style={{ fontSize: 10.5, color: "#94a3b8", fontFamily: "var(--font-mono)", letterSpacing: ".06em", padding: 4 }}>+ {answers.length - 8} more</div>}
    </div>
  );
}

function ResultsByApp({ q, stats, apps, onOpenApp }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 22 }}>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, marginBottom: 14, letterSpacing: "-0.02em" }}>Per application</h3>
      {Object.keys(stats.perApp).length === 0 ? <p style={{ color: "#94a3b8", fontSize: 13 }}>No app-scoped responses yet.</p> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 600, overflow: "auto" }}>
          {Object.entries(stats.perApp).map(([appId, responses]) => {
            const a = apps.find(x => x.id === appId);
            if (!a) return null;
            // Average score across all scale questions
            const scales = responses.flatMap(r => Object.entries(r.answers || {}).filter(([qid, v]) => {
              const qd = q.questions.find(x => x.id === qid); return qd?.type === "scale";
            }).map(([qid, v]) => parseFloat(v))).filter(v => !isNaN(v));
            const avg = scales.length ? (scales.reduce((s, v) => s + v, 0) / scales.length).toFixed(2) : "—";
            return (
              <button key={appId} onClick={() => onOpenApp(a)} style={{ textAlign: "left", padding: 12, background: "#fafbfc", border: "1px solid #e2e8f0", cursor: "pointer", fontFamily: "inherit", display: "grid", gridTemplateColumns: "1fr auto auto", gap: 14, alignItems: "center" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#94a3b8" }}>{a.id} · {a.scor_domain}</div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: "#0f172a" }}>{a.name}</div>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#64748b" }}>{responses.length} resp</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "#dc2626", letterSpacing: "-0.02em" }}>{avg}</div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function buildAiPayload(q, allApps) {
  return {
    questionnaire: { id: q.id, title: q.title, template: q.template, lang: q.lang, description: q.description },
    questions: (q.questions || []).map(({ id, text, type, options, scale_min, scale_max, per_app }) => ({ id, text, type, options, scale_min, scale_max, per_app })),
    target_apps: (q.target_apps || []).map(id => {
      const a = allApps.find(x => x.id === id);
      return a ? { id: a.id, name: a.name, scor_domain: a.scor_domain, current_roadmap: a.roadmap, current_time: a.scoring.time, current_pace: a.scoring.pace_layer, sites: a.sites } : null;
    }).filter(Boolean),
    recipients_summary: { total: (q.recipients || []).length, responded: (q.recipients || []).filter(r => r.responded).length, by_site: groupBy(q.recipients || [], "site") },
    responses: (q.responses || []).map(r => ({ recipient_id: r.recipient_id, app_id: r.app_id, site: (q.recipients || []).find(x => x.id === r.recipient_id)?.site || "?", answers: r.answers })),
  };
}
function groupBy(arr, key) { const o = {}; arr.forEach(x => { o[x[key]] = (o[x[key]] || 0) + 1; }); return o; }

function exportRespCsv(q) {
  const cols = ["response_id","recipient_id","app_id","submitted_at", ...q.questions.map(qq => qq.id)];
  const rows = [cols.join(",")];
  (q.responses || []).forEach(r => {
    const row = [r.id, r.recipient_id, r.app_id || "", r.submitted_at, ...q.questions.map(qq => {
      const v = r.answers?.[qq.id];
      const s = Array.isArray(v) ? v.join("|") : (v == null ? "" : String(v));
      return `"${s.replace(/"/g, '""')}"`;
    })];
    rows.push(row.join(","));
  });
  const blob = new Blob([rows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = `responses-${q.id}.csv`; a.click();
  URL.revokeObjectURL(url);
}

// ════════════════════════════════════════════════════════════════════════════
// AI ANALYSIS PANEL + APPLY
// ════════════════════════════════════════════════════════════════════════════
function AnalysisPanel({ a, analyses, setActive, markApplied, setAppField, apps, onOpenApp }) {
  const r = a.report || {};
  const [picked, setPicked] = useState({}); // appId → { time, pace, risk, recommendation }
  const [applying, setApplying] = useState(false);
  const [doneIds, setDoneIds] = useState([]);

  function togglePick(item) {
    setPicked(p => {
      const next = { ...p };
      if (next[item.app_id]) delete next[item.app_id];
      else next[item.app_id] = {
        time: item.suggested_time_category,
        pace: item.suggested_pace_layer,
        risk: item.risk_level,
        recommendation: item.recommendation,
      };
      return next;
    });
  }

  function applyOne(item) {
    if (!apps.find(x => x.id === item.app_id)) return;
    if (item.suggested_time_category) setAppField(item.app_id, "scoring.time", item.suggested_time_category);
    if (item.suggested_pace_layer)    setAppField(item.app_id, "scoring.pace_layer", item.suggested_pace_layer);
    if (item.risk_level)              setAppField(item.app_id, "ai_risk_level", item.risk_level);
    if (item.recommendation)          setAppField(item.app_id, "ai_recommendation", item.recommendation);
    setDoneIds(d => [...d, item.app_id]);
  }
  function applyAll() {
    setApplying(true);
    Object.keys(picked).forEach(appId => {
      const item = (r.per_app_analysis || []).find(x => x.app_id === appId);
      if (item) applyOne(item);
    });
    markApplied(Object.keys(picked));
    setApplying(false);
    alert(`Applied recommendations for ${Object.keys(picked).length} apps. Values are now in the central store.`);
  }

  return (
    <div style={{ marginTop: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#7c3aed", letterSpacing: ".18em", fontWeight: 700 }}>✦ AI ANALYSIS · {a.id}</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 400, marginTop: 4, letterSpacing: "-0.025em" }}>Recommendations</h2>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#64748b", marginTop: 4, letterSpacing: ".04em" }}>
            generated {new Date(a.created_at).toLocaleString()} by {a.by} · model {a.model || "claude"}{a.applied && " · APPLIED"}
          </div>
        </div>
        {analyses.length > 1 && (
          <select value={a.id} onChange={e => setActive(analyses.find(x => x.id === e.target.value))} style={inputStyle}>
            {analyses.map(an => <option key={an.id} value={an.id}>{an.id} · {an.created_at.slice(0, 16).replace("T", " ")}</option>)}
          </select>
        )}
      </div>

      {/* Executive summary */}
      <div style={{ background: "#0f172a", color: "#fff", padding: 24, marginBottom: 18 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#a78bfa", letterSpacing: ".15em", fontWeight: 700, marginBottom: 8 }}>EXECUTIVE SUMMARY</div>
        <p style={{ fontSize: 15, lineHeight: 1.55, fontFamily: "var(--font-display)", fontWeight: 400 }}>{r.executive_summary || "—"}</p>
      </div>

      {/* Per-app cards */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>Per-application recommendations</h3>
        {Object.keys(picked).length > 0 && (
          <button onClick={applyAll} disabled={applying} style={{ ...primaryBtn, background: "#7c3aed", borderColor: "#7c3aed" }}>
            Apply {Object.keys(picked).length} recommendation{Object.keys(picked).length === 1 ? "" : "s"} →
          </button>
        )}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 12, marginBottom: 28 }}>
        {(r.per_app_analysis || []).map(item => {
          const app = apps.find(x => x.id === item.app_id);
          const RISK = { low: "#16a34a", medium: "#ca8a04", high: "#ea580c", critical: "#dc2626" };
          const isPicked = !!picked[item.app_id];
          const isDone = doneIds.includes(item.app_id);
          return (
            <div key={item.app_id} style={{ background: "#fff", border: "1px solid " + (isPicked ? "#7c3aed" : "#e2e8f0"), borderLeft: "3px solid " + (RISK[item.risk_level] || "#94a3b8"), padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={() => app && onOpenApp(app)} style={{ background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", fontFamily: "inherit", flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "#94a3b8" }}>{item.app_id}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.app_name}</div>
                </button>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700, padding: "3px 6px", background: RISK[item.risk_level] || "#94a3b8", color: "#fff", letterSpacing: ".1em", height: "fit-content" }}>{(item.risk_level || "").toUpperCase()}</span>
              </div>
              <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                <Mini label="UTILITY" value={(item.utility_score || "—") + (item.utility_score ? "/5" : "")} />
                <Mini label="SATISF." value={(item.satisfaction_score || "—") + (item.satisfaction_score ? "/5" : "")} />
                <Mini label="REC." value={item.recommendation || "—"} />
              </div>
              {item.pain_points && item.pain_points.length > 0 && (
                <div style={{ marginTop: 10, fontSize: 11.5, color: "#0f172a" }}>
                  <strong style={{ color: "#dc2626", fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: ".12em" }}>PAIN</strong>{" "}
                  {item.pain_points.slice(0, 2).join(" · ")}
                </div>
              )}
              {item.strengths && item.strengths.length > 0 && (
                <div style={{ marginTop: 4, fontSize: 11.5, color: "#0f172a" }}>
                  <strong style={{ color: "#16a34a", fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: ".12em" }}>STRENGTH</strong>{" "}
                  {item.strengths.slice(0, 2).join(" · ")}
                </div>
              )}
              <div style={{ marginTop: 10, padding: "8px 10px", background: "#fafbfc", fontSize: 11.5, color: "#475569", fontStyle: "italic", lineHeight: 1.5 }}>
                {item.recommendation_rationale}
              </div>
              <div style={{ marginTop: 10, display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#94a3b8" }}>SUGGEST →</span>
                {item.suggested_time_category && <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, padding: "2px 6px", background: "#0f172a", color: "#fff", fontWeight: 700, letterSpacing: ".1em" }}>TIME: {item.suggested_time_category}</span>}
                {item.suggested_pace_layer && <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, padding: "2px 6px", background: "#7c3aed", color: "#fff", fontWeight: 700, letterSpacing: ".1em" }}>PACE: {item.suggested_pace_layer}</span>}
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                <button onClick={() => applyOne(item)} disabled={isDone} style={{ ...primaryBtn, padding: "6px 12px", fontSize: 10, flex: 1, background: isDone ? "#16a34a" : "#7c3aed", borderColor: isDone ? "#16a34a" : "#7c3aed", cursor: isDone ? "default" : "pointer" }}>
                  {isDone ? "✓ Applied" : "Apply"}
                </button>
                <button onClick={() => togglePick(item)} style={{ ...ghostBtnSm, flex: 1, color: isPicked ? "#7c3aed" : "#0f172a", borderColor: isPicked ? "#7c3aed" : "#0f172a" }}>
                  {isPicked ? "✓ Selected" : "Add to batch"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cross-cutting */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 24 }}>
        <Card title="Cross-cutting insights">
          <ul style={{ paddingLeft: 18, lineHeight: 1.7, fontSize: 13, color: "#0f172a" }}>
            {(r.cross_cutting_insights || []).map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </Card>
        <Card title="Site comparison">
          {r.site_comparison?.gaps?.length > 0 && <>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#dc2626", letterSpacing: ".12em", fontWeight: 700, marginBottom: 6 }}>GAPS</div>
            <ul style={{ paddingLeft: 18, fontSize: 13, lineHeight: 1.6, color: "#0f172a", marginBottom: 14 }}>{r.site_comparison.gaps.map((g, i) => <li key={i}>{g}</li>)}</ul>
          </>}
          {r.site_comparison?.best_practices?.length > 0 && <>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#16a34a", letterSpacing: ".12em", fontWeight: 700, marginBottom: 6 }}>BEST PRACTICES</div>
            <ul style={{ paddingLeft: 18, fontSize: 13, lineHeight: 1.6, color: "#0f172a" }}>{r.site_comparison.best_practices.map((g, i) => <li key={i}>{g}</li>)}</ul>
          </>}
        </Card>
      </div>

      {/* Priority actions */}
      {(r.priority_actions || []).length > 0 && (
        <Card title="Priority actions">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ background: "#0f172a", color: "#fff" }}>
              {["Action","Impact","Effort","Apps"].map(h => <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {[...r.priority_actions].sort((a, b) => rank(a.impact) - rank(b.impact)).map((a, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "8px 12px", fontSize: 13 }}>{a.action}</td>
                  <td style={{ padding: "8px 12px" }}><Pill v={a.impact} colors={{ high: "#dc2626", medium: "#ca8a04", low: "#94a3b8" }} /></td>
                  <td style={{ padding: "8px 12px" }}><Pill v={a.effort} colors={{ high: "#dc2626", medium: "#ca8a04", low: "#16a34a" }} /></td>
                  <td style={{ padding: "8px 12px", fontFamily: "var(--font-mono)", fontSize: 11, color: "#475569" }}>{(a.apps_concerned || []).slice(0, 4).join(", ")}{a.apps_concerned?.length > 4 ? " …" : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
function rank(x) { return ({ high: 1, medium: 2, low: 3 })[x] || 4; }
function Card({ title, children }) {
  return <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 22 }}>
    <h4 style={subH}>{title}</h4>
    {children}
  </div>;
}
function Pill({ v, colors }) {
  const c = colors[v] || "#94a3b8";
  return <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, fontWeight: 700, padding: "3px 7px", background: c, color: "#fff", letterSpacing: ".12em" }}>{(v || "—").toUpperCase()}</span>;
}
function Mini({ label, value }) {
  return <div>
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#94a3b8", letterSpacing: ".12em", fontWeight: 700 }}>{label}</div>
    <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 500, marginTop: 2, color: "#0f172a" }}>{value}</div>
  </div>;
}

function PageHeader({ eyebrow, title, back, actions }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
      <div>
        {back && <button onClick={back} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", letterSpacing: ".06em", marginBottom: 4 }}>← Back to list</button>}
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>{eyebrow}</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 400, lineHeight: 1, letterSpacing: "-0.03em", color: "#0f172a" }}>{title}</h1>
      </div>
      {actions && <div style={{ display: "flex", gap: 8 }}>{actions}</div>}
    </div>
  );
}

window.Questionnaires = Questionnaires;
window.QUESTIONNAIRE_TEMPLATES = window.QUESTIONNAIRE_TEMPLATES; // already global
