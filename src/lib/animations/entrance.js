

export const cardsContainer = {
   hidden: {},

   visible: {
      transition: {
         staggerChildren: 0.07,
      },
   },
};

export const card = {
   hidden: {
      opacity: 0,
      y: 200,
   },
   visible: {
      opacity: 1,
      y: 0,

      transition: {
         type: "spring",
         stiffness: 500,
         damping: 100,
      },
   },
};


export const appear = {
   initial: {
      opacity: 0,
   },

   animate: {
      opacity: 1,
      
      transition: {
         delay: 0.5,
         duration: 0.5
      },
   },

}