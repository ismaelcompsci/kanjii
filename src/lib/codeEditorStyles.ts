import { tags as t } from "@lezer/highlight"
import { createTheme } from "@uiw/codemirror-themes"

const lightStyles = [
  { tag: [t.standard(t.tagName), t.tagName], color: "#116329" },
  { tag: [t.comment, t.bracket], color: "#6a737d" },
  { tag: [t.className, t.propertyName], color: "#6f42c1" },
  {
    tag: [t.variableName, t.attributeName, t.number, t.operator],
    color: "#005cc5",
  },
  {
    tag: [t.keyword, t.typeName, t.typeOperator, t.typeName],
    color: "#d73a49",
  },
  { tag: [t.string, t.meta, t.regexp], color: "#032f62" },
  { tag: [t.name, t.quote], color: "#22863a" },
  { tag: [t.heading], color: "#24292e", fontWeight: "bold" },
  { tag: [t.emphasis], color: "#24292e", fontStyle: "italic" },
  { tag: [t.deleted], color: "#b31d28", backgroundColor: "ffeef0" },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: "#e36209" },
  { tag: [t.url, t.escape, t.regexp, t.link], color: "#032f62" },
  { tag: t.link, textDecoration: "underline" },
  { tag: t.strikethrough, textDecoration: "line-through" },
  { tag: t.invalid, color: "#cb2431" },
]

const darkStyles = [
  { tag: [t.standard(t.tagName), t.tagName], color: "#7ee787" },
  { tag: [t.comment, t.bracket], color: "#8b949e" },
  { tag: [t.className, t.propertyName], color: "#d2a8ff" },
  {
    tag: [t.variableName, t.attributeName, t.number, t.operator],
    color: "#79c0ff",
  },
  {
    tag: [t.keyword, t.typeName, t.typeOperator, t.typeName],
    color: "#ff7b72",
  },
  { tag: [t.string, t.meta, t.regexp], color: "#a5d6ff" },
  { tag: [t.name, t.quote], color: "#7ee787" },
  { tag: [t.heading], color: "#d2a8ff", fontWeight: "bold" },
  { tag: [t.emphasis], color: "#d2a8ff", fontStyle: "italic" },
  { tag: [t.deleted], color: "#ffdcd7", backgroundColor: "ffeef0" },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: "#ffab70" },
  { tag: t.link, textDecoration: "underline" },
  { tag: t.strikethrough, textDecoration: "line-through" },
  { tag: t.invalid, color: "#f97583" },
]

const lightTheme = createTheme({
  theme: "light",
  settings: {
    background: "#ffffff",
    foreground: "#020817",
    caret: "#c9d1d9",
    selection: "#003d73",
    selectionMatch: "#003d73",
    lineHighlight: "#36334280",
  },
  styles: lightStyles,
})

const darkTheme = createTheme({
  theme: "dark",
  settings: {
    background: "#020817",
    foreground: "#f8fafc",
    caret: "#c9d1d9",
    selection: "#003d73",
    selectionMatch: "#003d73",
    lineHighlight: "#36334280",
  },
  styles: darkStyles,
})

export { darkTheme, lightTheme }
