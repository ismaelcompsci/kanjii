export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Kanji",
  description: "Practice writing kanji or hiragana , katakana",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Kanji",
      href: "/kanji",
    },
  ],
  links: {
    twitter: "https://twitter.com/",
    github: "https://github.com/",
    docs: "https://ui.shadcn.com",
  },
}
