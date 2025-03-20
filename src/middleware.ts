import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { Pages, Routes } from "./constants/enums";
import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "@prisma/client";

const intlMiddleware = createMiddleware(routing);

export default withAuth(
  async function middleware(request: NextRequest) {
    const response = intlMiddleware(request);
    const pathname = request.nextUrl.pathname;
    const currentLocale = pathname.split("/")[1] as string;
    const isAuth = await getToken({ req: request });

    // Define protected and authentication-related routes
    const isAuthPage = pathname.includes(`/${Routes.AUTH}`);
    const protectedRoutes = [Routes.PROFILE, Routes.ADMIN];
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.includes(`/${route}`)
    );

    // Redirect unauthenticated users from protected routes
    if (!isAuth && isProtectedRoute) {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/${Routes.AUTH}/${Pages.LOGIN}`, request.url)
      );
    }

    // Redirect authenticated users away from auth pages
    if (isAuthPage && isAuth) {
      const role = isAuth.role;
      return NextResponse.redirect(
        new URL(
          `/${currentLocale}/${
            role === UserRole.ADMIN ? Routes.ADMIN : Routes.PROFILE
          }`,
          request.url
        )
      );
    }

    // Prevent non-admin users from accessing the admin route
    if (isAuth && pathname.startsWith(`/${currentLocale}/${Routes.ADMIN}`)) {
      if (isAuth.role !== UserRole.ADMIN) {
        return NextResponse.redirect(
          new URL(`/${currentLocale}/${Routes.PROFILE}`, request.url)
        );
      }
    }

    return response;
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};
