import { ClassValue, clsx } from "clsx"
import { formatDistanceToNowStrict } from "date-fns"
import locale from "date-fns/locale/en-US"
import { twMerge } from "tailwind-merge"

// Regular expression unicode blocks collected from
// http://www.localizingjapan.com/blog/2012/01/20/regular-expressions-for-japanese-text/

export const _hiragana_full = "[ぁ-ゟ]"
export const _katakana_full = "[゠-ヿ]"
export const _kanji = "[㐀-䶵一-鿋豈-頻]"
export const _radicals = "[⺀-⿕]"
export const _katakana_half_width = "[｟-ﾟ]"
export const _alphanum_full = "[！-～]"
export const _symbols_punct = "[、-〿]"
export const _misc_symbols = "[ㇰ-ㇿ㈠-㉃㊀-㋾㌀-㍿]"
export const _ascii_char = "[ -~]"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const findAll = function (pattern: RegExp | string, string: string) {
  var regex = new RegExp(pattern, "g")
  var matches = []
  var match

  while ((match = regex.exec(string)) !== null) {
    matches.push(match[0])
  }

  return matches
}

export function kanjiToHex(kanji: string) {
  var kcode = kanji.codePointAt(0)
  var hex = kcode!.toString(16)
  var zeros = 5 - hex.length
  hex = "0".repeat(zeros) + hex
  return hex
}

export function fileToKanjiVG(file: string) {
  return "/kanji/" + file
}

export function kanjiURL(kanji: string) {
  var hex = kanjiToHex(kanji)
  return fileToKanjiVG(hex + ".svg")
}

export function setLineAttributes(line: any, attributes: any) {
  line.attr(attributes)
}

const formatDistanceLocale = {
  lessThanXSeconds: "just now",
  xSeconds: "just now",
  halfAMinute: "just now",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result
    } else {
      if (result === "just now") return result
      return result + " ago"
    }
  }

  return result
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  })
}
