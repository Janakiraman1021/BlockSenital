"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, FileText, Shield, Clock, CheckCircle, Download, ExternalLink } from "lucide-react"
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@/components/timeline"

// Mock data for a specific complaint
const complaintData = {
  id: "C-2025-001",
  title: "Unauthorized Access to Database",
  description:
    "On December 15, 2025, we detected unauthorized access to our customer database. The attacker gained access through a compromised admin account and extracted approximately 500 customer records including names, emails, and hashed passwords. No financial information was compromised.",
  date: "2025-12-15",
  status: "Evidence Uploaded",
  level: "Medium",
  location: "Corporate Headquarters, Server Room B",
  complainant: "John Doe",
  assignedOfficer: "Officer Sarah Johnson",
  evidence: [
    {
      id: "E-001",
      title: "Server Access Logs",
      type: "Log File",
      uploadedBy: "Officer Sarah Johnson",
      uploadDate: "2025-12-17",
      ipfsHash: "QmT8CZxmWqzuCLMTzAWkJTLJadEXxFb8HxhWVE5NuF6Nw9",
    },
    {
      id: "E-002",
      title: "Database Query Logs",
      type: "Log File",
      uploadedBy: "Officer Sarah Johnson",
      uploadDate: "2025-12-17",
      ipfsHash: "QmX9CZxmWqzuCLMTzAWkJTLJadEXxFb8HxhWVE5NuF6Nw9",
    },
  ],
  fir: {
    id: "FIR-001",
    number: "FIR-2025-0456",
    uploadedBy: "Officer Sarah Johnson",
    uploadDate: "2025-12-18",
    ipfsHash: "QmZ8CZxmWqzuCLMTzAWkJTLJadEXxFb8HxhWVE5NuF6Nw9",
  },
  timeline: [
    {
      date: "2025-12-15 09:30 AM",
      event: "Complaint Registered",
      description: "Complaint registered by John Doe",
      actor: "John Doe",
    },
    {
      date: "2025-12-16 11:45 AM",
      event: "Complaint Assigned",
      description: "Complaint assigned to Officer Sarah Johnson",
      actor: "Admin",
    },
    {
      date: "2025-12-17 02:15 PM",
      event: "Evidence Uploaded",
      description: "Server Access Logs uploaded",
      actor: "Officer Sarah Johnson",
    },
    {
      date: "2025-12-17 02:30 PM",
      event: "Evidence Uploaded",
      description: "Database Query Logs uploaded",
      actor: "Officer Sarah Johnson",
    },
    {
      date: "2025-12-18 10:00 AM",
      event: "FIR Filed",
      description: "First Information Report filed and uploaded",
      actor: "Officer Sarah Johnson",
    },
  ],
}

