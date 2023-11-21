import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (req.nextUrl.pathname === "/stream") {
    return NextResponse.redirect(new URL("/stream", req.url));
  }

  if (!user && req.nextUrl.pathname !== "/auth/signin") {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/", "/auth/signin", "/account", "/file"],
};
