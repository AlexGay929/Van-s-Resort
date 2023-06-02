
// + - button
function incrementAdult() {
    let value = parseInt(document.getElementById('adults').value, 10);
    value = isNaN(value) ? 1 : value;
    value++;
    document.getElementById('adults').value = value;
  }
  
  function decrementAdult() {
    let value = parseInt(document.getElementById('adults').value, 10);
    value = isNaN(value) ? 1 : value;
    value--;
    document.getElementById('adults').value = value < 1 ? 1 : value;
  }

// calendar getting values and submit button
const checkBtn = document.querySelector("#checkBtn");
const todayDateInput = document.querySelector("#start-date");
const today = new Date();
const todayDate = today.toISOString().substr(0, 10);

todayDateInput.value = todayDate;


const tomorrow = new Date(today);
tomorrow.setDate(today.getDate()+1);

const myDate = document.getElementById("end-date");
const yyyy = tomorrow.getFullYear();
const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
const dd = String(tomorrow.getDate()).padStart(2, '0');
const dateStr = yyyy + '-' + mm + '-' + dd;
myDate.value = dateStr;


function checkAvail(e) {
  e.preventDefault();
  const checkIn = document.getElementById('start-date');
  const checkinDate = checkIn.value;
  console.log(checkinDate);

  const checkOut = document.getElementById('end-date');
  const checkoutDate = checkOut.value;
  console.log(checkoutDate);
}

// store data to session storage
let storeDataFnc1 = document.querySelector("#checkBtn1");
let storeDataFnc2 = document.querySelector("#checkBtn2");

storeDataFnc1.addEventListener("click", storeData);
storeDataFnc2.addEventListener("click", storeData);

function storeData() {
let startDate = document.querySelector("#start-date");
let endDate = document.querySelector("#end-date");
let adultsNum = document.querySelector("#adults");

sessionStorage.setItem('start-date',startDate.value);
sessionStorage.setItem('end-date',endDate.value);
sessionStorage.setItem('adults-num',adultsNum.value);

}
