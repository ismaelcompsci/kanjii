import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const findAll = function (pattern: RegExp, string: string) {
  var regex = new RegExp(pattern, "g")
  var matches = []
  var match

  while ((match = regex.exec(string)) !== null) {
    matches.push(match[0])
  }

  return matches
}
