import { config } from 'dotenv';
config();

export default function ChildLayout({ children }) {

   return (

      <div>
         {children}
      </div>
   );
}
