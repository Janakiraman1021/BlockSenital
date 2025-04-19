"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"
import { useEffect } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Set default theme on initial load
  useEffect(() => {
    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (!savedTheme) {
      // If no saved preference, set dark theme as default
      document.documentElement.classList.add("dark")
    }
  }, [])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
