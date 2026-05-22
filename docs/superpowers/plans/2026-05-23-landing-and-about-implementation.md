# Landing and About Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the "Operating System for Biology" visionary redesign for the landing page and create a new authoritative "About" page aligned with the May 2026 pitch deck.

**Architecture:** We will create two new Astro components (`Footer.astro` and `TeamMember.astro`), update existing components (`Hero.astro`, `ParticleAnimation.astro`, `Navbar.astro`), update the landing page (`index.astro`), create the about page (`about.astro`), and expand our `i18n` dictionaries to support the new content. The design strictly adheres to the "Swiss Red" 12-column grid and sharp geometry.

**Tech Stack:** Astro, Vanilla CSS, TypeScript.

---

### Task 1: Update i18n Dictionaries

**Files:**
- Modify: `src/i18n/en.json`
- Modify: `src/i18n/zh.json`
- Test: `src/tests/i18n.test.ts` (assuming it validates keys)

- [ ] **Step 1: Write the failing test**
Modify `src/tests/i18n.test.ts` to expect the new keys (if it doesn't dynamically check, we just add the keys, but let's assume we ensure parity). Let's skip formal failing test for JSON dictionaries and just update them directly, as they are static data. We will rely on TypeScript/build step to catch missing keys if used. We'll run a build check.

- [ ] **Step 2: Modify `src/i18n/en.json`**

```json
{
  "site.title": "BIGO BDA Platform",
  "hero.title_part1": "The ",
  "hero.title_highlight": "next industrial revolution",
  "hero.title_part2": " will be written in proteins.",
  "hero.subtitle": "Bigo Biologics builds the design infrastructure for that future.",
  "hero.cta.start": "GET STARTED",
  "hero.cta.learn": "LEARN MORE",
  "nav.about": "About",
  "nav.blog": "Blog",
  "nav.studio": "Protein Design Studio",
  "vision.title": "Operating System for Biology: From Protein Therapeutics to Biomaterials.",
  "pillars.drug.title": "Drug Discovery",
  "pillars.drug.desc": "Standard packages for high-affinity binder candidates and structural insights.",
  "pillars.vaccine.title": "Vaccine Display",
  "pillars.vaccine.desc": "PoC for antigen display design and multimeric nanocage conformations.",
  "pillars.enzyme.title": "Industrial Enzymes",
  "pillars.enzyme.desc": "PoC for optimized enzyme activity and structural materials for green manufacturing.",
  "about.title": "About Bigo Biologics",
  "team.zerong.name": "Sun Zerong",
  "team.zerong.role": "Co-founder / CEO",
  "team.zerong.bio": "Biomedical Engineering, SUSTech. UC Berkeley visiting scholar. JHU PhD candidate (quit).",
  "team.zhe.name": "Li Zhe, Ph.D.",
  "team.zhe.role": "Co-founder / CSO",
  "team.zhe.bio": "Tenure Professor, SUSTech. Postdoc with David Baker. Lead of de novo structural design.",
  "team.yuze.name": "Sun Yuze, Ph.D.",
  "team.yuze.role": "Partner / CTO",
  "team.yuze.bio": "Oxford postdoc; Ph.D. in Mechanobiology, NUS. Expert in AI molecular design.",
  "mission.flow": "Sequence → Structure → Function",
  "mission.cycle": "Design · Build · Test · Learn · Scale",
  "mission.metrics.time": "8 Months R&D Cycle",
  "mission.metrics.cost": "60-70% Cost Reduction",
  "footer.contact": "Contact: contact@bigo.bio"
}
```

- [ ] **Step 3: Modify `src/i18n/zh.json`**

