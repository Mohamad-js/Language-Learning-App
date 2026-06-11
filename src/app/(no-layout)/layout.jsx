import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import { ThemeProvider } from "@/components/context/ThemeContext";
import ServiceWorkerRegistrar from "@/components/clientLayout/ServiceWorkerRegistrar";
import ToastProvider from "@/components/ToastProvider/toastProvider";
import { config } from 'dotenv';
config();

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

export default function ChildLayout({ children }) {
  return (
   <div>
      <ServiceWorkerRegistrar />
      <ThemeProvider>
         <ToastProvider>
            {children}
         </ToastProvider>
      </ThemeProvider>
      <SpeedInsights />
      <Analytics />
   </div>
  );
}
