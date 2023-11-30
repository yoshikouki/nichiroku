import "./globals.css";

import type { Metadata, Viewport } from "next";
import { M_PLUS_2 } from "next/font/google";
import { cookies } from "next/headers";
import { cn } from "../lib/utils";
import { ThemeProvider } from "./theme-provider";

export const APP_NAME = "Nichiroku";
export const APP_DEFAULT_TITLE = "Nichiroku";
export const APP_TITLE_TEMPLATE = "%s - Nichiroku";
export const APP_DESCRIPTION = "Awesome Dairy app!!1";
export const APP_URL = "https://nichiroku.app";

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

const getTheme = () => {
  const cookieStore = cookies();
  const themeCookie = cookieStore.get("theme");
  const theme = themeCookie ? themeCookie.value : "system";
  return theme;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = getTheme();

  return (
    <html lang="en" className={theme} style={{ colorScheme: theme }}>
      <body className={cn("bg-background text-foreground", font.className)}>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