```json
{
  "site.title": "BIGO BDA 平台",
  "hero.title_part1": "",
  "hero.title_highlight": "下一次工业革命",
  "hero.title_part2": "将由蛋白质书写。",
  "hero.subtitle": "Bigo Biologics 为未来构建设计基础设施。",
  "hero.cta.start": "立即开始",
  "hero.cta.learn": "了解更多",
  "nav.about": "关于",
  "nav.blog": "博客",
  "nav.studio": "蛋白质设计工作室",
  "vision.title": "生物操作系统：从蛋白质药物到生物材料。",
  "pillars.drug.title": "药物发现",
  "pillars.drug.desc": "高亲和力结合蛋白候选物和结构解析的标准数据包。",
  "pillars.vaccine.title": "疫苗与展示",
  "pillars.vaccine.desc": "抗原展示设计和多聚体纳米笼构象的概念验证。",
  "pillars.enzyme.title": "工业酶",
  "pillars.enzyme.desc": "优化酶活性和结构材料以用于绿色制造的概念验证。",
  "about.title": "关于 Bigo Biologics",
  "team.zerong.name": "Sun Zerong",
  "team.zerong.role": "联合创始人 / CEO",
  "team.zerong.bio": "南方科技大学生物医学工程。加州大学伯克利分校访问学者。前约翰霍普金斯大学博士候选人。",
  "team.zhe.name": "Li Zhe, Ph.D.",
  "team.zhe.role": "联合创始人 / CSO",
  "team.zhe.bio": "南方科技大学长聘教授。师从 David Baker。主导从头结构设计。",
  "team.yuze.name": "Sun Yuze, Ph.D.",
  "team.yuze.role": "合伙人 / CTO",
  "team.yuze.bio": "牛津大学博士后；新加坡国立大学机械生物学博士。AI 分子设计专家。",
  "mission.flow": "序列 → 结构 → 功能",
  "mission.cycle": "设计 · 构建 · 测试 · 学习 · 扩展",
  "mission.metrics.time": "8 个月研发周期",
  "mission.metrics.cost": "60-70% 成本降低",
  "footer.contact": "联系方式: contact@bigo.bio"
}
```

- [ ] **Step 4: Run build to verify type safety**
Run: `npm run build` or `bun run build` (or `vitest` if configured). We expect success.

- [ ] **Step 5: Commit**
```bash
git add src/i18n/
git commit -m "feat(i18n): add localization keys for landing and about pages"
```

---

### Task 2: Create TeamMember Component

**Files:**
- Create: `src/components/TeamMember.astro`
- Create: `src/tests/components/TeamMember.test.ts` (stub if needed, skip for brevity as Astro UI testing setup varies, we rely on manual DOM check or build success).

- [ ] **Step 1: Write `src/components/TeamMember.astro`**

```astro
---
interface Props {
  name: string;
  role: string;
  bio: string;
  imageSrc?: string;
}

const { name, role, bio, imageSrc = "/favicon.svg" } = Astro.props;
---

<div class="team-member outline">
    <div class="image-container">
        <!-- Using favicon as a placeholder image -->
        <img src={imageSrc} alt={name} loading="lazy" />
    </div>
    <div class="info">
        <h3 class="name">{name}</h3>
        <p class="role text-swiss-red">{role}</p>
        <p class="bio">{bio}</p>
    </div>
</div>

<style>
    .team-member {
        display: flex;
        flex-direction: column;
        background: var(--color-white);
    }
    
    .image-container {
        width: 100%;
        aspect-ratio: 1 / 1;
        border-bottom: 1px solid var(--color-black);
        background: var(--color-grey-100);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: grayscale(100%) contrast(1.2);
    }

    .info {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .name {
        font-size: 1.5rem;
        font-weight: 800;
        line-height: 1.2;
    }

    .role {
        font-size: 0.875rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .bio {
        font-size: 0.875rem;
        color: var(--color-grey-700);
        margin-top: 0.5rem;
    }
</style>
```

- [ ] **Step 2: Run build to verify syntax**
Run: `bun run build`

- [ ] **Step 3: Commit**
```bash
git add src/components/TeamMember.astro
git commit -m "feat(ui): create TeamMember component"
```

---

### Task 3: Create Footer Component

**Files:**
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Write `src/components/Footer.astro`**

