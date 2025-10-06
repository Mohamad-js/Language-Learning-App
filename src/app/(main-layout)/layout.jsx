import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import Navigation from "@/components/Navigation/navigation";
import Ham from "@/components/hamburger/ham";
// import Menu from "@/components/menu/menu";
import { ThemeProvider } from "@/components/context/ThemeContext";
import ServiceWorkerRegistrar from "@/components/clientLayout/ServiceWorkerRegistrar";
import { config } from 'dotenv';
config();

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
         <link rel="manifest" href="/manifest.json" />
         <meta name="theme-color" content="#000000" />
         <meta name="mobile-web-app-capable" content="yes" />
         <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
         <body>
            <ThemeProvider>
               <ServiceWorkerRegistrar />
               {/* <Menu /> */}
               <Ham />
               {children}
               <Navigation />
               <SpeedInsights />
               <Analytics />
            </ThemeProvider>
         </body>
      </html>
   );
}
