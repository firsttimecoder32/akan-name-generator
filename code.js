const form = document.querySelector("form");
const result = document.querySelector("#result");

const form = document.querySelector("form");
const result = document.querySelector("#result");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // GET RAW VALUES FIRST (strings)
  const dayInput = document.querySelector("#day").value;
  const monthInput = document.querySelector("#month").value;
  const yearInput = document.querySelector("#year").value;
  const gender = document.querySelector("#gender").value;

  // EMPTY CHECK (works now)
  if (
    dayInput === "" ||
    monthInput === "" ||
    yearInput === "" ||
    gender === ""
  ) {
    alert("Please fill in all fields.");
    return;
  }

  // CONVERT AFTER VALIDATION
  const day = Number(dayInput);
  const month = Number(monthInput);
  const year = Number(yearInput);

  // VALIDATIONS
  if (day < 1 || day > 31) {
    alert("Day must be between 1 and 31.");
    return;
  }

  if (month < 1 || month > 12) {
    alert("Month must be between 1 and 12.");
    return;
  }

  if (yearInput.length !== 4) {
    alert("Please enter a valid 4-digit year.");
    return;
  }

  // ADJUST JAN & FEB (important for formula)
  let adjustedMonth = month;
  let adjustedYear = year;

  if (month === 1 || month === 2) {
    adjustedMonth = month + 12;
    adjustedYear = year - 1;
  }

  const CC = Math.floor(adjustedYear / 100);
  const YY = adjustedYear % 100;

  const dayOfTheWeek =
    (Math.floor(CC / 4) -
      2 * CC -
      1 +
      Math.floor((5 * YY) / 4) +
      Math.floor((26 * (adjustedMonth + 1)) / 10) +
      day) %
    7;

  const correctedDay = (dayOfTheWeek + 7) % 7;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const maleNames = [
    "Kwasi",
    "Kwadwo",
    "Kwabena",
    "Kwaku",
    "Yaw",
    "Kofi",
    "Kwame",
  ];

  const femaleNames = [
    "Akosua",
    "Adwoa",
    "Abenaa",
    "Akua",
    "Yaa",
    "Afua",
    "Ama",
  ];

  let akanName;

  if (gender === "male") {
    akanName = maleNames[correctedDay];
  } else {
    akanName = femaleNames[correctedDay];
  }

  result.textContent = `You were born on ${days[correctedDay]}. In Akan culture your name is ${akanName}.`;
});