```astro
---
import { getTranslations } from '../i18n/utils';
import NavLink from './NavLink.astro';

interface Props {
    lang: 'en' | 'zh';
}

const { lang } = Astro.props;
const t = getTranslations(lang);
---

<footer class="footer outline">
    <div class="grid-container">
        <div class="footer-content">
            <div class="footer-brand">
                <a href={lang === 'en' ? '/' : '/zh/'} class="logo">BIGO BDA</a>
                <p class="contact">{t('footer.contact')}</p>
            </div>
            
            <div class="footer-links">
                <NavLink href={lang === 'en' ? '/about' : '/zh/about'}>{t('nav.about')}</NavLink>
                <NavLink href="#">{t('nav.blog')}</NavLink>
                <NavLink href="#">{t('nav.studio')}</NavLink>
            </div>
        </div>
    </div>
</footer>

<style>
    .footer {
        margin-top: 6rem;
        padding: 4rem 0;
        background-color: var(--color-white);
        border-left: none;
        border-right: none;
        border-bottom: none;
    }

    .footer-content {
        grid-column: span var(--grid-columns);
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 2rem;
        flex-wrap: wrap;
    }

    .footer-brand {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .logo {
        font-weight: 800;
        text-decoration: none;
        color: var(--color-black);
        font-size: 1.5rem;
        letter-spacing: -0.02em;
    }

    .contact {
        font-size: 0.875rem;
        color: var(--color-grey-600);
    }

    .footer-links {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    @media (max-width: 640px) {
        .footer-content {
            flex-direction: column;
        }
    }
</style>
```

- [ ] **Step 2: Run build to verify syntax**
Run: `bun run build`

- [ ] **Step 3: Commit**
```bash
git add src/components/Footer.astro
git commit -m "feat(ui): create Footer component"
```

---

### Task 4: Update Navigation Navbar

**Files:**
- Modify: `src/components/Navbar.astro`

- [ ] **Step 1: Add "About" link to Navbar**
In `src/components/Navbar.astro`, insert the About `NavLink` before the Blog link in both `.nav-links` and `.mobile-links`.

Replace `src/components/Navbar.astro`:

```astro
---
import { getTranslations } from '../i18n/utils';
import NavLink from './NavLink.astro';
import LanguageToggle from './LanguageToggle.astro';

interface Props {
    lang: 'en' | 'zh';
}

const { lang } = Astro.props;
const t = getTranslations(lang);
---

<nav class="navbar outline">
    <div class="grid-container">
        <div class="nav-content">
            <div class="nav-logo">
                <a href={lang === 'en' ? '/' : '/zh/'} class="logo-link">BIGO BDA</a>
            </div>
            
            <div class="nav-links desktop-only">
                <NavLink href={lang === 'en' ? '/about' : '/zh/about'}>{t('nav.about')}</NavLink>
                <NavLink href="#">{t('nav.blog')}</NavLink>
                <NavLink href="#">{t('nav.studio')}</NavLink>
            </div>

            <div class="nav-actions">
                <LanguageToggle lang={lang} />
                <button id="mobile-toggle" type="button" class="mobile-only outline" aria-label="Toggle Menu">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>
            </div>
        </div>
    </div>
</nav>

<div id="nav-overlay"></div>

<div id="mobile-panel" class="outline">
    <button id="close-panel" type="button" aria-label="Close Menu">✕</button>
    <div class="mobile-links">
        <NavLink href={lang === 'en' ? '/about' : '/zh/about'} class="mobile-nav-item">{t('nav.about')}</NavLink>
        <NavLink href="#" class="mobile-nav-item">{t('nav.blog')}</NavLink>
        <NavLink href="#" class="mobile-nav-item">{t('nav.studio')}</NavLink>
    </div>
</div>

<style>
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 64px;
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        z-index: 1000;
        display: flex;
        align-items: center;
        border-top: none;
        border-left: none;
        border-right: none;
    }

    .nav-content {
        grid-column: span 12;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        gap: 1rem;
    }

    .logo-link {
        font-weight: 800;
        text-decoration: none;
        color: var(--color-black);
        font-size: 1.25rem;
        letter-spacing: -0.02em;
    }

    .nav-links {
        display: flex;
        flex: 1;
        justify-content: center;
    }

    .nav-actions {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    /* Mobile Specific */
    #mobile-toggle {
        width: 40px;
        height: 40px;
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4px;
        background: var(--color-white);
        cursor: pointer;
    }

    .hamburger-line {
        width: 20px;
        height: 2px;
        background-color: var(--color-black);
    }

    #nav-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(4px);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1500;
    }

    #nav-overlay.open {
        opacity: 1;
        visibility: visible;
    }

    #mobile-panel {
        position: fixed;
        top: 0;
        right: -300px;
        width: 300px;
        height: 100vh;
        background-color: var(--color-white);
        z-index: 2000;
        transition: right 0.3s ease-in-out;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        border-top: none;
        border-bottom: none;
        border-right: none;
    }

    #mobile-panel.open {
        right: 0;
    }

    #close-panel {
        align-self: flex-end;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        font-weight: 800;
        margin-bottom: 2rem;
    }

    .mobile-links {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .mobile-nav-item {
        --nav-link-width: 100%;
        --nav-link-height: auto;
        --nav-link-padding: 1rem;
        --nav-link-justify: flex-start;
        margin-left: 0;
        font-size: 1.25rem;
    }

    .desktop-only { display: flex; }
    .mobile-only { display: none; }

    @media (max-width: 768px) {
        .desktop-only { display: none; }
        .mobile-only { display: flex; }
        #mobile-toggle { display: flex; }
        .nav-content { grid-column: span 4; }
    }
</style>

<script>
    const toggle = document.getElementById('mobile-toggle');
    const panel = document.getElementById('mobile-panel');
    const close = document.getElementById('close-panel');
    const overlay = document.getElementById('nav-overlay');

    function toggleMenu(isOpen: boolean) {
        if (isOpen) {
            panel?.classList.add('open');
            overlay?.classList.add('open');
            document.body.style.overflow = 'hidden';
        } else {
            panel?.classList.remove('open');
            overlay?.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    toggle?.addEventListener('click', () => toggleMenu(true));
    close?.addEventListener('click', () => toggleMenu(false));
    overlay?.addEventListener('click', () => toggleMenu(false));

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') toggleMenu(false);
    });
</script>
```

