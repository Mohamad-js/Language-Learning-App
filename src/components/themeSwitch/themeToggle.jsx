import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdSunny } from "react-icons/md";
import { HiMiniMoon } from "react-icons/hi2";


function ThemeToggle() {
   const { setTheme, resolvedTheme } = useTheme();
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) {
      return <div className="size-10 bg-zinc-200 dark:bg-zinc-800 rounded-[15px] animate-pulse" />;
   }

   const isDark = resolvedTheme === 'dark';

   const handleToggle = () => {
      const nextTheme = isDark ? 'light' : 'dark';
      
      // Fallback for older browsers
      if (!document.startViewTransition) {
         setTheme(nextTheme);
         return;
      }

      // Seamless native transition wrapper
      document.startViewTransition(() => {
         setTheme(nextTheme);
      });
   };

   return (
      <div className="relative size-10">
         <label className="absolute inset-0 bg-background rounded-[15px] cursor-pointer flex justify-center items-center">
            <input 
               type="checkbox" 
               className="peer hidden" 
               checked={isDark}
               onChange={handleToggle}
            />

            {
               isDark ? <MdSunny size={25}/> : <HiMiniMoon size={25}/>
            }
            
         </label>
      </div>
   );
}

export default ThemeToggle;