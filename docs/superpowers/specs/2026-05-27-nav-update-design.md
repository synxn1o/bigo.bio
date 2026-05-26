# Navigation & Mobile UX Update Design

## 1. Goal
Add the recently created Pipeline Overview page to the navigation menus (desktop and mobile) and ensure the mobile navigation panel is scrollable to accommodate growing content.

## 2. Requirements

### 2.1 Navigation Updates
- Add a new "Overview" link to the Pipeline dropdown in the desktop navbar.
- Add a corresponding "Overview" link to the Pipeline section in the mobile side panel.
- Ensure proper localization (EN/ZH) for the new navigation labels.

### 2.2 Mobile UX Improvements
- The mobile side panel (`#mobile-panel`) must be vertically scrollable if the content exceeds the viewport height.
- The scrollbar should be unobtrusive or follow system defaults.

## 3. Proposed Changes

### 3.1 Internationalization (`src/i18n/`)
Add the following keys to `en.json` and `zh.json`:
- `nav.pipeline.overview`: "Overview" (EN) / "概览" (ZH)
- `nav.pipeline.overview.desc`: "Platform capabilities and pipeline strategy" (EN) / "平台能力与管线策略" (ZH)

### 3.2 Component: Navbar (`src/components/Navbar.astro`)

#### Desktop Dropdown
Update the `items` array for the Pipeline `DropdownNav` to include:
```javascript
{ 
    href: lang === 'en' ? '/pipeline' : '/zh/pipeline', 
    label: t('nav.pipeline.overview'), 
    description: t('nav.pipeline.overview.desc') 
}
```
This should be the first item in the list.

#### Mobile Side Panel
Add the "Overview" link under the "Pipeline" section label:
```astro
<NavLink href={lang === 'en' ? '/pipeline' : '/zh/pipeline'} class="mobile-nav-item">{t('nav.pipeline.overview')}</NavLink>
```

#### CSS Fix for Scrollability
Update `#mobile-panel` style:
```css
#mobile-panel {
    /* ... existing styles ... */
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; /* Smooth scrolling for iOS */
}
```

## 4. Verification Plan

### 4.1 Automated Tests
- Update `tests/pipeline-content.test.ts` to include the new navigation keys.
- Check that `Navbar.astro` renders the new link in a test if applicable (or manual check if test suite is limited).

### 4.2 Manual Verification
- Verify the desktop dropdown contains "Overview" and it links to `/pipeline` (or `/zh/pipeline`).
- Verify the mobile menu contains "Overview".
- Shrink the browser window height to force the mobile menu to overflow and verify vertical scrolling works correctly.
