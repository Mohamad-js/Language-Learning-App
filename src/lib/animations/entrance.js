
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
         damping: 60,
      },
   },

}


export const fadeIn = {
   initial: {
      opacity: 0,
   },

   animate: {
      opacity: 1,
      
      transition: {
         duration: 0.25,
      },
   },

}




export async function lessonCompleteAnimation(animate) {
   // Slide sentence in
   await animate(
      '.sentence',
      {
         opacity: [0, 1],
         x: [200, 0],
      },
      {
            type: 'spring',
            stiffness: 400,
            damping: 30,
            delay: 0.5
      }
   );

   // Grow number and move words
   await Promise.all([
      animate(
         '.number',
         {
            scale: 3,
         },
         {
            type: 'spring',
            stiffness: 400,
            damping: 30,
         }
      ),

      animate(
         '.left',
         {
            x: -20,
         },
         {
            type: 'spring',
            stiffness: 300,
            damping: 20,
         }
      ),

      animate(
         '.right',
         {
            x: 20,
         },
         {
            type: 'spring',
            stiffness: 300,
            damping: 20,
         }
      ),
   ]);

   // Wait 1 second
   await new Promise(resolve =>
      setTimeout(resolve, 500)
   );

   // Return everything
   await Promise.all([
      animate(
         '.number',
         {
            scale: 1,
         },
         {
            type: 'spring',
            stiffness: 400,
            damping: 10,
         }
      ),

      animate(
         '.left',
         {
            x: 0,
         },
         {
            type: 'spring',
            stiffness: 300,
            damping: 20,
         }
      ),

      animate(
         '.right',
         {
            x: 0,
         },
         {
            type: 'spring',
            stiffness: 300,
            damping: 20,
         }
      ),
   ]);
}


export const expand = ({delay = 0}) => ({
   initial: {
      opacity: 0,
      scale: 0
   },

   animate: {
      opacity: 1,
      scale: 1,

      transition: {
         type: 'spring',
         stiffness: 600,
         damping: 100,
         delay: delay
      }
   }
})