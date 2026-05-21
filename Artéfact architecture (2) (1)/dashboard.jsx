// Dashboard — reads exclusively from the central store.
function Dashboard({ onOpen }) {
  const { state, currentUser } = useStore();
  const apps = state.apps;

  const stats = useMemo(() => {
    const total = apps.length;
    const byDeploy = {}, byRoadmap = {}, byScor = {}, byScope = {}, byItil = {}, byHeatmap = { _none: 0 };
    let totalUsers = 0, awsInProg = 0, aiRelevant = 0;
    let scoredTime = 0, scoredCloud = 0, scoredBva = 0;
    apps.forEach(a => {
      byDeploy[a.deploy || "—"] = (byDeploy[a.deploy || "—"] || 0) + 1;
      byRoadmap[a.roadmap] = (byRoadmap[a.roadmap] || 0) + 1;
      byScor[a.scor_domain] = (byScor[a.scor_domain] || 0) + 1;
      (a.users_scope || []).forEach(s => byScope[s] = (byScope[s] || 0) + 1);
      byItil[a.itil || "—"] = (byItil[a.itil || "—"] || 0) + 1;
      if (a.heatmap_category) byHeatmap[a.heatmap_category] = (byHeatmap[a.heatmap_category] || 0) + 1;
      else byHeatmap._none++;
      totalUsers += a.num_users || 0;
      if (["In progress","Pilot","Migrated"].includes(a.aws_migration)) awsInProg++;
      if (a.ai_relevant) aiRelevant++;
      if (a.scoring?.time) scoredTime++;
      if (a.scoring?.cloud_readiness && a.scoring.cloud_readiness.ist) scoredCloud++;
      if (a.scoring?.bva && Object.values(a.scoring.bva).some(v => v !== 50)) scoredBva++;
    });
    return { total, byDeploy, byRoadmap, byScor, byScope, byItil, byHeatmap, totalUsers, awsInProg, aiRelevant, scoredTime, scoredCloud, scoredBva };
  }, [apps]);

  // Alerts: critical without scoring, Discontinue without retirement, TIME=Eliminate but roadmap=Growth
  const alerts = useMemo(() => {
    const out = [];
    apps.forEach(a => {
      if (a.criticality === "Critical" && !a.scoring?.time) out.push({ tag: "UNSCORED", color: "#fca5a5", app: a, sub: "Critical · TIME not assessed" });
      if (a.roadmap === "Discontinue" && !a.retirement) out.push({ tag: "NO DATE", color: "#fde047", app: a, sub: "Marked Discontinue, no retirement date" });
      if (a.scoring?.time === "Eliminate" && a.roadmap === "Growth") out.push({ tag: "CONFLICT", color: "#fca5a5", app: a, sub: "TIME=Eliminate vs Roadmap=Growth" });
      if (a.scoring?.time === "Invest" && a.roadmap === "Discontinue") out.push({ tag: "CONFLICT", color: "#fca5a5", app: a, sub: "TIME=Invest vs Roadmap=Discontinue" });
      if ((a.owners || []).length === 0 && (a.it_contact || []).length === 0 && a.roadmap !== "Discontinue") out.push({ tag: "NO OWNER", color: "#67e8f9", app: a, sub: "No business or IT owner declared" });
    });
    return out.slice(0, 8);
  }, [apps]);

  return (
    <div style={{ padding: "32px 40px 80px", maxWidth: 1600, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>§ 01 / Overview</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 60, fontWeight: 400, lineHeight: 0.98, letterSpacing: "-0.035em", color: "#0f172a", maxWidth: 880 }}>The state of the ASMPT SMT portfolio.</h1>
          <p style={{ marginTop: 14, fontSize: 15, color: "#475569", maxWidth: 740, lineHeight: 1.55 }}>
            {stats.total} applications · live view computed from the single source of truth · last edit by{" "}
            <span style={{ fontFamily: "var(--font-mono)", color: "#0f172a" }}>{state.audit_log[0]?.user || "system"}</span>{" "}at{" "}
            <span style={{ fontFamily: "var(--font-mono)", color: "#0f172a" }}>{(state.audit_log[0]?.ts || "").slice(0, 16).replace("T", " ")}</span>
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#64748b", letterSpacing: ".15em", textTransform: "uppercase" }}>You are signed in as</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, marginTop: 4, color: "#0f172a" }}>{currentUser.name}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", letterSpacing: ".08em", fontWeight: 600, marginTop: 2 }}>{currentUser.role.toUpperCase()}</div>
        </div>
      </div>

      <div style={{ height: 1, background: "#0f172a", marginBottom: 32 }} />

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr", gap: 0, border: "1px solid #e2e8f0", marginBottom: 48 }}>
        <KPICard label="Applications" value={stats.total} sub="under management" accent="#dc2626" big />
        <KPICard label="End-user seats" value={stats.totalUsers.toLocaleString()} sub="declared users" big />
        <KPICard label="Scored (TIME)" value={`${Math.round(stats.scoredTime / stats.total * 100)}%`} sub={`${stats.scoredTime} of ${stats.total}`} big />
        <KPICard label="Categorised" value={`${Math.round((stats.total - stats.byHeatmap._none) / stats.total * 100)}%`} sub="heatmap decision set" big />
        <KPICard label="AWS migration" value={stats.awsInProg} sub="in progress / pilot / done" big />
      </div>

      {/* Distros */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.1fr", gap: 32, marginBottom: 48 }}>
        <DistroBlock title="Future Roadmap" subtitle="Strategic disposition" data={
          ["Growth","Introduction","Sustain","Replace","Discontinue"].filter(k => stats.byRoadmap[k])
            .map(k => ({ k, v: stats.byRoadmap[k], color: ROADMAP_COLORS[k].dot }))
        } total={stats.total} />
        <DistroBlock title="Deployment" subtitle="Cloud · Hybrid · On premise" data={
          Object.entries(stats.byDeploy).filter(([k]) => k !== "—").map(([k, v]) => ({ k, v, color: HOSTING_COLORS[k] || "#94a3b8" }))
        } total={stats.total} />
        <DistroBlock title="SCOR domain" subtitle="Plan / Source / Make / Deliver / Return / Enable" data={
          Object.entries(stats.byScor).map(([k, v]) => {
            const d = SCOR_DOMAIN_DEFS.find(x => x.id === k);
            return { k: d?.label || k, v, color: d?.color || "#64748b" };
          })
        } total={stats.total} />
      </div>

      {/* Heatmap decision overview + Alerts */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32 }}>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 28 }}>
          <SectionTitle eyebrow="§ 04" title="Heatmap decision split" />
          <HeatmapSummary stats={stats} state={state} apps={apps} onOpen={onOpen} />
        </div>
        <div style={{ background: "#0f172a", color: "#fff", padding: 28 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#dc2626", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600 }}>§ 05 / Alerts</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 500, marginTop: 8, marginBottom: 18, letterSpacing: "-0.02em" }}>
            {alerts.length} item{alerts.length === 1 ? "" : "s"} need review
          </h3>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {alerts.map((it, i) => (
              <button key={i} onClick={() => onOpen(it.app)} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: i < alerts.length - 1 ? "1px solid rgba(255,255,255,.1)" : "none", textAlign: "left", background: "transparent", border: "none", borderBottom: i < alerts.length - 1 ? "1px solid rgba(255,255,255,.1)" : "none", cursor: "pointer", fontFamily: "inherit", color: "inherit" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700, letterSpacing: ".12em", padding: "3px 6px", background: it.color, color: "#0f172a", height: "fit-content", flexShrink: 0 }}>{it.tag}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>{it.app.name}</div>
                  <div style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 2 }}>{it.sub}</div>
                </div>
              </button>
            ))}
            {alerts.length === 0 && <div style={{ fontSize: 13, color: "#94a3b8" }}>All clear. Nothing to flag.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#dc2626", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600 }}>{eyebrow}</div>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 500, marginTop: 6, letterSpacing: "-0.02em", color: "#0f172a" }}>{title}</h3>
    </div>
  );
}

