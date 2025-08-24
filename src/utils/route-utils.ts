/**
 * Utility function to determine if a navigation item should be marked as active
 * @param itemUrl - The URL of the navigation item
 * @param currentPathname - The current pathname from useLocation()
 * @returns boolean indicating if the route is active
 */
export const isActiveRoute = (itemUrl: string, currentPathname: string): boolean => {
    // Handle the root path redirect case
    if (itemUrl === "/dashboard" && currentPathname === "/") {
        return true
    }
    // Exact match for most routes
    if (currentPathname === itemUrl) {
        return true
    }
    // Handle potential nested routes (e.g., /dashboard/settings would highlight dashboard)
    if (itemUrl !== "/" && currentPathname.startsWith(itemUrl + "/")) {
        return true
    }
    return false
}
