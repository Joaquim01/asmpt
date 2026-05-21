// Utilities: clipboard with fallback, simple jitter, QR helpers.

// ─── Clipboard ──────────────────────────────────────────────────────────────
async function copyToClipboard(text) {
  // Try the modern async API first
  if (navigator.clipboard && window.isSecureContext !== false) {
    try {
      await navigator.clipboard.writeText(text);
      return { ok: true, method: "async" };
    } catch (e) { /* fall through */ }
  }
  // execCommand fallback
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.left = "0";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return { ok, method: "execCommand" };
  } catch (e) {
    return { ok: false, error: String(e.message || e) };
  }
}

// ─── CopyButton — handles state, visual confirmation, and fallback ──────────
function CopyButton({ text, label = "Copy", labelCopied = "✓ Copied", icon, style, compact, title, onCopied }) {
  const [state, setState] = React.useState("idle"); // idle | done | error
  const [showFallback, setShowFallback] = React.useState(false);
  async function go() {
    const r = await copyToClipboard(text);
    if (r.ok) {
      setState("done");
      if (onCopied) onCopied();
      setTimeout(() => setState("idle"), 2000);
    } else {
      setState("error");
      setShowFallback(true);
    }
  }
  const isDone = state === "done";
  const isErr  = state === "error";
  const base = {
    padding: compact ? "5px 10px" : "8px 14px",
    fontFamily: "var(--font-mono)", fontSize: compact ? 10 : 11, fontWeight: 600,
    letterSpacing: ".08em", textTransform: "uppercase",
    background: isDone ? "#16a34a" : isErr ? "#dc2626" : "#fff",
    color: isDone || isErr ? "#fff" : "#0f172a",
    border: "1px solid " + (isDone ? "#16a34a" : isErr ? "#dc2626" : "#0f172a"),
    cursor: "pointer", transition: "background .1s, color .1s",
    display: "inline-flex", alignItems: "center", gap: 6,
    ...style,
  };
  return (
    <>
      <button onClick={go} style={base} title={title || label}>
        {icon && <span>{icon}</span>}
        {isDone ? labelCopied : isErr ? "✕ Failed" : label}
      </button>
      {showFallback && (
        <FallbackCopy text={text} onClose={() => setShowFallback(false)} />
      )}
    </>
  );
}

function FallbackCopy({ text, onClose }) {
  const ref = React.useRef(null);
  React.useEffect(() => { ref.current?.select(); }, []);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,.55)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", width: "min(640px, 100%)", padding: 24 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", letterSpacing: ".18em", fontWeight: 600 }}>AUTOMATIC COPY FAILED</div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, marginTop: 6, letterSpacing: "-0.02em" }}>Select and copy manually</h3>
        <p style={{ fontSize: 13, color: "#64748b", marginTop: 8 }}>This browser blocked clipboard access. Press <strong>⌘C</strong> / <strong>Ctrl+C</strong>.</p>
        <textarea ref={ref} readOnly value={text} style={{ width: "100%", minHeight: 200, marginTop: 14, padding: 12, fontFamily: "var(--font-mono)", fontSize: 12, border: "1px solid #cbd5e1" }} />
        <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "8px 14px", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", background: "#0f172a", color: "#fff", border: "none", cursor: "pointer" }}>Done</button>
        </div>
      </div>
    </div>
  );
}

// ─── Jitter: stable per-id offset (pixels) so identical coords don't overlap ─
function hashCode(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h * 31) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
function jitterFor(id, amplitudePx = 6) {
  const h = hashCode(String(id));
  const x = ((h & 0xff) / 255 - 0.5) * 2 * amplitudePx;
  const y = (((h >> 8) & 0xff) / 255 - 0.5) * 2 * amplitudePx;
  return { x, y };
}

// ─── QR encoder loader: lazy-loads qrcode-generator from unpkg, returns Promise<svgString> ─
let _qrPromise = null;
function loadQrLib() {
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

async function generateQrSvg(text, size = 220) {
  const qrcode = await loadQrLib();
  const qr = qrcode(0, "M");
  qr.addData(text);
  qr.make();
  const cells = qr.getModuleCount();
  const sz = size;
  const cellSize = sz / cells;
  let rects = "";
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      if (qr.isDark(r, c)) {
        rects += `<rect x="${(c * cellSize).toFixed(2)}" y="${(r * cellSize).toFixed(2)}" width="${cellSize.toFixed(2)}" height="${cellSize.toFixed(2)}" fill="#0f172a"/>`;
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${sz}" height="${sz}" viewBox="0 0 ${sz} ${sz}" shape-rendering="crispEdges"><rect width="${sz}" height="${sz}" fill="#fff"/>${rects}</svg>`;
}

// ─── QR component ───────────────────────────────────────────────────────────
function QrCode({ text, size = 200 }) {
  const [svg, setSvg] = React.useState(null);
  const [err, setErr] = React.useState(null);
  React.useEffect(() => {
    let cancelled = false;
    setErr(null);
    generateQrSvg(text, size).then(s => { if (!cancelled) setSvg(s); }).catch(e => { if (!cancelled) setErr(e.message); });
    return () => { cancelled = true; };
  }, [text, size]);
  if (err) return <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", background: "#fef2f2", fontFamily: "var(--font-mono)", fontSize: 10, color: "#7f1d1d", textAlign: "center", padding: 10 }}>QR failed: {err}</div>;
  if (!svg) return <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9", fontFamily: "var(--font-mono)", fontSize: 10, color: "#94a3b8" }}>generating…</div>;
  return <div dangerouslySetInnerHTML={{ __html: svg }} style={{ width: size, height: size, display: "block" }} />;
}

async function downloadQrPng(text, size = 600, filename = "qr.png") {
  const svgStr = await generateQrSvg(text, size);
  const blob = new Blob([svgStr], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
    canvas.toBlob(b => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.download = filename;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    }, "image/png");
    URL.revokeObjectURL(url);
  };
  img.src = url;
}

Object.assign(window, { copyToClipboard, CopyButton, FallbackCopy, jitterFor, generateQrSvg, QrCode, downloadQrPng });
