import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Define admin-only routes
const adminRoutes = [
  "/dashboard/inventory/warehouse",
  "/dashboard/inventory/suppliers",
  "/dashboard/inventory/adjustments",
  "/dashboard/inventory/users",
  "/dashboard/inventory/approval-requests",
  "/dashboard/inventory/purchase-orders",
  "/dashboard/inventory/poGoods-received",
  "/dashboard/inventory/stock-adjustments"
];

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    // const userRole = token?.user?.role;
    const userRole = token?.role; // Changed from token?.user?.role
    const pathname = req.nextUrl.pathname;

    // Check if current path is an admin route
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

    // Redirect non-admin users trying to access admin routes
    if (isAdminRoute && userRole !== "admin") {
      return NextResponse.redirect(new URL("/dashboard/home/overview", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Ensure user is authenticated
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};