- [ ] **Step 2: Check Layout updates**
Ensure Layout component renders Footer. Let's update `src/layouts/Layout.astro` as well.

Modify `src/layouts/Layout.astro`:

```astro
---
import '../styles/global.css';
import Navbar from '../components/Navbar.astro';
import Footer from '../components/Footer.astro';
import { getTranslations } from '../i18n/utils';

interface Props {
	title: string;
    lang: 'en' | 'zh';
}

const { title, lang } = Astro.props;
const t = getTranslations(lang);
---

<!doctype html>
<html lang={lang}>
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<meta name="generator" content={Astro.generator} />
		<title>{title}</title>
	</head>
	<body>
        <Navbar lang={lang} />
		<slot />
        <Footer lang={lang} />
	</body>
</html>
```

- [ ] **Step 3: Commit**
```bash
git add src/components/Navbar.astro src/layouts/Layout.astro
git commit -m "feat(ui): add About link to nav and inject Footer into layout"
```

---

### Task 5: Redesign Hero Component

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: Update Hero Layout**
Implement edge-to-edge typography with bottom-left alignment logic and selective red highlight.

Replace `src/components/Hero.astro`:

```astro
---
import Button from './Button.astro';
import { getTranslations } from '../i18n/utils';

interface Props {
    lang: 'en' | 'zh';
}

const { lang } = Astro.props;
const t = getTranslations(lang);
---

<div class="hero-container grid-item">
    <div class="hero-text">
        <h1 class="hero-title">
            {t('hero.title_part1')}<span class="text-swiss-red">{t('hero.title_highlight')}</span>{t('hero.title_part2')}
        </h1>
        <p class="hero-subtitle">{t('hero.subtitle')}</p>
        <div class="hero-actions">
            <Button variant="primary">{t('hero.cta.start')}</Button>
            <Button variant="outline">{t('hero.cta.learn')}</Button>
        </div>
    </div>
</div>

<style>
    .hero-container {
        min-height: 80vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-end; /* Bottom alignment */
        padding-bottom: 4rem;
        padding-top: 10rem;
    }

    .hero-text {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        max-width: 1000px;
    }

    .hero-title {
        font-size: clamp(3rem, 8vw, 6rem); /* Massive typography */
        line-height: 1;
        font-weight: 800;
        letter-spacing: -0.02em;
        text-transform: uppercase;
    }

    .hero-subtitle {
        font-size: clamp(1.25rem, 4vw, 1.5rem);
        max-width: 700px;
        color: var(--color-grey-800);
        border-left: 4px solid var(--color-black);
        padding-left: 1rem;
    }

    .hero-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
    }

    @media (max-width: 640px) {
        .hero-container {
            min-height: 70vh;
            padding-bottom: 2rem;
        }
        
        .hero-title {
            hyphens: auto;
            word-wrap: break-word;
        }
    }
</style>
```

