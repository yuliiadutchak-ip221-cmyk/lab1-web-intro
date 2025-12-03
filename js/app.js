const apiButton = document.getElementById("apiButton");
const apiOutput = document.getElementById("apiOutput");
const contactForm = document.getElementById("contactForm");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const formStatus = document.getElementById("formStatus");

const errorElements = {
  email: document.querySelector('.error-message[data-field="email"]'),
  phone: document.querySelector('.error-message[data-field="phone"]'),
};

async function requestDemoApi() {
  apiOutput.textContent = "Виконуємо запит...";

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

function showError(inputEl, message) {
  const field = inputEl?.id;
  if (!field) {
    return;
  }

  inputEl.classList.add("error");
  if (errorElements[field]) {
    errorElements[field].textContent = message;
  }
}

function clearError(inputEl) {
  const field = inputEl?.id;
  if (!field) {
    return;
  }

  inputEl.classList.remove("error");
  if (errorElements[field]) {
    errorElements[field].textContent = "";
  }
}

function validateEmail(value) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value.trim());
}

function validatePhone(value) {
  const phonePattern = /^\+?[0-9\s()-]{10,15}$/;
  return phonePattern.test(value.trim());
}

function validateForm() {
  let isValid = true;
  const emailValue = emailInput.value;
  const phoneValue = phoneInput.value;

  if (!validateEmail(emailValue)) {
    isValid = false;
    showError(emailInput, "Введіть коректний e-mail.");
  } else {
    clearError(emailInput);
  }

  if (!validatePhone(phoneValue)) {
    isValid = false;
    showError(
      phoneInput,
      "Телефон має містити 10-15 цифр та може починатися з '+'."
    );
  } else {
    clearError(phoneInput);
  }

  return isValid;
}

function handleFormSubmit(event) {
  event.preventDefault();

  formStatus.textContent = "Перевіряємо дані...";
  formStatus.classList.remove("success");

  const isFormValid = validateForm();

  if (isFormValid) {
    formStatus.textContent = "Дані валідні: форму можна надсилати!";
    formStatus.classList.add("success");
    contactForm.reset();
  } else {
    formStatus.textContent = "Будь ласка, виправте помилки у формі.";
  }
}

apiButton?.addEventListener("click", requestDemoApi);
contactForm?.addEventListener("submit", handleFormSubmit);
emailInput?.addEventListener("input", () => clearError(emailInput));
phoneInput?.addEventListener("input", () => clearError(phoneInput));
