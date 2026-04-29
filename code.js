// Get the form and the place where the result will be displayed
const form = document.querySelector("form");
const result = document.querySelector("#result");

// Listen for when the user submits the form
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from refreshing

  // Get what the user typed/selected (these come as STRINGS first)
  const dayInput = document.querySelector("#day").value;
  const monthInput = document.querySelector("#month").value;
  const yearInput = document.querySelector("#year").value;
  const gender = document.querySelector("#gender").value;

  // Check if the user left anything empty
  if (
    dayInput === "" ||
    monthInput === "" ||
    yearInput === "" ||
    gender === ""
  ) {
    alert("Please fill in all fields.");
    return; // stop the code here if something is missing
  }

  // Convert the inputs into numbers AFTER checking they are not empty
  const day = Number(dayInput);
  const month = Number(monthInput);
  const year = Number(yearInput);

  // Check if day is valid
  if (day < 1 || day > 31) {
    alert("Day must be between 1 and 31.");
    return;
  }

  // Check if month is valid
  if (month < 1 || month > 12) {
    alert("Month must be between 1 and 12.");
    return;
  }

  // Check if year has exactly 4 digits
  if (yearInput.length !== 4) {
    alert("Please enter a valid 4-digit year.");
    return;
  }

  // Adjust January and February for the formula
  // (the formula treats them as part of the previous year)
  let adjustedMonth = month;
  let adjustedYear = year;

  if (month === 1 || month === 2) {
    adjustedMonth = month + 12; // Jan → 13, Feb → 14
    adjustedYear = year - 1; // move to previous year
  }

  // Split the year into:
  // CC = century (e.g. 20 from 2026)
  // YY = year within the century (e.g. 26)
  const CC = Math.floor(adjustedYear / 100);
  const YY = adjustedYear % 100;

  // Zeller’s formula to calculate the day number (0–6)
  const dayOfTheWeek =
    (Math.floor(CC / 4) -
      2 * CC -
      1 +
      Math.floor((5 * YY) / 4) +
      Math.floor((26 * (adjustedMonth + 1)) / 10) +
      day) %
    7;

  // Fix negative results so they fall between 0–6
  const correctedDay = (dayOfTheWeek + 7) % 7;

  // Array of days (index matches the number we got)
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Akan names for males
  const maleNames = [
    "Kwasi",
    "Kwadwo",
    "Kwabena",
    "Kwaku",
    "Yaw",
    "Kofi",
    "Kwame",
  ];

  // Akan names for females
  const femaleNames = [
    "Akosua",
    "Adwoa",
    "Abenaa",
    "Akua",
    "Yaa",
    "Afua",
    "Ama",
  ];

  // Decide which name to use based on gender
  let akanName;

  if (gender === "male") {
    akanName = maleNames[correctedDay];
  } else {
    akanName = femaleNames[correctedDay];
  }

  // Display the final result on the page
  result.textContent = `You were born on ${days[correctedDay]}. In Akan culture your name is ${akanName}.`;
});
