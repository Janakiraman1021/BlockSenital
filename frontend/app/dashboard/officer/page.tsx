"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileUp, Shield, Clock, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data
const pendingCases = [
  {
    id: "C-2025-001",
    title: "Unauthorized Access to Database",
    date: "2025-12-15",
    status: "Pending Evidence",
    level: "Medium",
    complainant: "John Doe",
  },
  {
    id: "C-2025-004",
    title: "Ransomware Attack on Server",
    date: "2025-12-18",
    status: "Pending Evidence",
    level: "High",
    complainant: "Alice Smith",
  },
  {
    id: "C-2025-007",
    title: "Corporate Email Compromise",
    date: "2025-12-20",
    status: "Pending FIR",
    level: "Medium",
    complainant: "Robert Johnson",
  },
]

export default function OfficerDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalAssigned: 0,
    pendingEvidence: 0,
    pendingFIR: 0,
    completed: 0,
  })

  useEffect(() => {
    // Calculate stats from mock data
    setStats({
      totalAssigned: pendingCases.length,
      pendingEvidence: pendingCases.filter((c) => c.status === "Pending Evidence").length,
      pendingFIR: pendingCases.filter((c) => c.status === "Pending FIR").length,
      completed: 0, // No completed cases in mock data
    })
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Evidence":
        return "bg-yellow-500/20 text-yellow-500"
      case "Pending FIR":
        return "bg-blue-500/20 text-blue-500"
      case "Completed":
        return "bg-green-500/20 text-green-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-green-500/20 text-green-500"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-500"
      case "High":
        return "bg-orange-500/20 text-orange-500"
      case "Critical":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Officer Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your assigned cases.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Assigned</p>
                <p className="text-3xl font-bold">{stats.totalAssigned}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#00FFFF]/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-[#00FFFF]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Evidence</p>
                <p className="text-3xl font-bold">{stats.pendingEvidence}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending FIR</p>
                <p className="text-3xl font-bold">{stats.pendingFIR}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold">{stats.completed}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-[#00FFFF]/10 to-[#a29bfe]/10 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)] hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="h-12 w-12 rounded-full bg-[#00FFFF]/20 flex items-center justify-center">
                <FileUp className="h-6 w-6 text-[#00FFFF]" />
              </div>
              <h3 className="text-xl font-bold">Upload Digital Evidence</h3>
              <p className="text-muted-foreground">Upload and secure digital evidence for pending cases.</p>
              <Button
                className="w-full bg-gradient-to-r from-[#00FFFF] to-[#a29bfe] text-black hover:opacity-90"
                onClick={() => router.push("/dashboard/officer/upload-evidence")}
              >
                Upload Evidence <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#a29bfe]/10 to-[#00FFFF]/10 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)] hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="h-12 w-12 rounded-full bg-[#a29bfe]/20 flex items-center justify-center">
                <Shield className="h-6 w-6 text-[#a29bfe]" />
              </div>
              <h3 className="text-xl font-bold">Upload FIR Document</h3>
              <p className="text-muted-foreground">Upload First Information Report documents for cases.</p>
              <Button
                variant="outline"
                className="w-full border-[#a29bfe] text-[#a29bfe] hover:bg-[#a29bfe]/10"
                onClick={() => router.push("/dashboard/officer/upload-fir")}
              >
                Upload FIR <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Cases */}
      <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
        <CardHeader>
          <CardTitle>Pending Cases</CardTitle>
          <CardDescription>Cases that require your attention for evidence or FIR upload.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingCases.map((complaint) => (
              <div
                key={complaint.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#00FFFF]">{complaint.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getLevelColor(complaint.level)}`}>
                      {complaint.level}
                    </span>
                  </div>
                  <h4 className="font-medium mt-1">{complaint.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Filed on {complaint.date} by {complaint.complainant}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-2 md:mt-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                    {complaint.status}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#00FFFF] hover:text-[#00FFFF] hover:bg-[#00FFFF]/10"
                    onClick={() =>
                      complaint.status === "Pending Evidence"
                        ? router.push(`/dashboard/officer/upload-evidence?id=${complaint.id}`)
                        : router.push(`/dashboard/officer/upload-fir?id=${complaint.id}`)
                    }
                  >
                    {complaint.status === "Pending Evidence" ? "Upload Evidence" : "Upload FIR"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
