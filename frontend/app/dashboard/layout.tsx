"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Shield, User, LogOut, Menu, X, Home, Upload, FileUp, Users, Settings, List } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface NavItemProps {
  href: string
  icon: React.ElementType
  label: string
  active?: boolean
  onClick?: () => void
}

function NavItem({ href, icon: Icon, label, active, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        active
          ? "bg-gradient-to-r from-[#00FFFF]/20 to-[#a29bfe]/20 text-white"
          : "text-gray-400 hover:text-white hover:bg-white/10",
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
      {active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#00FFFF]" />}
    </Link>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [role, setRole] = useState<string>("user")

  // Determine role from URL
  useEffect(() => {
    if (pathname.includes("/user")) {
      setRole("user")
    } else if (pathname.includes("/officer")) {
      setRole("officer")
    } else if (pathname.includes("/admin")) {
      setRole("admin")
    }
  }, [pathname])

  const handleLogout = () => {
    router.push("/")
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-black to-gray-900">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden text-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out bg-black/60 backdrop-blur-xl border-r border-white/10",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-white/10">
            <h1 className="text-xl font-bold text-white">
              <span className="text-[#00FFFF]">Block</span>Sentinel
            </h1>
          </div>

          {/* Role indicator */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#a29bfe]">
              {role === "user" && <User className="h-5 w-5 text-black" />}
              {role === "officer" && <Shield className="h-5 w-5 text-black" />}
              {role === "admin" && <Settings className="h-5 w-5 text-black" />}
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {role === "user" && "User Dashboard"}
                {role === "officer" && "Officer Dashboard"}
                {role === "admin" && "Admin Dashboard"}
              </p>
              <p className="text-xs text-gray-400">
                {role === "user" && "Register & track complaints"}
                {role === "officer" && "Upload evidence & FIR"}
                {role === "admin" && "Manage all complaints"}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {/* User Navigation */}
            {role === "user" && (
              <>
                <NavItem
                  href="/dashboard/user"
                  icon={Home}
                  label="Dashboard"
                  active={pathname === "/dashboard/user"}
                  onClick={closeMobileMenu}
                />
                <NavItem
                  href="/dashboard/user/register-complaint"
                  icon={FileText}
                  label="Register Complaint"
                  active={pathname === "/dashboard/user/register-complaint"}
                  onClick={closeMobileMenu}
                />
                <NavItem
                  href="/dashboard/user/my-complaints"
                  icon={List}
                  label="My Complaints"
                  active={pathname === "/dashboard/user/my-complaints"}
                  onClick={closeMobileMenu}
                />
              </>
            )}

            {/* Officer Navigation */}
            {role === "officer" && (
              <>
                <NavItem
                  href="/dashboard/officer"
                  icon={Home}
                  label="Dashboard"
                  active={pathname === "/dashboard/officer"}
                  onClick={closeMobileMenu}
                />
                <NavItem
                  href="/dashboard/officer/upload-evidence"
                  icon={Upload}
                  label="Upload Evidence"
                  active={pathname === "/dashboard/officer/upload-evidence"}
                  onClick={closeMobileMenu}
                />
                <NavItem
                  href="/dashboard/officer/upload-fir"
                  icon={FileUp}
                  label="Upload FIR"
                  active={pathname === "/dashboard/officer/upload-fir"}
                  onClick={closeMobileMenu}
                />
              </>
            )}

            {/* Admin Navigation */}
            {role === "admin" && (
              <>
                <NavItem
                  href="/dashboard/admin"
                  icon={Home}
                  label="Dashboard"
                  active={pathname === "/dashboard/admin"}
                  onClick={closeMobileMenu}
                />
                <NavItem
                  href="/dashboard/admin/all-complaints"
                  icon={List}
                  label="All Complaints"
                  active={pathname === "/dashboard/admin/all-complaints"}
                  onClick={closeMobileMenu}
                />
                <NavItem
                  href="/dashboard/admin/authorize-officer"
                  icon={Users}
                  label="Authorize Officer"
                  active={pathname === "/dashboard/admin/authorize-officer"}
                  onClick={closeMobileMenu}
                />
              </>
            )}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64 p-4 md:p-8 overflow-auto">
        <div className="flex justify-end mb-6">
          <ThemeToggle />
        </div>
        <main>{children}</main>
      </div>
    </div>
  )
}
