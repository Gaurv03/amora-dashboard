import { type Icon } from "@tabler/icons-react"
import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { isActiveRoute } from "@/utils/route-utils"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
    subMenus?: { title: string; url: string }[]
  }[]
}) {
  const location = useLocation()
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const toggleMenu = (title: string) => {
    setExpandedMenus(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = isActiveRoute(item.url, location.pathname)
            const hasSubMenus = item.subMenus && item.subMenus.length > 0
            const isExpanded = expandedMenus.includes(item.title)

            return (
              <SidebarMenuItem key={item.title}>
                {hasSubMenus ? (
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isActive}
                    onClick={() => toggleMenu(item.title)}
                  >
                    <div className="flex items-center gap-2 justify-between w-full">
                      <div className="flex items-center gap-2">
                        {item.icon && <item.icon className="w-4 h-4" />}
                        <span>{item.title}</span>
                      </div>
                      {isExpanded ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
                    </div>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                    <Link to={item.url}>
                      {item.icon && <item.icon size={18} />}
                      <span className="text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )}

                {hasSubMenus && isExpanded && item.subMenus && (
                  <SidebarMenuSub>
                    {item.subMenus.map((subItem) => {
                      const isSubActive = isActiveRoute(subItem.url, location.pathname)
                      return (
                        <SidebarMenuSubButton
                          key={subItem.title}
                          asChild
                          isActive={isSubActive}
                        >
                          <Link to={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      )
                    })}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
