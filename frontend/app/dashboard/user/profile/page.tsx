"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, CheckCircle, User, Key, Bell, Wallet, Shield } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("profile")

  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  })

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    statusUpdates: true,
    evidenceUploads: true,
    firUploads: true,
  })

  const [walletData, setWalletData] = useState({
    ethAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    connected: true,
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSecurityData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setSuccess(true)

    // Reset success message after 3 seconds
    setTimeout(() => {
      setSuccess(false)
    }, 3000)
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    // Validate passwords
    if (securityData.newPassword !== securityData.confirmPassword) {
      setError("New passwords do not match")
      setIsLoading(false)
      return
    }

    if (securityData.newPassword.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setSuccess(true)

    // Reset form and success message
    setSecurityData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    setTimeout(() => {
      setSuccess(false)
    }, 3000)
  }

  const handleSaveNotifications = async () => {
    setIsLoading(true)
    setSuccess(false)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setSuccess(true)

    // Reset success message after 3 seconds
    setTimeout(() => {
      setSuccess(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Profile & Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white/5 border border-white/10">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="wallet">Blockchain Wallet</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveProfile}>
              <CardContent className="space-y-4">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#a29bfe] flex items-center justify-center">
                      <User className="h-12 w-12 text-black" />
                    </div>
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0 bg-[#00FFFF] text-black hover:bg-[#00FFFF]/90"
                    >
                      <span className="sr-only">Change avatar</span>
                      <span className="text-lg">+</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleProfileChange}
                    className="bg-white/10 border-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="bg-white/10 border-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="bg-white/10 border-white/20"
                  />
                </div>

                {success && (
                  <Alert className="bg-green-500/20 border-green-500/50">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>Your profile has been updated successfully.</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="border-t border-white/10 pt-6">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#00FFFF] to-[#a29bfe] text-black hover:opacity-90"
                  disabled={isLoading}
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
                      Saving...
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Update your password and security preferences</CardDescription>
            </CardHeader>
            <form onSubmit={handleChangePassword}>
              <CardContent className="space-y-4">
                <div className="flex justify-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-[#00FFFF]/20 flex items-center justify-center">
                    <Key className="h-8 w-8 text-[#00FFFF]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={securityData.currentPassword}
                    onChange={handleSecurityChange}
                    className="bg-white/10 border-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={securityData.newPassword}
                    onChange={handleSecurityChange}
                    className="bg-white/10 border-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={securityData.confirmPassword}
                    onChange={handleSecurityChange}
                    className="bg-white/10 border-white/20"
                  />
                </div>

                {error && (
                  <Alert variant="destructive" className="bg-red-500/10 border-red-500/30 text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="bg-green-500/20 border-green-500/50">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>Your password has been updated successfully.</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="border-t border-white/10 pt-6">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#00FFFF] to-[#a29bfe] text-black hover:opacity-90"
                  disabled={isLoading}
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
                      Updating...
                    </div>
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-[#a29bfe]/20 flex items-center justify-center">
                  <Bell className="h-8 w-8 text-[#a29bfe]" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive email notifications for important updates</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="statusUpdates">Status Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified when your complaint status changes</p>
                  </div>
                  <Switch
                    id="statusUpdates"
                    checked={notificationSettings.statusUpdates}
                    onCheckedChange={(checked) => handleNotificationChange("statusUpdates", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="evidenceUploads">Evidence Uploads</Label>
                    <p className="text-sm text-muted-foreground">Get notified when new evidence is uploaded</p>
                  </div>
                  <Switch
                    id="evidenceUploads"
                    checked={notificationSettings.evidenceUploads}
                    onCheckedChange={(checked) => handleNotificationChange("evidenceUploads", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="firUploads">FIR Uploads</Label>
                    <p className="text-sm text-muted-foreground">Get notified when FIR is filed for your complaint</p>
                  </div>
                  <Switch
                    id="firUploads"
                    checked={notificationSettings.firUploads}
                    onCheckedChange={(checked) => handleNotificationChange("firUploads", checked)}
                  />
                </div>
              </div>

              {success && (
                <Alert className="bg-green-500/20 border-green-500/50">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Your notification preferences have been updated.</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="border-t border-white/10 pt-6">
              <Button
                className="bg-gradient-to-r from-[#00FFFF] to-[#a29bfe] text-black hover:opacity-90"
                onClick={handleSaveNotifications}
                disabled={isLoading}
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
                    Saving...
                  </div>
                ) : (
                  "Save Preferences"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="mt-6">
          <Card className="bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
            <CardHeader>
              <CardTitle>Blockchain Wallet</CardTitle>
              <CardDescription>Manage your blockchain wallet for digital evidence verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-[#00FFFF]/20 flex items-center justify-center">
                  <Wallet className="h-8 w-8 text-[#00FFFF]" />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Ethereum Wallet</h3>
                    <p className="text-sm text-muted-foreground mt-1">Used for blockchain verification</p>
                  </div>
                  <Badge
                    className={walletData.connected ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}
                  >
                    {walletData.connected ? "Connected" : "Disconnected"}
                  </Badge>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Wallet Address</p>
                      <p className="font-mono text-sm">{walletData.ethAddress}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF]/10"
                      onClick={() => {
                        navigator.clipboard.writeText(walletData.ethAddress)
                        // Show a toast or some feedback here
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#00FFFF]/5 border border-[#00FFFF]/20">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-[#00FFFF] mr-2" />
                  <div>
                    <p className="font-medium">Blockchain Verification</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your wallet is used to verify the authenticity of digital evidence on the blockchain.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-white/10 pt-6 flex justify-between">
              <Button variant="outline" className="border-white/20 hover:bg-white/10">
                Disconnect Wallet
              </Button>
              <Button className="bg-gradient-to-r from-[#00FFFF] to-[#a29bfe] text-black hover:opacity-90">
                View Transactions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
