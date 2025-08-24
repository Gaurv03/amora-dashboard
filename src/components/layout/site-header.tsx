
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

export function SiteHeader() {
  const location = useLocation()
  const { t } = useTranslation()

  const getRouteName = (pathname: string) => {
    switch (pathname) {
      case "/dashboard":
        return t('routes.dashboard', 'Dashboard')
      case "/users":
        return t('routes.users', 'Users')
      case "/login":
        return t('routes.login', 'Login')
      case "/unauthorized":
        return t('routes.unauthorized', 'Unauthorized')
      default:
        return t('routes.dashboard', 'Dashboard')
    }
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{getRouteName(location.pathname)}</h1>
        <div className="ml-auto flex items-center gap-2">

          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
