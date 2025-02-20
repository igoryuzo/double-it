"use client"

import dynamic from "next/dynamic";

const LearnMore = dynamic(() => import("@/components/learn"));

export default function App() {
  return <LearnMore />;
}