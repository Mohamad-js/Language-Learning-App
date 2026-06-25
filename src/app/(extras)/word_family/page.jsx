'use client'
import { useRouter } from "next/navigation";



function Family(){
   const router = useRouter()



   return(
      <div className='w-full min-h-dvh flex flex-col gap-3 justify-center items-center bg-background'>
         Coming Soon

         <button className="p-4 border bg-foreground rounded-xl text-background active:scale-98 z-1" onClick={() => router.push('/')}>Go Back Home</button>
      </div>
   )
}

export default Family;