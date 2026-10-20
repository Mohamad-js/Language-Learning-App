// Settings resets own these preferences and legacy vocabulary caches only.
// Keep the quiz account marker, sign-in session, and any other account data.
export function resetAppStorage() {
    const preferenceKeys = new Set([
        'Settings', 'appVersion', 'joyride-tour-completed',
        'preview', 'lessonRequested', 'levelRequested', 'totalWordsCount',
    ]);
    const vocabularyKey = /^(?:(?:knownWords|unknownWords)-.+-(?:A1|A2|B1|B2|C1|C2)|(?:wordsCount|currentLesson|totalProgress)-(?:A1|A2|B1|B2|C1|C2)|saved(?:A1|A2|B1|B2|C1|C2)Vocabs-.+)$/;

    const keys = Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index));
    for (const key of keys) {
        if (preferenceKeys.has(key) || vocabularyKey.test(key)) {
            localStorage.removeItem(key);
        }
    }
}