- [ ] **Step 2: Commit**
```bash
git add src/components/Hero.astro
git commit -m "feat(ui): redesign Hero with poster aesthetic"
```

---

### Task 6: Build Landing Page Structure

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/zh/index.astro`

- [ ] **Step 1: Rewrite `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import ParticleAnimation from '../components/ParticleAnimation.astro';
import { getTranslations } from '../i18n/utils';

const lang = 'en';
const t = getTranslations(lang);
---
<Layout title={t('site.title')} lang={lang}>
	<main class="grid-container main-content">
        <Hero lang={lang} />
        
        <div class="animation-wrapper grid-item outline">
            <ParticleAnimation />
        </div>

        <div class="vision-section grid-item">
            <h2 class="vision-title">{t('vision.title')}</h2>
        </div>

        <div class="pillars-grid grid-item">
            <div class="pillar outline">
                <h3>{t('pillars.drug.title')}</h3>
                <p>{t('pillars.drug.desc')}</p>
            </div>
            <div class="pillar outline">
                <h3>{t('pillars.vaccine.title')}</h3>
                <p>{t('pillars.vaccine.desc')}</p>
            </div>
            <div class="pillar outline">
                <h3>{t('pillars.enzyme.title')}</h3>
                <p>{t('pillars.enzyme.desc')}</p>
            </div>
        </div>
	</main>
</Layout>

