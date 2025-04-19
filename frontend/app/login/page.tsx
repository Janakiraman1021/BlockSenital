"use client"

import type React from "react"
// import { useState } from "react"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useMetaMask } from "../providers"
import { useState, useEffect } from "react"
import ThreeBackground from "@/components/three-background"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<string>("user")
  const [isLoading, setIsLoading] = useState(false)
  const { account, connectMetaMask, isConnecting, error } = useMetaMask()
  const [walletStatus, setWalletStatus] = useState<'idle' | 'connecting' | 'success' | 'error'>("idle")

  useEffect(() => {
    if (isConnecting) {
      setWalletStatus("connecting")
    } else if (account) {
      setWalletStatus("success")
    } else if (error) {
      setWalletStatus("error")
    } else {
      setWalletStatus("idle")
    }
  }, [isConnecting, account, error])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!account) {
      alert("Please connect your wallet first!")
      setIsLoading(false)
      return
    }

    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate the login process
      await new Promise((resolve) => setTimeout(resolve, 1500))

      switch (role) {
        case "user":
          window.location.href = "/dashboard/user"
          break
        case "officer":
          window.location.href = "/dashboard/officer"
          break
        case "admin":
          window.location.href = "/dashboard/admin"
          break
        default:
          window.location.href = "/dashboard/user"
      }
    } catch (error) {
      console.error("Login failed:", error)
      alert("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-black to-gray-900">
      {/* Three.js Background */}
      <ThreeBackground />

      {/* Theme Toggle */}
      <div className="absolute right-4 top-4 z-50">
        <ThemeToggle />
      </div>

      {/* Back Button */}
      <div className="absolute left-4 top-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/10"
          onClick={() => (window.location.href = "/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span className="sr-only">Back to home</span>
        </Button>
      </div>

      {/* Login Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-md p-8 mx-4 animate-fade-in-up">
          {/* Logo */}
          <div className="flex flex-col items-center justify-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              <span className="text-[#00FFFF]">Block</span>Sentinel
            </h1>
            <p className="text-gray-400 text-sm">Blockchain Digital Evidence Platform</p>
          </div>

          {/* Login Form */}
          <div className="backdrop-blur-md bg-black/30 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.3)] p-6">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Wallet Connection Button - Add this first */}
              <div className="space-y-2">
                <Label className="text-white">Wallet Connection</Label>
                <Button
                  type="button"
                  onClick={async () => {
                    setWalletStatus("connecting")
                    await connectMetaMask()
                  }}
                  className={`w-full border border-white/20 text-white transition-all duration-300 relative overflow-hidden ${walletStatus === 'success' ? 'bg-green-500/80 hover:bg-green-600/80' : walletStatus === 'error' ? 'bg-red-500/80 hover:bg-red-600/80' : 'bg-white/10 hover:bg-white/20'}`}
                  disabled={walletStatus === 'connecting'}
                >
                  {walletStatus === 'connecting' ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connecting Wallet...
                    </span>
                  ) : walletStatus === 'success' && account ? (
                    <span className="flex items-center justify-center animate-pulse">
                      <svg className="mr-2 h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      Connected: {account.slice(0, 6)}...{account.slice(-4)}
                    </span>
                  ) : walletStatus === 'error' ? (
                    <span className="flex items-center justify-center">
                      <svg className="mr-2 h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      Error! Retry
                    </span>
                  ) : (
                    <span>Connect Wallet</span>
                  )}
                </Button>
                {walletStatus === 'error' && error && (
                  <div className="text-red-400 text-xs mt-1 animate-fade-in">{error}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-white">
                  Login As
                </Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="officer">Authorized Officer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00FFFF] to-[#a29bfe] hover:opacity-90 text-black font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" /> Login
                  </div>
                )}
              </Button>

              <div className="mt-4 text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <Link href="/register" className="text-[#00FFFF] hover:underline">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
