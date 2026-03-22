# Screenshot Workflow Investigation — 2026-03-22

## Problem: Playwright MCP fails when VS Code also has Playwright MCP configured

### Root cause
Both VS Code and Claude Code CLI share the same Playwright MCP Chrome profile at:
```
~/Library/Caches/ms-playwright/mcp-chrome-ecc4bf3/
```
When VS Code holds this Chrome instance open, Claude Code CLI's Playwright MCP tries to launch a second process to the same `--user-data-dir` and fails immediately with:
```
Opening in existing browser session.
[process did exit: exitCode=0]
```
Chrome refuses to open a second instance to the same user-data-dir.

### Fix: Remove Playwright MCP from VS Code
Only one tool should own the Playwright Chrome instance. Since Claude Code CLI is the primary coding environment, remove Playwright MCP from VS Code settings. Claude Code CLI's Playwright then has exclusive access and works reliably.

**How:** In VS Code, remove the Playwright MCP server entry from settings.json or the MCP config file.

---

## Two-tool screenshot workflow

### Tool 1: Python snap — default for quick visual checks
```bash
# Bring Chrome to front, then snap the screen
osascript -e 'tell application "Google Chrome" to activate' && sleep 0.5 && python3 ~/.claude/scripts/snap.py
```
- Captures the full OS screen at whatever state Chrome is in
- Fast, low token cost
- **Cannot control viewport width** — you see whatever the browser window happens to be

**When to use:** Quick "does this look right?" checks, confirming a change landed.

### Tool 2: Playwright MCP — for viewport-specific testing
```
mcp__playwright__browser_navigate   → go to URL
mcp__playwright__browser_resize     → set exact viewport width/height
mcp__playwright__browser_take_screenshot → capture at that viewport
```
- Full viewport control — test at 375px, 450px, 768px, 1280px etc.
- Can interact with the page (click, scroll, hover) before screenshotting
- Requires exclusive Chrome access (VS Code Playwright must be off)

**When to use:** Responsive layout debugging, breakpoint verification, interaction testing.

---

## Viewport resizing with Python snap (workaround if Playwright unavailable)

Use AppleScript to resize the Chrome window before snapping:
```bash
osascript -e 'tell application "Google Chrome"
  activate
  set bounds of front window to {0, 0, 450, 900}
end tell' && sleep 0.5 && python3 ~/.claude/scripts/snap.py
```
Replace `450` with the desired viewport width. **Note:** this resizes the whole window including Chrome chrome (toolbar ~88px), so the actual page viewport is slightly narrower than the window width.

---

## Recommended setup going forward

1. **Remove Playwright MCP from VS Code** — Claude Code CLI owns Chrome for Playwright
2. **Default:** `osascript + snap.py` for quick visual checks
3. **Responsive/viewport testing:** Playwright MCP via Claude Code CLI
4. **fe-visualisation skill** uses Python snap by default; use Playwright explicitly when viewport width matters

---

## Status
- [ ] Remove Playwright MCP from VS Code (Mat to action)
- [ ] Verify Playwright MCP works in Claude Code CLI after removal
- [ ] Test full viewport-resize → screenshot workflow at 375px, 450px, 768px
