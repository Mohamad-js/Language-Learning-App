import './globals.css';
import { Comfortaa, Exo } from "next/font/google";
import { LoadingProvider } from '@/components/LoadingProvider';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import Ham from "@/components/hamburger/ham";
import { ThemeProvider } from '@/components/theme-provider';
import ServiceWorkerRegistrar from "@/components/clientLayout/ServiceWorkerRegistrar";
import { NavigationProvider } from './context/NavigationProvider';
import { SettingsProvider } from './context/SettingsProvider';
import { Toaster } from 'sonner';




export const metadata = {
   title: "iGhazal App",
   description: "Powered by Mohamad Gomar",
   manifest: "/manifest.json",
};

export const viewport = {
   width: 'device-width',
   initialScale: 1.0,
   maximumScale: 1.0,
   userScalable: false,
};


const comfortaa = Comfortaa({
   subsets: ["latin"],
   weight: ["300", "400", "500", "600", "700"],
   variable: "--font-comfortaa",
   display: "swap",
});

const exo = Exo({
   subsets: ["latin"],
   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
   variable: "--font-sans",
   display: "swap",
});


export default function RootLayout({ children }) {
   

  return (
    <html suppressHydrationWarning>
      <head>
         <link rel="manifest" href="/manifest.json" />
         <meta name="theme-color" content="#000000" />
         <meta name="mobile-web-app-capable" content="yes" />
         <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
      <body className={`${exo.variable} ${comfortaa.variable} font-sans`}>
         <SpeedInsights />
         <Analytics />
         <ServiceWorkerRegistrar />

         <SettingsProvider>
            <ThemeProvider>
               <LoadingProvider>
                  <Ham />
                  <NavigationProvider>
                     {children}
                     <Toaster position='top' theme='system' richColors />
                  </NavigationProvider>
               </LoadingProvider>
            </ThemeProvider>
         </SettingsProvider>
      </body>
    </html>
  );
}