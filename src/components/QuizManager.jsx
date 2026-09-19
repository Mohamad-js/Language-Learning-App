"use client";

import {useEffect} from "react";
import {initDB} from "@/lib/db";
import quizData from "@/../database/quiz.json";

export default function QuizManager() {

    useEffect(() => {
        const seedQuizzes = async () => {
            try {
                const db = await initDB();

                const tx = db.transaction("quizzes", "readwrite");
                const store = tx.objectStore("quizzes");

                const quizzes = quizData[0].data;

                for (const quiz of quizzes) {
                    await store.put(quiz);
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
