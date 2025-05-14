const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

function showError(input, message) {
  const small = input.nextElementSibling;
  small.innerText = message;
  small.style.display = "block";
  input.style.borderColor = "red";
}

function clearError(input) {
  const small = input.nextElementSibling;
  small.innerText = "";
  small.style.display = "none";
  input.style.borderColor = "#ccc";
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  let valid = true;

  if (nameInput.value.trim() === "") {
    showError(nameInput, "Name is required.");
    valid = false;
  } else {
    clearError(nameInput);
  }

  if (!validateEmail(emailInput.value)) {
    showError(emailInput, "Enter a valid email.");
    valid = false;
  } else {
    clearError(emailInput);
  }

  if (messageInput.value.trim().length < 10) {
    showError(messageInput, "Message must be at least 10 characters.");
    valid = false;
  } else {
    clearError(messageInput);
  }

  if (valid) {
    emailjs.send("service_wqfqron", "template_wtssgqf", {
      from_name: nameInput.value,
      from_email: emailInput.value,
      message: messageInput.value
    }).then(() => {
      alert("Message sent successfully!");
      form.reset();
    }).catch((err) => {
      alert("Failed to send message. Please try again.");
      console.error("EmailJS Error:", err);
    });
  }
});

// Real-time validation
[nameInput, emailInput, messageInput].forEach(input => {
  input.addEventListener("input", () => {
    if (input === emailInput && !validateEmail(input.value)) {
      showError(input, "Enter a valid email.");
    } else if (input === messageInput && input.value.trim().length < 10) {
      showError(input, "Message must be at least 10 characters.");
    } else if (input.value.trim() === "") {
      showError(input, `${input.name} is required.`);
    } else {
      clearError(input);
    }
  });
});
