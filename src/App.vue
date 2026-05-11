<template>
  <div id="app" style="padding: 20px; font-family: sans-serif; text-align: center;">
    <h1>Smart Flashcards</h1>
    
    <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ccc; border-radius: 8px;">
      <p>Поточний рівень: <span id="current-level">1</span></p>
      <p id="env-status"></p>
    </div>

    <div style="display: flex; gap: 10px; justify-content: center; margin-bottom: 30px;">
      <button id="btn-correct" style="padding: 10px 20px; background: #22c55e; color: white; border: none; border-radius: 5px; cursor: pointer;">Знаю</button>
      <button id="btn-incorrect" style="padding: 10px 20px; background: #ef4444; color: white; border: none; border-radius: 5px; cursor: pointer;">Не знаю</button>
    </div>

    <div style="margin-bottom: 30px;">
      <button id="btn-create" style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer;">Створити картку</button>
    </div>

    <div style="border-top: 2px dashed #fbbf24; pt: 20px;">
      <h3>Технічна перевірка (Sentry)</h3>
      <button @click="throwSentryError()" style="padding: 12px 24px; background: #f59e0b; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
        Break the world
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>