"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserNav } from "./user-nav";
import {
    LayoutDashboard,
    Users,
    Map,
    Settings,
    Bell,
} from "lucide-react";
import Image from "next/image";

const navigation = [
    { name: "Home", href: "/dashboard", icon: LayoutDashboard },
    { name: "People", href: "/employees", icon: Users },
    { name: "Map", href: "/dashboard/map", icon: Map },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function TopNav() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b border-zinc-100 shadow-sm">
            <div className="flex items-center justify-between h-full px-6 max-w-screen-2xl mx-auto">
                {/* Logo */}
                <Link href="/dashboard" className="flex items-center gap-2">
                    <Image
                        src="/logo.svg"
                        alt="Waayy"
                        width={100}
                        height={32}
                        className="h-7 w-auto"
                    />
                </Link>

                {/* Center Navigation Icons */}
                <nav className="flex items-center gap-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50"
                                )}
                                title={item.name}
                            >
                                <item.icon className="h-4.5 w-4.5" />
                                <span className="hidden sm:inline">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Right side: Notifications + User */}
                <div className="flex items-center gap-2">
                    <button className="relative p-2 rounded-lg text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 transition-colors">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                    <UserNav />
                </div>
            </div>
        </header>
    );
}
