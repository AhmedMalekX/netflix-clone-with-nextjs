import { verifyToken } from "../lib/utils";
import { NextResponse } from "next/server";

export async function middleware(req, ev) {
  const token = req ? req.cookies?.token : null;

  const userId = await verifyToken(token);

  const { pathname } = req.nextUrl;

  if ((token && userId) || pathname.includes("/api/login")) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
