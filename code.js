const form = document.querySelector("form");
const result = document.querySelector("#result");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const day = Number(document.querySelector("#day").value);
  const month = Number(document.querySelector("#month").value);
  const year = Number(document.querySelector("#year").value);
  const gender = document.querySelector("#gender").value;
  
  if (day === "" || month === "" || year === "" || gender === "") {
    alert("Please fill in all fields.");
    return;
  }

  if (day < 1 || day > 31) {
    alert("Day must be between 1 and 31.");
    return;
  }

  if (month < 1 || month > 12) {
    alert("Month must be between 1 and 12.");
    return;
  }

  if (year.length !== 4) {
    alert("Please enter a valid 4-digit year.");
    return;
  }

  const CC = Math.floor(year / 100);
  const YY = year % 100;

  const dayOfTheWeek =
    (Math.floor(CC / 4) -
      2 * CC -
      1 +
      Math.floor((5 * YY) / 4) +
      Math.floor((26 * (month + 1)) / 10) +
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

  result.textContent = `You were born on ${days[correctedDay]}. In Akan culture your name is  ${akanName}.`;
});
