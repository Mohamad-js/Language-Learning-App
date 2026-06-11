import Navigation from "@/components/Navigation/navigation";
import { config } from 'dotenv';
config();

export default function ChildLayout({ children }) {

   return (

      <div>
         {children}
         <Navigation />
      </div>
   );
}
