import dynamic from "next/dynamic";
import { Metadata } from "next";
const Share = dynamic(() => import("../../components/share"));

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "vNext",
  imageUrl: `${appUrl}/images/feed.png`,
  button: {
    title: "See Prototype",
    action: {
      type: "launch_frame",
      name: "DoubleIt",
      url: appUrl,
      splashImageUrl: `${appUrl}/images/splash.png`,
      splashBackgroundColor: "#FFFFFF",
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Double It",
    openGraph: {
      title: "Double It",
      description: "Double it or withdraw it. Form the longest chain.",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function SharePage() {
  return (
    <>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content={`${appUrl}/api/og`} />
      <meta property="fc:frame:button:1" content="Make Your Move" />
      <meta property="fc:frame:post_url" content={`${appUrl}/api/move`} />
      <Share />
    </>
  );
}
