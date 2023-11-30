import "./globals.css";

import type { Metadata, Viewport } from "next";
import { M_PLUS_2 } from "next/font/google";

const APP_NAME = "Nichiroku";
const APP_DEFAULT_TITLE = "Nichiroku";
const APP_TITLE_TEMPLATE = "%s - Nichiroku";
const APP_DESCRIPTION = "Awesome Dairy app!!1";
const APP_URL = "https://nichiroku.app";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(APP_URL),
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const font = M_PLUS_2({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  fallback: ["system-ui", "arial"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
