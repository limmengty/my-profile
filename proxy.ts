import createMiddleware from "next-intl/middleware"
import routing from "./i18n/routing"

export const runtime = "edge"

export default createMiddleware(routing)

export const config = {
  matcher: ["/((?!_next|api|og|.*\\..*).*)"],
}
