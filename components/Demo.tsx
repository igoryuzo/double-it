"use client";

import { useFrame } from "./context/FrameContext";
import { useSignIn } from "@/hooks/use-sign-in";
import { useUser } from "@/hooks/use-user-me";
import { useEffect, useState } from "react";
import { useUpdateUser } from "@/hooks/use-update-user";

export default function Demo() {
  const { isSDKLoaded, safeAreaInsets, context, error: frameError } = useFrame();
  const { signIn, logout, isSignedIn, isLoading, error: signInError } = useSignIn();
  const { data: user, refetch: refetchUser } = useUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const [customName, setCustomName] = useState("");

  console.log("Frame SDK loaded:", isSDKLoaded);
  console.log("Frame context:", context);
  console.log("Frame error:", frameError);
  console.log("SignIn error:", signInError);
  console.log("Current isSignedIn state:", isSignedIn);
  console.log("Current user data:", user);

  useEffect(() => {
    refetchUser();
  }, [isSignedIn, refetchUser]);

  if (!isSDKLoaded) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-2">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        Loading...
      </div>
    );
  }

  return (
    <div
      className="h-screen flex flex-col items-center justify-center gap-4 p-2"
      style={{
        marginTop: safeAreaInsets.top,
        marginBottom: safeAreaInsets.bottom,
        marginLeft: safeAreaInsets.left,
        marginRight: safeAreaInsets.right,
      }}
    >
      <a
        href="https://builders.garden"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4"
      >
        <img
          src="/images/builders-garden-logo.png"
          alt="Builders Garden"
          className="h-8"
        />
      </a>

      <h1 className="text-2xl font-bold">Frames v2 demo</h1>

      <p className="text-sm text-gray-500 text-center max-w-md mb-4">
        This demo is made for developers to quickly get started with Frames v2
        integration
      </p>

      {signInError && <p className="text-red-500">{signInError}</p>}

      {!isSignedIn ? (
        <button
          onClick={async () => {
            console.log("Sign in clicked");
            try {
              await signIn();
            } catch (err) {
              console.error("Sign in error:", err);
            }
          }}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
        >
          {isLoading ? "Signing in..." : "Sign in with Farcaster"}
        </button>
      ) : (
        <>
          <div className="flex flex-col items-center gap-2">
            <p>FID: {user?.id}</p>
            <p>Name: {user?.name || "No custom name set"}</p>
            <input
              type="text"
              placeholder="Enter custom name"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            />
            <button
              onClick={() => updateUser({ customName })}
              disabled={isUpdating || !customName}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-green-300"
            >
              Update Name
            </button>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </>
      )}

      <a
        href="https://github.com/builders-garden/frames-v2-starter"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 text-sm text-gray-500 hover:text-gray-400 transition-colors"
      >
        View on GitHub
      </a>
    </div>
  );
}
