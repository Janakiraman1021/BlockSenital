"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Clock, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data
const recentComplaints = [
  {
    id: "C-2025-001",
    title: "Unauthorized Access to Database",
    date: "2025-12-15",
    status: "Pending",
    level: "Medium",
  },
  {
    id: "C-2025-002",
    title: "Phishing Attack on Corporate Email",
    date: "2025-12-10",
    status: "Evidence Uploaded",
    level: "High",
  },
  {
    id: "C-2025-003",
    title: "Data Breach in Customer Records",
    date: "2025-12-05",
    status: "FIR Filed",
    level: "Critical",
  },
]

export default function UserDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  })

  useEffect(() => {
    // Calculate stats from mock data
    setStats({
      total: recentComplaints.length,
      pending: recentComplaints.filter((c) => c.status === "Pending").length,
      inProgress: recentComplaints.filter((c) => ["Evidence Uploaded", "FIR Filed"].includes(c.status)).length,
      completed: recentComplaints.filter((c) => c.status === "Completed").length,
    })
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/20 text-yellow-500"
      case "Evidence Uploaded":
        return "bg-blue-500/20 text-blue-500"
      case "FIR Filed":
        return "bg-purple-500/20 text-purple-500"
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
        <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your complaints.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Complaints</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#00FFFF]/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-[#00FFFF]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold">{stats.pending}</p>
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
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-3xl font-bold">{stats.inProgress}</p>
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
                <FileText className="h-6 w-6 text-[#00FFFF]" />
              </div>
              <h3 className="text-xl font-bold">Register New Complaint</h3>
              <p className="text-muted-foreground">File a new complaint with digital evidence to the blockchain.</p>
              <Button
                className="w-full bg-gradient-to-r from-[#00FFFF] to-[#a29bfe] text-black hover:opacity-90"
                onClick={() => router.push("/dashboard/user/register-complaint")}
              >
                Register Complaint <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#a29bfe]/10 to-[#00FFFF]/10 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)] hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="h-12 w-12 rounded-full bg-[#a29bfe]/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-[#a29bfe]" />
              </div>
              <h3 className="text-xl font-bold">View My Complaints</h3>
              <p className="text-muted-foreground">Check the status and details of all your registered complaints.</p>
              <Button
                variant="outline"
                className="w-full border-[#a29bfe] text-[#a29bfe] hover:bg-[#a29bfe]/10"
                onClick={() => router.push("/dashboard/user/my-complaints")}
              >
                View Complaints <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Complaints */}
      <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
        <CardHeader>
          <CardTitle>Recent Complaints</CardTitle>
          <CardDescription>Your most recently filed complaints and their current status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentComplaints.map((complaint) => (
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
                  <p className="text-xs text-muted-foreground mt-1">Filed on {complaint.date}</p>
                </div>
                <div className="flex items-center gap-4 mt-2 md:mt-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                    {complaint.status}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#00FFFF] hover:text-[#00FFFF] hover:bg-[#00FFFF]/10"
                    onClick={() => router.push(`/dashboard/user/complaint/${complaint.id}`)}
                  >
                    View Details
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
