import axios from "axios"
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { KanjiDetails } from "@/types/types"

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

// TODO : EXPORT FUNCTION USED BY SERVER IN A DIFFERENT FILE
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
