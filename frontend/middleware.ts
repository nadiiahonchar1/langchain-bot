import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["uk", "en", "es", "fr", "de"];
const defaultLocale = "uk";

function getLocale(request: NextRequest): string {
  const headers = {
    "accept-language": request.headers.get("accept-language") || "",
  };
  console.log('headers', headers)
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl;
  console.log("pathname", pathname);
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!_next).*)",
  ],
};