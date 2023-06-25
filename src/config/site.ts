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
      title: "Study",
      href: "/study",
    },
  ],
  links: {
    twitter: "https://twitter.com/",
    github: "https://github.com/",
    docs: "https://ui.shadcn.com",
  },
}

export const STUDY_PACK_PAGINATE_NUMBER = 10
export const VOCABULARY_PAGINATE_NUMBER = 5
