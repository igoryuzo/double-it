"use client"

import { X, MoreHorizontal } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { Card } from "./ui/card"
import { useRouter } from "next/navigation"

export default function StartChain() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white px-6 py-4 max-w-md mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between mb-16">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <X className="w-5 h-5 text-[#556272]" />
        </button>
        <div className="text-center">
          <h1 className="text-xl font-medium text-[#556272]">DoubleIt</h1>
          <p className="text-sm text-[#8d97a0]">by igoryuzo.eth</p>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreHorizontal className="w-5 h-5 text-[#556272]" />
        </button>
      </header>

      <main className="flex flex-col gap-8">
        {/* Title */}
        <h2 className="text-[#0b89f4] text-4xl font-bold">Start a DoubleIt Chain</h2>

        {/* User Section */}
        <div className="space-y-2">
          <label className="text-[#556272] text-xl">User (Starting the chain)</label>
          <Card className="p-3 flex items-center gap-3 rounded-none">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>IG</AvatarFallback>
            </Avatar>
            <span className="text-[#556272]">igoryuzo.eth</span>
          </Card>
        </div>

        {/* Amount Section */}
        <div className="space-y-2">
          <label className="text-[#556272] text-xl">Amount</label>
          <div className="relative">
            <Input type="text" defaultValue="0.01" className="pl-8 pr-16 py-3 text-xl border-[#0b89f4] rounded-none h-[52px]" />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-[#556272]">$</span>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-[#556272]">USD</span>
          </div>
        </div>

        {/* Challenge User Section */}
        <div className="space-y-2">
            <label className="text-[#556272] text-xl">Challenge User</label>
            <div className="flex items-center gap-2 border border-[#d5d7da] bg-white p-3 rounded-none">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <span className="flex-1 text-[#414651]">@jessepollak</span>
              <button className="pr-2">
                <X className="h-5 w-5 text-[#8997a4]" />
              </button>
            </div>
          </div>

        {/* Start Button */}
        <Button
          className="w-full text-xl py-3 bg-[#0b89f4] hover:bg-[#0b89f4]/90 rounded-none h-[52px]"
          onClick={() => router.push("/share")}
        >
          Start & Share
        </Button>
      </main>
    </div>
  )
}

