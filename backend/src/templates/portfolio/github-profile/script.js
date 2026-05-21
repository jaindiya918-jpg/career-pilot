/**
   🎨 GITHUB PROFILE PORTFOLIO THEME - JS
   Clean client-side data rendering, placeholder replacements, 
   dynamic contribution heatmap, markdown README rendering,
   and interactive repository search/filters.
   ========================================== */

'use strict';

/* ==========================================
   ░░ PORTFOLIO DATA (Default Profile) ░░
   ========================================== */
const PORTFOLIO = {
  name:        'ANURAG DEV',
  initials:    'AD',
  role:        'FULL-STACK SOFTWARE ENGINEER',
  tagline:     'Building scalable cloud-native architectures, high-performance web systems, and developer-first tooling.',
  email:       'anurag.dev@example.com',
  githubUrl:   'https://github.com/',
  linkedinUrl: 'https://linkedin.com/',
  twitterUrl:  'https://twitter.com/',
  websiteUrl:  'https://anuragdev.example.com',
  location:    'Bengaluru, India',
  avatarUrl:   '', // Dynamic fallback if not provided

  aboutPara1:  'I\'m a full-stack developer passionate about open-source engineering, developer experience (DX), and modern web architectures. I enjoy compiling clean APIs, designing reactive frontends, and automating distributed deployment workflows.',
  
  /* Markdown README string for high fidelity rendering */
  aboutPara2: `### Hi there, I'm Anurag! 👋

I am a software engineer focused on building elegant, performant systems. I specialize in the Node.js/TypeScript ecosystem, containerized cloud services, and real-time socket communications.

#### 🚀 Core Competencies & Stack

- **Languages:** JavaScript, TypeScript, Python, Go, SQL
- **Front-End:** React.js, Next.js, HTML5, CSS3, TailwindCSS, Framer Motion
- **Back-End & Datastores:** Node.js, Express, Fastify, PostgreSQL, Redis, Firebase
- **DevOps & Cloud:** Docker, GitHub Actions, AWS, Cloudflare Pages, Netlify

---

#### 🛠️ Featured Open Source Tooling

> "Simplicity is the soul of efficiency." — Austin Freeman

I actively maintain several minor tools and open-source packages:

\`\`\`typescript
// Example: Lightning-fast cache lookup in Go/Node
import { EdgeCache } from 'anurag-cache';

const client = new EdgeCache({ ttl: '5m' });
await client.set('user:profile', { id: 'AD-99' });
\`\`\`

- **anurag-cache:** Lightweight memory caching layer for serverless functions.
- **career-pilot:** Next-generation resume optimization and pipeline tracking software.

---

#### 📈 Current Focus

Currently collaborating with teams on scalable microservices, AI integrations, and real-time socket services. Feel free to explore my repositories or get in touch!`,

  /* Repository Mappings (Realistic developer repositories) */
  projects: [
    {
      name: 'career-pilot-api',
      description: 'The core backend API engine powering CV parsing, automated sitemaps, and deployment pipelines.',
      language: 'JavaScript',
      stars: 142,
      forks: 28,
      isPinned: true
    },
    {
      name: 'anurag-cache',
      description: 'Distributed in-memory caching wrapper for edge computing nodes with custom TTL and automatic synchronization.',
      language: 'TypeScript',
      stars: 94,
      forks: 11,
      isPinned: true
    },
    {
      name: 'devhub-css-theme',
      description: 'A beautiful stylesheet compiler mimicking code repositories for resume and portfolio showcases.',
      language: 'CSS',
      stars: 48,
      forks: 3,
      isPinned: true
    },
    {
      name: 'cli-prompt-scanner',
      description: 'Interactive command-line tool to analyze project structure, detect security threats, and auto-generate OpenAPI schemas.',
      language: 'Go',
      stars: 76,
      forks: 8,
      isPinned: true
    },
    {
      name: 'react-glowing-charts',
      description: 'Ultra-lightweight React chart components featuring hardware-accelerated glowing mesh gradients.',
      language: 'JavaScript',
      stars: 125,
      forks: 19,
      isPinned: true
    },
    {
      name: 'python-resume-parser',
      description: 'A rule-based and LLM-assisted resume parser converting PDFs to formatted JSON documents.',
      language: 'Python',
      stars: 67,
      forks: 14,
      isPinned: true
    },
    {
      name: 'nextjs-starter-template',
      description: 'Bespoke Next.js template featuring built-in Auth, Firebase adapters, custom components, and lint presets.',
      language: 'TypeScript',
      stars: 38,
      forks: 4,
      isPinned: false
    },
    {
      name: 'portfolio-deployer-mcp',
      description: 'MCP server that connects development environments to Cloudflare Pages and GitHub Page services.',
      language: 'Go',
      stars: 52,
      forks: 9,
      isPinned: false
    }
  ]
};

