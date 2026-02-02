import { Pill, ShoppingCart, BarChart3, PlusCircle, LayoutDashboard, User as UserIcon } from "lucide-react";

export const providerRoutes = [
    {
        title: "Overview",
        items: [
            {
                title: "Dashboard",
                url: "/provider-dashboard",
                icon: LayoutDashboard
            },
            {
                title: "Sales Analytics",
                url: "/provider-dashboard/analytics",
                icon: BarChart3
            },
        ],
    },
    {
        title: "Inventory",
        items: [
            {
                title: "My meals",
                url: "/provider-dashboard/meals",
                icon: Pill
            },
            {
                title: "Add Meal",
                url: "/provider-dashboard/meals/add",
                icon: PlusCircle
            },
        ],
    },
    {
        title: "Orders",
        items: [
            {
                title: "Provider Orders",
                url: "/provider-dashboard/orders",
                icon: ShoppingCart
            },
        ],
    },
    {
        title: "Account",
        items: [
            {
                title: "Profile Settings",
                url: "/seller-dashboard/profile",
                icon: UserIcon
            },
        ],
    },
]