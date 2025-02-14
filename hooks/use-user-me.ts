import { useQuery } from "@tanstack/react-query";
import { useFrame } from "@/components/context/FrameContext";

export const useUser = () => {
  const { context } = useFrame();
  
  return useQuery({
    queryKey: ["user-me"],
    queryFn: async () => {
      if (context?.user) {
        return {
          id: context.user.fid.toString(),
          name: context.user.displayName || context.user.username,
          username: context.user.username,
          pfpUrl: context.user.pfpUrl,
        };
      }
      
      // Fallback to API call if no context
      const token = localStorage.getItem("token");
      if (!token) return null;

      const res = await fetch("/api/users/me");
      if (!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    },
  });
};
