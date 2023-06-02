let dataForm = document.querySelector("#dataForm");
let firstNameInput = document.querySelector("#fName");
let lastNameInput = document.querySelector("#lName");
let emailInput = document.querySelector("#emailInput");
let phoneInput = document.querySelector("#contactNumber");
let addressInput = document.querySelector("#address");

dataForm.addEventListener("submit", function(event) {
  event.preventDefault();

  if (firstNameInput.value === "") {
    alert("Please enter your first name.");
    return false;
  }

  if (lastNameInput.value === "") {
    alert("Please enter your last name.");
    return false;
  }

  if (emailInput.value === "") {
    alert("Please enter your email address.");
    return false;
  }

  if (phoneInput.value === "") {
    alert("Please enter your cellphone number.");
    return false;
  }

  if (addressInput.value === "") {
    alert("Please enter your address.");
    return false;
  }

  if (!isValidEmail(emailInput.value)) {
    alert("Please enter a valid email address.");
    return false;
  }

  if (!isValidPhone(phoneInput.value)) {
    alert("Please enter a valid cellphone number.");
    return false;
  }

  window.location.href="success.html"

  form.submit();
});

function isValidEmail(email) {
  const emailRegex = /^\w+([\.]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^\d{11}$/;
  return phoneRegex.test(phone);
}


