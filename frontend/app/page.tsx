"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Shield, FileText, CheckCircle, Lock, Database, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import dynamic from "next/dynamic"

// Dynamically import ThreeBackground with no SSR to avoid hydration issues
const ThreeBackground = dynamic(() => import("@/components/three-background"), { ssr: false })

export default function LandingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleGetStarted = () => {
    setIsLoading(true)
    // Use direct navigation for more reliable redirect
    window.location.href = "/login"
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-black to-gray-900">
      {/* Three.js Background */}
      <ThreeBackground />

      {/* Theme Toggle */}
      <div className="absolute right-4 top-4 z-50">
        <ThemeToggle />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-white">
            <span className="text-[#00FFFF]">Block</span>Sentinel
          </h1>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="#technology" className="text-gray-300 hover:text-white transition-colors">
                Technology
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="hidden md:inline-flex border-white/20 text-white hover:bg-white/10"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </Button>
          <Button
            className="bg-gradient-to-r from-[#00FFFF] to-[#a29bfe] text-black hover:opacity-90"
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-20 pb-32 md:px-12 md:pt-32 md:pb-40">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Blockchain-Powered <span className="text-[#00FFFF]">Digital Evidence</span> Platform
            </h1>
            <p className="mt-6 text-xl text-gray-300 md:text-2xl">
              Secure, tamper-proof, and verifiable digital evidence management for law enforcement and citizens
            </p>
            <div className="mt-10 flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-[#00FFFF] to-[#a29bfe] text-black hover:opacity-90 md:w-auto"
                onClick={handleGetStarted}
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
                    Loading...
                  </div>
                ) : (
                  <>
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10 md:w-auto"
                onClick={() => (window.location.href = "/dashboard/user/register-complaint")}
              >
                Register Complaint
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 bg-black/30 backdrop-blur-sm py-20 px-6 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white md:text-4xl">How BlockSentinel Works</h2>
            <p className="mt-4 text-gray-300">Secure chain of custody for digital evidence</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white/5 p-6 backdrop-blur-sm border border-white/10 hover:border-[#00FFFF]/30 transition-colors">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#00FFFF]/10">
                <FileText className="h-6 w-6 text-[#00FFFF]" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Register Complaint</h3>
              <p className="text-gray-300">
                Users register complaints with initial details. Each complaint receives a unique blockchain identifier.
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-6 backdrop-blur-sm border border-white/10 hover:border-[#00FFFF]/30 transition-colors">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#00FFFF]/10">
                <Shield className="h-6 w-6 text-[#00FFFF]" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Secure Evidence</h3>
              <p className="text-gray-300">
                Authorized personnel upload evidence and FIR documents. Files are hashed and stored on IPFS with
                blockchain verification.
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-6 backdrop-blur-sm border border-white/10 hover:border-[#00FFFF]/30 transition-colors">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#00FFFF]/10">
                <CheckCircle className="h-6 w-6 text-[#00FFFF]" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Verify & Track</h3>
              <p className="text-gray-300">
                All parties can verify evidence integrity and track complaint status through a transparent timeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-6 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Key Features</h2>
            <p className="mt-4 text-gray-300">Why BlockSentinel is revolutionizing digital evidence management</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-gradient-to-br from-[#00FFFF]/5 to-[#a29bfe]/5 p-6 backdrop-blur-sm border border-white/10">
              <h3 className="mb-4 text-xl font-bold text-white">Tamper-Proof Evidence</h3>
              <p className="text-gray-300">
                Once evidence is uploaded, it cannot be altered. Any attempt to modify evidence will be immediately
                detected through blockchain verification.
              </p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-[#a29bfe]/5 to-[#00FFFF]/5 p-6 backdrop-blur-sm border border-white/10">
              <h3 className="mb-4 text-xl font-bold text-white">Transparent Chain of Custody</h3>
              <p className="text-gray-300">
                Every interaction with evidence is recorded on the blockchain, creating an immutable audit trail from
                complaint registration to case resolution.
              </p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-[#00FFFF]/5 to-[#a29bfe]/5 p-6 backdrop-blur-sm border border-white/10">
              <h3 className="mb-4 text-xl font-bold text-white">Role-Based Access Control</h3>
              <p className="text-gray-300">
                Different stakeholders have appropriate access levels. Only authorized personnel can upload official
                evidence and FIR documents.
              </p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-[#a29bfe]/5 to-[#00FFFF]/5 p-6 backdrop-blur-sm border border-white/10">
              <h3 className="mb-4 text-xl font-bold text-white">Real-Time Status Tracking</h3>
              <p className="text-gray-300">
                Complainants can track the status of their cases in real-time, increasing transparency and trust in the
                process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="relative z-10 bg-black/30 backdrop-blur-sm py-20 px-6 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Powered By Advanced Technology</h2>
            <p className="mt-4 text-gray-300">Cutting-edge blockchain and AI solutions</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center rounded-full bg-white/5 px-6 py-3 backdrop-blur-sm border border-white/10">
              <Lock className="mr-2 h-5 w-5 text-[#00FFFF]" />
              <span className="text-white">Blockchain Verification</span>
            </div>

            <div className="flex items-center rounded-full bg-white/5 px-6 py-3 backdrop-blur-sm border border-white/10">
              <Database className="mr-2 h-5 w-5 text-[#a29bfe]" />
              <span className="text-white">IPFS Storage</span>
            </div>

            <div className="flex items-center rounded-full bg-white/5 px-6 py-3 backdrop-blur-sm border border-white/10">
              <Cpu className="mr-2 h-5 w-5 text-[#00FFFF]" />
              <span className="text-white">AI-Powered Verification</span>
            </div>

            <div className="flex items-center rounded-full bg-white/5 px-6 py-3 backdrop-blur-sm border border-white/10">
              <Shield className="mr-2 h-5 w-5 text-[#a29bfe]" />
              <span className="text-white">Cryptographic Security</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6 md:px-12">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-[#00FFFF]/10 to-[#a29bfe]/10 p-10 backdrop-blur-md border border-white/10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
            <p className="mt-4 text-xl text-gray-300">
              Join BlockSentinel today and experience secure, transparent digital evidence management.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-[#00FFFF] to-[#a29bfe] text-black hover:opacity-90 md:w-auto"
                onClick={() => (window.location.href = "/register")}
              >
                Create Account
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10 md:w-auto"
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/50 backdrop-blur-sm py-12 px-6 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold text-white">
                <span className="text-[#00FFFF]">Block</span>Sentinel
              </h2>
              <p className="mt-2 text-sm text-gray-400">Blockchain Digital Evidence Platform</p>
            </div>
            <div className="flex flex-col space-y-2 text-center md:text-right">
              <p className="text-sm text-gray-400">© 2025 BlockSentinel. All rights reserved.</p>
              <div className="flex space-x-4 justify-center md:justify-end">
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
