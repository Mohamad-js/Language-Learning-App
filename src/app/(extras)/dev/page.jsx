import NotificationButton from "@/components/NotifBtn/NotificationButton";




function Dev(){




   return(
      <div className='absolute bg-background w-full min-h-dvh flex justify-center items-center flex-col z-1'>
         <NotificationButton />

         <button className="p-3 bg-foreground text-background active:bg-red-500">TEST</button>
      </div>
   )
}

export default Dev;