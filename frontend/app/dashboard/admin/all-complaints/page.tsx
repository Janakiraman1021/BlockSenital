"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ChevronDown, ChevronUp, Eye, ArrowUpDown } from "lucide-react"

// Mock data
const complaints = [
  {
    id: "C-2025-001",
    title: "Unauthorized Access to Database",
    date: "2025-12-15",
    status: "Pending Evidence",
    level: "Medium",
    complainant: "John Doe",
  },
  {
    id: "C-2025-002",
    title: "Phishing Attack on Corporate Email",
    date: "2025-12-10",
    status: "Evidence Uploaded",
    level: "High",
    complainant: "Alice Smith",
  },
  {
    id: "C-2025-003",
    title: "Data Breach in Customer Records",
    date: "2025-12-05",
    status: "FIR Filed",
    level: "Critical",
    complainant: "Robert Johnson",
  },
  {
    id: "C-2025-004",
    title: "Ransomware Attack on Server",
    date: "2025-12-18",
    status: "Pending Evidence",
    level: "High",
    complainant: "David Williams",
  },
  {
    id: "C-2025-005",
    title: "Social Engineering Attack",
    date: "2025-12-22",
    status: "Pending",
    level: "Medium",
    complainant: "Sarah Brown",
  },
  {
    id: "C-2025-006",
    title: "DDoS Attack on Website",
    date: "2025-12-08",
    status: "Completed",
    level: "Low",
    complainant: "Michael Davis",
  },
  {
    id: "C-2025-007",
    title: "Corporate Email Compromise",
    date: "2025-12-20",
    status: "Pending FIR",
    level: "Medium",
    complainant: "Jennifer Wilson",
  },
  {
    id: "C-2025-008",
    title: "Malware Infection on Network",
    date: "2025-12-17",
    status: "Evidence Uploaded",
    level: "High",
    complainant: "Thomas Anderson",
  },
  {
    id: "C-2025-009",
    title: "Insider Threat Data Leak",
    date: "2025-12-12",
    status: "FIR Filed",
    level: "Critical",
    complainant: "Emily Taylor",
  },
  {
    id: "C-2025-010",
    title: "Credential Theft Incident",
    date: "2025-12-19",
    status: "Pending",
    level: "Medium",
    complainant: "Christopher Martin",
  },
]

export default function AllComplaints() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [levelFilter, setLevelFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<string>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Filter and sort complaints
  const filteredComplaints = complaints
    .filter((complaint) => {
      // Search filter
      const searchMatch =
        complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.complainant.toLowerCase().includes(searchTerm.toLowerCase())

      // Status filter
      const statusMatch = statusFilter === "all" || complaint.status === statusFilter

      // Level filter
      const levelMatch = levelFilter === "all" || complaint.level === levelFilter

      return searchMatch && statusMatch && levelMatch
    })
    .sort((a, b) => {
      // Sort by selected field
      if (sortField === "date") {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA
      } else if (sortField === "id") {
        return sortDirection === "asc" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
      } else if (sortField === "level") {
        const levelOrder = { Low: 1, Medium: 2, High: 3, Critical: 4 }
        const levelA = levelOrder[a.level as keyof typeof levelOrder]
        const levelB = levelOrder[b.level as keyof typeof levelOrder]
        return sortDirection === "asc" ? levelA - levelB : levelB - levelA
      } else if (sortField === "status") {
        return sortDirection === "asc" ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status)
      } else {
        // Default sort by title
        return sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      }
    })

  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle sort direction if clicking the same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new sort field and default to ascending
      setSortField(field)
      setSortDirection("asc")
    }
  }

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
        <h1 className="text-3xl font-bold tracking-tight">All Complaints</h1>
        <p className="text-muted-foreground">View and manage all complaints in the system.</p>
      </div>

      <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
        <CardHeader>
          <CardTitle>Complaints Database</CardTitle>
          <CardDescription>
            Search, filter, and manage all complaints registered in the BlockSentinel platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, title, or complainant..."
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
            </div>
          </div>

          {/* Complaints Table */}
          <div className="rounded-md border border-white/10 overflow-hidden">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow>
                  <TableHead className="w-[120px] cursor-pointer" onClick={() => handleSort("id")}>
                    <div className="flex items-center">
                      ID
                      {sortField === "id" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )
                      ) : (
                        <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                    <div className="flex items-center">
                      Title
                      {sortField === "title" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )
                      ) : (
                        <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("complainant")}>
                    <div className="flex items-center">
                      Complainant
                      {sortField === "complainant" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )
                      ) : (
                        <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                    <div className="flex items-center">
                      Date
                      {sortField === "date" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )
                      ) : (
                        <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                    <div className="flex items-center">
                      Status
                      {sortField === "status" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )
                      ) : (
                        <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("level")}>
                    <div className="flex items-center">
                      Level
                      {sortField === "level" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )
                      ) : (
                        <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComplaints.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No complaints found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredComplaints.map((complaint) => (
                    <TableRow key={complaint.id} className="hover:bg-white/5">
                      <TableCell className="font-mono text-xs text-[#00FFFF]">{complaint.id}</TableCell>
                      <TableCell className="font-medium">{complaint.title}</TableCell>
                      <TableCell>{complaint.complainant}</TableCell>
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
                          size="icon"
                          onClick={() => router.push(`/dashboard/admin/complaint/${complaint.id}`)}
                          className="text-[#00FFFF] hover:text-[#00FFFF] hover:bg-[#00FFFF]/10"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
