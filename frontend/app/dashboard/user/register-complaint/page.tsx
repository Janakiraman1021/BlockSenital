"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Upload, AlertCircle, CheckCircle } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function RegisterComplaint() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    ipfsHash: "",
    location: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
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
      router.push("/dashboard/user/my-complaints")
    }, 2000)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Register New Complaint</h1>

      {submitSuccess ? (
        <Alert className="bg-green-500/20 border-green-500/50 mb-6">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Your complaint has been successfully registered on the blockchain. You will be redirected to your complaints
            list.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="bg-[#00FFFF]/10 border-[#00FFFF]/30 mb-6">
          <AlertCircle className="h-4 w-4 text-[#00FFFF]" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            All complaints are permanently stored on the blockchain and cannot be modified once submitted.
          </AlertDescription>
        </Alert>
      )}

      <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
        <CardHeader>
          <CardTitle>Complaint Details</CardTitle>
          <CardDescription>Provide detailed information about the incident for proper investigation.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Complaint Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Brief title describing the incident"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide a detailed account of what happened"
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    className="min-h-32 bg-white/10 border-white/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger className="bg-white/10 border-white/20">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cyber_attack">Cyber Attack</SelectItem>
                      <SelectItem value="data_breach">Data Breach</SelectItem>
                      <SelectItem value="identity_theft">Identity Theft</SelectItem>
                      <SelectItem value="phishing">Phishing</SelectItem>
                      <SelectItem value="ransomware">Ransomware</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Incident Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white/10 border-white/20",
                          !date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Where did the incident occur?"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20"
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
                          Supports images, documents, and video files (max 50MB)
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
                  disabled={!formData.ipfsHash || submitting}
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
                    "Register Complaint"
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
