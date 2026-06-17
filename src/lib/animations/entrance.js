
export const fadeUpParent = {
   hidden: {},

   visible: {
      transition: {
         staggerChildren: 0.07,
      },
   },
};

export const fadeUpChild = {
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




export const expandParent = {
   hidden: {},

   visible: {
      transition: {
         staggerChildren: 0.07,
      },
   },
};

export const expandChild = {
   hidden: {
      opacity: 0,
      scale: 0
   },
   
   visible: {
      opacity: 1,
      scale: 1,

      transition: {
         type: "spring",
         stiffness: 500,
         damping: 100,
      },
   },
};




export const fadeLeftParent = {
   hidden: {},

   visible: {
      transition: {
         staggerChildren: 0.07,
      },
   },
};

export const fadeLeftChild = {
   hidden: {
      opacity: 0,
      x: 200,
   },
   
   visible: {
      opacity: 1,
      x: 0,

      transition: {
         type: "spring",
         stiffness: 500,
         damping: 100,
      },
   },
};


export const fadeRight = {
   initial: {
      opacity: 0,
      x: -200,
   },

   animate: {
      opacity: 1,
      x: 0,
      
      transition: {
         type: "spring",
         stiffness: 500,
         damping: 100,
      },
   },

}