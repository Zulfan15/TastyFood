"use client"

import * as React from "react"
import Link from "next/link"
import { useSession } from "@/lib/auth-client"
import {
  IconHome,
  IconMapPin,
  IconPackage,
  IconHeart,
  IconUsers,
  IconHistory,
  IconSettings,
  IconHelp,
  IconSearch,
  IconChartBar,
  IconBook,
  IconGift,
  IconLeaf,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { BrandLogo } from "@/components/brand-logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const foodShareData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconHome,
    },
    {
      title: "Find Food",
      url: "/donations",
      icon: IconMapPin,
    },
    {
      title: "My Donations",
      url: "/my-donations",
      icon: IconPackage,
    },
    {
      title: "Food Requests",
      url: "/requests",
      icon: IconHeart,
    },
    {
      title: "Community",
      url: "/community",
      icon: IconUsers,
    },
  ],
  navSecondary: [
    {
      title: "Activity",
      url: "/history",
      icon: IconHistory,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Help & Support",
      url: "/help",
      icon: IconHelp,
    },
  ],
  documents: [
    {
      name: "Donation History",
      url: "/history/donations",
      icon: IconPackage,
    },
    {
      name: "Impact Tracker",
      url: "/impact",
      icon: IconChartBar,
    },
    {
      name: "Food Safety Guide",
      url: "/safety-guide",
      icon: IconLeaf,
    },
    {
      name: "Pickup Instructions",
      url: "/pickup-guide",
      icon: IconBook,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()
  
  const userData = session?.user ? {
    name: session.user.name || "User",
    email: session.user.email,
    avatar: session.user.image || "/foodshare-icon.svg",
  } : {
    name: "Guest",
    email: "guest@example.com", 
    avatar: "/foodshare-icon.svg",
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <BrandLogo size="sm" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={foodShareData.navMain} />
        <NavDocuments items={foodShareData.documents} />
        <NavSecondary items={foodShareData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
