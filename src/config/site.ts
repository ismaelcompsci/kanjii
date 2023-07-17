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
    {
      title: "Create",
      href: "/create",
    },
  ],
  links: {
    twitter: "https://twitter.com/",
    github: "https://github.com/ismaelcompsci",
    docs: "https://ui.shadcn.com",
  },
}

export const STUDY_PACK_PAGINATE_NUMBER = 5
export const VOCABULARY_PAGINATE_NUMBER = 5
