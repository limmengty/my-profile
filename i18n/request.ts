import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"
import { notFound } from "next/navigation"
import * as rootParams from "next/root-params"
import routing from "./routing"

export default getRequestConfig(async ({ locale }) => {
  // Only read from `next/root-params` if no explicit
  // override is provided by the caller
  if (!locale) {
    const paramValue = await rootParams.locale()
    if (hasLocale(routing.locales, paramValue)) {
      locale = paramValue
    } else {
      // Runtime validation for unknown locales
      notFound()
    }
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
