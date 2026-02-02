"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

type User = {
  name: string;
  role: "ADMIN" | "PROVIDER" | "CUSTOMER";
};

export default function AppSidebar({ user }: { user: User }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="px-4 py-3 font-bold">
          {user.name}
        </div>

        <SidebarMenu>
          {user.role === "ADMIN" && (
            <>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/adminDashboard/users">Users</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}

          {user.role === "PROVIDER" && (
            <>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/providerDashboard">Dashboard</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/providerDashboard/add-meals">Add Meals</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}

          {user.role === "CUSTOMER" && (
            <>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/customer">Dashboard</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/customer/order">Orders</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
