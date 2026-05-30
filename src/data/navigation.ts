export interface NavItem {
  href: string;
  labelKey: string;
  descKey?: string;
}

export interface NavSection {
  labelKey: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    labelKey: 'nav.bda',
    items: [
      { href: '/bda', labelKey: 'nav.bda.overview', descKey: 'nav.bda.overview.desc' },
      { href: '/bda/workflow', labelKey: 'nav.bda.workflow', descKey: 'nav.bda.workflow.desc' },
    ],
  },
  {
    labelKey: 'nav.pipeline',
    items: [
      { href: '/pipeline', labelKey: 'nav.pipeline.overview', descKey: 'nav.pipeline.overview.desc' },
      { href: '/pipeline/bp-326', labelKey: 'nav.pipeline.bp326', descKey: 'nav.pipeline.bp326.desc' },
      { href: '/pipeline/ribh', labelKey: 'nav.pipeline.ribh', descKey: 'nav.pipeline.ribh.desc' },
      { href: '/pipeline/cd3', labelKey: 'nav.pipeline.cd3', descKey: 'nav.pipeline.cd3.desc' },
    ],
  },
];

const standaloneLinks: NavItem[] = [
  { href: '/about', labelKey: 'nav.about' },
  { href: '#', labelKey: 'nav.blog' },
];

const footerLinks: NavItem[] = [
  { href: '/about', labelKey: 'nav.about' },
  { href: '#', labelKey: 'nav.blog' },
  { href: '/bda', labelKey: 'nav.bda' },
];

function prefixLang(href: string, lang: 'en' | 'zh'): string {
  if (lang === 'zh') {
    return href === '/' ? '/zh/' : `/zh${href}`;
  }
  return href;
}

export function getNavigation(lang: 'en' | 'zh'): NavSection[] {
  return navSections.map(section => ({
    ...section,
    items: section.items.map(item => ({
      ...item,
      href: prefixLang(item.href, lang),
    })),
  }));
}

export function getStandaloneLinks(lang: 'en' | 'zh'): NavItem[] {
  return standaloneLinks.map(item => ({
    ...item,
    href: prefixLang(item.href, lang),
  }));
}

export function getFooterLinks(lang: 'en' | 'zh'): NavItem[] {
  return footerLinks.map(item => ({
    ...item,
    href: prefixLang(item.href, lang),
  }));
}
