// Header bar (language + copy button) on code blocks. Used by post pages and the /edit preview.
const LANGS: Record<string, string> = {
  cpp: "C++", c: "C", py: "Python", python: "Python", js: "JavaScript", javascript: "JavaScript",
  ts: "TypeScript", typescript: "TypeScript", jsx: "JSX", tsx: "TSX", java: "Java", go: "Go",
  rust: "Rust", sh: "Shell", bash: "Shell", shell: "Shell", zsh: "Shell", json: "JSON", yaml: "YAML",
  yml: "YAML", html: "HTML", css: "CSS", sql: "SQL", md: "Markdown", markdown: "Markdown",
  tex: "LaTeX", latex: "LaTeX", txt: "Text", text: "Text", plaintext: "Text", asm: "Assembly",
  mips: "MIPS", armasm: "Assembly", verilog: "Verilog", matlab: "MATLAB", r: "R", kotlin: "Kotlin",
};
const copyIcon = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
const doneIcon = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

export function decorateCodeBlocks(root: ParentNode = document) {
  root.querySelectorAll<HTMLPreElement>(".markdown-zh pre, .markdown-en pre").forEach(pre => {
    const id = [...pre.classList].find(c => c.startsWith("language-"))?.slice(9) ?? "";
    const wrap = document.createElement("div");
    wrap.className = "code-wrap";
    const head = document.createElement("div");
    head.className = "code-head";
    const label = document.createElement("span");
    label.className = "code-lang";
    label.textContent = LANGS[id.toLowerCase()] ?? (id ? id.toUpperCase() : "Code");
    const btn = document.createElement("button");
    btn.className = "copy";
    btn.type = "button";
    btn.setAttribute("aria-label", "Copy code");
    const idle = `${copyIcon}<span>Copy</span>`;
    btn.innerHTML = idle;
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(pre.querySelector("code")?.textContent ?? pre.textContent ?? "");
        btn.dataset.copied = "";
        btn.innerHTML = `${doneIcon}<span>Copied</span>`;
        setTimeout(() => { delete btn.dataset.copied; btn.innerHTML = idle; }, 2000);
      } catch {}
    });
    head.append(label, btn);
    pre.replaceWith(wrap);
    wrap.append(head, pre);
  });
}
