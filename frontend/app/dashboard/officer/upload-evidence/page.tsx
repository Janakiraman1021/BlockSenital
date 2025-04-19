"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, AlertCircle, CheckCircle, FileText } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data for complaints
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

export default function UploadEvidence() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const complaintId = searchParams.get("id")

  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [selectedComplaint, setSelectedComplaint] = useState<string>(complaintId || "")

  const [formData, setFormData] = useState({
    complaintId: complaintId || "",
    evidenceType: "",
    description: "",
    ipfsHash: "",
    timestamp: new Date().toISOString(),
  })

  // Set the selected complaint if ID is provided in URL
  useEffect(() => {
    if (complaintId) {
      setSelectedComplaint(complaintId)
      setFormData((prev) => ({ ...prev, complaintId }))
    }
  }, [complaintId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === "complaintId") {
      setSelectedComplaint(value)
    }
  }

  const simulateUpload = () => {
    setUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          setUploadComplete(true)
          setFormData((prev) => ({
            ...prev,
            ipfsHash: "QmT8CZxmWqzuCLMTzAWkJTLJadEXxFb8HxhWVE5NuF6Nw9",
          }))
          return 100
        }
        return prev + 5
      })
    }, 150)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSubmitting(false)
    setSubmitSuccess(true)

    // Redirect after success
    setTimeout(() => {
      router.push("/dashboard/officer")
    }, 2000)
  }

  // Find the selected complaint details
  const complaintDetails = complaints.find((c) => c.id === selectedComplaint)

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Upload Digital Evidence</h1>

      {submitSuccess ? (
        <Alert className="bg-green-500/20 border-green-500/50 mb-6">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Evidence has been successfully uploaded to the blockchain and linked to the complaint. You will be
            redirected to the dashboard.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="bg-[#00FFFF]/10 border-[#00FFFF]/30 mb-6">
          <AlertCircle className="h-4 w-4 text-[#00FFFF]" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            All evidence is permanently stored on the blockchain and cannot be modified once submitted.
          </AlertDescription>
        </Alert>
      )}

      <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
        <CardHeader>
          <CardTitle>Evidence Details</CardTitle>
          <CardDescription>Upload digital evidence for the selected complaint.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="complaintId">Select Complaint</Label>
                <Select
                  value={selectedComplaint}
                  onValueChange={(value) => handleSelectChange("complaintId", value)}
                  disabled={!!complaintId}
                >
                  <SelectTrigger className="bg-white/10 border-white/20">
                    <SelectValue placeholder="Select complaint" />
                  </SelectTrigger>
                  <SelectContent>
                    {complaints
                      .filter((c) => c.status === "Pending Evidence")
                      .map((complaint) => (
                        <SelectItem key={complaint.id} value={complaint.id}>
                          {complaint.id} - {complaint.title}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Display selected complaint details */}
              {complaintDetails && (
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-[#00FFFF]" />
                    <h4 className="font-medium">{complaintDetails.title}</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Complainant:</span> {complaintDetails.complainant}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Filed on:</span> {complaintDetails.date}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span> {complaintDetails.status}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Level:</span> {complaintDetails.level}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="evidenceType">Evidence Type</Label>
                <Select
                  value={formData.evidenceType}
                  onValueChange={(value) => handleSelectChange("evidenceType", value)}
                >
                  <SelectTrigger className="bg-white/10 border-white/20">
                    <SelectValue placeholder="Select evidence type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="log_file">Log File</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Evidence Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Provide a detailed description of the evidence"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  className="min-h-32 bg-white/10 border-white/20"
                />
              </div>

              <div className="space-y-2">
                <Label>Digital Evidence (IPFS Upload)</Label>
                {!uploadComplete ? (
                  <div
                    className="border border-dashed border-white/20 rounded-lg p-6 text-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={simulateUpload}
                  >
                    {uploading ? (
                      <div className="space-y-2">
                        <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#00FFFF] to-[#a29bfe] rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">Uploading to IPFS... {uploadProgress}%</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Drag and drop or click to upload</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Supports images, documents, videos, and audio files (max 50MB)
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="border border-[#00FFFF]/30 rounded-lg p-4 bg-[#00FFFF]/5">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-[#00FFFF] mr-2" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Evidence uploaded successfully</p>
                        <p className="text-xs font-mono text-muted-foreground mt-1">IPFS Hash: {formData.ipfsHash}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#00FFFF] hover:text-[#00FFFF] hover:bg-[#00FFFF]/10"
                        onClick={() => {
                          setUploadComplete(false)
                          setFormData((prev) => ({ ...prev, ipfsHash: "" }))
                        }}
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="timestamp">Timestamp</Label>
                <Input
                  id="timestamp"
                  name="timestamp"
                  type="datetime-local"
                  value={formData.timestamp.slice(0, 16)} // Format for datetime-local input
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20"
                />
                <p className="text-xs text-muted-foreground">
                  This timestamp will be recorded on the blockchain as the evidence submission time.
                </p>
              </div>
            </div>

            <CardFooter className="px-0 pt-6 border-t border-white/10">
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  variant="outline"
                  className="flex-1 border-white/20 hover:bg-white/10"
                  onClick={() => router.back()}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#00FFFF] to-[#a29bfe] text-black hover:opacity-90"
                  disabled={!formData.ipfsHash || !formData.complaintId || !formData.evidenceType || submitting}
                >
                  {submitting ? (
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
                      Processing...
                    </div>
                  ) : (
                    "Submit Evidence"
                  )}
                </Button>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
