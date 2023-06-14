export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "StrokeMaster",
  description: "Practice writing kanji, hiragana or katakana",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Packs",
      href: "/packs",
    },
  ],
  links: {
    twitter: "https://twitter.com/",
    github: "https://github.com/",
    docs: "https://ui.shadcn.com",
  },
}
