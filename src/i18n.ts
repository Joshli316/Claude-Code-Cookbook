// Bilingual i18n system — EN/ZH

export type Lang = 'en' | 'zh';

const LANG_KEY = 'cookbook-lang';

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
  // Site
  'site.title': { en: 'Cookbook', zh: 'Cookbook' },
  'site.subtitle': { en: 'Claude Code', zh: 'Claude Code' },

  // Navigation
  'nav.home': { en: 'Home', zh: '首页' },
  'nav.workflow': { en: 'Workflow', zh: '工作流' },
  'nav.code': { en: 'Code', zh: '代码' },
  'nav.design': { en: 'Design', zh: '设计' },
  'nav.contribute': { en: 'Contribute a Recipe', zh: '贡献食谱' },
  'nav.recipes': { en: 'Recipes', zh: '食谱' },
  'nav.categories': { en: 'Categories', zh: '分类' },
  'nav.github': { en: 'GitHub', zh: 'GitHub' },

  // Search
  'search.placeholder': { en: 'Search recipes...', zh: '搜索食谱...' },
  'search.no_results': { en: 'No recipes found', zh: '未找到食谱' },

  // Language toggle
  'lang.toggle': { en: '中文', zh: 'EN' },

  // Recipe
  'recipe.copy': { en: 'Copy', zh: '复制' },
  'recipe.copied': { en: 'Copied!', zh: '已复制' },
  'recipe.prev': { en: 'Previous', zh: '上一篇' },
  'recipe.next': { en: 'Next', zh: '下一篇' },
  'recipe.view_github': { en: 'View on GitHub', zh: '在 GitHub 查看' },
  'recipe.contributed_by': { en: 'by', zh: '作者' },

  // Difficulty
  'difficulty.starter': { en: 'Starter', zh: '入门' },
  'difficulty.intermediate': { en: 'Intermediate', zh: '中级' },
  'difficulty.advanced': { en: 'Advanced', zh: '高级' },

  // Categories
  'category.workflow': { en: 'Workflow', zh: '工作流' },
  'category.code': { en: 'Code', zh: '代码' },
  'category.design': { en: 'Design', zh: '设计' },
  'category.workflow.desc': { en: 'Process patterns for efficient Claude Code sessions', zh: '高效 Claude Code 会话的流程模式' },
  'category.code.desc': { en: 'Implementation recipes with tested code examples', zh: '经过测试的代码实现方案' },
  'category.design.desc': { en: 'Visual and UX techniques for polished apps', zh: '打造精美应用的视觉和交互技巧' },

  // Home
  'home.hero_title': { en: '21+ projects.<br>Patterns that work.', zh: '21+ 个项目。<br>经过验证的模式。' },
  'home.hero_subtitle': { en: 'Workflow patterns, code recipes, and design techniques distilled from real Claude Code projects.', zh: '从真实 Claude Code 项目中提炼的工作流模式、代码方案和设计技巧。' },
  'home.featured': { en: 'Featured Recipes', zh: '精选食谱' },
  'home.all_recipes': { en: 'All Recipes', zh: '所有食谱' },
  'home.browse_category': { en: 'Browse by Category', zh: '按分类浏览' },

  // Contributing
  'contributing.title': { en: 'Contribute a Recipe', zh: '贡献食谱' },
  'contributing.desc': { en: 'Share your Claude Code patterns with the community.', zh: '与社区分享你的 Claude Code 模式。' },
};

export function t(key: string): string {
  const entry = strings[key];
  if (!entry) return key;
  return entry[currentLang] || entry.en;
}
