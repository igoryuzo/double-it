"use client"

import { X, MoreHorizontal } from "lucide-react"
import Link from "next/link"

export default function LearnMore() {
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
        <h2 className="text-[#0b89f4] text-4xl font-bold">Learn About DoubleIt</h2>

        {/* Main Description */}
        <p className="text-[#556272] text-xl leading-relaxed">
          <span className="text-[#0b89f4]">DoubleIt</span> is a social game where a user starts a chain with as little
          as $0.01 and challenges a friend to double it, pass it or withdraw it. You can see the largest pot and longest
          chain on the{" "}
          <Link href="/leaderboard" className="text-[#0b89f4] hover:underline">
            leaderboard
          </Link>
          .
        </p>

        {/* Why Start Section */}
        <div className="space-y-4">
          <h3 className="text-[#0b89f4] text-2xl font-bold">Why start a chain?</h3>
          <p className="text-[#556272] text-xl leading-relaxed">
            <span className="text-[#0b89f4]">Farcaster</span> has a high quality social graph. Lets see if we can do
            some good with a fun game.
          </p>
        </div>

        {/* Rules Section */}
        <div className="space-y-4">
          <h3 className="text-[#0b89f4] text-2xl font-bold">What are the rules?</h3>
          <p className="text-[#556272] text-xl leading-relaxed">
            You start a chain and share it with your friend on{" "}
            <Link href="https://warpcast.com" className="text-[#0b89f4] hover:underline">
              Warpcast
            </Link>
            , when you share it, you pass your admin rights to the next person. The receiver can double it, pass it or
            withdraw the pot.
          </p>
        </div>

        {/* Recommendation Section */}
        <div className="space-y-4">
          <h3 className="text-[#0b89f4] text-2xl font-bold">Recommendation</h3>
          <p className="text-[#556272] text-xl leading-relaxed">
            Start with a small value such as $0.01 to have a chance at creating the longest chain with the highest pot
            size. If $0.01 doubles 24 times it surpasses $100,000.
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-8 space-y-1 text-center">
          <p className="text-[#556272] text-lg">Any Questions?</p>
          <p className="text-[#8d97a0]">DC @igoryuzo.eth</p>
        </footer>
      </main>
    </div>
  )
}