/* Color-coded language mappings mirroring GitHub's exact colors */
const LANGUAGE_COLORS = {
  'JavaScript': '#f1e05a',
  'TypeScript': '#3178c6',
  'Python': '#3572A5',
  'Go': '#00ADD8',
  'CSS': '#563d7c',
  'HTML': '#e34c26',
  'Shell': '#89e051',
  'Ruby': '#701516'
};

/* ==========================================
   ░░ HELPERS ░░
   ========================================== */
const txt = (text) => document.createTextNode(text);

const el = (tag, classes = [], attrs = {}) => {
  const node = document.createElement(tag);
  if (classes.length) node.className = classes.join(' ');
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
};

const sanitizeHref = (value) => {
  try {
    const url = new URL(value, window.location.origin);
    if (!['http:', 'https:', 'mailto:'].includes(url.protocol)) return '#';
    return value;
  } catch (e) {
    // If relative path mailto: or similar
    if (value.startsWith('mailto:') || value.startsWith('http://') || value.startsWith('https://')) return value;
    return '#';
  }
};

/* Derive a username from a developer's name */
const getGithubUsername = (name) => {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'coder';
};

/* ==========================================
   ░░ TEMPLATE PLACEHOLDERS REPLACEMENT ░░
   ========================================== */
const fillPlaceholders = () => {
  // Safe default avatar placeholder using user initials
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(PORTFOLIO.name)}&background=1f262d&color=c9d1d9&size=200&bold=true`;
  const avatarToUse = PORTFOLIO.avatarUrl || defaultAvatar;

  const username = getGithubUsername(PORTFOLIO.name);

  const map = {
    '{{NAME}}':         PORTFOLIO.name,
    '{{INITIALS}}':     PORTFOLIO.initials,
    '{{ROLE}}':         PORTFOLIO.role,
    '{{TAGLINE}}':      PORTFOLIO.tagline,
    '{{EMAIL}}':        PORTFOLIO.email,
    '{{GITHUB_URL}}':   PORTFOLIO.githubUrl,
    '{{LINKEDIN_URL}}': PORTFOLIO.linkedinUrl,
    '{{TWITTER_URL}}':  PORTFOLIO.twitterUrl,
    '{{WEBSITE_URL}}':  PORTFOLIO.websiteUrl,
    '{{LOCATION}}':     PORTFOLIO.location,
    '{{ABOUT_PARA_1}}': PORTFOLIO.aboutPara1,
  };

  // 1. Text node walker
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach((node) => {
    let val = node.nodeValue;
    let changed = false;
    Object.entries(map).forEach(([placeholder, replacement]) => {
      if (val.includes(placeholder)) {
        val = val.split(placeholder).join(replacement || '');
        changed = true;
      }
    });
    if (changed) node.nodeValue = val;
  });

  // 2. Attribute updates
  document.querySelectorAll('[href],[src],[aria-label],[title],[alt]').forEach((node) => {
    ['href', 'src', 'aria-label', 'title', 'alt'].forEach((attr) => {
      const val = node.getAttribute(attr);
      if (!val) return;
      
      let newVal = val;
      Object.entries(map).forEach(([p, r]) => {
        newVal = newVal.split(p).join(r || '');
      });

      if (attr === 'href' && newVal !== val) {
        newVal = sanitizeHref(newVal);
      }
      
      if (newVal !== val) node.setAttribute(attr, newVal);
    });
  });

  // 3. Inject username elements
  const userElements = document.querySelectorAll('#gh-username');
  userElements.forEach(el => el.textContent = `@${username}`);

  const readmeFileLabel = document.getElementById('readme-filename');
  if (readmeFileLabel) readmeFileLabel.textContent = `${username} / README.md`;

  // Update status badge dynamically to showcase the tagline on hover
  const statusBadge = document.querySelector('.gh-avatar-status-badge');
  if (statusBadge && PORTFOLIO.tagline) {
    statusBadge.setAttribute('title', `Status: ${PORTFOLIO.tagline}`);
    statusBadge.setAttribute('aria-label', `Status: ${PORTFOLIO.tagline}`);
  }

  // 4. Set avatars
  const avatarImgElements = document.querySelectorAll('.profile-avatar');
  avatarImgElements.forEach(img => {
    img.src = avatarToUse;
  });

  // 5. Hide detail fields if empty
  if (!PORTFOLIO.location) document.getElementById('detail-location-container')?.remove();
  if (!PORTFOLIO.email) document.getElementById('detail-email-container')?.remove();
  if (!PORTFOLIO.websiteUrl) document.getElementById('detail-website-container')?.remove();
  if (!PORTFOLIO.githubUrl) document.getElementById('detail-github-container')?.remove();
  if (!PORTFOLIO.linkedinUrl) document.getElementById('detail-linkedin-container')?.remove();
  if (!PORTFOLIO.twitterUrl) document.getElementById('detail-twitter-container')?.remove();
};

/* ==========================================
   ░░ LIGHTWEIGHT CLIENT-SIDE MARKDOWN ENGINE ░░
   ========================================== */
const compileMarkdown = (mdString) => {
  if (!mdString) return '';
  
  let html = mdString;

  // Escape HTML elements to prevent XSS
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Re-allow blockquote escape since markdown uses >
  html = html.replace(/^&gt;\s+(.*)$/gm, '<blockquote>$1</blockquote>');
  
  // Headers (#)
  html = html.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.*)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.*)$/gm, '<h1>$1</h1>');

  // Preformatted Code Blocks (```js ... ```)
  html = html.replace(/```([a-z]*)\r?\n([\s\S]*?)\r?\n```/g, (match, lang, code) => {
    return `<pre><code class="language-${lang}">${code.trim()}</code></pre>`;
  });

  // Inline code (`code`)
  html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');

  // Bold (**text**)
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Emph (_text_ or *text*)
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

  // Bullet Lists (- item)
  // Wrap list items cleanly
  html = html.replace(/^\-\s+(.*)$/gm, '<li>$1</li>');
  // Group adjacent <li> tags inside <ul>
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

  // Links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, href) => {
    const safeUrl = sanitizeHref(href);
    return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  });

  // Paragraph blocks (splits double newlines except surrounding headers or blocks)
  const blocks = html.split(/\n{2,}/g);
  const processedBlocks = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || trimmed.startsWith('<pre') || trimmed.startsWith('<ul') || trimmed.startsWith('<blockquote>') || trimmed.startsWith('---')) {
      return trimmed;
    }
    if (trimmed === '---') {
      return '<hr style="border: none; border-bottom: 1px solid var(--border-color); margin: 24px 0;" />';
    }
    return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
  });

  return processedBlocks.join('\n');
};

const renderReadme = () => {
  const container = document.getElementById('readme-body');
  if (!container) return;
  container.innerHTML = compileMarkdown(PORTFOLIO.aboutPara2);
};

/* ==========================================
   ░░ REPOSITORY SVG ICONS ░░
   ========================================== */
const getRepoSvg = () => {
  return '<svg class="repo-card-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8z"></path></svg>';
};

const getStarSvg = () => {
  return '<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97 3.046 2.97a.75.75 0 01-.416 1.279l-4.21.612-1.882 3.815a.75.75 0 01-1.346 0l-1.882-3.815-4.21-.612a.75.75 0 01-.416-1.279l3.046-2.97-3.046-2.97a.75.75 0 01.416-1.279l4.21-.612L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694z"></path></svg>';
};

const getForkSvg = () => {
  return '<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5A2.25 2.25 0 0012.5 6.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-3.5a.75.75 0 01-.75-.75v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path></svg>';
};

/* ==========================================
   ░░ BUILD PINNED REPOSITORY CARDS ░░
   ========================================== */
const buildPinnedRepos = () => {
  const grid = document.getElementById('pinned-repos-grid');
  if (!grid) return;

  grid.innerHTML = '';
  
  // Filter for repositories that are pinned (default limit 6)
  const pinned = PORTFOLIO.projects.filter(p => p.isPinned !== false).slice(0, 6);

  pinned.forEach((repo) => {
    const card = el('article', ['repo-card']);
    
    // Header row
    const header = el('div', ['repo-card-header']);
    const titleContainer = el('div', ['repo-card-title-container']);
    titleContainer.innerHTML = getRepoSvg();
    
    const titleLink = el('a', ['repo-card-title'], { 
      href: PORTFOLIO.githubUrl + getGithubUsername(PORTFOLIO.name) + '/' + repo.name,
      target: '_blank',
      rel: 'noopener noreferrer'
    });
    titleLink.appendChild(txt(repo.name));
    titleContainer.appendChild(titleLink);
    
    const badge = el('span', ['badge-public']);
    badge.appendChild(txt('Public'));
    
    header.appendChild(titleContainer);
    header.appendChild(badge);

    // Description
    const desc = el('p', ['repo-card-desc']);
    desc.appendChild(txt(repo.description));

    // Meta Row
    const meta = el('div', ['repo-card-meta']);
    
    // Language dot
    if (repo.language) {
      const langSpan = el('span', ['repo-meta-item']);
      const color = LANGUAGE_COLORS[repo.language] || '#8b949e';
      langSpan.innerHTML = `<span class="lang-dot" style="background-color: ${color}"></span> ${repo.language}`;
      meta.appendChild(langSpan);
    }
    
    // Stars
    const starSpan = el('span', ['repo-meta-item']);
    starSpan.innerHTML = `${getStarSvg()} ${repo.stars}`;
    meta.appendChild(starSpan);

    // Forks
    const forkSpan = el('span', ['repo-meta-item']);
    forkSpan.innerHTML = `${getForkSvg()} ${repo.forks}`;
    meta.appendChild(forkSpan);

    card.appendChild(header);
    card.appendChild(desc);
    card.appendChild(meta);

    grid.appendChild(card);
  });
};

/* ==========================================
   ░░ DYNAMIC CONTRIBUTION CALENDAR GENERATOR ░░
   ========================================== */
const buildContributionHeatmap = () => {
  const grid = document.getElementById('heatmap-grid');
  const monthsRow = document.getElementById('heatmap-months-row');
  const tooltip = document.getElementById('heatmap-tooltip');
  
  if (!grid || !monthsRow) return;

  grid.innerHTML = '';
  monthsRow.innerHTML = '';

  const totalDays = 53 * 7;
  const now = new Date();
  
  // Calculate historical starting point (exactly Sunday of 53 weeks ago)
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - totalDays);
  // Rollback to previous Sunday
  const startDay = startDate.getDay();
  startDate.setDate(startDate.getDate() - startDay);

  let totalContribCount = 0;
  const monthPositions = {};
  
  // Iterate columns (53 weeks) x rows (7 days)
  // Grid layout flows column-first natively in GitHub profile calendars
  for (let week = 0; week < 53; week++) {
    for (let day = 0; day < 7; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + (week * 7) + day);

      // Skip dates in the future
      if (currentDate > now) continue;

      // Track Month labels positions
      const monthLabel = currentDate.toLocaleString('default', { month: 'short' });
      if (currentDate.getDate() <= 7 && !monthPositions[week]) {
        monthPositions[week] = monthLabel;
      }

      // Generate a realistic contribution count for this box
      // Weekdays have higher commits; summer months or weekends are lower
      const dayOfWeek = currentDate.getDay();
      let weight = 0.5; // Base weight
      if (dayOfWeek >= 1 && dayOfWeek <= 5) weight += 0.85; // Workdays
      
      // Random distribution multiplier
      const rand = Math.random();
      let level = 0;
      let count = 0;

      if (rand < 0.35 * weight) {
        level = 1;
        count = Math.floor(Math.random() * 2) + 1;
      } else if (rand < 0.60 * weight) {
        level = 2;
        count = Math.floor(Math.random() * 3) + 3;
      } else if (rand < 0.80 * weight) {
        level = 3;
        count = Math.floor(Math.random() * 4) + 6;
      } else if (rand < 0.92 * weight) {
        level = 4;
        count = Math.floor(Math.random() * 6) + 10;
      }

      totalContribCount += count;

      // Color maps
      const colors = [
        'var(--contrib-bg)',
        'var(--contrib-l1)',
        'var(--contrib-l2)',
        'var(--contrib-l3)',
        'var(--contrib-l4)'
      ];

      const box = el('div', ['contrib-box'], {
        'style': `background-color: ${colors[level]}`,
        'data-date': currentDate.toDateString(),
        'data-count': count
      });

      // Hover Tooltip Events
      box.addEventListener('mouseenter', (e) => {
        const rect = box.getBoundingClientRect();
        const dateStr = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const text = count === 0 ? `No contributions on ${dateStr}` : `${count} contribution${count > 1 ? 's' : ''} on ${dateStr}`;
        
        tooltip.textContent = text;
        tooltip.classList.add('show');
        
        // Position tooltip beautifully centered above the hovered element
        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;
        tooltip.style.left = `${rect.left + scrollX - (tooltip.offsetWidth / 2) + 5}px`;
        tooltip.style.top = `${rect.top + scrollY - tooltip.offsetHeight - 8}px`;
      });

      box.addEventListener('mouseleave', () => {
        tooltip.classList.remove('show');
      });

      // Position box inside CSS grid cleanly via columns
      box.style.gridColumn = week + 1;
      box.style.gridRow = day + 1;

      grid.appendChild(box);
    }
  }

  // Populate Month Headers in correct columns
  for (let week = 0; week < 53; week++) {
    const monthCol = el('span');
    if (monthPositions[week]) {
      monthCol.appendChild(txt(monthPositions[week]));
    }
    monthCol.style.gridColumn = week + 1;
    monthsRow.appendChild(monthCol);
  }

  // Inject computed totals
  const totalLabel = document.getElementById('total-contributions-count');
  if (totalLabel) totalLabel.textContent = totalContribCount.toLocaleString();

  // Populate global stars & followers badges dynamically based on repository data
  const totalStars = PORTFOLIO.projects.reduce((acc, curr) => acc + curr.stars, 0);
  const tabStarsBadge = document.getElementById('stars-count-badge');
  if (tabStarsBadge) tabStarsBadge.textContent = totalStars;

  const tabReposBadge = document.getElementById('repo-count-badge');
  if (tabReposBadge) tabReposBadge.textContent = PORTFOLIO.projects.length;
};

/* ==========================================
   ░░ BUILD FULL REPOSITORIES LIST VIEW ░░
   ========================================== */
const buildFullRepositoriesList = () => {
  const container = document.getElementById('repos-list');
  const langSelect = document.getElementById('filter-language');
  if (!container) return;

  const searchVal = document.getElementById('repo-search-input')?.value.toLowerCase() || '';
  const langFilter = langSelect?.value || 'all';
  const sortFilter = document.getElementById('filter-sort')?.value || 'stars';

  container.innerHTML = '';

  // 1. Gather all unique languages to populate filter list
  const uniqueLangs = new Set();
  PORTFOLIO.projects.forEach(p => { if (p.language) uniqueLangs.add(p.language); });
  
  if (langSelect && langSelect.options.length <= 1) {
    uniqueLangs.forEach(lang => {
      const opt = el('option', [], { value: lang.toLowerCase() });
      opt.appendChild(txt(lang));
      langSelect.appendChild(opt);
    });
  }

  // 2. Filter repositories
  let filtered = PORTFOLIO.projects.filter((repo) => {
    const matchesSearch = repo.name.toLowerCase().includes(searchVal) || 
                          repo.description.toLowerCase().includes(searchVal);
    const matchesLang = langFilter === 'all' || (repo.language && repo.language.toLowerCase() === langFilter);
    return matchesSearch && matchesLang;
  });

  // 3. Sort repositories
  filtered.sort((a, b) => {
    if (sortFilter === 'stars') return b.stars - a.stars;
    if (sortFilter === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  // 4. Inject items
  if (filtered.length === 0) {
    const blank = el('div', [], { style: 'text-align: center; color: var(--text-muted); padding: 48px;' });
    blank.appendChild(txt('No repositories match the current filters.'));
    container.appendChild(blank);
    return;
  }

  filtered.forEach((repo) => {
    const row = el('div', ['repo-list-item']);

    // Left info side
    const left = el('div', ['repo-list-item-left']);
    const titleRow = el('div', ['repo-list-item-title-row']);
    
    const titleLink = el('a', ['repo-list-item-title'], {
      href: PORTFOLIO.githubUrl + getGithubUsername(PORTFOLIO.name) + '/' + repo.name,
      target: '_blank',
      rel: 'noopener noreferrer'
    });
    titleLink.appendChild(txt(repo.name));
    titleRow.appendChild(titleLink);

    const badge = el('span', ['badge-public']);
    badge.appendChild(txt('Public'));
    titleRow.appendChild(badge);

    left.appendChild(titleRow);

    if (repo.description) {
      const desc = el('p', ['repo-list-item-desc']);
      desc.appendChild(txt(repo.description));
      left.appendChild(desc);
    }

    // Meta details row
    const meta = el('div', ['repo-list-item-meta']);
    
    if (repo.language) {
      const langSpan = el('span', ['repo-meta-item']);
      const color = LANGUAGE_COLORS[repo.language] || '#8b949e';
      langSpan.innerHTML = `<span class="lang-dot" style="background-color: ${color}"></span> ${repo.language}`;
      meta.appendChild(langSpan);
    }
    
    const starSpan = el('span', ['repo-meta-item']);
    starSpan.innerHTML = `${getStarSvg()} ${repo.stars}`;
    meta.appendChild(starSpan);

    const forkSpan = el('span', ['repo-meta-item']);
    forkSpan.innerHTML = `${getForkSvg()} ${repo.forks}`;
    meta.appendChild(forkSpan);

    // Dynamic date string
    const updatedSpan = el('span');
    updatedSpan.appendChild(txt('Updated recently'));
    meta.appendChild(updatedSpan);

    left.appendChild(meta);

    // Right Action Star Button side
    const right = el('div', ['repo-list-item-right']);
    const starBtn = el('button', ['btn', 'btn-secondary']);
    starBtn.innerHTML = `<span class="btn-star-icon">${getStarSvg()}</span> Star`;
    
    // Toggle star interaction
    let starred = false;
    starBtn.addEventListener('click', () => {
      starred = !starred;
      if (starred) {
        starBtn.innerHTML = `<span class="btn-star-icon" style="color: #f0883e;">★</span> Starred`;
        starBtn.style.borderColor = '#f0883e';
      } else {
        starBtn.innerHTML = `<span class="btn-star-icon">${getStarSvg()}</span> Star`;
        starBtn.style.borderColor = 'var(--border-color)';
      }
    });

    right.appendChild(starBtn);

    row.appendChild(left);
    row.appendChild(right);
    container.appendChild(row);
  });
};

/* ==========================================
   ░░ TAB BINDINGS INTERACTION ░░
   ========================================== */
const initTabNavigation = () => {
  const tabs = document.querySelectorAll('.gh-tab');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = tab.getAttribute('href').slice(1);
      
      // Update Tab state
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update Panel state
      panels.forEach(panel => {
        if (panel.id === `${targetId}-panel` || (targetId === 'projects-tab' && panel.id === 'overview-panel') || (targetId === 'packages-tab' && panel.id === 'overview-panel') || (targetId === 'stars-tab' && panel.id === 'overview-panel')) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
      
      // Smooth scroll back to view content naturally
      const mainOffset = document.querySelector('.gh-layout').offsetTop - 75;
      window.scrollTo({ top: mainOffset, behavior: 'smooth' });
    });
  });
};

/* ==========================================
   ░░ ACTIONS & INTERACTIONS ░░
   ========================================== */
const initProfileActions = () => {
  // Follow button interaction
  const followBtn = document.getElementById('btn-follow');
  if (followBtn) {
    let following = false;
    followBtn.addEventListener('click', () => {
      following = !following;
      const countEl = document.getElementById('followers-count');
      let currentVal = parseInt(countEl.textContent) || 0;

      if (following) {
        followBtn.textContent = 'Unfollow';
        followBtn.classList.remove('btn-primary');
        followBtn.classList.add('btn-secondary');
        countEl.textContent = currentVal + 1;
      } else {
        followBtn.textContent = 'Follow';
        followBtn.classList.remove('btn-secondary');
        followBtn.classList.add('btn-primary');
        countEl.textContent = currentVal - 1;
      }
    });
  }

  // Sponsor button alert
  const sponsorBtn = document.getElementById('btn-sponsor');
  if (sponsorBtn) {
    sponsorBtn.addEventListener('click', () => {
      alert(`Thank you for supporting ${PORTFOLIO.name}! Sponsoring is highly appreciated. ❤️`);
    });
  }
};

/* ==========================================
   ░░ DYNAMIC SEARCH BARS / FILTERS ░░
   ========================================== */
const initFiltersListeners = () => {
  const searchInput = document.getElementById('repo-search-input');
  const langSelect = document.getElementById('filter-language');
  const sortSelect = document.getElementById('filter-sort');

  if (searchInput) searchInput.addEventListener('input', buildFullRepositoriesList);
  if (langSelect) langSelect.addEventListener('change', buildFullRepositoriesList);
  if (sortSelect) sortSelect.addEventListener('change', buildFullRepositoriesList);
};

/* ==========================================
   ░░ FOOTER DYNAMIC YEAR ░░
   ========================================== */
const setFooterYear = () => {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
};

/* ==========================================
   ░░ INIT INITIALIZATION ░░
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Fill static placeholders from database/PORTFOLIO variables
  fillPlaceholders();
  
  // 2. Render Markdown README about box
  renderReadme();
  
  // 3. Build overview pins grid
  buildPinnedRepos();

  // 4. Generate dynamic contribution boxes heatmap calendar
  buildContributionHeatmap();

  // 5. Build full repos list panel with dynamic interactive states
  buildFullRepositoriesList();

  // 6. Setup tab switcher links
  initTabNavigation();

  // 7. Bind interactive follow/sponsor buttons
  initProfileActions();

  // 8. Bind repository list filters
  initFiltersListeners();

  // 9. Injects dynamic copyright year
  setFooterYear();
});
