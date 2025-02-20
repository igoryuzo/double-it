import { Metadata } from "next";
import App from "./app";

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
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

export default function Home() {
  return <App />;
}
