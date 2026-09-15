"use client";

import { motion } from "motion/react";

export default function MeshGradient() {
    // Create a dense organic dot field
    const dots = [];

    for (let row = 0; row < 115; row++) {
        for (let column = 0; column < 75; column++) {

            // Deterministic "randomness"
            const random1 =
                Math.sin(row * 12.9898 + column * 78.233) * 43758.5453;

            const random2 =
                Math.sin(row * 39.346 + column * 11.135) * 24634.6345;

            const random3 =
                Math.sin(row * 73.156 + column * 52.235) * 18341.2453;

            const noiseX = (random1 - Math.floor(random1)) * 8 - 4;
            const noiseY = (random2 - Math.floor(random2)) * 8 - 4;

            const size =
                0.45 +
                (random3 - Math.floor(random3)) * 0.7;

            const opacity =
                0.22 +
                (random1 - Math.floor(random1)) * 0.30;

            dots.push({
                x: column * 13.5 + noiseX,
                y: row * 14 + noiseY,
                size,
                opacity,
            });
        }
    }

    return (
        <motion.div
            className="fixed inset-0 z-0 overflow-hidden"

            animate={{
                backgroundPosition: [
                    "0% 50%",
                    "4% 48%",
                    "-3% 52%",
                    "0% 50%",
                ],
            }}

            transition={{
                duration: 28,
                repeat: Infinity,
                ease: "easeInOut",
            }}

            style={{
                backgroundImage: `
                    radial-gradient(
                        ellipse 90% 85% at 0% 55%,
                        #5420ff 0%,
                        #6b2cff 22%,
                        #8c55f5 45%,
                        transparent 78%
                    ),

                    radial-gradient(
                        ellipse 90% 85% at 100% 55%,
                        #ff20c8 0%,
                        #f44bd3 25%,
                        #e987e7 48%,
                        transparent 78%
                    ),

                    radial-gradient(
                        ellipse 90% 65% at 52% 0%,
                        #ffffff 0%,
                        #fdf4ff 35%,
                        #ead8fa 65%,
                        transparent 90%
                    ),

                    radial-gradient(
                        ellipse 80% 65% at 75% 105%,
                        #fff7ff 0%,
                        #f7dff5 45%,
                        transparent 85%
                    ),

                    linear-gradient(
                        115deg,
                        #a987ff 0%,
                        #b997ff 20%,
                        #d7baf8 45%,
                        #f1c9ef 70%,
                        #ffe6fa 100%
                    )
                `,

                backgroundSize: "125% 125%",
                backgroundPosition: "0% 50%",
            }}
        >

            {/* =====================================================
                EXTRA BLUR
            ===================================================== */}

            <motion.div
                className="
                    pointer-events-none
                    absolute
                    -left-[30%]
                    top-[5%]
                    h-[80%]
                    w-[85%]
                    rounded-full
                    bg-[#7135ff]
                    opacity-25
                    blur-[190px]
                "

                animate={{
                    x: ["0%", "4%", "-3%", "0%"],
                    y: ["0%", "-3%", "3%", "0%"],
                    scale: [1, 1.08, 0.98, 1],
                }}

                transition={{
                    duration: 24,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />


            <motion.div
                className="
                    pointer-events-none
                    absolute
                    -right-[30%]
                    top-[12%]
                    h-[80%]
                    w-[85%]
                    rounded-full
                    bg-[#ff25ca]
                    opacity-25
                    blur-[200px]
                "

                animate={{
                    x: ["0%", "-4%", "3%", "0%"],
                    y: ["0%", "3%", "-3%", "0%"],
                    scale: [1, 1.08, 0.98, 1],
                }}

                transition={{
                    duration: 26,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />


            {/* =====================================================
                WHITE TOP LIGHT
            ===================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -top-[35%]
                    left-[15%]
                    h-[65%]
                    w-[75%]
                    rounded-full
                    bg-white
                    opacity-65
                    blur-[190px]
                "
            />


            {/* =====================================================
                THE DOT MESH
                NO LINES
                NO SQUARES
            ===================================================== */}

            <motion.svg
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    h-full
                    w-full
                "

                viewBox="0 0 1000 1600"

                preserveAspectRatio="none"

                animate={{
                    x: ["0%", "0.15%", "-0.15%", "0%"],
                    y: ["0%", "-0.15%", "0.15%", "0%"],
                }}

                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >

                {/* =================================================
                    MAIN DOT FIELD
                ================================================= */}

                <g>
                    {dots.map((dot, index) => (
                        <circle
                            key={index}
                            cx={dot.x}
                            cy={dot.y}
                            r={dot.size}
                            fill="white"
                            opacity={dot.opacity}
                        />
                    ))}
                </g>

            </motion.svg>


            {/* =====================================================
                SECOND MICRO DOT LAYER
            ===================================================== */}

            <svg
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    h-full
                    w-full
                "

                viewBox="0 0 1000 1600"

                preserveAspectRatio="none"
            >

                <g
                    fill="white"
                    opacity="0.20"
                >

                    {Array.from({ length: 5000 }).map((_, index) => {

                        const column = index % 100;
                        const row = Math.floor(index / 100);

                        const random =
                            Math.sin(
                                index * 12.9898
                            ) * 43758.5453;

                        const random2 =
                            Math.sin(
                                index * 78.233
                            ) * 24634.6345;

                        const x =
                            column * 10 +
                            (random - Math.floor(random)) * 7;

                        const y =
                            row * 32 +
                            (random2 - Math.floor(random2)) * 12;

                        return (
                            <circle
                                key={index}
                                cx={x}
                                cy={y}
                                r="0.25"
                            />
                        );
                    })}

                </g>

            </svg>


            {/* =====================================================
                VERY LIGHT GRAIN
            ===================================================== */}

            <svg
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    h-full
                    w-full
                "

                style={{
                    opacity: 0.025,
                    mixBlendMode: "soft-light",
                }}
            >

                <filter id="grain">

                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.7"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />

                </filter>

                <rect
                    width="100%"
                    height="100%"
                    filter="url(#grain)"
                />

            </svg>

        </motion.div>
    );
}