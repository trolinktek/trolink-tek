## [ERR-20260720-001] stale-bundled-node-path

**Logged**: 2026-07-20T00:00:00+08:00
**Priority**: low
**Status**: resolved
**Area**: tests

### Summary
The previously recorded bundled npm path was unavailable in the current desktop runtime.

### Error
```text
The term ...dependencies/node/bin/npm.cmd is not recognized.
```

### Context
- Task attempted: Run the Vite production build.
- Command/tool/API: PowerShell exec command.
- Environment: Windows workspace with system Node and fallback pnpm available.

### Suspected Cause
The cached runtime layout changed between sessions.

### Suggested Fix
Resolve `node`, `npm`, or `pnpm` with `Get-Command` before invoking an absolute cached path.

### Metadata
- Reproducible: yes
- Related files: package.json
- Tags: node, runtime, build

## [ERR-20260720-002] powershell-template-literal-match

**Logged**: 2026-07-20T00:00:00+08:00
**Priority**: low
**Status**: resolved
**Area**: frontend

### Summary
An exact PowerShell string match failed on JavaScript template-literal content containing nested quotes.

### Error
```text
Download summary section not found
```

### Context
- Task attempted: Remove the Downloads summary section.
- Command/tool/API: PowerShell string replacement.
- Inputs: Minified JavaScript template literal.
- Environment: Windows PowerShell.

### Suspected Cause
Nested quote escaping changed the expected string.

### Suggested Fix
Use a narrowly scoped non-greedy regex bounded by the section class and closing section tag.

### Metadata
- Reproducible: yes
- Related files: src/downloads-page.js
- Tags: powershell, template-literal, replacement

## [ERR-20260720-003] powershell-expanded-js-template

**Logged**: 2026-07-20T00:00:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: frontend

### Summary
A PowerShell replacement string expanded JavaScript template-literal syntax and briefly produced an invalid function argument.

### Error
```text
connectInquiryForm(document.querySelector('form'),Product detail inquiry: ${product.title});
```

### Context
- Task attempted: Replace a fake product-detail form success handler with the shared real submission handler.
- Command/tool/API: PowerShell regex replacement.
- Environment: Windows PowerShell editing minified JavaScript.

### Suspected Cause
The replacement used a double-quoted PowerShell string containing JavaScript backticks and `${...}`.

### Suggested Fix
Use plain JavaScript string concatenation or a single-quoted PowerShell replacement, then immediately run `node --check`.

### Metadata
- Reproducible: yes
- Related files: src/product-detail.js
- Tags: powershell, javascript, interpolation, syntax

## [ERR-20260720-004] pnpm-esbuild-placeholder

**Logged**: 2026-07-20T00:00:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: tests

### Summary
The production build was blocked because `pnpm-workspace.yaml` contained placeholder text instead of a boolean build permission for esbuild.

### Error
```text
[ERR_PNPM_IGNORED_BUILDS] Ignored build scripts: esbuild
```

### Context
- Task attempted: Run the Vite production build after adding the SMTP function.
- Command/tool/API: pnpm run build.
- Environment: pnpm with supply-chain build-script policy.

### Suspected Cause
`allowBuilds.esbuild` was set to `set this to true or false`.

### Suggested Fix
Set `allowBuilds.esbuild: true`, reinstall, then rerun the build.

### Metadata
- Reproducible: yes
- Related files: pnpm-workspace.yaml
- Tags: pnpm, esbuild, vite, build

## [ERR-20260720-005] rg-access-denied

**Logged**: 2026-07-20T00:00:00+08:00
**Priority**: low
**Status**: resolved
**Area**: infra

### Summary
The bundled `rg.exe` was denied execution while discovering sitemap routes.

### Error
```text
rg.exe cannot run: Access is denied
```

### Context
- Task attempted: Enumerate index.html files for XML sitemap generation.
- Command/tool/API: rg --files.
- Environment: Windows managed workspace.

### Suspected Cause
Executable access policy blocked the bundled ripgrep binary.

### Suggested Fix
Use `Get-ChildItem -Recurse -Filter index.html` with explicit directory exclusions.

### Metadata
- Reproducible: unknown
- Related files: public/sitemap.xml
- Tags: ripgrep, windows, sitemap

## [ERR-20260720-006] sandbox-node-modules-read

**Logged**: 2026-07-20T00:00:00+08:00
**Priority**: low
**Status**: resolved
**Area**: tests

### Summary
The managed sandbox denied reading the pnpm-installed Vite binary during sitemap build verification.

### Error
```text
EPERM: operation not permitted, open node_modules/.pnpm/vite.../bin/vite.js
```

### Context
- Task attempted: Verify public SEO files are copied into the Vite production output.
- Command/tool/API: pnpm run build.
- Environment: Windows managed workspace.

### Suspected Cause
The dependency junction is only readable in the approved execution context.

### Suggested Fix
Run the same non-mutating production build with the existing approved `pnpm run build` prefix.

### Metadata
- Reproducible: yes
- Related files: public/sitemap.xml, public/robots.txt, public/llms.txt
- Tags: sandbox, pnpm, vite, build

## [ERR-20260803-001] powershell-npm-script-policy

**Logged**: 2026-08-03T12:00:00+08:00
**Priority**: low
**Status**: resolved
**Area**: tests

### Summary
PowerShell blocked `npm.ps1` while running the Vite production build.

### Error
```text
npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

### Context
- Task attempted: Verify the downloads and B71 manual refresh with a production build.
- Command/tool/API: `npm run build`.
- Environment: Windows PowerShell with restricted script execution policy.

### Suspected Cause
PowerShell resolved `npm` to the `npm.ps1` shim, which is blocked by the machine execution policy.

### Suggested Fix
Invoke `npm.cmd run build` directly on Windows.

### Metadata
- Reproducible: yes
- Related files: package.json
- Tags: npm, powershell, vite, build
