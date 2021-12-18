import { NextRequest, NextResponse } from "next/server";

const signedinPages = ["/", "/playlist", "library"];
export default function middleware(req: NextRequest) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.T_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.redirect("/signin");
    }
  }
}
