export const fadeUp = ({isReady = true, delay = 0}) => ({
   initial: {
      y: 30,
      opacity: 0,
   },

   animate: {
      y: isReady? 0 : 20,
      opacity: isReady ? 1 : 0,
   },

   transition: {
      type: 'spring',
      stiffness: 185,
      damping: 30,
      delay: delay,
   },
})