import { createApp } from 'vue';
import App from './App.vue';
import posthog from 'posthog-js';
import * as Sentry from "@sentry/vue";
import { saveCardProgress } from './studyLogic';

const app = createApp(App);

// 1. Ініціалізація PostHog (ЛР №5)
posthog.init('phc_vSZj3ZXDo6uw2FJFjRLNj9Fs5LiEyZ4BZTzXndxGwXFa', {
    api_host: 'https://eu.i.posthog.com',
    person_profiles: 'identified_only'
});

// 2. Ініціалізація Sentry (ЛР №6) [cite: 74, 76]
Sentry.init({
    app,
    // Твій унікальний DSN ключ
    dsn: "https://c5c7dc9e366a06383a92ddaa409cb8b1@o4511370464067584.ingest.de.sentry.io/4511370472063056",
    
    // Інтеграції для спостережуваності (Observability) [cite: 82, 83]
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
    ],

    // Моніторинг продуктивності: записуємо 100% транзакцій для тесту [cite: 84, 86]
    tracesSampleRate: 1.0,
    
    // Налаштування запису сесій (Replay)
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    // Розділення середовищ [cite: 87, 88]
    environment: "development",
    sendDefaultPii: true, 
});

// 3. Ідентифікація користувача в Sentry (Крок 3) [cite: 337, 338]
Sentry.setUser({
    id: "12345",
    email: "yarushak.b@lpnu.ua", // Твоя пошта для звіту [cite: 341]
    segment: "premium_user"
});

// --- Логіка застосунку (твій старий код) ---

let cardData = {
    id: "card_lab5_001",
    level: 1
};

function updateUI(newLevel) {
    const levelElement = document.getElementById('current-level');
    if (levelElement) {
        levelElement.innerText = newLevel;
    }
    cardData.level = newLevel;
}

const mockDb = {
    updateLevel: async (id, level) => console.log(`[БД] Оновлено: ${id} до рівня ${level}`)
};

// Обробники кнопок
document.getElementById('btn-correct')?.addEventListener('click', async () => {
    const newLevel = await saveCardProgress(cardData.id, cardData.level, true, mockDb);
    updateUI(newLevel);
    console.log("Подія 'Знаю' зафіксована");
});

document.getElementById('btn-incorrect')?.addEventListener('click', async () => {
    const newLevel = await saveCardProgress(cardData.id, cardData.level, false, mockDb);
    updateUI(newLevel);
    console.log("Подія 'Не знаю' зафіксована");
});

document.getElementById('btn-create')?.addEventListener('click', () => {
    posthog.capture('card_created', {
        type: 'new_card',
        timestamp: new Date().toISOString()
    });
    alert('Картку створено (подія відправлена)!');
});

window.throwSentryError = function() {
    console.log("Викликаю контрольовану помилку...");
    throw new Error("Sentry Test Error: Something went wrong in Smart Flashcards!");
};

// Статус застосунку
const appStatus = import.meta.env.VITE_APP_STATUS || 'Development Mode';
const statusElement = document.getElementById('env-status');
if (statusElement) {
    statusElement.innerText = `Режим: ${appStatus}`;
    statusElement.style.color = appStatus === 'Production Mode' ? 'green' : 'orange';
}

// Feature Flags (PostHog)
posthog.onFeatureFlags(() => {
    const createBtn = document.getElementById('btn-create');
    if (posthog.isFeatureEnabled('show-urgent-filter')) {
        if (createBtn) createBtn.style.display = 'inline-block';
    } else {
        if (createBtn) createBtn.style.display = 'none';
    }
});

app.mount('#app');