// state
let isFormValid = false;
let isNameValid = false;
let isEmaiValid = false;
let isMobileValid = false;
let users = [
  { name: "Bart Simpson", email: "bart@simpsons.com", mobile: "1234567890" },
];
let isNameSortAscending = true;

// elements
const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const submitButton = document.querySelector("button[type='submit']");
const error = document.querySelector(".error");
const tableHeadName = document.querySelector("#table-name");
const tableBody = document.querySelector("tbody");

// listeners
form.addEventListener("submit", handleSubmit);
inputs.forEach((input) => input.addEventListener("input", handleValidation));
inputs.forEach((input) => input.addEventListener("blur", handleValidation));
tableHeadName.addEventListener("click", handleSortByName);

// functions
function handleSubmit(event) {
  event.preventDefault();
  const newUser = {};
  inputs.forEach((input) => {
    newUser[input.id] = input.value;
  });
  addUser(newUser);
}

function handleValidation(event) {
  const { id, value } = event.target;

  switch (id) {
    case "name":
      validateName(value);
      break;
    case "email":
      validateEmail(value);
      break;
    case "mobile":
      validateMobile(value);
      break;
  }
}

function validateForm() {
  isFormValid = isNameValid && isEmaiValid && isMobileValid;
  handleErrorDisplay();
  isFormValid ? enableSubmit() : disableSubmit();
}

function validateName(val) {
  //  only alpha chars and space and at least 3 char long
  const regex = /^[a-zA-Z ]*$/;
  isNameValid = regex.test(val) && val.length >= 3;
  isNameValid ? removeFieldError("name") : addFieldError("name");
  validateForm();
}

function validateEmail(val) {
  // include @ symbol and . in suffix and starts with alpha char
  const hasAlphaCharFirst = /[a-zA-z]/.test(val.charAt(0));
  const includesAtSymbol = val.includes("@");
  const hasDomain = includesAtSymbol && val.split("@")[1].includes(".");
  isEmaiValid = hasAlphaCharFirst && includesAtSymbol && hasDomain;
  isEmaiValid ? removeFieldError("email") : addFieldError("email");

  validateForm();
}

function validateMobile(val) {
  //only numbers and ten digits long
  const regex = /^[0-9]*$/;
  isMobileValid = regex.test(val) && val.length === 10;
  isMobileValid ? removeFieldError("mobile") : addFieldError("mobile");
  validateForm();
}

function disableSubmit() {
  submitButton.disabled = true;
}

function enableSubmit() {
  submitButton.disabled = false;
}

function handleErrorDisplay() {
  isFormValid
    ? error.classList.add("hidden")
    : error.classList.remove("hidden");
}

function addFieldError(field) {
  element = document.querySelector(`input#${field}`);
  element.parentElement.classList.add("error");
}

function removeFieldError(field) {
  element = document.querySelector(`input#${field}`);
  element.parentElement.classList.remove("error");
}

function addUser(user) {
  users.push(user);

  sortUsers();
}
function sortUsers() {
  const oldUsers = [...users];

  let newUsers;
  newUsers = oldUsers.sort((a, b) => {
    if (a.name > b.name) return isNameSortAscending ? -1 : 1;
    if (a.name < b.name) return isNameSortAscending ? 1 : -1;
    return 0;
  });

  users = newUsers;
  updateTable();
}

function handleSortByName() {
  console.log("handleSortByName");
  isNameSortAscending = !isNameSortAscending;
  sortUsers();
}

function updateTable() {
  const newTableBody = users
    .map((user) => {
      return `<tr><td>${user.name}</td><td>${user.email}</td><td>${user.mobile}</td></tr>`;
    })
    .join("");
  tableBody.innerHTML = newTableBody;
}
