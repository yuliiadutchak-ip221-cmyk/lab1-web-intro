const apiButton = document.getElementById("apiButton");
const apiOutput = document.getElementById("apiOutput");

async function requestDemoApi() {
  apiOutput.textContent = "Виконуємо запит…";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    apiOutput.textContent = JSON.stringify(payload, null, 2);
  } catch (error) {
    apiOutput.textContent = `Помилка запиту: ${error.message}`;
  }
}

apiButton?.addEventListener("click", requestDemoApi);
