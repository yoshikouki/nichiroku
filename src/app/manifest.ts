import { MetadataRoute } from "next";
import { APP_DESCRIPTION, APP_NAME } from "./layout";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_NAME,
    short_name: APP_NAME,
    description: APP_DESCRIPTION,
    icons: [
      {
        src: "/next.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    theme_color: "#000000",
    background_color: "#000000",
    start_url: "/",
    display: "standalone",
  };
}
