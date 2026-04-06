// All 10 recipes — real patterns from 21+ shipped Claude Code projects

import type { Recipe } from './types';

function cb(code: string, lang = 'typescript'): string {
  const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<div class="code-block-wrapper">
    <span class="code-block-lang">${lang}</span>
    <button class="copy-btn">Copy</button>
    <pre><code class="language-${lang}">${escaped}</code></pre>
  </div>`;
}

export const recipes: Recipe[] = [
  // ── Recipe 1: The /kickoff → /build → /verify Pipeline ──
  {
    slug: 'kickoff-build-verify',
    title: 'The /kickoff → /build → /verify Pipeline',
    titleZh: '/kickoff → /build → /verify 流水线',
    description: 'A three-session workflow that separates planning from building from validation. Prevents scope creep and ensures quality.',
    descriptionZh: '将规划、构建和验证分为三个会话的工作流。防止范围蔓延，确保质量。',
    category: 'workflow',
    tags: ['planning', 'pipeline', 'quality'],
    difficulty: 'starter',
    author: 'Z Huang',
    updatedAt: '2026-04-05',
    content: `
      <p>The single most impactful pattern across 21+ projects: <strong>never plan and build in the same session</strong>. Separate them into three distinct phases, each with a clear deliverable.</p>

      <h2>The Three Sessions</h2>

      <h3>Session 1: /kickoff (Planning Only)</h3>
      <p>This session produces three files — no code. The goal is alignment before implementation.</p>

      ${cb(`# What /kickoff produces:
1. CLAUDE.md    — project context, stack, conventions
2. plan.md      — step-by-step implementation plan with design spec
3. Build prompt — copy-paste handoff for session 2`, 'bash')}

      <p>Key rule: <strong>if you catch yourself writing code in a kickoff session, stop</strong>. Go back to planning. The kickoff session is for decisions, not implementation.</p>

      <h3>Session 2: /build (Code Only)</h3>
      <p>Start a fresh session. Paste the build prompt. Claude reads the plan and implements every step in order without asking questions.</p>

      ${cb(`This is a BUILD session. Working directory: ~/Desktop/Projects/MyApp/

Read the plan at ~/Desktop/Projects/MyApp/plan.md
and the project context at ~/Desktop/Projects/MyApp/CLAUDE.md.
Implement all steps in order. Don't ask questions — make reasonable
decisions and keep moving.`, 'bash')}

      <p>Why a fresh session? The planning session's context is full of deliberation and alternatives. The build session needs a clean context focused entirely on execution.</p>

      <h3>Session 3: /verify (Validation)</h3>
      <p>After the build completes, run a structured quality gate that checks 14 categories:</p>

      <ul>
        <li>App loads correctly, no console errors</li>
        <li>Core functionality works end-to-end</li>
        <li>Responsive layout at 375px, 768px, 1024px</li>
        <li>Bilingual strings all translated</li>
        <li>Dark mode contrast passes WCAG AA</li>
        <li>All grids have complete rows (no empty trailing slots)</li>
      </ul>

      <h2>Why This Works</h2>
      <p>Planning and building use different cognitive modes. When you mix them, you get half-baked plans and gold-plated code. Separating them means:</p>
      <ul>
        <li><strong>Better plans</strong> — you think through the whole system before touching code</li>
        <li><strong>Faster builds</strong> — Claude executes linearly without stopping to deliberate</li>
        <li><strong>Consistent quality</strong> — the verify step catches what you missed</li>
      </ul>

      <blockquote>After adopting this pipeline, the average project went from 3-4 sessions of back-and-forth to 2 clean sessions with a verify pass.</blockquote>
    `,
    contentZh: `
      <p>在 21+ 个项目中最有影响力的模式：<strong>永远不要在同一个会话中规划和构建</strong>。将它们分为三个不同的阶段，每个阶段都有明确的交付物。</p>

      <h2>三个会话</h2>

      <h3>会话 1：/kickoff（仅规划）</h3>
      <p>这个会话产出三个文件——不写代码。目标是在实施前达成一致。</p>

      ${cb(`# /kickoff 产出：
1. CLAUDE.md    — 项目上下文、技术栈、约定
2. plan.md      — 带设计规范的分步实施计划
3. 构建提示词    — 复制粘贴到会话 2 的交接提示`, 'bash')}

      <p>关键规则：<strong>如果你发现自己在 kickoff 会话中写代码，停下来</strong>。回到规划。kickoff 会话是用来做决定的，不是用来实现的。</p>

      <h3>会话 2：/build（仅编码）</h3>
      <p>开始一个全新会话。粘贴构建提示词。Claude 读取计划并按顺序实现每个步骤，不需要提问。</p>

      ${cb(`这是一个 BUILD 会话。工作目录：~/Desktop/Projects/MyApp/

读取 ~/Desktop/Projects/MyApp/plan.md 中的计划
和 ~/Desktop/Projects/MyApp/CLAUDE.md 中的项目上下文。
按顺序实现所有步骤。不要提问——做出合理决定并继续前进。`, 'bash')}

      <p>为什么要新开会话？规划会话的上下文充满了讨论和备选方案。构建会话需要一个完全专注于执行的干净上下文。</p>

      <h3>会话 3：/verify（验证）</h3>
      <p>构建完成后，运行结构化质量检查，检查 14 个类别：</p>

      <ul>
        <li>应用正确加载，无控制台错误</li>
        <li>核心功能端到端正常工作</li>
        <li>响应式布局在 375px、768px、1024px 下正常</li>
        <li>双语字符串全部翻译</li>
        <li>深色模式对比度通过 WCAG AA</li>
        <li>所有网格行完整（无空位）</li>
      </ul>

      <h2>为什么有效</h2>
      <p>规划和构建使用不同的认知模式。混合它们会导致半成品计划和过度设计的代码。分离意味着：</p>
      <ul>
        <li><strong>更好的计划</strong>——在动手之前思考整个系统</li>
        <li><strong>更快的构建</strong>——Claude 线性执行而不停下来讨论</li>
        <li><strong>一致的质量</strong>——验证步骤捕获遗漏</li>
      </ul>

      <blockquote>采用这个流水线后，项目平均从 3-4 个来回会话减少到 2 个干净会话加一次验证通过。</blockquote>
    `,
  },

  // ── Recipe 2: Writing Effective CLAUDE.md Files ──
  {
    slug: 'effective-claude-md',
    title: 'Writing Effective CLAUDE.md Files',
    titleZh: '编写有效的 CLAUDE.md 文件',
    description: 'The project context file that shapes every Claude Code session. Specific, checkable rules beat vague guidelines.',
    descriptionZh: '塑造每个 Claude Code 会话的项目上下文文件。具体可检查的规则胜过模糊指导。',
    category: 'workflow',
    tags: ['CLAUDE.md', 'context', 'conventions'],
    difficulty: 'starter',
    author: 'Z Huang',
    updatedAt: '2026-04-05',
    content: `
      <p>CLAUDE.md is the single most important file for Claude Code project quality. It's read at the start of every session, shaping all decisions. The difference between a good and bad CLAUDE.md is the difference between a productive session and a frustrating one.</p>

      <h2>The Five Sections</h2>

      <p>Every CLAUDE.md needs exactly these sections:</p>

      ${cb(`# Project Name

Brief one-line description.

## Tech Stack
TypeScript/HTML SPA on Cloudflare Pages. Esbuild bundler. No framework.

## Structure
\`\`\`
src/
  main.ts           # App entry, router
  i18n.ts           # EN/ZH translation system
  components/       # UI components
  styles/           # CSS
\`\`\`

## Entry Point
index.html

## Build
\`npm run build\` → esbuild bundles to dist/

## Deployment
\`wrangler pages deploy dist/\`

## Conventions
- English-first, Chinese toggle. All strings in i18n.ts.
- Mobile-first responsive layout.
- No backend, no accounts, no tracking.`, 'markdown')}

      <h2>Rules for Good Rules</h2>

      <p>Each convention must be <strong>specific and checkable</strong>. Compare:</p>

      <ul>
        <li>❌ <code>Write clean, maintainable code</code> — vague, uncheckable</li>
        <li>✅ <code>All user-facing strings go in i18n.ts</code> — specific, verifiable</li>
        <li>❌ <code>Follow best practices for deployment</code> — meaningless</li>
        <li>✅ <code>Entry point must be index.html. Run wrangler pages deploy dist/</code> — actionable</li>
      </ul>

      <h2>What NOT to Put in CLAUDE.md</h2>

      <ul>
        <li><strong>Generic advice</strong> — "write tests" or "use TypeScript" adds noise</li>
        <li><strong>Aspirational goals</strong> — only document what's true now</li>
        <li><strong>Long explanations</strong> — Claude reads this every session; keep it scannable</li>
        <li><strong>Implementation details</strong> — those belong in code comments</li>
      </ul>

      <blockquote>The test: if a rule can't be violated, it shouldn't be in CLAUDE.md. Every line should constrain a decision that Claude might otherwise get wrong.</blockquote>
    `,
    contentZh: `
      <p>CLAUDE.md 是 Claude Code 项目质量最重要的文件。它在每个会话开始时被读取，影响所有决定。好的 CLAUDE.md 和差的 CLAUDE.md 之间的区别就是高效会话和挫败感会话的区别。</p>

      <h2>五个必要章节</h2>

      <p>每个 CLAUDE.md 需要这些章节：</p>

      ${cb(`# 项目名称

简短的一行描述。

## Tech Stack（技术栈）
TypeScript/HTML SPA on Cloudflare Pages. Esbuild bundler. No framework.

## Structure（结构）
\`\`\`
src/
  main.ts           # 应用入口、路由
  i18n.ts           # 中英翻译系统
  components/       # UI 组件
  styles/           # CSS
\`\`\`

## Entry Point（入口）
index.html

## Build（构建）
\`npm run build\` → esbuild 打包到 dist/

## Deployment（部署）
\`wrangler pages deploy dist/\`

## Conventions（约定）
- 英文优先，中文切换。所有字符串在 i18n.ts 中。
- 移动端优先响应式布局。
- 无后端、无账号、无追踪。`, 'markdown')}

      <h2>好规则的标准</h2>

      <p>每条约定必须是<strong>具体的、可检查的</strong>。对比：</p>

      <ul>
        <li>❌ <code>编写干净、可维护的代码</code> — 模糊、不可检查</li>
        <li>✅ <code>所有用户可见字符串放在 i18n.ts 中</code> — 具体、可验证</li>
        <li>❌ <code>遵循部署最佳实践</code> — 没有意义</li>
        <li>✅ <code>入口必须是 index.html。运行 wrangler pages deploy dist/</code> — 可操作</li>
      </ul>

      <h2>不应放在 CLAUDE.md 中的内容</h2>

      <ul>
        <li><strong>通用建议</strong> — "写测试"或"用 TypeScript"只是噪音</li>
        <li><strong>愿景目标</strong> — 只记录当前事实</li>
        <li><strong>长篇解释</strong> — Claude 每次会话都读这个文件，保持简洁</li>
        <li><strong>实现细节</strong> — 那些属于代码注释</li>
      </ul>

      <blockquote>测试标准：如果一条规则不可能被违反，就不应该在 CLAUDE.md 中。每一行都应该约束一个 Claude 可能做错的决定。</blockquote>
    `,
  },

  // ── Recipe 3: Session Memory ──
  {
    slug: 'session-memory',
    title: 'Session Memory — Saving and Resuming Context',
    titleZh: '会话记忆——保存和恢复上下文',
    description: 'How to persist decisions, progress, and context between Claude Code sessions using structured session notes.',
    descriptionZh: '如何使用结构化会话笔记在 Claude Code 会话之间保持决定、进度和上下文。',
    category: 'workflow',
    tags: ['memory', 'sessions', 'context'],
    difficulty: 'intermediate',
    author: 'Z Huang',
    updatedAt: '2026-04-05',
    content: `
      <p>Claude Code sessions are ephemeral — when a session ends, the context is gone. Session memory solves this by saving structured notes that the next session can read to resume exactly where you left off.</p>

      <h2>The Session Notes Pattern</h2>

      <p>After every meaningful session, save a summary file:</p>

      ${cb(`# Location
~/Desktop/Projects/Sessions/

# Filename format
YYYY-MM-DD-short-description.md

# Example
~/Desktop/Projects/Sessions/2026-04-05-cookbook-scaffold.md`, 'bash')}

      <h3>What to Include</h3>

      ${cb(`# 2026-04-05 — Cookbook Project Scaffold

## What We Did
- Created project scaffold (esbuild + TypeScript)
- Built hash-based router and sidebar navigation
- Set up bilingual i18n system with 50+ translated strings

## Decisions Made
- Used Prism.js via CDN for syntax highlighting (simpler than bundling Shiki)
- Went with vanilla TypeScript — no React/Vue overhead for a content site
- Recipes stored as TypeScript objects, not runtime markdown parsing

## Open Questions
- Should we add a search index or is client-side filtering sufficient?
- Need to decide on OG image design

## Next Steps
- Write all 10 recipe content files
- Build recipe display page with copy-to-clipboard
- Add search functionality`, 'markdown')}

      <h2>How to Resume</h2>

      <p>Add this to your CLAUDE.md so every session picks up context automatically:</p>

      ${cb(`## Session Memory
- Location: ~/Desktop/Projects/Sessions/
- Read recent session notes at start of project work.
- Save summary after meaningful sessions.
- Include: what we did, decisions, open questions, next steps.`, 'markdown')}

      <h2>What NOT to Save</h2>

      <ul>
        <li><strong>Code snippets</strong> — the code is in the repo; don't duplicate it</li>
        <li><strong>Step-by-step instructions</strong> — those belong in plan.md</li>
        <li><strong>Emotional state</strong> — "this was frustrating" doesn't help the next session</li>
      </ul>

      <p>Focus on <strong>decisions</strong> (why we chose X over Y) and <strong>state</strong> (what's done, what's next). These are the things that are lost between sessions and hardest to reconstruct from code alone.</p>
    `,
    contentZh: `
      <p>Claude Code 会话是短暂的——会话结束时，上下文就消失了。会话记忆通过保存结构化笔记来解决这个问题，下一个会话可以读取这些笔记，从中断的地方继续。</p>

      <h2>会话笔记模式</h2>

      <p>每次有意义的会话后，保存一个摘要文件：</p>

      ${cb(`# 位置
~/Desktop/Projects/Sessions/

# 文件名格式
YYYY-MM-DD-简短描述.md

# 示例
~/Desktop/Projects/Sessions/2026-04-05-cookbook-scaffold.md`, 'bash')}

      <h3>包含什么</h3>

      ${cb(`# 2026-04-05 — Cookbook 项目脚手架

## 做了什么
- 创建了项目脚手架（esbuild + TypeScript）
- 构建了基于 hash 的路由和侧边栏导航
- 设置了包含 50+ 翻译字符串的双语 i18n 系统

## 做出的决定
- 使用 CDN 的 Prism.js 做语法高亮（比打包 Shiki 更简单）
- 使用原生 TypeScript——内容网站不需要 React/Vue 的开销
- 食谱存储为 TypeScript 对象，而非运行时 markdown 解析

## 待解决问题
- 是否需要搜索索引，还是客户端过滤就够了？
- 需要决定 OG 图片设计

## 下一步
- 编写所有 10 个食谱内容
- 构建带复制到剪贴板的食谱展示页
- 添加搜索功能`, 'markdown')}

      <h2>如何恢复</h2>

      <p>把这段添加到 CLAUDE.md，让每个会话自动获取上下文：</p>

      ${cb(`## Session Memory（会话记忆）
- 位置：~/Desktop/Projects/Sessions/
- 项目开始时读取最近的会话笔记。
- 有意义的会话后保存摘要。
- 包含：做了什么、决定、待解决问题、下一步。`, 'markdown')}

      <h2>不应保存的内容</h2>

      <ul>
        <li><strong>代码片段</strong>——代码在仓库中，不要重复</li>
        <li><strong>分步指令</strong>——那些属于 plan.md</li>
        <li><strong>情绪状态</strong>——"这很令人沮丧"对下一个会话没有帮助</li>
      </ul>

      <p>专注于<strong>决定</strong>（为什么选择 X 而不是 Y）和<strong>状态</strong>（已完成什么，下一步是什么）。这些是会话之间丢失的、最难从代码中重建的信息。</p>
    `,
  },

  // ── Recipe 4: Bilingual i18n Setup ──
  {
    slug: 'bilingual-i18n',
    title: 'Bilingual i18n Setup',
    titleZh: '双语 i18n 配置',
    description: 'The lightweight translation pattern used across 21+ projects — no dependencies, just a TypeScript module with string maps.',
    descriptionZh: '在 21+ 个项目中使用的轻量翻译模式——无依赖，只需一个带字符串映射的 TypeScript 模块。',
    category: 'code',
    tags: ['i18n', 'bilingual', 'TypeScript'],
    difficulty: 'starter',
    author: 'Z Huang',
    updatedAt: '2026-04-05',
    content: `
      <p>Most i18n libraries are overkill for a bilingual app. This pattern uses a single TypeScript file with a flat string map and a <code>t()</code> function. No build step, no JSON files, no runtime parsing.</p>

      <h2>The i18n Module</h2>

      ${cb(`// src/i18n.ts
export type Lang = 'en' | 'zh';

const LANG_KEY = 'app-lang';
let currentLang: Lang = (localStorage.getItem(LANG_KEY) as Lang) || 'en';

export function getLang(): Lang {
  return currentLang;
}

export function setLang(lang: Lang): void {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}

export function toggleLang(): void {
  setLang(currentLang === 'en' ? 'zh' : 'en');
}

const strings: Record<string, { en: string; zh: string }> = {
  'nav.home':       { en: 'Home',       zh: '首页' },
  'nav.about':      { en: 'About',      zh: '关于' },
  'search.placeholder': { en: 'Search...', zh: '搜索...' },
  'btn.submit':     { en: 'Submit',     zh: '提交' },
  'error.required': { en: 'Required',   zh: '必填' },
};

export function t(key: string): string {
  const entry = strings[key];
  if (!entry) return key;
  return entry[currentLang] || entry.en;
}`)}

      <h2>Using It in Components</h2>

      ${cb(`import { t, getLang } from './i18n';

function renderCard(item: Item): string {
  const lang = getLang();
  const title = lang === 'zh' ? item.titleZh : item.title;

  return \`
    <div class="card">
      <h3>\${title}</h3>
      <button>\${t('btn.submit')}</button>
    </div>
  \`;
}`)}

      <h2>The Language Toggle</h2>

      ${cb(`// In your app's init or re-render function:
document.getElementById('lang-toggle')?.addEventListener('click', () => {
  toggleLang();
  renderApp(); // Re-render the entire app
});`)}

      <p>The toggle button shows the <strong>target language</strong>, not the current one. When viewing English, the button says "中文". When viewing Chinese, it says "EN".</p>

      <h2>QA Checklist</h2>
      <ul>
        <li>ALL user-facing strings are in the string map (including error messages, tooltips, badges)</li>
        <li>Toggle switches all visible text, not just some</li>
        <li>Language persists across page reloads via localStorage</li>
        <li>Dynamic content (items with titleZh fields) also switches</li>
      </ul>
    `,
    contentZh: `
      <p>大多数 i18n 库对双语应用来说太重了。这个模式使用单个 TypeScript 文件，包含扁平字符串映射和 <code>t()</code> 函数。无构建步骤，无 JSON 文件，无运行时解析。</p>

      <h2>i18n 模块</h2>

      ${cb(`// src/i18n.ts
export type Lang = 'en' | 'zh';

const LANG_KEY = 'app-lang';
let currentLang: Lang = (localStorage.getItem(LANG_KEY) as Lang) || 'en';

export function getLang(): Lang {
  return currentLang;
}

export function setLang(lang: Lang): void {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}

export function toggleLang(): void {
  setLang(currentLang === 'en' ? 'zh' : 'en');
}

const strings: Record<string, { en: string; zh: string }> = {
  'nav.home':       { en: 'Home',       zh: '首页' },
  'nav.about':      { en: 'About',      zh: '关于' },
  'search.placeholder': { en: 'Search...', zh: '搜索...' },
  'btn.submit':     { en: 'Submit',     zh: '提交' },
  'error.required': { en: 'Required',   zh: '必填' },
};

export function t(key: string): string {
  const entry = strings[key];
  if (!entry) return key;
  return entry[currentLang] || entry.en;
}`)}

      <h2>在组件中使用</h2>

      ${cb(`import { t, getLang } from './i18n';

function renderCard(item: Item): string {
  const lang = getLang();
  const title = lang === 'zh' ? item.titleZh : item.title;

  return \`
    <div class="card">
      <h3>\${title}</h3>
      <button>\${t('btn.submit')}</button>
    </div>
  \`;
}`)}

      <h2>语言切换</h2>

      ${cb(`// 在应用初始化或重新渲染函数中：
document.getElementById('lang-toggle')?.addEventListener('click', () => {
  toggleLang();
  renderApp(); // 重新渲染整个应用
});`)}

      <p>切换按钮显示<strong>目标语言</strong>，而非当前语言。查看英文时，按钮显示"中文"。查看中文时，显示"EN"。</p>

      <h2>QA 检查清单</h2>
      <ul>
        <li>所有用户可见字符串都在字符串映射中（包括错误消息、工具提示、徽章）</li>
        <li>切换时所有可见文本都切换，而不仅仅是部分</li>
        <li>语言通过 localStorage 在页面刷新后保持</li>
        <li>动态内容（带 titleZh 字段的项目）也要切换</li>
      </ul>
    `,
  },

  // ── Recipe 5: Deploying to Cloudflare Pages ──
  {
    slug: 'cloudflare-pages-deploy',
    title: 'Deploying to Cloudflare Pages with Wrangler',
    titleZh: '使用 Wrangler 部署到 Cloudflare Pages',
    description: 'The deployment workflow for static SPAs — build, verify, deploy, confirm. Includes the pre-deploy checklist that prevents broken deploys.',
    descriptionZh: '静态 SPA 的部署工作流——构建、验证、部署、确认。包含防止部署失败的预部署检查清单。',
    category: 'code',
    tags: ['Cloudflare', 'deployment', 'wrangler'],
    difficulty: 'starter',
    author: 'Z Huang',
    updatedAt: '2026-04-05',
    content: `
      <p>Cloudflare Pages is the default deployment target for all projects. Free, fast, global CDN, custom domains. The workflow is simple — but the pre-deploy checklist prevents the mistakes that waste 30 minutes debugging.</p>

      <h2>Setup</h2>

      ${cb(`# Install wrangler globally (or as devDependency)
npm install -D wrangler

# Login once
npx wrangler login`, 'bash')}

      <h2>Pre-Deploy Checklist</h2>

      <p>Run through these <strong>before every deploy</strong>:</p>

      <ol>
        <li><strong>Entry point is <code>index.html</code></strong> — not <code>app.html</code>, not <code>main.html</code>. Cloudflare Pages serves <code>index.html</code> at the root.</li>
        <li><strong>Build output is in <code>dist/</code></strong> — verify your build script produces files there.</li>
        <li><strong>Git remote is configured</strong> — create the GitHub repo and push before deploying.</li>
        <li><strong>No Node APIs without compatibility flag</strong> — if using Node built-ins in Workers, set <code>nodejs_compat</code>.</li>
      </ol>

      <h2>The Deploy Command</h2>

      ${cb(`# Build first
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist/

# For Workers projects (check wrangler.toml):
# npx wrangler deploy`, 'bash')}

      <h2>Post-Deploy Verification</h2>

      ${cb(`# Confirm the site is live
curl -s -o /dev/null -w "%{http_code}" https://your-project.pages.dev

# Should return: 200`, 'bash')}

      <h2>GitHub Integration</h2>

      ${cb(`# Create repo and push as part of deploy
gh repo create your-project --public --source=. --push

# Cloudflare can auto-deploy from GitHub pushes
# But manual wrangler deploys give you more control`, 'bash')}

      <h2>Common Gotchas</h2>
      <ul>
        <li><strong>SPA routing</strong>: Cloudflare Pages needs a <code>_redirects</code> file or <code>/*  /index.html  200</code> rule for hash-based routing to work on direct URL access.</li>
        <li><strong>Don't rename live repos</strong>: Renaming a GitHub repo breaks the Cloudflare Pages connection. Create a new project instead.</li>
        <li><strong>Cache busting</strong>: Cloudflare caches aggressively. Use versioned filenames or add <code>?v=</code> query params for critical updates.</li>
      </ul>
    `,
    contentZh: `
      <p>Cloudflare Pages 是所有项目的默认部署目标。免费、快速、全球 CDN、自定义域名。工作流很简单——但预部署检查清单可以防止浪费 30 分钟调试的错误。</p>

      <h2>设置</h2>

      ${cb(`# 全局安装 wrangler（或作为开发依赖）
npm install -D wrangler

# 登录一次
npx wrangler login`, 'bash')}

      <h2>预部署检查清单</h2>

      <p><strong>每次部署前</strong>都要检查：</p>

      <ol>
        <li><strong>入口是 <code>index.html</code></strong>——不是 <code>app.html</code>，不是 <code>main.html</code>。Cloudflare Pages 在根路径提供 <code>index.html</code>。</li>
        <li><strong>构建输出在 <code>dist/</code></strong>——确认构建脚本在那里生成文件。</li>
        <li><strong>Git remote 已配置</strong>——部署前创建 GitHub 仓库并推送。</li>
        <li><strong>使用 Node API 需要兼容标志</strong>——如果在 Workers 中使用 Node 内置模块，设置 <code>nodejs_compat</code>。</li>
      </ol>

      <h2>部署命令</h2>

      ${cb(`# 先构建
npm run build

# 部署到 Cloudflare Pages
npx wrangler pages deploy dist/

# Workers 项目（检查 wrangler.toml）：
# npx wrangler deploy`, 'bash')}

      <h2>部署后验证</h2>

      ${cb(`# 确认网站已上线
curl -s -o /dev/null -w "%{http_code}" https://your-project.pages.dev

# 应返回：200`, 'bash')}

      <h2>GitHub 集成</h2>

      ${cb(`# 创建仓库并推送作为部署的一部分
gh repo create your-project --public --source=. --push

# Cloudflare 可以从 GitHub 推送自动部署
# 但手动 wrangler 部署给你更多控制权`, 'bash')}

      <h2>常见陷阱</h2>
      <ul>
        <li><strong>SPA 路由</strong>：Cloudflare Pages 需要 <code>_redirects</code> 文件或 <code>/*  /index.html  200</code> 规则才能让基于 hash 的路由在直接访问 URL 时工作。</li>
        <li><strong>不要重命名线上仓库</strong>：重命名 GitHub 仓库会断开 Cloudflare Pages 的连接。创建新项目替代。</li>
        <li><strong>缓存清除</strong>：Cloudflare 缓存很积极。使用版本化文件名或添加 <code>?v=</code> 查询参数来做关键更新。</li>
      </ul>
    `,
  },

  // ── Recipe 6: Esbuild + TypeScript + Tailwind Scaffold ──
  {
    slug: 'esbuild-typescript-scaffold',
    title: 'Esbuild + TypeScript Project Scaffold',
    titleZh: 'Esbuild + TypeScript 项目脚手架',
    description: 'The minimal build setup for a TypeScript SPA — esbuild for bundling, no framework overhead, sub-second builds.',
    descriptionZh: 'TypeScript SPA 的最小构建配置——esbuild 打包，无框架开销，亚秒级构建。',
    category: 'code',
    tags: ['esbuild', 'TypeScript', 'scaffold'],
    difficulty: 'intermediate',
    author: 'Z Huang',
    updatedAt: '2026-04-05',
    content: `
      <p>This scaffold boots a TypeScript SPA in under a minute. Esbuild bundles in milliseconds — no Webpack config hell, no Vite magic, just a straightforward build script.</p>

      <h2>Project Structure</h2>

      ${cb(`project/
  index.html          # HTML shell
  package.json        # Dependencies and scripts
  tsconfig.json       # TypeScript config
  build.mjs           # Build script
  src/
    main.ts           # Entry point
    styles/
      main.css        # Styles
  dist/               # Build output (gitignored)`, 'bash')}

      <h2>package.json</h2>

      ${cb(`{
  "name": "my-app",
  "type": "module",
  "scripts": {
    "build": "node build.mjs",
    "dev": "node build.mjs && npx serve dist -l 3000"
  },
  "devDependencies": {
    "esbuild": "^0.25.0",
    "typescript": "^5.7.0"
  }
}`, 'json')}

      <h2>build.mjs</h2>

      ${cb(`import * as esbuild from 'esbuild';
import { cpSync, mkdirSync } from 'fs';

mkdirSync('dist', { recursive: true });

await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'dist/main.js',
  format: 'esm',
  minify: process.argv.includes('--minify'),
  sourcemap: true,
});

cpSync('index.html', 'dist/index.html');
cpSync('src/styles/main.css', 'dist/styles.css');

console.log('Build complete → dist/');`, 'javascript')}

      <h2>tsconfig.json</h2>

      ${cb(`{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src",
    "lib": ["ES2022", "DOM", "DOM.Iterable"]
  },
  "include": ["src/**/*.ts"]
}`, 'json')}

      <h2>Why Not Vite?</h2>
      <p>Vite is great, but adds abstraction. This scaffold gives you:</p>
      <ul>
        <li><strong>Full control</strong> — you see exactly what the build does</li>
        <li><strong>No config magic</strong> — no plugins, no transforms, no HMR complexity</li>
        <li><strong>Tiny footprint</strong> — 2 devDependencies vs. 20+</li>
        <li><strong>Same speed</strong> — esbuild is what Vite uses under the hood anyway</li>
      </ul>

      <p>For a content site or small SPA, this is all you need. Reach for Vite when you need HMR, JSX transforms, or a plugin ecosystem.</p>
    `,
    contentZh: `
      <p>这个脚手架在一分钟内启动 TypeScript SPA。Esbuild 在毫秒内打包——没有 Webpack 配置地狱，没有 Vite 魔法，只有一个直接的构建脚本。</p>

      <h2>项目结构</h2>

      ${cb(`project/
  index.html          # HTML 外壳
  package.json        # 依赖和脚本
  tsconfig.json       # TypeScript 配置
  build.mjs           # 构建脚本
  src/
    main.ts           # 入口点
    styles/
      main.css        # 样式
  dist/               # 构建输出（gitignore）`, 'bash')}

      <h2>package.json</h2>

      ${cb(`{
  "name": "my-app",
  "type": "module",
  "scripts": {
    "build": "node build.mjs",
    "dev": "node build.mjs && npx serve dist -l 3000"
  },
  "devDependencies": {
    "esbuild": "^0.25.0",
    "typescript": "^5.7.0"
  }
}`, 'json')}

      <h2>build.mjs</h2>

      ${cb(`import * as esbuild from 'esbuild';
import { cpSync, mkdirSync } from 'fs';

mkdirSync('dist', { recursive: true });

await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'dist/main.js',
  format: 'esm',
  minify: process.argv.includes('--minify'),
  sourcemap: true,
});

cpSync('index.html', 'dist/index.html');
cpSync('src/styles/main.css', 'dist/styles.css');

console.log('Build complete → dist/');`, 'javascript')}

      <h2>tsconfig.json</h2>

      ${cb(`{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src",
    "lib": ["ES2022", "DOM", "DOM.Iterable"]
  },
  "include": ["src/**/*.ts"]
}`, 'json')}

      <h2>为什么不用 Vite？</h2>
      <p>Vite 很好，但增加了抽象层。这个脚手架给你：</p>
      <ul>
        <li><strong>完全控制</strong>——你能看到构建究竟做了什么</li>
        <li><strong>无配置魔法</strong>——没有插件、没有转换、没有 HMR 复杂性</li>
        <li><strong>极小体积</strong>——2 个开发依赖 vs. 20+</li>
        <li><strong>同样速度</strong>——esbuild 就是 Vite 底层使用的</li>
      </ul>

      <p>对于内容网站或小型 SPA，这就够了。当你需要 HMR、JSX 转换或插件生态系统时，再用 Vite。</p>
    `,
  },

  // ── Recipe 7: Hash-based SPA Routing ──
  {
    slug: 'hash-routing',
    title: 'Hash-based SPA Routing Without a Framework',
    titleZh: '无框架的 Hash 路由 SPA',
    description: 'A minimal router using hashchange events — supports pages, params, and active link highlighting in under 30 lines.',
    descriptionZh: '使用 hashchange 事件的最小路由——30 行以内支持页面、参数和活跃链接高亮。',
    category: 'code',
    tags: ['routing', 'SPA', 'vanilla'],
    difficulty: 'intermediate',
    author: 'Z Huang',
    updatedAt: '2026-04-05',
    content: `
      <p>You don't need React Router or Vue Router for a simple SPA. Hash-based routing with <code>hashchange</code> events gives you everything you need: page navigation, URL params, and browser back/forward support.</p>

      <h2>The Router</h2>

      ${cb(`// src/router.ts
type RouteCallback = () => void;

let onRouteChange: RouteCallback | null = null;

export function initRouter(callback: RouteCallback): void {
  onRouteChange = callback;
  window.addEventListener('hashchange', () => {
    if (onRouteChange) onRouteChange();
  });
}

export function navigate(hash: string): void {
  window.location.hash = hash;
}

export function getCurrentRoute(): { page: string; param: string } {
  const hash = window.location.hash || '#/';

  if (hash === '#/' || hash === '') {
    return { page: 'home', param: '' };
  }
  if (hash.startsWith('#/recipe/')) {
    return { page: 'recipe', param: hash.replace('#/recipe/', '') };
  }
  if (hash.startsWith('#/category/')) {
    return { page: 'category', param: hash.replace('#/category/', '') };
  }

  return { page: 'home', param: '' };
}`)}

      <h2>Rendering Based on Route</h2>

      ${cb(`function renderContent(): void {
  const content = document.getElementById('content');
  if (!content) return;

  const hash = window.location.hash || '#/';

  if (hash === '#/') {
    content.innerHTML = renderHome();
  } else if (hash.startsWith('#/recipe/')) {
    const slug = hash.replace('#/recipe/', '');
    content.innerHTML = renderRecipePage(slug);
  } else if (hash.startsWith('#/category/')) {
    const category = hash.replace('#/category/', '');
    content.innerHTML = renderCategory(category);
  }

  window.scrollTo(0, 0);
}

// Initialize
initRouter(renderContent);
renderContent(); // Render initial route`)}

      <h2>Navigation Links</h2>

      ${cb(`<!-- Use standard anchor tags with hash hrefs -->
<a href="#/">Home</a>
<a href="#/recipe/my-recipe">My Recipe</a>
<a href="#/category/workflow">Workflow</a>

<!-- Or programmatic navigation -->
<div onclick="navigate('#/recipe/my-recipe')">Click me</div>`, 'html')}

      <h2>Active Link Highlighting</h2>

      ${cb(`function updateActiveLinks(): void {
  const hash = window.location.hash || '#/';
  document.querySelectorAll('.sidebar-link').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === hash);
  });
}`)}

      <h2>Why Hash Routing?</h2>
      <ul>
        <li><strong>No server config needed</strong> — works on any static host (Cloudflare Pages, GitHub Pages, S3)</li>
        <li><strong>No 404 problems</strong> — the server always serves index.html, the hash is client-side only</li>
        <li><strong>Browser history works</strong> — back/forward buttons trigger hashchange</li>
        <li><strong>Bookmarkable URLs</strong> — <code>yoursite.com/#/recipe/my-recipe</code> works</li>
      </ul>
    `,
    contentZh: `
      <p>简单 SPA 不需要 React Router 或 Vue Router。基于 hash 的路由使用 <code>hashchange</code> 事件就能提供你需要的一切：页面导航、URL 参数和浏览器前进后退支持。</p>

      <h2>路由器</h2>

      ${cb(`// src/router.ts
type RouteCallback = () => void;

let onRouteChange: RouteCallback | null = null;

export function initRouter(callback: RouteCallback): void {
  onRouteChange = callback;
  window.addEventListener('hashchange', () => {
    if (onRouteChange) onRouteChange();
  });
}

export function navigate(hash: string): void {
  window.location.hash = hash;
}

export function getCurrentRoute(): { page: string; param: string } {
  const hash = window.location.hash || '#/';

  if (hash === '#/' || hash === '') {
    return { page: 'home', param: '' };
  }
  if (hash.startsWith('#/recipe/')) {
    return { page: 'recipe', param: hash.replace('#/recipe/', '') };
  }
  if (hash.startsWith('#/category/')) {
    return { page: 'category', param: hash.replace('#/category/', '') };
  }

  return { page: 'home', param: '' };
}`)}

      <h2>基于路由渲染</h2>

      ${cb(`function renderContent(): void {
  const content = document.getElementById('content');
  if (!content) return;

  const hash = window.location.hash || '#/';

  if (hash === '#/') {
    content.innerHTML = renderHome();
  } else if (hash.startsWith('#/recipe/')) {
    const slug = hash.replace('#/recipe/', '');
    content.innerHTML = renderRecipePage(slug);
  } else if (hash.startsWith('#/category/')) {
    const category = hash.replace('#/category/', '');
    content.innerHTML = renderCategory(category);
  }

  window.scrollTo(0, 0);
}

// 初始化
initRouter(renderContent);
renderContent(); // 渲染初始路由`)}

      <h2>导航链接</h2>

      ${cb(`<!-- 使用标准锚标签和 hash href -->
<a href="#/">首页</a>
<a href="#/recipe/my-recipe">我的食谱</a>
<a href="#/category/workflow">工作流</a>

<!-- 或程序化导航 -->
<div onclick="navigate('#/recipe/my-recipe')">点击我</div>`, 'html')}

      <h2>活跃链接高亮</h2>

      ${cb(`function updateActiveLinks(): void {
  const hash = window.location.hash || '#/';
  document.querySelectorAll('.sidebar-link').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === hash);
  });
}`)}

      <h2>为什么用 Hash 路由？</h2>
      <ul>
        <li><strong>不需要服务器配置</strong>——在任何静态主机上都能工作（Cloudflare Pages、GitHub Pages、S3）</li>
        <li><strong>没有 404 问题</strong>——服务器总是提供 index.html，hash 只在客户端</li>
        <li><strong>浏览器历史正常</strong>——前进后退按钮触发 hashchange</li>
        <li><strong>可收藏的 URL</strong>——<code>yoursite.com/#/recipe/my-recipe</code> 直接可用</li>
      </ul>
    `,
  },

  // ── Recipe 8: Terminal Hacker Aesthetic ──
  {
    slug: 'terminal-aesthetic',
    title: 'Terminal Hacker Aesthetic',
    titleZh: '终端黑客美学',
    description: 'The dark mode, monospace, green-accent design system used across developer tools — complete CSS theme with color tokens.',
    descriptionZh: '开发者工具中使用的深色模式、等宽字体、绿色强调设计系统——完整的 CSS 主题和颜色令牌。',
    category: 'design',
    tags: ['dark-mode', 'theme', 'CSS'],
    difficulty: 'starter',
    author: 'Z Huang',
    updatedAt: '2026-04-05',
    content: `
      <p>The terminal aesthetic communicates "this is a developer tool" instantly. Dark background, monospace type, green accents — it's familiar to anyone who lives in a terminal. Here's the complete design system.</p>

      <h2>Color Tokens</h2>

      ${cb(`:root {
  --bg: #0a0e14;           /* Deep navy-black */
  --surface: #131920;      /* Card/panel backgrounds */
  --border: #1e2a35;       /* Subtle dividers */
  --text-primary: #e0e0e0; /* Main text */
  --text-secondary: #7a8a9e; /* Muted text */
  --accent-green: #00e88f; /* Terminal green — links, active states */
  --accent-cyan: #00bcd4;  /* Secondary accent — tags, badges */
  --accent-amber: #f5a623; /* Warnings, difficulty indicators */
  --code-bg: #0d1117;      /* Code block background */
}`, 'css')}

      <h2>Typography</h2>

      ${cb(`/* Import JetBrains Mono from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

body {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 18px; /* Monospace reads small — start bigger */
  color: var(--text-primary);
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, code, .mono {
  font-family: 'JetBrains Mono', monospace;
}`, 'css')}

      <h2>Card Pattern</h2>

      ${cb(`.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px;
  transition: border-color 200ms ease;
}

.card:hover {
  border-color: var(--accent-green);
}

/* No shadows — flat terminal aesthetic, borders only */`, 'css')}

      <h2>Key Principles</h2>
      <ul>
        <li><strong>Flat, not elevated</strong> — borders instead of shadows. The terminal doesn't have depth.</li>
        <li><strong>Monospace for structure</strong> — headings, labels, and code in JetBrains Mono; body prose in system-ui for readability.</li>
        <li><strong>Green means interactive</strong> — links, active states, hover borders. One accent color for all interactive elements.</li>
        <li><strong>Sparse, not dense</strong> — generous padding (16-32px), ample line-height (1.6), breathing room between sections.</li>
      </ul>

      <h2>The Blinking Cursor</h2>

      ${cb(`.cursor {
  display: inline-block;
  width: 8px;
  height: 1.1em;
  background: var(--accent-green);
  vertical-align: text-bottom;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}`, 'css')}

      <p>Use sparingly — one cursor on the hero prompt is enough. Multiple blinking elements are distracting.</p>
    `,
    contentZh: `
      <p>终端美学能立即传达"这是一个开发者工具"。深色背景、等宽字体、绿色强调——对任何生活在终端中的人来说都很熟悉。这是完整的设计系统。</p>

      <h2>颜色令牌</h2>

      ${cb(`:root {
  --bg: #0a0e14;           /* 深海军蓝黑 */
  --surface: #131920;      /* 卡片/面板背景 */
  --border: #1e2a35;       /* 微妙分隔线 */
  --text-primary: #e0e0e0; /* 主文本 */
  --text-secondary: #7a8a9e; /* 弱化文本 */
  --accent-green: #00e88f; /* 终端绿——链接、活跃状态 */
  --accent-cyan: #00bcd4;  /* 次级强调——标签、徽章 */
  --accent-amber: #f5a623; /* 警告、难度指示器 */
  --code-bg: #0d1117;      /* 代码块背景 */
}`, 'css')}

      <h2>排版</h2>

      ${cb(`/* 从 Google Fonts 导入 JetBrains Mono */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

body {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 18px; /* 等宽字体看起来小——起始字号要大 */
  color: var(--text-primary);
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, code, .mono {
  font-family: 'JetBrains Mono', monospace;
}`, 'css')}

      <h2>卡片模式</h2>

      ${cb(`.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px;
  transition: border-color 200ms ease;
}

.card:hover {
  border-color: var(--accent-green);
}

/* 无阴影——扁平终端美学，仅用边框 */`, 'css')}

      <h2>关键原则</h2>
      <ul>
        <li><strong>扁平，不是立体</strong>——用边框代替阴影。终端没有深度。</li>
        <li><strong>等宽用于结构</strong>——标题、标签和代码用 JetBrains Mono；正文用 system-ui 保证可读性。</li>
        <li><strong>绿色 = 可交互</strong>——链接、活跃状态、悬浮边框。所有交互元素用一种强调色。</li>
        <li><strong>稀疏，不是密集</strong>——充裕的内边距（16-32px），充足的行高（1.6），板块之间留有呼吸空间。</li>
      </ul>

      <h2>闪烁光标</h2>

      ${cb(`.cursor {
  display: inline-block;
  width: 8px;
  height: 1.1em;
  background: var(--accent-green);
  vertical-align: text-bottom;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}`, 'css')}

      <p>谨慎使用——英雄区一个光标就够了。多个闪烁元素会分散注意力。</p>
    `,
  },

  // ── Recipe 9: Mobile-first Responsive Layout ──
  {
    slug: 'mobile-first-responsive',
    title: 'Mobile-first Responsive Layout',
    titleZh: '移动端优先响应式布局',
    description: 'The sidebar-collapses-to-hamburger pattern for SPAs — three breakpoints, tested at 375px, 768px, 1024px.',
    descriptionZh: '侧边栏收缩为汉堡菜单的 SPA 模式——三个断点，在 375px、768px、1024px 测试。',
    category: 'design',
    tags: ['responsive', 'mobile', 'layout'],
    difficulty: 'intermediate',
    author: 'Z Huang',
    updatedAt: '2026-04-05',
    content: `
      <p>Every project is tested at three breakpoints: 375px (phone), 768px (tablet), 1024px (desktop). The sidebar-to-hamburger pattern handles them all.</p>

      <h2>Desktop Layout (1024px+)</h2>
      <p>Fixed 260px sidebar on the left. Main content scrolls independently.</p>

      ${cb(`.app {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  overflow-y: auto;
}

.main {
  margin-left: 260px;
  flex: 1;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
}`, 'css')}

      <h2>Mobile Layout (< 768px)</h2>
      <p>Sidebar slides off-screen. Hamburger button appears. Overlay dims the page.</p>

      ${cb(`@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 300ms ease;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .hamburger {
    display: block;
  }

  .sidebar-overlay.open {
    display: block;
  }

  .main {
    margin-left: 0;
  }

  .content {
    padding: 24px 16px;
  }
}`, 'css')}

      <h2>The Hamburger Toggle</h2>

      ${cb(`function setupMobileMenu(): void {
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  hamburger?.addEventListener('click', () => {
    sidebar?.classList.toggle('open');
    overlay?.classList.toggle('open');
  });

  overlay?.addEventListener('click', () => {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('open');
  });
}`)}

      <h2>Grid Responsive Pattern</h2>

      ${cb(`.cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}`, 'css')}

      <h2>Testing Checklist</h2>
      <ul>
        <li><strong>375px</strong>: Single column, hamburger visible, no horizontal scroll, touch targets ≥ 44px</li>
        <li><strong>768px</strong>: Two-column grid, sidebar may be visible or hamburger</li>
        <li><strong>1024px</strong>: Three-column grid, sidebar always visible, content centered</li>
        <li>All grids must have <strong>complete rows</strong> — no orphan cards in the last row</li>
      </ul>
    `,
    contentZh: `
      <p>每个项目都在三个断点测试：375px（手机）、768px（平板）、1024px（桌面）。侧边栏到汉堡菜单的模式处理所有情况。</p>

      <h2>桌面布局（1024px+）</h2>
      <p>左侧固定 260px 侧边栏。主内容独立滚动。</p>

      ${cb(`.app {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  overflow-y: auto;
}

.main {
  margin-left: 260px;
  flex: 1;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
}`, 'css')}

      <h2>移动端布局（< 768px）</h2>
      <p>侧边栏滑出屏幕。汉堡按钮出现。遮罩层使页面变暗。</p>

      ${cb(`@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 300ms ease;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .hamburger {
    display: block;
  }

  .sidebar-overlay.open {
    display: block;
  }

  .main {
    margin-left: 0;
  }

  .content {
    padding: 24px 16px;
  }
}`, 'css')}

      <h2>汉堡菜单切换</h2>

      ${cb(`function setupMobileMenu(): void {
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  hamburger?.addEventListener('click', () => {
    sidebar?.classList.toggle('open');
    overlay?.classList.toggle('open');
  });

  overlay?.addEventListener('click', () => {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('open');
  });
}`)}

      <h2>网格响应式模式</h2>

      ${cb(`.cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}`, 'css')}

      <h2>测试检查清单</h2>
      <ul>
        <li><strong>375px</strong>：单列、汉堡菜单可见、无水平滚动、触摸目标 ≥ 44px</li>
        <li><strong>768px</strong>：双列网格、侧边栏可能可见或汉堡菜单</li>
        <li><strong>1024px</strong>：三列网格、侧边栏始终可见、内容居中</li>
        <li>所有网格必须有<strong>完整的行</strong>——最后一行不能有孤立卡片</li>
      </ul>
    `,
  },

  // ── Recipe 10: Accessible Dark Mode ──
  {
    slug: 'accessible-dark-mode',
    title: 'Accessible Dark Mode — Contrast, Focus, Reduced Motion',
    titleZh: '无障碍深色模式——对比度、焦点状态、减弱动效',
    description: 'Dark mode that passes WCAG AA — proper contrast ratios, visible focus indicators, and reduced motion support.',
    descriptionZh: '通过 WCAG AA 的深色模式——正确的对比度比率、可见的焦点指示器和减弱动效支持。',
    category: 'design',
    tags: ['accessibility', 'a11y', 'WCAG', 'dark-mode'],
    difficulty: 'advanced',
    author: 'Z Huang',
    updatedAt: '2026-04-05',
    content: `
      <p>Dark mode isn't just "dark background with light text." The most common failures: insufficient contrast on secondary text, invisible focus indicators, and motion that triggers vestibular issues. Here's how to get it right.</p>

      <h2>Contrast Ratios</h2>

      <p>WCAG AA requires 4.5:1 for normal text and 3:1 for large text (18px+ bold or 24px+ regular).</p>

      ${cb(`/* ✅ Good: these pass WCAG AA on #0a0e14 background */
--text-primary: #e0e0e0;   /* ~13:1 ratio — excellent */
--text-secondary: #7a8a9e; /* ~4.7:1 ratio — passes AA */
--accent-green: #00e88f;   /* ~8.5:1 ratio — excellent */

/* ❌ Bad: common dark mode mistakes */
--text-dim: #555555;       /* ~2.1:1 ratio — FAILS */
--gray-on-dark: #666666;   /* ~2.8:1 ratio — FAILS */`, 'css')}

      <p>Test every text color against your background. The tool: <strong>contrast-ratio.com</strong> or browser DevTools accessibility panel.</p>

      <h2>Focus Indicators</h2>

      <p>Many dark themes hide focus outlines. This breaks keyboard navigation.</p>

      ${cb(`/* Always visible focus for keyboard users */
:focus-visible {
  outline: 2px solid var(--accent-green);
  outline-offset: 2px;
}

/* Remove outline for mouse clicks */
:focus:not(:focus-visible) {
  outline: none;
}

/* Custom focus for inputs */
.search-input:focus {
  border-color: var(--accent-green);
  box-shadow: 0 0 0 2px rgba(0, 232, 143, 0.2);
}`, 'css')}

      <h2>Reduced Motion</h2>

      <p>Some users experience motion sickness from animations. Respect their OS setting:</p>

      ${cb(`@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`, 'css')}

      <h2>Scrollbar Styling</h2>

      ${cb(`/* Match scrollbar to dark theme */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: var(--bg);
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}`, 'css')}

      <h2>Checklist</h2>
      <ul>
        <li>All text passes 4.5:1 contrast against its background</li>
        <li>Interactive elements have visible <code>:focus-visible</code> outlines</li>
        <li>Animations respect <code>prefers-reduced-motion</code></li>
        <li>Inline code pills have enough contrast (<code>#131920</code> bg with <code>#e0e0e0</code> text = 10:1)</li>
        <li>Scrollbars match the theme (no bright white scrollbars on dark pages)</li>
        <li>Selection color is readable: <code>::selection { background: rgba(0, 232, 143, 0.3); }</code></li>
      </ul>
    `,
    contentZh: `
      <p>深色模式不仅仅是"深色背景加浅色文字"。最常见的失败：次要文字对比度不足、焦点指示器不可见、以及触发前庭问题的动效。以下是正确做法。</p>

      <h2>对比度比率</h2>

      <p>WCAG AA 要求普通文本 4.5:1，大文本（18px+ 粗体或 24px+ 常规）3:1。</p>

      ${cb(`/* ✅ 好：这些在 #0a0e14 背景上通过 WCAG AA */
--text-primary: #e0e0e0;   /* ~13:1 比率——优秀 */
--text-secondary: #7a8a9e; /* ~4.7:1 比率——通过 AA */
--accent-green: #00e88f;   /* ~8.5:1 比率——优秀 */

/* ❌ 差：常见深色模式错误 */
--text-dim: #555555;       /* ~2.1:1 比率——不通过 */
--gray-on-dark: #666666;   /* ~2.8:1 比率——不通过 */`, 'css')}

      <p>测试每种文字颜色与背景的对比度。工具：<strong>contrast-ratio.com</strong> 或浏览器 DevTools 无障碍面板。</p>

      <h2>焦点指示器</h2>

      <p>许多深色主题隐藏了焦点轮廓。这会破坏键盘导航。</p>

      ${cb(`/* 键盘用户始终可见的焦点 */
:focus-visible {
  outline: 2px solid var(--accent-green);
  outline-offset: 2px;
}

/* 鼠标点击移除轮廓 */
:focus:not(:focus-visible) {
  outline: none;
}

/* 输入框自定义焦点 */
.search-input:focus {
  border-color: var(--accent-green);
  box-shadow: 0 0 0 2px rgba(0, 232, 143, 0.2);
}`, 'css')}

      <h2>减弱动效</h2>

      <p>一些用户会因动画产生晕动症。尊重他们的系统设置：</p>

      ${cb(`@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`, 'css')}

      <h2>滚动条样式</h2>

      ${cb(`/* 滚动条匹配深色主题 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: var(--bg);
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}`, 'css')}

      <h2>检查清单</h2>
      <ul>
        <li>所有文本与背景的对比度通过 4.5:1</li>
        <li>交互元素有可见的 <code>:focus-visible</code> 轮廓</li>
        <li>动画尊重 <code>prefers-reduced-motion</code></li>
        <li>行内代码药丸有足够对比度（<code>#131920</code> 背景加 <code>#e0e0e0</code> 文字 = 10:1）</li>
        <li>滚动条匹配主题（深色页面上没有亮白色滚动条）</li>
        <li>选择颜色可读：<code>::selection { background: rgba(0, 232, 143, 0.3); }</code></li>
      </ul>
    `,
  },
];
