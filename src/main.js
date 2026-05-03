// Отримуємо значення з файлу .env через спеціальний об'єкт Vite
const appStatus = import.meta.env.VITE_APP_STATUS;

// Виводимо статус у консоль (для дебагу)
console.log("Поточний статус застосунку:", appStatus);

// Виводимо статус прямо на сторінку
const statusElement = document.getElementById('env-status');
if (statusElement) {
    statusElement.innerText = `Режим: ${appStatus}`;
    
    // Додамо трохи кольору для наочності
    statusElement.style.color = appStatus === 'Production Mode' ? 'green' : 'orange';
}