import './globals.css';
import { Comfortaa, Exo, Yanone_Kaffeesatz } from "next/font/google";
import { LoadingProvider } from '@/components/LoadingProvider';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import Ham from "@/components/hamburger/ham";
import { ThemeProvider } from '@/components/theme-provider';
import ServiceWorkerRegistrar from "@/components/clientLayout/ServiceWorkerRegistrar";
import { NavigationProvider } from './context/NavigationProvider';
import { SettingsProvider } from './context/SettingsProvider';
import { AuthProvider } from './context/AuthProvider';
import { Toaster } from 'sonner';




export const metadata = {
   metadataBase: new URL("https://ghazal-english-app.vercel.app"),
   title: {
      default: "Selenophile – Learn English Through the Proven Strategies.",
      template: "%s | Selenophile",
   },
   description: "A Language App Powered by Mohamad Gomar.",
   manifest: "/manifest.json",
   alternates: { canonical: "/" },
   openGraph: {
      type: "website",
      siteName: "Selenophile",
      title: "Selenophile – Learn English with quizzes",
      description: "Practice vocabulary and track your progress.",
      url: "/",
      images: ["/og-image.png"], // 1200x630
   },
   twitter: { card: "summary_large_image" },
   appleWebApp: { statusBarStyle: "black" },
   other: { "mobile-web-app-capable": "yes" },
};

export const viewport = {
   width: "device-width",
   initialScale: 1,
   themeColor: "#000000",
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

const yanone = Yanone_Kaffeesatz({
   subsets: ["latin"],
   weight: "variable",
   variable: "--font-yanone",
   display: "swap",
});


export default function RootLayout({ children }) {
   

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
         <link rel="manifest" href="/manifest.json" />
         <meta name="theme-color" content="#000000" />
         <meta name="mobile-web-app-capable" content="yes" />
         <meta name="apple-mobile-web-app-status-bar-style" content="black" />
         <title>Selenophile</title>
      </head>
      <body className={`${exo.variable} ${yanone.variable} ${comfortaa.variable} font-sans`}>
         <SpeedInsights />
         <Analytics />
         <ServiceWorkerRegistrar />

         <SettingsProvider>
            <AuthProvider>
               <ThemeProvider>
                  <LoadingProvider>
                     <Ham />
                     <NavigationProvider>
                        {children}
                        <Toaster position='top' theme='system' richColors />
                     </NavigationProvider>
                  </LoadingProvider>
               </ThemeProvider>
            </AuthProvider>
         </SettingsProvider>
      </body>
    </html>
  );
}
