'use client';

import { useEffect } from 'react';
import { useAuth } from '@/app/context/AuthProvider';
import { syncPendingQuizResults } from '@/lib/quizResults';

export default function QuizUploadManager() {
    const { user, isLoadingAuth } = useAuth();
    const userId = user?.id;

    useEffect(() => {
        if (isLoadingAuth || !userId) return;

        const retry = () => {
            void syncPendingQuizResults(userId).catch(error => {
                console.error('Quiz upload will be retried:', error);
            });
        };

        retry();
        window.addEventListener('online', retry);
        window.addEventListener('focus', retry);
        return () => {
            window.removeEventListener('online', retry);
            window.removeEventListener('focus', retry);
        };
    }, [userId, isLoadingAuth]);

    return null;
}
