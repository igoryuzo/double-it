"use client"

import dynamic from "next/dynamic";

const StartChain = dynamic(() => import("@/components/start"));

export default function App() {
  return <StartChain />;
}