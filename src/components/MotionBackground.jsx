"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SPEED_MODIFIER = 0.5;

// Expanded spectrum of Purple and Pink shades
const palettes = [
  { colors: ["#ffffff", "#e0c3fc", "#8ec5fc"], shadow: "rgba(142, 197, 252, 0.5)" },
  { colors: ["#fff0f5", "#f093fb", "#f5576c"], shadow: "rgba(245, 87, 108, 0.4)" },
  { colors: ["#f3e5f5", "#ce93d8", "#9c27b0"], shadow: "rgba(156, 39, 176, 0.5)" },
  { colors: ["#fce4ec", "#f48fb1", "#d81b60"], shadow: "rgba(216, 27, 96, 0.4)" },
  { colors: ["#ede7f6", "#b39ddb", "#5e35b1"], shadow: "rgba(94, 53, 177, 0.5)" },
  { colors: ["#ffcce6", "#ff66b2", "#cc0066"], shadow: "rgba(204, 0, 102, 0.4)" },
];

// Fixed boundaries: 150vw/150vh ensures objects start and end WELL outside the visible area
const getRoute = (index) => {
  const range = 150; 
  const startX = (Math.random() - 0.5) * range * 2;
  const startY = (Math.random() - 0.5) * range * 2;
  
  // Force movement to be directional to ensure they traverse the screen entirely
  return {
    initial: { x: `${startX}vw`, y: `${startY}vh` },
    animate: { x: `${-startX}vw`, y: `${-startY}vh` }
  };
};

export default function MotionBackground() {
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    // Reduced count to 10 for bigger, more impactful spheres
    const generated = Array.from({ length: 10 }).map((_, i) => {
      const palette = palettes[Math.floor(Math.random() * palettes.length)];
      const size = Math.floor(Math.random() * 300) + 300; // Much bigger: 300px to 600px
      const route = getRoute(i);
      const zDepth = Math.floor(Math.random() * 400) - 200;

      return {
        id: i,
        size,
        route,
        zDepth,
        duration: Math.floor(Math.random() * 20) + 20,
        gradient: `radial-gradient(circle at 30% 30%, ${palette.colors[0]} 0%, ${palette.colors[1]} 60%, ${palette.colors[2]} 100%)`,
        shineShadow: `0px 30px 60px ${palette.shadow}`,
      };
    });

    setCircles(generated);
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", overflow: "hidden", zIndex: -1, perspective: "1000px" }}>
      {circles.map((circle) => (
        <motion.div
          key={circle.id}
          initial={circle.route.initial}
          animate={circle.route.animate}
          transition={{ duration: circle.duration / SPEED_MODIFIER, ease: "linear", repeat: Infinity, repeatType: "loop" }}
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            marginTop: `-${circle.size / 2}px`,
            marginLeft: `-${circle.size / 2}px`,
            borderRadius: "50%",
            background: circle.gradient,
            boxShadow: `inset -20px -20px 40px rgba(0,0,0,0.1), inset 20px 20px 40px rgba(255,255,255,0.8), ${circle.shineShadow}`,
            zIndex: Math.floor(circle.zDepth + 200),
            transform: `translateZ(${circle.zDepth}px)`,
          }}
        />
      ))}
    </div>
  );
}