function DistroBlock({ title, subtitle, data, total }) {
  const sorted = [...data].sort((a, b) => b.v - a.v);
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 24 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#64748b", letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 20 }}>{subtitle}</div>
      <div style={{ display: "flex", width: "100%", height: 8, marginBottom: 20 }}>
        {data.map((d, i) => (
          <div key={d.k} style={{ width: (d.v / total * 100) + "%", background: d.color, borderRight: i < data.length - 1 ? "1px solid #fff" : "none" }} title={`${d.k}: ${d.v}`} />
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sorted.map(d => (
          <div key={d.k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 8, borderBottom: "1px dotted #cbd5e1" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 10, height: 10, background: d.color, borderRadius: 1 }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, fontWeight: 600, color: "#0f172a", letterSpacing: ".04em" }}>{d.k}</span>
            </span>
            <span style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#64748b" }}>{Math.round(d.v / total * 100)}%</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "#0f172a", minWidth: 22, textAlign: "right" }}>{d.v}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeatmapSummary({ stats, state, apps, onOpen }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {state.heatmap_categories.map(c => {
        const count = stats.byHeatmap[c.id] || 0;
        const inCat = apps.filter(a => a.heatmap_category === c.id).slice(0, 3);
        return (
          <div key={c.id} style={{ padding: "14px 16px", border: "1px solid #e2e8f0", borderLeft: "4px solid " + c.color }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: c.color, letterSpacing: "-0.01em" }}>{c.label}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "#94a3b8" }}>{c.desc}</span>
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "#0f172a" }}>{count}</span>
            </div>
            {inCat.length > 0 && (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {inCat.map(a => (
                  <button key={a.id} onClick={() => onOpen(a)} style={{ padding: "3px 8px", background: "#fafbfc", border: "1px solid #e2e8f0", fontSize: 11.5, cursor: "pointer", fontFamily: "inherit" }}>
                    {a.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
      <div style={{ padding: "10px 16px", background: "#fef2f2", border: "1px dashed #fca5a5", fontFamily: "var(--font-mono)", fontSize: 11, color: "#7f1d1d", letterSpacing: ".06em" }}>
        Uncategorised: <strong style={{ fontFamily: "var(--font-display)", fontSize: 16, marginLeft: 6 }}>{stats.byHeatmap._none}</strong> applications still need a heatmap decision.
      </div>
    </div>
  );
}

window.Dashboard = Dashboard;