<style>
    .main-content {
        padding-bottom: 6rem;
        gap: 4rem var(--grid-gutter);
    }

    .animation-wrapper {
        height: 300px;
        position: relative;
        overflow: hidden;
        background: var(--color-grey-100);
    }

    .vision-section {
        margin-top: 2rem;
    }

    .vision-title {
        font-size: clamp(2rem, 5vw, 3rem);
        line-height: 1.2;
        font-weight: 800;
        max-width: 900px;
    }

    .pillars-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--grid-gutter);
    }

    .pillar {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background: var(--color-white);
    }

    .pillar h3 {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--color-swiss-red);
    }

    .pillar p {
        color: var(--color-grey-800);
        line-height: 1.6;
    }

    @media (max-width: 1024px) {
        .pillars-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 640px) {
        .pillars-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
```

- [ ] **Step 2: Sync to `src/pages/zh/index.astro`**

```astro
---
import Layout from '../../layouts/Layout.astro';
import Hero from '../../components/Hero.astro';
import ParticleAnimation from '../../components/ParticleAnimation.astro';
import { getTranslations } from '../../i18n/utils';

const lang = 'zh';
const t = getTranslations(lang);
---
<Layout title={t('site.title')} lang={lang}>
	<main class="grid-container main-content">
        <Hero lang={lang} />
        
        <div class="animation-wrapper grid-item outline">
            <ParticleAnimation />
        </div>

        <div class="vision-section grid-item">
            <h2 class="vision-title">{t('vision.title')}</h2>
        </div>

        <div class="pillars-grid grid-item">
            <div class="pillar outline">
                <h3>{t('pillars.drug.title')}</h3>
                <p>{t('pillars.drug.desc')}</p>
            </div>
            <div class="pillar outline">
                <h3>{t('pillars.vaccine.title')}</h3>
                <p>{t('pillars.vaccine.desc')}</p>
            </div>
            <div class="pillar outline">
                <h3>{t('pillars.enzyme.title')}</h3>
                <p>{t('pillars.enzyme.desc')}</p>
            </div>
        </div>
	</main>
</Layout>

<style>
    .main-content {
        padding-bottom: 6rem;
        gap: 4rem var(--grid-gutter);
    }

    .animation-wrapper {
        height: 300px;
        position: relative;
        overflow: hidden;
        background: var(--color-grey-100);
    }

    .vision-section {
        margin-top: 2rem;
    }

    .vision-title {
        font-size: clamp(2rem, 5vw, 3rem);
        line-height: 1.2;
        font-weight: 800;
        max-width: 900px;
    }

    .pillars-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--grid-gutter);
    }

    .pillar {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background: var(--color-white);
    }

    .pillar h3 {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--color-swiss-red);
    }

    .pillar p {
        color: var(--color-grey-800);
        line-height: 1.6;
    }

    @media (max-width: 1024px) {
        .pillars-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 640px) {
        .pillars-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
```

- [ ] **Step 3: Commit**
```bash
git add src/pages/index.astro src/pages/zh/index.astro
git commit -m "feat(pages): implement new landing page layout"
```

---

### Task 7: Build About Page

**Files:**
- Create: `src/pages/about.astro`
- Create: `src/pages/zh/about.astro`

- [ ] **Step 1: Write `src/pages/about.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import TeamMember from '../components/TeamMember.astro';
import { getTranslations } from '../i18n/utils';

const lang = 'en';
const t = getTranslations(lang);
---
<Layout title={`${t('about.title')} | BIGO BDA`} lang={lang}>
    <main class="grid-container about-content">
        
        <div class="header-section grid-item">
            <h1 class="page-title">{t('about.title')}</h1>
        </div>

        <section class="team-section grid-item">
            <div class="team-grid">
                <TeamMember 
                    name={t('team.zerong.name')}
                    role={t('team.zerong.role')}
                    bio={t('team.zerong.bio')}
                />
                <TeamMember 
                    name={t('team.zhe.name')}
                    role={t('team.zhe.role')}
                    bio={t('team.zhe.bio')}
                />
                <TeamMember 
                    name={t('team.yuze.name')}
                    role={t('team.yuze.role')}
                    bio={t('team.yuze.bio')}
                />
            </div>
        </section>

        <section class="mission-section grid-item outline">
            <div class="mission-narrative">
                <h2 class="flow-text">{t('mission.flow')}</h2>
                <div class="cycle-box outline bg-swiss-red">
                    <p class="cycle-text">{t('mission.cycle')}</p>
                </div>
            </div>
            
            <div class="metrics-grid">
                <div class="metric outline">
                    <span class="metric-val">8mo</span>
                    <span class="metric-lbl">{t('mission.metrics.time')}</span>
                </div>
                <div class="metric outline">
                    <span class="metric-val">70%</span>
                    <span class="metric-lbl">{t('mission.metrics.cost')}</span>
                </div>
            </div>
        </section>

    </main>
</Layout>

<style>
    .about-content {
        padding-top: 8rem;
        padding-bottom: 6rem;
        gap: 4rem var(--grid-gutter);
    }

    .page-title {
        font-size: clamp(2.5rem, 6vw, 4rem);
        font-weight: 800;
        text-transform: uppercase;
        border-bottom: 4px solid var(--color-black);
        padding-bottom: 1rem;
    }

    .team-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--grid-gutter);
    }

    .mission-section {
        padding: 4rem;
        display: flex;
        flex-direction: column;
        gap: 4rem;
        background: var(--color-grey-100);
    }

    .mission-narrative {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        text-align: center;
    }

    .flow-text {
        font-size: clamp(1.5rem, 4vw, 2.5rem);
        font-weight: 800;
        letter-spacing: 0.05em;
    }

    .cycle-box {
        padding: 1.5rem 3rem;
        display: inline-block;
    }

    .cycle-text {
        font-size: 1.25rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .metrics-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--grid-gutter);
    }

    .metric {
        background: var(--color-white);
        padding: 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        text-align: center;
    }

    .metric-val {
        font-size: clamp(3rem, 8vw, 5rem);
        font-weight: 800;
        color: var(--color-swiss-red);
        line-height: 1;
    }

    .metric-lbl {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--color-grey-800);
    }

    @media (max-width: 1024px) {
        .team-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 640px) {
        .team-grid {
            grid-template-columns: 1fr;
        }
        .mission-section {
            padding: 2rem 1rem;
        }
        .metrics-grid {
            grid-template-columns: 1fr;
        }
        .cycle-box {
            padding: 1rem;
        }
        .cycle-text {
            font-size: 1rem;
        }
    }
