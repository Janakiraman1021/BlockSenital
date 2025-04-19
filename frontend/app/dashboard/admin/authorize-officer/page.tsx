"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Trash, UserPlus, Shield } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data for authorized officers
const initialOfficers = [
  {
    id: 1,
    name: "Officer John Smith",
    ethAddress: "0x1234...5678",
    badgeNumber: "B-4567",
    status: "Active",
    authorizedDate: "2025-10-15",
  },
  {
    id: 2,
    name: "Officer Sarah Johnson",
    ethAddress: "0x5678...9012",
    badgeNumber: "B-7890",
    status: "Active",
    authorizedDate: "2025-11-02",
  },
  {
    id: 3,
    name: "Officer Michael Brown",
    ethAddress: "0x9012...3456",
    badgeNumber: "B-1234",
    status: "Active",
    authorizedDate: "2025-11-20",
  },
  {
    id: 4,
    name: "Officer Emily Davis",
    ethAddress: "0x3456...7890",
    badgeNumber: "B-5678",
    status: "Inactive",
    authorizedDate: "2025-09-10",
  },
  {
    id: 5,
    name: "Officer Robert Wilson",
    ethAddress: "0x7890...1234",
    badgeNumber: "B-9012",
    status: "Active",
    authorizedDate: "2025-12-01",
  },
]

export default function AuthorizeOfficer() {
  const [officers, setOfficers] = useState(initialOfficers)
  const [isAddingOfficer, setIsAddingOfficer] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    ethAddress: "",
    badgeNumber: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddOfficer = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Add new officer
    const newOfficer = {
      id: officers.length + 1,
      name: formData.name,
      ethAddress: formData.ethAddress,
      badgeNumber: formData.badgeNumber,
      status: "Active",
      authorizedDate: new Date().toISOString().split("T")[0],
    }

    setOfficers([...officers, newOfficer])
    setSubmitting(false)
    setSubmitSuccess(true)

    // Reset form
    setTimeout(() => {
      setFormData({
        name: "",
        ethAddress: "",
        badgeNumber: "",
      })
      setSubmitSuccess(false)
      setIsAddingOfficer(false)
    }, 2000)
  }

  const handleRemoveOfficer = (id: number) => {
    setOfficers(officers.filter((officer) => officer.id !== id))
  }

  const handleToggleStatus = (id: number) => {
    setOfficers(
      officers.map((officer) =>
        officer.id === id ? { ...officer, status: officer.status === "Active" ? "Inactive" : "Active" } : officer,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Authorize Officers</h1>
        <p className="text-muted-foreground">Manage authorized officers who can upload evidence and FIR documents.</p>
      </div>

      <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Authorized Officers</CardTitle>
            <CardDescription>Officers with blockchain access to upload evidence and FIR documents.</CardDescription>
          </div>
          <Dialog open={isAddingOfficer} onOpenChange={setIsAddingOfficer}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[#00FFFF] to-[#a29bfe] text-black hover:opacity-90">
                <UserPlus className="mr-2 h-4 w-4" /> Add Officer
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black/90 backdrop-blur-md border border-white/10">
              <DialogHeader>
                <DialogTitle>Add Authorized Officer</DialogTitle>
                <DialogDescription>
                  Add a new officer who will be authorized to upload evidence and FIR documents.
                </DialogDescription>
              </DialogHeader>

              {submitSuccess ? (
                <Alert className="bg-green-500/20 border-green-500/50 mt-4">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>
                    Officer has been successfully authorized and added to the blockchain.
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleAddOfficer} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Officer Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter officer's full name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ethAddress">Ethereum Address</Label>
                    <Input
                      id="ethAddress"
                      name="ethAddress"
                      placeholder="Enter officer's Ethereum address"
                      required
                      value={formData.ethAddress}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 font-mono"
                    />
                    <p className="text-xs text-muted-foreground">
                      This address will be whitelisted on the blockchain for evidence uploads.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="badgeNumber">Badge Number</Label>
                    <Input
                      id="badgeNumber"
                      name="badgeNumber"
                      placeholder="Enter officer's badge number"
                      required
                      value={formData.badgeNumber}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20"
                    />
                  </div>

                  <DialogFooter className="mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddingOfficer(false)}
                      className="border-white/20"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-[#00FFFF] to-[#a29bfe] text-black hover:opacity-90"
                      disabled={submitting}
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
                        "Authorize Officer"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Alert className="bg-[#00FFFF]/10 border-[#00FFFF]/30 mb-6">
            <AlertCircle className="h-4 w-4 text-[#00FFFF]" />
            <AlertTitle>Blockchain Authorization</AlertTitle>
            <AlertDescription>
              Only authorized officers can upload evidence and FIR documents to the blockchain. All actions are
              permanently recorded and cannot be modified.
            </AlertDescription>
          </Alert>

          {/* Officers Table */}
          <div className="rounded-md border border-white/10 overflow-hidden">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Ethereum Address</TableHead>
                  <TableHead>Badge Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Authorized Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {officers.map((officer) => (
                  <TableRow key={officer.id} className="hover:bg-white/5">
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 text-[#a29bfe] mr-2" />
                        {officer.name}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{officer.ethAddress}</TableCell>
                    <TableCell>{officer.badgeNumber}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          officer.status === "Active"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-gray-500/20 text-gray-500"
                        } font-normal`}
                      >
                        {officer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{officer.authorizedDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleStatus(officer.id)}
                          className={`${
                            officer.status === "Active"
                              ? "border-red-500/50 text-red-500 hover:bg-red-500/10"
                              : "border-green-500/50 text-green-500 hover:bg-green-500/10"
                          }`}
                        >
                          {officer.status === "Active" ? "Deactivate" : "Activate"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveOfficer(officer.id)}
                          className="text-red-500 hover:text-red-500 hover:bg-red-500/10"
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="border-t border-white/10 pt-6">
          <p className="text-xs text-muted-foreground">
            Note: All officer authorizations are recorded on the blockchain and are subject to audit.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
