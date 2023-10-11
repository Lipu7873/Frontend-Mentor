const inputDay = document.getElementById("day");
const labelForDay = document.querySelector(`label[for="${inputDay.id}"]`);
const warningDay = document.getElementById("warningDay");

const inputMonth = document.getElementById("month");
const labelForMonth = document.querySelector(`label[for="${inputMonth.id}"]`);
const warningMonth = document.getElementById("warningMonth");

const inputYear = document.getElementById("year");
const labelForYear = document.querySelector(`label[for="${inputYear.id}"]`);
const warningYear = document.getElementById("warningYear");

const resultDays = document.getElementById("resultDays");
const resultMonths = document.getElementById("resultMonths");
const resultYears = document.getElementById("resultYears");
const calculate = document.getElementById("calculate");


inputDay.addEventListener("input", checkDay);
inputMonth.addEventListener("input", checkMonth);
inputYear.addEventListener("input", checkYear);
calculate.addEventListener('click', handeSubmit);

let date = new Date();
let currentDay = date.getDate();
let currentMonth = date.getMonth() + 1;
let currentYear = date.getFullYear();

// const months = [31,28,31,30,31,30,31,31,30,31,30,31];

//Validate date
function checkDay() {

    const day = Number(inputDay.value);
    const month = Number(inputMonth.value);
    const year = Number(inputYear.value);
    const thirtyDaysMonths = [4, 6, 9, 11];
    let isValidDay = true;

    function checkLeapYear() {
      if ((0 == year % 4 && 0 != year % 100) || 0 == year % 400) {
        return true;
      } else {
        return false;
      }
    }

    if (day < 1 || day > 31) {
      isValidDay = false;
    } else if (thirtyDaysMonths.includes(month) && day > 30) {
      isValidDay = false;
    } else if (month === 2 && checkLeapYear(year)) {
      if (day > 29) {
        isValidDay = false;
      }
    } else if (month === 2 && !checkLeapYear(year)) {
      if (day > 28) {
        isValidDay = false;
      }
    }

    if (!isValidDay) {
      warningDay.innerText = "Must be a valid day";
      // warningDay.classList.remove("invisible");
      inputDay.classList.add("invalidInput");
      labelForDay.classList.add("text-warningRed");
    } else {
      warningDay.innerText = "";
      // warningDay.classList.add("invisible");
      inputDay.classList.remove("invalidInput");
      labelForDay.classList.remove("text-warningRed");
    }
    return day;
}

//Validate month

function checkMonth() {
  const month = Number(inputMonth.value);
  if (month < 1 || month >= 13) {
    warningMonth.innerText = "Must be a valid month";
    // warningMonth.classList.remove("invisible");
    inputMonth.classList.add("invalidInput");
    labelForMonth.classList.add("text-warningRed");
  } else {
    warningMonth.innerText = "";
    // warningMonth.classList.add("invisible");
    inputMonth.classList.remove("invalidInput");
    labelForMonth.classList.remove("text-warningRed");
  }
  return month;
}

//Validate Year

function checkYear() {
  const year = Number(inputYear.value);

  if (year < 1936 && year < currentYear) {
    warningYear.innerText = "Must be a valid year";
    // warningYear.classList.remove("invisible");
    inputYear.classList.add("invalidInput");
    labelForYear.classList.add("text-warningRed");
  } else if (year > currentYear) {
    warningYear.innerText = "Must be in the past";
    // warningYear.classList.remove("invisible");
    inputYear.classList.add("invalidInput");
    labelForYear.classList.add("text-warningRed");
  } else {
    warningYear.innerText = "";
    // warningYear.classList.add("invisible");
    inputYear.classList.remove("invalidInput");
    labelForYear.classList.remove("text-warningRed");
  }
  return year;
}

function handeSubmit(e) {
  
  e.preventDefault();

  let validDay = checkDay();
  let validMonth = checkMonth();
  let validYear = checkYear();
  let errorMessage = "";


  if (!validDay && !validMonth && !validYear) {
    errorMessage = "This field is required";
    warningDay.innerText = errorMessage;
    warningMonth.innerText = errorMessage;
    warningYear.innerText = errorMessage;
  } else if (!validDay || !validMonth || !validYear) {
    errorMessage = "Must be a valid date";
    warningDay.innerText = errorMessage;
    warningMonth.innerText = errorMessage;
    warningYear.innerText = errorMessage;
  } else if (validDay && validMonth && validYear) {
   calculateAge();   
  }
}

 function calculateAge ()
  {
    let bd = inputDay.value;
    let bm = inputMonth.value;
    let by = inputYear.value;

    let cd, cm, cy;
    cy = currentYear - by;

    if (currentMonth >= bm) {
      cm = currentMonth - bm;
    } else {
      cy--;
      cm = 12 + currentMonth - bm;
    }

    if (currentDay >= bd) {
      cd = currentDay - bd;
    } else {
      cm--;
      cd = getDaysinMonth(bd, bm) + currentDay - bd;
    }
    if (cm < 0) {
      cm = 11;
      cy--;
    }

    resultDays.innerText = cd;
    resultMonths.innerText = cm;
    resultYears.innerText = cy;
  }


  function getDaysinMonth(year, month){
    return new Date(year, month, 0).getDate();
  }