</style>
```

- [ ] **Step 2: Sync to `src/pages/zh/about.astro`**

```astro
---
import Layout from '../../layouts/Layout.astro';
import TeamMember from '../../components/TeamMember.astro';
import { getTranslations } from '../../i18n/utils';

const lang = 'zh';
const t = getTranslations(lang);
---
<Layout title={`${t('about.title')} | BIGO BDA`} lang={lang}>
    <main class="grid-container about-content">
        
        <div class="header-section grid-item">
            <h1 class="page-title">{t('about.title')}</h1>
        </div>

        <section class="team-section grid-item">
            <div class="team-grid">
                <TeamMember 
                    name={t('team.zerong.name')}
                    role={t('team.zerong.role')}
                    bio={t('team.zerong.bio')}
                />
                <TeamMember 
                    name={t('team.zhe.name')}
                    role={t('team.zhe.role')}
                    bio={t('team.zhe.bio')}
                />
                <TeamMember 
                    name={t('team.yuze.name')}
                    role={t('team.yuze.role')}
                    bio={t('team.yuze.bio')}
                />
            </div>
        </section>

        <section class="mission-section grid-item outline">
            <div class="mission-narrative">
                <h2 class="flow-text">{t('mission.flow')}</h2>
                <div class="cycle-box outline bg-swiss-red">
                    <p class="cycle-text">{t('mission.cycle')}</p>
                </div>
            </div>
            
            <div class="metrics-grid">
                <div class="metric outline">
                    <span class="metric-val">8mo</span>
                    <span class="metric-lbl">{t('mission.metrics.time')}</span>
                </div>
                <div class="metric outline">
                    <span class="metric-val">70%</span>
                    <span class="metric-lbl">{t('mission.metrics.cost')}</span>
                </div>
            </div>
        </section>

    </main>
</Layout>

<style>
    /* Styles are identical to en version */
    .about-content {
        padding-top: 8rem;
        padding-bottom: 6rem;
        gap: 4rem var(--grid-gutter);
    }

    .page-title {
        font-size: clamp(2.5rem, 6vw, 4rem);
        font-weight: 800;
        text-transform: uppercase;
        border-bottom: 4px solid var(--color-black);
        padding-bottom: 1rem;
    }

    .team-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--grid-gutter);
    }

    .mission-section {
        padding: 4rem;
        display: flex;
        flex-direction: column;
        gap: 4rem;
        background: var(--color-grey-100);
    }

    .mission-narrative {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        text-align: center;
    }

    .flow-text {
        font-size: clamp(1.5rem, 4vw, 2.5rem);
        font-weight: 800;
        letter-spacing: 0.05em;
    }

    .cycle-box {
        padding: 1.5rem 3rem;
        display: inline-block;
    }

    .cycle-text {
        font-size: 1.25rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .metrics-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--grid-gutter);
    }

    .metric {
        background: var(--color-white);
        padding: 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        text-align: center;
    }

    .metric-val {
        font-size: clamp(3rem, 8vw, 5rem);
        font-weight: 800;
        color: var(--color-swiss-red);
        line-height: 1;
    }

    .metric-lbl {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--color-grey-800);
    }

    @media (max-width: 1024px) {
        .team-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 640px) {
        .team-grid {
            grid-template-columns: 1fr;
        }
        .mission-section {
            padding: 2rem 1rem;
        }
        .metrics-grid {
            grid-template-columns: 1fr;
        }
        .cycle-box {
            padding: 1rem;
        }
        .cycle-text {
            font-size: 1rem;
        }
    }
</style>
```

- [ ] **Step 3: Run build validation**
Run `npm run build` or `bun run build`.

- [ ] **Step 4: Commit**
```bash
git add src/pages/about.astro src/pages/zh/about.astro
git commit -m "feat(pages): implement About page with team and mission"
```
