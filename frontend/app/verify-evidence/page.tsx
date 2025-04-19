"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Search, CheckCircle, XCircle, Clock, FileText, Calendar, User, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"

// Dynamically import ThreeBackground with no SSR to avoid hydration issues
const ThreeBackground = dynamic(() => import("@/components/three-background"), { ssr: false })

// Mock verification result
const mockVerificationResult = {
  verified: true,
  hash: "QmT8CZxmWqzuCLMTzAWkJTLJadEXxFb8HxhWVE5NuF6Nw9",
  complaintId: "C-2025-001",
  evidenceId: "E-001",
  title: "Server Access Logs",
  uploadedBy: "Officer Sarah Johnson",
  uploadDate: "2025-12-17 14:23:45",
  lastVerified: "2025-12-25 09:15:32",
  blockNumber: "15482935",
  transactionHash: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
}

export default function VerifyEvidencePage() {
  const router = useRouter()
  const [hashInput, setHashInput] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<typeof mockVerificationResult | null>(null)
  const [verificationError, setVerificationError] = useState<string | null>(null)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!hashInput) {
      setVerificationError("Please enter an evidence hash to verify")
      return
    }

    setIsVerifying(true)
    setVerificationError(null)
    setVerificationResult(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // For demo purposes, only verify if the hash matches the mock data
    if (hashInput === mockVerificationResult.hash) {
      setVerificationResult(mockVerificationResult)
    } else {
      setVerificationError("Evidence hash not found or has been tampered with")
    }

    setIsVerifying(false)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black to-gray-900">
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
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to home</span>
        </Button>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-center px-6 py-12 md:py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            <span className="text-[#00FFFF]">Evidence</span> Verification
          </h1>
          <p className="mt-2 text-gray-300">
            Verify the authenticity and integrity of digital evidence on the blockchain
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
            <CardHeader>
              <CardTitle>Verify Digital Evidence</CardTitle>
              <CardDescription>
                Enter the IPFS hash of the evidence to verify its authenticity on the blockchain
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleVerify}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="evidenceHash">Evidence Hash (IPFS)</Label>
                  <div className="relative">
                    <Input
                      id="evidenceHash"
                      placeholder="Enter IPFS hash (e.g., QmT8CZxmWqzuCLMTzAWkJTLJadEXxFb8HxhWVE5NuF6Nw9)"
                      value={hashInput}
                      onChange={(e) => setHashInput(e.target.value)}
                      className="bg-white/10 border-white/20 pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The IPFS hash is a unique identifier for the evidence stored on the blockchain
                  </p>
                </div>

                {verificationError && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                    <div className="flex items-center">
                      <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      <p className="text-red-400 font-medium">{verificationError}</p>
                    </div>
                  </div>
                )}

                {verificationResult && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <p className="text-green-400 font-medium">Evidence verified successfully on the blockchain</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <h3 className="font-medium mb-4">Evidence Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground flex items-center">
                            <FileText className="h-3 w-3 mr-1" /> Title
                          </p>
                          <p>{verificationResult.title}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground flex items-center">
                            <Shield className="h-3 w-3 mr-1" /> Complaint ID
                          </p>
                          <p className="font-mono">{verificationResult.complaintId}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground flex items-center">
                            <User className="h-3 w-3 mr-1" /> Uploaded By
                          </p>
                          <p>{verificationResult.uploadedBy}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground flex items-center">
                            <Calendar className="h-3 w-3 mr-1" /> Upload Date
                          </p>
                          <p>{verificationResult.uploadDate}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> Last Verified
                          </p>
                          <p>{verificationResult.lastVerified}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-[#00FFFF]/5 border border-[#00FFFF]/20">
                      <h3 className="font-medium mb-4">Blockchain Information</h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">IPFS Hash</p>
                          <p className="font-mono text-sm">{verificationResult.hash}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Block Number</p>
                          <p className="font-mono text-sm">{verificationResult.blockNumber}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Transaction Hash</p>
                          <p className="font-mono text-sm">{verificationResult.transactionHash}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t border-white/10 pt-6">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#00FFFF] to-[#a29bfe] text-black hover:opacity-90"
                  disabled={isVerifying}
                >
                  {isVerifying ? (
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
                      Verifying...
                    </div>
                  ) : (
                    "Verify Evidence"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Need to register a complaint?{" "}
              <Link href="/login" className="text-[#00FFFF] hover:underline">
                Login
              </Link>{" "}
              or{" "}
              <Link href="/register" className="text-[#00FFFF] hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/50 backdrop-blur-sm py-6 px-6 text-center">
        <p className="text-sm text-gray-400">
          © 2025 BlockSentinel. All rights reserved. Powered by blockchain technology.
        </p>
      </footer>
    </div>
  )
}
