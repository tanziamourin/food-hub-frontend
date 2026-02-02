"use client";

import { useAuth } from "@/provider/AuthProvider";
import { 
  Loader2, LayoutGrid, Users, ShoppingBag, 
  Settings, UtensilsCrossed, ClipboardList, UserCircle, Menu, X 
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardLayout({
  admin, provider, customer,
}: {
  admin: React.ReactNode; provider: React.ReactNode; customer: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);


  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // --- Sidebar Content ---
  const SidebarContent = (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-orange-600">FoodHub</h2>
       
        <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-gray-500">
          <X size={24} />
        </button>
      </div>

      <nav className="mt-2 space-y-1 px-4 flex-1">
        {user.role === "ADMIN" && (
          <>
            <SidebarLink href="/dashboard" icon={<LayoutGrid size={20}/>} label="Dashboard" active={pathname === '/dashboard'} />
            <SidebarLink href="/dashboard/users" icon={<Users size={20}/>} label="Manage Users" active={pathname === '/dashboard/users'} />
            <SidebarLink href="/dashboard/categories" icon={<LayoutGrid size={20}/>} label="Categories" active={pathname === '/dashboard/categories'} />
            <SidebarLink href="/dashboard/orders" icon={<ShoppingBag size={20}/>} label="All Orders" active={pathname === '/dashboard/orders'} />
          </>
        )}
        {user.role === "PROVIDER" && (
          <>
            <SidebarLink href="/dashboard" icon={<LayoutGrid size={20}/>} label="Dashboard" active={pathname === '/dashboard'} />
            <SidebarLink href="/dashboard/add-meals" icon={<UtensilsCrossed size={20}/>} label="Add Meals" active={pathname === '/dashboard/add-meals'} />
            <SidebarLink href="/dashboard/my-meals" icon={<ClipboardList size={20}/>} label="My Meals" active={pathname === '/dashboard/my-meals'} />
          </>
        )}
        {user.role === "CUSTOMER" && (
          <>
            <SidebarLink href="/dashboard" icon={<LayoutGrid size={20}/>} label="Home" active={pathname === '/dashboard'} />
            <SidebarLink href="/dashboard/order" icon={<ShoppingBag size={20}/>} label="My Orders" active={pathname === '/dashboard/order'} />
            <SidebarLink href="/dashboard/profile" icon={<UserCircle size={20}/>} label="Profile" active={pathname === '/dashboard/profile'} />
          </>
        )}
      </nav>

      <div className="p-4 border-t">
        <SidebarLink href="/settings" icon={<Settings size={20}/>} label="Settings" active={pathname === '/settings'} />
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      
      {/* Desktop Sidebar  */}
      <aside className="w-64 border-r hidden md:flex flex-col sticky top-0 h-screen">
        <Link href="/" className="p-6"> Go to Home</Link>
        {SidebarContent}
      </aside>

      {/* 2. Mobile Sidebar Overlay */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${isMobileMenuOpen ? "visible" : "invisible"}`}>
      
        <div className={`absolute inset-0 bg-black/50 transition-opacity ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsMobileMenuOpen(false)} />
        
        <div className={`absolute left-0 top-0 bottom-0 w-72 bg-white transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          {SidebarContent}
        </div>
      </div>

      {/* 3. Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header  */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-40">
          <h2 className="text-xl font-bold text-orange-600">FoodHub</h2>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Menu size={24} />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {user.role === "ADMIN" ? admin : user.role === "PROVIDER" ? provider : customer}
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center p-3 rounded-lg transition-all ${
        active ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </Link>
  );
}