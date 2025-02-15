import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "vNext",
  imageUrl: `${appUrl}/images/feed.png`,
  button: {
    title: "Start",
    action: {
      type: "launch_frame",
      name: "Double It",
      url: appUrl,
      splashImageUrl: `${appUrl}/images/splash.png`,
      splashBackgroundColor: "#f7f7f7",
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

// export const metadata: Metadata = {
//   title: "Double It",
//   description: "Double It",
//   openGraph: {
//     title: "Double It",
//     description: "Double it or withdraw it. Form the longest chain.",
//   },
//   other: {
//     'fc:frame:image': `${process.env.NEXT_PUBLIC_URL}/images/feed.png`,
//     'fc:frame:button:1': 'Double It!',
//     'fc:frame:post_url': `${process.env.NEXT_PUBLIC_URL}/api/frame`,
//     'fc:frame:version': 'vNext',
//   }
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}