// tests/flashcard.spec.js
const { test, expect } = require('@playwright/test');

test('E2E: Успішне перевертання флеш-картки в режимі навчання', async ({ page }) => {
    // 1. Заходимо на умовну сторінку нашого застосунку
    // (Playwright може тестувати навіть локальні файли або заглушки)
    await page.setContent(`
        <div class="flashcard" style="cursor: pointer;" onclick="
            document.querySelector('.front').style.display = 'none';
            document.querySelector('.back').style.display = 'block';
        ">
            <div class="front">Що таке машинне навчання?</div>
            <div class="back" style="display: none;">Підклас ШІ, що вивчає методи...</div>
        </div>
    `);

    // 2. Знаходимо картку і перевіряємо, чи видно запитання
    const flashcard = page.locator('.flashcard');
    await expect(flashcard.locator('.front')).toBeVisible();
    await expect(flashcard.locator('.front')).toContainText('Що таке машинне навчання?');

    // 3. Імітуємо клік користувача по картці
    await flashcard.click();

    // 4. Перевіряємо, чи перевернулась картка (чи з'явилась відповідь)
    await expect(flashcard.locator('.back')).toBeVisible();
    await expect(flashcard.locator('.back')).toContainText('Підклас ШІ');
});