"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Eye, Calendar } from "lucide-react"

// Mock data
const complaints = [
  {
    id: "C-2025-001",
    title: "Unauthorized Access to Database",
    date: "2025-12-15",
    status: "Pending Evidence",
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
  {
    id: "C-2025-007",
    title: "Corporate Email Compromise",
    date: "2025-12-20",
    status: "Pending FIR",
    level: "Medium",
  },
  {
    id: "C-2025-010",
    title: "Credential Theft Incident",
    date: "2025-12-19",
    status: "Pending",
    level: "Medium",
  },
]

export default function MyComplaints() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [levelFilter, setLevelFilter] = useState<string>("all")
  const [dateSort, setDateSort] = useState<"asc" | "desc">("desc")

  // Filter complaints
  const filteredComplaints = complaints
    .filter((complaint) => {
      // Search filter
      const searchMatch =
        complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.title.toLowerCase().includes(searchTerm.toLowerCase())

      // Status filter
      const statusMatch = statusFilter === "all" || complaint.status === statusFilter

      // Level filter
      const levelMatch = levelFilter === "all" || complaint.level === levelFilter

      return searchMatch && statusMatch && levelMatch
    })
    .sort((a, b) => {
      // Sort by date
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateSort === "asc" ? dateA - dateB : dateB - dateA
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-gray-500/20 text-gray-500"
      case "Pending Evidence":
        return "bg-yellow-500/20 text-yellow-500"
      case "Evidence Uploaded":
        return "bg-blue-500/20 text-blue-500"
      case "Pending FIR":
        return "bg-purple-500/20 text-purple-500"
      case "FIR Filed":
        return "bg-indigo-500/20 text-indigo-500"
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
        <h1 className="text-3xl font-bold tracking-tight">My Complaints</h1>
        <p className="text-muted-foreground">View and track all your registered complaints.</p>
      </div>

      <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
        <CardHeader>
          <CardTitle>Complaints History</CardTitle>
          <CardDescription>Track the status and progress of your complaints.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID or title..."
                className="pl-10 bg-white/10 border-white/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="w-40">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-white/10 border-white/20">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>Status</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Pending Evidence">Pending Evidence</SelectItem>
                    <SelectItem value="Evidence Uploaded">Evidence Uploaded</SelectItem>
                    <SelectItem value="Pending FIR">Pending FIR</SelectItem>
                    <SelectItem value="FIR Filed">FIR Filed</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-40">
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="bg-white/10 border-white/20">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>Level</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="border-white/20"
                onClick={() => setDateSort(dateSort === "asc" ? "desc" : "asc")}
              >
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Complaints Table */}
          <div className="rounded-md border border-white/10 overflow-hidden">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow>
                  <TableHead className="w-[120px]">ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComplaints.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No complaints found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredComplaints.map((complaint) => (
                    <TableRow key={complaint.id} className="hover:bg-white/5">
                      <TableCell className="font-mono text-xs text-[#00FFFF]">{complaint.id}</TableCell>
                      <TableCell className="font-medium">{complaint.title}</TableCell>
                      <TableCell>{complaint.date}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(complaint.status)} font-normal`}>{complaint.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getLevelColor(complaint.level)} font-normal`}>{complaint.level}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/dashboard/user/complaint/${complaint.id}`)}
                          className="text-[#00FFFF] hover:text-[#00FFFF] hover:bg-[#00FFFF]/10"
                        >
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Register New Complaint Button */}
          <div className="mt-6 flex justify-end">
            <Button
              className="bg-gradient-to-r from-[#00FFFF] to-[#a29bfe] text-black hover:opacity-90"
              onClick={() => router.push("/dashboard/user/register-complaint")}
            >
              Register New Complaint
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