export default function ComplaintDetail() {
  const router = useRouter()
  const params = useParams()
  const [complaint, setComplaint] = useState(complaintData)
  const [activeTab, setActiveTab] = useState("overview")

  // In a real app, you would fetch the complaint data based on the ID
  useEffect(() => {
    // This would be an API call in a real application
    // For now, we're just using the mock data
    console.log(`Fetching complaint with ID: ${params.id}`)
  }, [params.id])

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

  const getTimelineDotColor = (event: string) => {
    switch (event) {
      case "Complaint Registered":
        return "bg-[#00FFFF]"
      case "Complaint Assigned":
        return "bg-purple-500"
      case "Evidence Uploaded":
        return "bg-blue-500"
      case "FIR Filed":
        return "bg-indigo-500"
      case "Completed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="flex items-center text-muted-foreground hover:text-white"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Badge className={`${getStatusColor(complaint.status)} text-sm px-3 py-1`}>{complaint.status}</Badge>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{complaint.title}</h1>
          <Badge className={`${getLevelColor(complaint.level)} ml-2`}>{complaint.level}</Badge>
        </div>
        <div className="flex items-center mt-2 text-muted-foreground">
          <span className="font-mono text-xs text-[#00FFFF] mr-2">{complaint.id}</span>
          <span>Filed on {complaint.date}</span>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white/5 border border-white/10">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="fir">FIR Document</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
            <CardHeader>
              <CardTitle>Complaint Details</CardTitle>
              <CardDescription>Overview of the registered complaint</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p className="text-white">{complaint.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                  <p className="text-white">{complaint.location}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">Complainant</h3>
                  <p className="text-white">{complaint.complainant}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">Assigned Officer</h3>
                  <p className="text-white">{complaint.assignedOfficer || "Not assigned yet"}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">Blockchain Verification</h3>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-white">Verified on Blockchain</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Current Status</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        ["Evidence Uploaded", "FIR Filed", "Completed"].includes(complaint.status)
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }`}
                    />
                    <span className="text-sm">Registered</span>
                  </div>
                  <div className="h-0.5 w-12 bg-white/20" />
                  <div className="flex items-center space-x-2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        ["Evidence Uploaded", "FIR Filed", "Completed"].includes(complaint.status)
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }`}
                    />
                    <span className="text-sm">Evidence</span>
                  </div>
                  <div className="h-0.5 w-12 bg-white/20" />
                  <div className="flex items-center space-x-2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        ["FIR Filed", "Completed"].includes(complaint.status) ? "bg-green-500" : "bg-gray-500"
                      }`}
                    />
                    <span className="text-sm">FIR Filed</span>
                  </div>
                  <div className="h-0.5 w-12 bg-white/20" />
                  <div className="flex items-center space-x-2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        complaint.status === "Completed" ? "bg-green-500" : "bg-gray-500"
                      }`}
                    />
                    <span className="text-sm">Completed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evidence" className="mt-6">
          <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
            <CardHeader>
              <CardTitle>Digital Evidence</CardTitle>
              <CardDescription>Evidence uploaded for this complaint</CardDescription>
            </CardHeader>
            <CardContent>
              {complaint.evidence.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p>No evidence has been uploaded yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {complaint.evidence.map((evidence) => (
                    <div
                      key={evidence.id}
                      className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-[#00FFFF]">{evidence.id}</span>
                          <Badge className="bg-blue-500/20 text-blue-500 font-normal">{evidence.type}</Badge>
                        </div>
                        <h4 className="font-medium mt-1">{evidence.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Uploaded on {evidence.uploadDate} by {evidence.uploadedBy}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 md:mt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF]/10"
                        >
                          <Download className="mr-2 h-4 w-4" /> Download
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#00FFFF] hover:text-[#00FFFF] hover:bg-[#00FFFF]/10"
                          onClick={() => window.open(`https://ipfs.io/ipfs/${evidence.ipfsHash}`, "_blank")}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" /> IPFS
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 border-t border-white/10 pt-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Blockchain Verification</h3>
                <div className="p-4 rounded-lg bg-[#00FFFF]/5 border border-[#00FFFF]/20">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#00FFFF] mr-2" />
                    <div>
                      <p className="font-medium">Evidence verified on blockchain</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        All evidence hashes are stored on the blockchain and cannot be tampered with.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fir" className="mt-6">
          <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
            <CardHeader>
              <CardTitle>First Information Report (FIR)</CardTitle>
              <CardDescription>Official FIR document for this complaint</CardDescription>
            </CardHeader>
            <CardContent>
              {!complaint.fir ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p>FIR has not been filed yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{complaint.fir.number}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Uploaded on {complaint.fir.uploadDate} by {complaint.fir.uploadedBy}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <Button className="bg-gradient-to-r from-[#00FFFF] to-[#a29bfe] text-black hover:opacity-90">
                          <Download className="mr-2 h-4 w-4" /> Download FIR
                        </Button>
                        <Button
                          variant="outline"
                          className="border-white/20 hover:bg-white/10"
                          onClick={() => window.open(`https://ipfs.io/ipfs/${complaint.fir.ipfsHash}`, "_blank")}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" /> View on IPFS
                        </Button>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-[#00FFFF] mr-2" />
                        <h4 className="font-medium">FIR Document Preview</h4>
                      </div>
                      <div className="mt-4 aspect-[3/4] bg-white/5 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Preview not available. Please download the document.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-[#00FFFF]/5 border border-[#00FFFF]/20">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-[#00FFFF] mr-2" />
                      <div>
                        <p className="font-medium">FIR verified on blockchain</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          The FIR document hash is stored on the blockchain and cannot be tampered with.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
            <CardHeader>
              <CardTitle>Complaint Timeline</CardTitle>
              <CardDescription>Chronological history of events for this complaint</CardDescription>
            </CardHeader>
            <CardContent>
              <Timeline>
                {complaint.timeline.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot className={getTimelineDotColor(item.event)} />
                      {index < complaint.timeline.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <div className="ml-4">
                        <h3 className="font-medium">{item.event}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{item.date}</span>
                          <span className="mx-2">•</span>
                          <span>{item.actor}</span>
                        </div>
                      </div>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
