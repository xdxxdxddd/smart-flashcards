import posthog from 'posthog-js';

// Розрахунок наступного рівня
function calculateNextLevel(currentLevel, isCorrect) {
    if (currentLevel < 1 || currentLevel > 5) {
        posthog.capture('logic_error', { error_type: 'invalid_level', value: currentLevel });
        throw new Error("Рівень має бути від 1 до 5");
    }

    if (!isCorrect) return 1; 
    return currentLevel < 5 ? currentLevel + 1 : 5; 
}

// Збереження прогресу з відправкою події в PostHog
async function saveCardProgress(cardId, currentLevel, isCorrect, db) {
    const newLevel = calculateNextLevel(currentLevel, isCorrect);
    
    // ВІДСТЕЖЕННЯ: Користувач відповів на картку
    posthog.capture('card_answered', {
        card_id: cardId,
        was_correct: isCorrect,
        old_level: currentLevel,
        new_level: newLevel
    });

    await db.updateLevel(cardId, newLevel);
    return newLevel;
}

export { calculateNextLevel, saveCardProgress };