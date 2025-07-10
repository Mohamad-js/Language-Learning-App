import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import Menu from "@/components/menu/menu";
import RegisterServiceWorker from "../registerServiceWorker";
import "./globals.css";


export const metadata = {
  title: "Ghazalim English App",
  description: "Powered by Mohamad Gomar",
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
         <body>
            <RegisterServiceWorker />
            <Menu />
            {children}
            <SpeedInsights />
            <Analytics />
         </body>
      </html>
  );
}
