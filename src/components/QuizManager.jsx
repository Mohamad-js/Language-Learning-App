"use client";

import { useEffect, useRef } from "react";
import { seedQuizzes } from "@/lib/db";

export default function QuizManager() {
    const seeded = useRef(false)

    useEffect(() => {
        if (seeded.current) return
        seeded.current = true

        seedQuizzes().catch(error => {
            console.error("Quiz seeding failed:", error);
        });
    }, []);

    return null;
}