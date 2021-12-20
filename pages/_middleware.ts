import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const signedinPages = ["/", "/playlist", "library"];
export default function middleware(req: NextRequest) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.T_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.redirect("/signin");
    } else {
      const valid = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
      console.log(valid);
      return;
    }
  }
}
