import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { Providers } from "@/app/providers";
import "./globals.css";
import Navigation from "@/components/Navigation/navigation";
import Menu from "@/components/menu/menu";



export const metadata = {
   title: "iGhazal App",
   description: "Powered by Mohamad Gomar",
   manifest: "/manifest.json",
   viewport: {
      width: 'device-width',
      initialScale: 1.0,
      maximumScale: 1.0,
      userScalable: false,
   },
};

export default function RootLayout({ children }) {


  return (
      <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
         <body>
            <Providers>
               <Menu />
               {children}
               <Navigation />
               <SpeedInsights />
               <Analytics />
            </Providers>
         </body>
      </html>
  );
}
