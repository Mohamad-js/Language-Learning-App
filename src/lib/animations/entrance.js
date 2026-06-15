export const cards = ({delay = 0, x = 0, y = 0, press= true}) => ({
   initial: {
      x: x,
      y: y,
      opacity: 0,
   },

   animate: {
      y: 0,
      x: 0,
      opacity: 1,
      
      transition: {
         type: 'spring',
         stiffness: 185,
         damping: 30,
         delay: delay,
      },
   },


   whileTap: {
      scale: press ? 0.97 : 1
   }
})