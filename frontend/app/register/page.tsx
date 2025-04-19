"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, UserPlus, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ThemeToggle } from "@/components/theme-toggle"
import { Alert, AlertDescription } from "@/components/ui/alert"
import dynamic from "next/dynamic"
import { useMetaMask } from "../providers"

// Dynamically import ThreeBackground with no SSR to avoid hydration issues
const ThreeBackground = dynamic(() => import("@/components/three-background"), { ssr: false })

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { account, connectMetaMask, isConnecting, error: walletError } = useMetaMask()
  const [walletStatus, setWalletStatus] = useState<'idle' | 'connecting' | 'success' | 'error'>("idle")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  useEffect(() => {
    if (isConnecting) {
      setWalletStatus("connecting")
    } else if (account) {
      setWalletStatus("success")
    } else if (walletError) {
      setWalletStatus("error")
    } else {
      setWalletStatus("idle")
    }
  }, [isConnecting, account, walletError])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }))
  }

  const validateForm = () => {
    if (!account) {
      setError("Please connect your wallet first")
      return false
    }

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required")
      return false
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address")
      return false
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }

    if (!formData.agreeTerms) {
      setError("You must agree to the terms and conditions")
      return false
    }

    return true
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate registration process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)

    // Redirect to login page
    window.location.href = "/login"
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
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to home</span>
        </Button>
      </div>

      {/* Register Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-md p-8 mx-4 animate-fade-in-up">
          {/* Logo */}
          <div className="flex flex-col items-center justify-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              <span className="text-[#00FFFF]">Block</span>Sentinel
            </h1>
            <p className="text-gray-400 text-sm">Create your account</p>
          </div>

          {/* Register Form */}
          <div className="backdrop-blur-md bg-black/30 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.3)] p-6">
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-500/10 border-red-500/30 text-red-400">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Wallet Connection Button */}
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
                {walletStatus === 'error' && walletError && (
                  <div className="text-red-400 text-xs mt-1 animate-fade-in">{walletError}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
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
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
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
                <p className="text-xs text-gray-400">Password must be at least 8 characters long</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={handleCheckboxChange}
                  className="border-white/20 data-[state=checked]:bg-[#00FFFF] data-[state=checked]:text-black"
                />
                <label
                  htmlFor="agreeTerms"
                  className="text-sm text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#00FFFF] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#00FFFF] hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00FFFF] to-[#a29bfe] hover:opacity-90 text-black font-medium mt-2"
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
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <UserPlus className="mr-2 h-4 w-4" /> Register
                  </div>
                )}
              </Button>

              <div className="mt-4 text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-[#00FFFF] hover:underline">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
