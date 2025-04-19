"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface MetaMaskContextType {
  account: string | null
  connectMetaMask: () => Promise<void>
  isConnecting: boolean
  error: string | null
}

const MetaMaskContext = createContext<MetaMaskContextType>({
  account: null,
  connectMetaMask: async () => {},
  isConnecting: false,
  error: null,
})

export const useMetaMask = () => useContext(MetaMaskContext)

interface MetaMaskProviderProps {
  children: ReactNode
}

export const MetaMaskProvider = ({ children }: MetaMaskProviderProps) => {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    const { ethereum } = window as any
    return Boolean(ethereum && ethereum.isMetaMask)
  }

  // Connect to MetaMask wallet
  const connectMetaMask = async () => {
    setIsConnecting(true)
    setError(null)

    try {
      if (!isMetaMaskInstalled()) {
        throw new Error('MetaMask is not installed')
      }

      const { ethereum } = window as any
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      if (accounts.length > 0) {
        setAccount(accounts[0])
      } else {
        throw new Error('No accounts found')
      }
    } catch (err: any) {
      console.error('Error connecting to MetaMask:', err)
      setError(err.message || 'Failed to connect to MetaMask')
    } finally {
      setIsConnecting(false)
    }
  }

  // Handle account changes
  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User has disconnected all accounts
        setAccount(null)
      } else if (accounts[0] !== account) {
        // User has switched accounts
        setAccount(accounts[0])
      }
    }

    if (isMetaMaskInstalled()) {
      const { ethereum } = window as any
      ethereum.on('accountsChanged', handleAccountsChanged)

      // Check if already connected
      ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0])
          }
        })
        .catch((err: Error) => {
          console.error('Error checking MetaMask accounts:', err)
        })

      return () => {
        ethereum.removeListener('accountsChanged', handleAccountsChanged)
      }
    }
  }, [account])

  return (
    <MetaMaskContext.Provider value={{ account, connectMetaMask, isConnecting, error }}>
      {children}
    </MetaMaskContext.Provider>
  )
}

// Export the provider to be used in layout.tsx
export { MetaMaskContext }

// Export a combined providers component
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MetaMaskProvider>
      {children}
    </MetaMaskProvider>
  )
}