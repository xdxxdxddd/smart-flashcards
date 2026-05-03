// tests/studyLogic.test.js
const { calculateNextLevel, saveCardProgress } = require('../src/studyLogic');

describe('Бізнес-логіка: Інтервальне повторення карток', () => {
    
    // Тест 1 (Assertion)
    test('повинен підвищувати рівень на 1, якщо відповідь правильна', () => {
        expect(calculateNextLevel(1, true)).toBe(2);
    });

    // Тест 2 (Assertion)
    test('не повинен підвищувати рівень вище 5', () => {
        expect(calculateNextLevel(5, true)).toBe(5);
    });

    // Тест 3 (Assertion)
    test('повинен скидати рівень до 1, якщо відповідь неправильна', () => {
        expect(calculateNextLevel(3, false)).toBe(1);
    });

    // Тест 4 (Assertion - перевірка обробки винятків)
    test('повинен викидати помилку, якщо передано невалідний рівень', () => {
        expect(() => calculateNextLevel(6, true)).toThrow("Рівень має бути від 1 до 5");
    });

    // Тест 5 (Використання Mock-об'єкта для ізоляції бази даних)
    test('saveCardProgress повинен викликати db.updateLevel з правильними аргументами', async () => {
        // Створюємо Mock-об'єкт замість реальної бази даних MongoDB
        const mockDb = {
            updateLevel: jest.fn() // Створюємо "шпигуна" (Mock)
        };

        const cardId = "card_123";
        const currentLevel = 2;
        const isCorrect = true;

        await saveCardProgress(cardId, currentLevel, isCorrect, mockDb);

        // Перевіряємо, чи викликалась фіктивна БД і чи правильні дані їй передали
        expect(mockDb.updateLevel).toHaveBeenCalledTimes(1);
        expect(mockDb.updateLevel).toHaveBeenCalledWith("card_123", 3);
    });
});