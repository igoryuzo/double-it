"use client";

import dynamic from "next/dynamic";

const DoubleIt = dynamic(() => import("../components/DoubleIt"));

export default function App() {
  return <DoubleIt />;
}
