// API BASE URL + YOUR API KEY
// -----------------------------
// const API_KEY = "cur_live_R90dECV4pKDkdd5mPMvpkqwP1VyNgNazpJoNkoVC";
// const BASE_URL = `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}`;

// -----------------------------
// SELECT ELEMENTS
// -----------------------------
const dropdowns = document.querySelectorAll(".dropdowns select");
const btn = document.querySelector("button");
const msg = document.querySelector(".msg");

// -----------------------------
//TO MAKE DROPDOWN DYNAMIC BY ADDING MULTIPLE COUNTRY CODE
// -----------------------------
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;

    // Default values
    if (select.name === "from" && currCode === "INR") {
      option.selected = true; //ye option dropdown me pehle se select hoga.
    }
    if (select.name === "to" && currCode === "USD") {
      option.selected = true;
    }

    select.append(option);   //Har currency code ke liye ek option add hoga

  }

  // When user changes dropdown, update flag
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

// -----------------------------
// UPDATE FLAG FUNCTION
// -----------------------------
function updateFlag(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];

  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/shiny/64.png`;
}

// -----------------------------
// FETCH & UPDATE EXCHANGE RATE
// -----------------------------
btn.addEventListener("click", async (event) => {
  event.preventDefault();  // Stop form from auto-submitting and reloading the page


  let amount = document.querySelector(".amount input").value;
  let from = document.querySelector(".from select").value;
  let to = document.querySelector(".to select").value;

  if (amount === "" || amount <= 0) {
    amount = 1;
  }

  // API URL
  let url = `${BASE_URL}&base_currency=${from}`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    let rate = data.data[to].value;
    let converted = amount * rate;

    msg.innerText = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
  } catch (error) {
    msg.innerText = "Error fetching exchange rate!";
    console.log(error);
  }
});

// Load exchange rate on page load
window.addEventListener("load", () => {
  btn.click();
});