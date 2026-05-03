// src/studyLogic.js

// Функція для розрахунку наступного рівня картки
function calculateNextLevel(currentLevel, isCorrect) {
    if (currentLevel < 1 || currentLevel > 5) {
        throw new Error("Рівень має бути від 1 до 5");
    }

    if (!isCorrect) return 1; // Якщо не вгадав - скидаємо на 1 рівень
    return currentLevel < 5 ? currentLevel + 1 : 5; // Підвищуємо рівень, максимум 5
}

// Функція, яка імітує збереження прогресу в Базу Даних
async function saveCardProgress(cardId, currentLevel, isCorrect, db) {
    const newLevel = calculateNextLevel(currentLevel, isCorrect);
    // Викликаємо метод бази даних (яку ми будемо мокати в тестах)
    await db.updateLevel(cardId, newLevel);
    return newLevel;
}

// Експортуємо функції, щоб їх могли бачити тести
module.exports = { calculateNextLevel, saveCardProgress };