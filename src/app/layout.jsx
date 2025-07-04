import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import Navigation from "@/components/Navigation/navigation";
import Menu from "@/components/menu/menu";


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
            <Menu />
            {children}
            <Navigation />
            <SpeedInsights />
            <Analytics />
         </body>
      </html>
  );
}
