"use client";

import { useEffect, useRef } from "react";
import { initDB } from "@/lib/db";
import quizData from "@/../database/quiz.json";

export default function QuizManager() {
    const seeded = useRef(false)  // ← guard flag

    useEffect(() => {
        if (seeded.current) return  // ← skip if already ran
        seeded.current = true       // ← mark as ran

        const seedQuizzes = async () => {
            try {
                const db = await initDB();
                const tx = db.transaction("quizzes", "readwrite");
                const store = tx.objectStore("quizzes");

                const quizzes = quizData[0].data;

                for (const quiz of quizzes) {
                    const existing = await store.get(quiz.quizNumber)

                    // Always sync content from quiz.json, but keep saved progress if it exists
                    const merged = existing
                        ? { ...quiz, userAnswers: existing.userAnswers }
                        : quiz

                    await store.put(merged)
                }

                await tx.done;
                console.log("Quizzes seeded successfully");
            } catch (error) {
                console.error("Quiz seeding failed:", error);
            }
        };

        void seedQuizzes();
    }, []);

    return null;
}