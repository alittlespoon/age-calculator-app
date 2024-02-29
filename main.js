// display variables
let displayDay = document.querySelector(".days-result");
let displayMonth = document.querySelector(".months-result");
let displayYear = document.querySelector(".years-result");

// get current date
const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth() + 1;
let currentDay = today.getDate();

// submit button
let btn = document.querySelector(".calculator__btn");

// clear input when page reloads
window.onload = function () {
  let inputs = document.querySelectorAll("input");
  for (let input of inputs) {
    input.value = "";
  }
};

// calculate how many days in month
function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

// validate input values
function validate() {
  let inputs = document.querySelectorAll("input");

  let isValid = true;
  let invalidCount = 0;

  // variables for getDaysInMonth() function
  let inputYear = document.querySelector(".input-year").value;
  let inputMonth = document.querySelector(".input-month").value;

  for (let input of inputs) {
    let wrapper = input.parentElement;
    let inputValue = parseInt(input.value, 10);
    let feedback = wrapper.querySelector(".input-feedback");

    if (!input.value) {
      isValid = false;
      wrapper.classList.add("invalid");
      wrapper.querySelector(".input-feedback").innerText =
        "This field is required";
    }
    // check if day is valid
    else if (
      input.classList.contains("input-day") &&
      (inputValue > getDaysInMonth(inputYear, inputMonth) || inputValue <= 0)
    ) {
      isValid = false;
      wrapper.classList.add("invalid");
      feedback.innerText = "Must be a valid day";
      invalidCount++;
    }
    // check if month is between 1 & 12
    // but also not a future month if inputted year is same as current year
    else if (
      input.classList.contains("input-month") &&
      (inputValue <= 0 ||
        inputValue > 12 ||
        (inputYear == currentYear && inputValue > currentMonth))
    ) {
      isValid = false;
      wrapper.classList.add("invalid");
      feedback.innerText = feedback.dataset.originalText;
      invalidCount++;
    }
    // check if year is less than current year
    else if (
      input.classList.contains("input-year") &&
      (inputValue <= 0 || inputValue > currentYear)
    ) {
      isValid = false;
      wrapper.classList.add("invalid");
      feedback.innerText = feedback.dataset.originalText;
      invalidCount++;
    }
    // remove invalid class is input values are valid
    else {
      wrapper.classList.remove("invalid");
    }
  }

  // if all 3 inputs are invalid
  // show 'Must be a correct date' message
  if (invalidCount === 3) {
    for (let input of inputs) {
      let wrapper = input.parentElement;
      wrapper.classList.add("invalid");
      if (input.classList.contains("input-day"))
        wrapper.querySelector(".input-feedback").innerText =
          "Must be a correct date";
      if (
        input.classList.contains("input-month") ||
        input.classList.contains("input-year")
      ) {
        wrapper.querySelector(".input-feedback").innerText = "";
      }
    }
  }

  return isValid;
}

btn.addEventListener("click", function () {
  if (validate()) {
    // input variables
    let inputDay = parseInt(document.querySelector(".input-day").value, 10);
    let inputMonth = parseInt(document.querySelector(".input-month").value, 10);
    let inputYear = parseInt(document.querySelector(".input-year").value);

    // calculate age, month, day
    let day = currentDay - inputDay;
    let month = currentMonth - inputMonth;
    let year = currentYear - inputYear;

    // adjust for negative results
    if (day < 0) {
      let lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      day += lastMonth.getDate();
      month--;
    }
    if (month < 0) {
      month += 12;
      year--;
    }

    // display results
    displayYear.innerText = year;
    displayMonth.innerText = month;
    displayDay.innerText = day;
  } else {
    displayYear.innerText = "--";
    displayMonth.innerText = "--";
    displayDay.innerText = "--";
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    btn.click();
  }
});
