/* ==========scroll secions active link========= */
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('nav-link');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navlinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('nav-link[href*=' + id + ']').classList.add('active');
            })
        };
    })

  }

//Fetch Data From Session Storage of index
const startDate = sessionStorage.getItem('start-date');
const endDate = sessionStorage.getItem('end-date');
const adultsNum = sessionStorage.getItem('adults-num');
console.log(startDate)
console.log(endDate)
console.log(adultsNum)

const result1 = document.getElementById('start-date');
result1.setAttribute('value', startDate);

const result2 = document.getElementById('end-date');
result2.setAttribute('value', endDate);

const result3 =document.getElementById('adults');
result3.setAttribute('value', adultsNum);

// +/-
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
  

// 3 button function
let package1Fnc = document.querySelector("#package1Btn");
let package2Fnc = document.querySelector("#package2Btn");
let package3Fnc = document.querySelector("#package3Btn");

package1Fnc.addEventListener("click",package1Btn);
package2Fnc.addEventListener("click",package2Btn);
package3Fnc.addEventListener("click",package3Btn);

const today = new Date();
const todayDate = today.toISOString().substr(0, 10);

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate()+1);

const yyyy = tomorrow.getFullYear();
const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
const dd = String(tomorrow.getDate()).padStart(2, '0');
const dateStr = yyyy + '-' + mm + '-' + dd;

let billArray = [];

// PACKAGE 1 BTN
  function package1Btn() {
    const checkIn = new Date (document.querySelector("#start-date").value);

    const checkOut = new Date (document.querySelector("#end-date").value);

    // Calculate the number of days between the check-in and check-out dates
    const timeDifference = checkOut.getTime() - checkIn.getTime();
    const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    // Use an if statement to check if the number of days is exactly 5
    if (numberOfDays < 5 || numberOfDays > 5) {
     alert("Error: The tour package must be exactly 5 days long.");
    } else {
      let adults = document.querySelector("#adults").value;
      let packageTypes = "Tour Package 1";

    let checkinDate = new Date(document.getElementById("start-date").value);
    checkinDate.setDate(checkinDate.getDate() + "");
    let checkoutDate = new Date(document.getElementById("end-date").value);
    checkoutDate.setDate(checkoutDate.getDate() + "");
    let dateToday = new Date(todayDate);
   
    let diffDate = checkoutDate - checkinDate;
    let diffDays = diffDate / 86400000;
    
    const originalPrice = 47500;

    // Define the discount rate and calculate the discount amount
    const discountRate = 0.1;
    const discountAmount = originalPrice * discountRate;

    // Calculate the discounted price
    const discountedPrice = originalPrice - discountAmount;


    // Calculate the final price
    const finalPrice = discountedPrice;
  

    let dateCheck = checkinDate - dateToday;

    if (diffDate > 0  && dateCheck >= 0) {
    let bill = {
      checkIn: checkIn,
      checkOut: checkOut,
      numDays: diffDays,
      adults: adults,
      packageTypes: packageTypes,
      finalPrice: finalPrice,
    };

    let dataArray = JSON.parse(sessionStorage.getItem('dataArray')) || [];
    dataArray.push(bill);
    sessionStorage.setItem('dataArray', JSON.stringify(dataArray));

    billArray.push(bill);

    let billDiv = document.createElement("div");
    let packageType = document.createElement("input");
    let packagePrice = document.createElement("input");
    let checkInDis = document.createElement("input");
    let checkOutDis = document.createElement("input");
    let daysNum = document.createElement("input");
    // let roomNum = document.createElement("input");
    let adultNum = document.createElement("input");
    let delButton = document.createElement("button");
    let totalPrice = document.createElement("input");
    let lessPrice = document.createElement("input");


    billDiv.classList.add("bill-div");
    packageType.classList.add("package-type");
    packagePrice.classList.add("package-price1");
    checkInDis.classList.add("checkIn-Dis");
    checkOutDis.classList.add("checkOut-Dis");
    daysNum.classList.add("days-num");
    adultNum.classList.add("adult-num");
    delButton.classList.add("del-button");
    totalPrice.classList.add("total-price");
    lessPrice.classList.add("less-price");

    packageType.setAttribute("disabled", "");
    packagePrice.setAttribute("disabled", "");
    checkInDis.setAttribute("disabled", "");
    checkOutDis.setAttribute("disabled", "");
    daysNum.setAttribute("disabled", "");
    adultNum.setAttribute("disabled", "");
    totalPrice.setAttribute("disabled", "");
    lessPrice.setAttribute("disabled", "");
    delButton.textContent = "Delete";

    summaryBill.appendChild(billDiv);
    billDiv.appendChild(packageType);
    billDiv.appendChild(packagePrice);
    billDiv.appendChild(checkInDis);
    billDiv.appendChild(checkOutDis);
    billDiv.appendChild(daysNum);
    billDiv.appendChild(adultNum);
    billDiv.appendChild(lessPrice);
    billDiv.appendChild(delButton);       

    packageType.setAttribute("value","Package Type: Tour Package 1" );
    packagePrice.setAttribute("value","Package Price: Php 47,500" );
    checkInDis.setAttribute("value","Check-in: " + bill.checkIn );
    checkOutDis.setAttribute("value","Check-out: " + bill.checkOut );
    daysNum.setAttribute("value","Days: " + bill.numDays );
    adultNum.setAttribute("value","Adult(s): " + bill.adults );
    lessPrice.setAttribute("value","less 10% on Booking Online" );

    const totalBill = finalPrice;

    document.querySelector("#total").innerHTML = `${totalBill}`;

    // eventlistener
    delButton.addEventListener("click", deleteAndRefresh);

    function deleteAndRefresh(index) {
      // Get the element that displays the total price
      const totalPriceElement = document.querySelector("#total");

      // Use the remove() method to remove the element from the DOM
      totalPriceElement.remove();
      billDiv.remove();
      
      location.reload();

      billArray.splice(index, 1)[0];
      
     
  

      // let itemToDelete = sessionStorage.getItem('dataArray');
      // if (itemToDelete) {
      //   sessionStorage.removeItem('dataArray');
      // }
    }
   
  } else
    alert("Please check the Check-in and Check-out Date");
  }
    }

    

  
  // PACKAGE 2 BTN

  function package2Btn() {
    const checkIn = new Date (document.querySelector("#start-date").value);

    const checkOut = new Date (document.querySelector("#end-date").value);

    // Calculate the number of days between the check-in and check-out dates
    const timeDifference = checkOut.getTime() - checkIn.getTime();
    const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    // Use an if statement to check if the number of days is exactly 3
    if (numberOfDays < 3 || numberOfDays > 3) {
     alert("Error: The tour package must be exactly 3 days long.");
    } else {
      let adults = document.querySelector("#adults").value;
      let packageTypes = "Tour Package 2";

    let checkinDate = new Date(document.getElementById("start-date").value);
    // checkinDate.setDate(checkinDate.getDate() + "");
    let checkoutDate = new Date(document.getElementById("end-date").value);
    // checkoutDate.setDate(checkoutDate.getDate() + "");
    let dateToday = new Date(todayDate);
   
    let diffDate = checkoutDate - checkinDate;
    let diffDays = diffDate / 86400000;
    
    const originalPrice = 27500;

    // Define the discount rate and calculate the discount amount
    const discountRate = 0.1;
    const discountAmount = originalPrice * discountRate;

    // Calculate the discounted price
    const discountedPrice = originalPrice - discountAmount;


    // Calculate the final price
    const finalPrice = discountedPrice;
  

    let dateCheck = checkinDate - dateToday;

    if (diffDate > 0  && dateCheck >= 0) {
    let bill = {
      checkIn: checkIn,
      checkOut: checkOut,
      numDays: diffDays,
      adults: adults,
      packageTypes: packageTypes,
      finalPrice: finalPrice,
    };

    let dataArray = JSON.parse(sessionStorage.getItem('dataArray')) || [];
    dataArray.push(bill);
    sessionStorage.setItem('dataArray', JSON.stringify(dataArray));

    billArray.push(bill);

    let billDiv = document.createElement("div");
    let packageType = document.createElement("input");
    let packagePrice = document.createElement("input");
    let checkInDis = document.createElement("input");
    let checkOutDis = document.createElement("input");
    let daysNum = document.createElement("input");
    // let roomNum = document.createElement("input");
    let adultNum = document.createElement("input");
    let delButton = document.createElement("button");
    let totalPrice = document.createElement("input");
    let lessPrice = document.createElement("input");


    billDiv.classList.add("bill-div");
    packageType.classList.add("package-type");
    packagePrice.classList.add("package-price1");
    checkInDis.classList.add("checkIn-Dis");
    checkOutDis.classList.add("checkOut-Dis");
    daysNum.classList.add("days-num");
    adultNum.classList.add("adult-num");
    delButton.classList.add("del-button");
    totalPrice.classList.add("total-price");
    lessPrice.classList.add("less-price");

    packageType.setAttribute("disabled", "");
    packagePrice.setAttribute("disabled", "");
    checkInDis.setAttribute("disabled", "");
    checkOutDis.setAttribute("disabled", "");
    daysNum.setAttribute("disabled", "");
    adultNum.setAttribute("disabled", "");
    totalPrice.setAttribute("disabled", "");
    lessPrice.setAttribute("disabled", "");
    delButton.textContent = "Delete";

    summaryBill.appendChild(billDiv);
    billDiv.appendChild(packageType);
    billDiv.appendChild(packagePrice);
    billDiv.appendChild(checkInDis);
    billDiv.appendChild(checkOutDis);
    billDiv.appendChild(daysNum);
    billDiv.appendChild(adultNum);
    billDiv.appendChild(lessPrice);
    billDiv.appendChild(delButton);       

    packageType.setAttribute("value","Package Type: Tour Package 2" );
    packagePrice.setAttribute("value","Package Price: Php 27,500" );
    checkInDis.setAttribute("value","Check-in: " + bill.checkIn );
    checkOutDis.setAttribute("value","Check-out: " + bill.checkOut );
    daysNum.setAttribute("value","Days: " + bill.numDays );
    adultNum.setAttribute("value","Adult(s): " + bill.adults );
    lessPrice.setAttribute("value","less 10% on Booking Online" );

    const totalBill = finalPrice;

    document.querySelector("#total").innerHTML = `${totalBill}`;

    // eventlistener
    delButton.addEventListener("click", deleteAndRefresh);

    function deleteAndRefresh(index) {
      // Get the element that displays the total price
      const totalPriceElement = document.querySelector("#total");

      // Use the remove() method to remove the element from the DOM
      totalPriceElement.remove();
      billDiv.remove();
      
      location.reload();

      billArray.splice(index, 1)[0];
      
     
  

      // let itemToDelete = sessionStorage.getItem('dataArray');
      // if (itemToDelete) {
      //   sessionStorage.removeItem('dataArray');
      // }
    }
   
  } else
    alert("Please check the Check-in and Check-out Date");
  }
    }

  
  // PACKAGE 3 BTN

  function package3Btn() {
    const checkIn = new Date (document.querySelector("#start-date").value);

    const checkOut = new Date (document.querySelector("#end-date").value);

    // Calculate the number of days between the check-in and check-out dates
    const timeDifference = checkOut.getTime() - checkIn.getTime();
    const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    // Use an if statement to check if the number of days is exactly 2
    if (numberOfDays < 2 || numberOfDays > 3) {
     alert("Error: The tour package must be exactly 2 days long.");
    } else {
      let adults = document.querySelector("#adults").value;
      let packageTypes = "Tour Package 3";

    let checkinDate = new Date(document.getElementById("start-date").value);
    checkinDate.setDate(checkinDate.getDate() + "");
    let checkoutDate = new Date(document.getElementById("end-date").value);
    checkoutDate.setDate(checkoutDate.getDate() + "");
    let dateToday = new Date(todayDate);
   
    let diffDate = checkoutDate - checkinDate;
    let diffDays = diffDate / 86400000;
    
    const originalPrice = 17500;

    // Define the discount rate and calculate the discount amount
    const discountRate = 0.1;
    const discountAmount = originalPrice * discountRate;

    // Calculate the discounted price
    const discountedPrice = originalPrice - discountAmount;


    // Calculate the final price
    const finalPrice = discountedPrice;
  

    let dateCheck = checkinDate - dateToday;

    if (diffDate > 0  && dateCheck >= 0) {
    let bill = {
      checkIn: checkIn,
      checkOut: checkOut,
      numDays: diffDays,
      adults: adults,
      packageTypes: packageTypes,
      finalPrice: finalPrice,
    };

    let dataArray = JSON.parse(sessionStorage.getItem('dataArray')) || [];
    dataArray.push(bill);
    sessionStorage.setItem('dataArray', JSON.stringify(dataArray));

    billArray.push(bill);

    let billDiv = document.createElement("div");
    let packageType = document.createElement("input");
    let packagePrice = document.createElement("input");
    let checkInDis = document.createElement("input");
    let checkOutDis = document.createElement("input");
    let daysNum = document.createElement("input");
    // let roomNum = document.createElement("input");
    let adultNum = document.createElement("input");
    let delButton = document.createElement("button");
    let totalPrice = document.createElement("input");
    let lessPrice = document.createElement("input");


    billDiv.classList.add("bill-div");
    packageType.classList.add("package-type");
    packagePrice.classList.add("package-price1");
    checkInDis.classList.add("checkIn-Dis");
    checkOutDis.classList.add("checkOut-Dis");
    daysNum.classList.add("days-num");
    adultNum.classList.add("adult-num");
    delButton.classList.add("del-button");
    totalPrice.classList.add("total-price");
    lessPrice.classList.add("less-price");

    packageType.setAttribute("disabled", "");
    packagePrice.setAttribute("disabled", "");
    checkInDis.setAttribute("disabled", "");
    checkOutDis.setAttribute("disabled", "");
    daysNum.setAttribute("disabled", "");
    adultNum.setAttribute("disabled", "");
    totalPrice.setAttribute("disabled", "");
    lessPrice.setAttribute("disabled", "");
    delButton.textContent = "Delete";

    summaryBill.appendChild(billDiv);
    billDiv.appendChild(packageType);
    billDiv.appendChild(packagePrice);
    billDiv.appendChild(checkInDis);
    billDiv.appendChild(checkOutDis);
    billDiv.appendChild(daysNum);
    billDiv.appendChild(adultNum);
    billDiv.appendChild(lessPrice);
    billDiv.appendChild(delButton);       

    packageType.setAttribute("value","Package Type: Tour Package 3" );
    packagePrice.setAttribute("value","Package Price: Php 17,500" );
    checkInDis.setAttribute("value","Check-in: " + bill.checkIn );
    checkOutDis.setAttribute("value","Check-out: " + bill.checkOut );
    daysNum.setAttribute("value","Days: " + bill.numDays );
    adultNum.setAttribute("value","Adult(s): " + bill.adults );
    lessPrice.setAttribute("value","less 10% on Booking Online" );

    const totalBill = finalPrice;

    document.querySelector("#total").innerHTML = `${totalBill}`;

     // eventlistener
     delButton.addEventListener("click", deleteAndRefresh);

     function deleteAndRefresh(index) {
       // Get the element that displays the total price
       const totalPriceElement = document.querySelector("#total");
 
       // Use the remove() method to remove the element from the DOM
       totalPriceElement.remove();
       billDiv.remove();
       
       location.reload();
 
       billArray.splice(index, 1)[0];
       
      
   
 
       // let itemToDelete = sessionStorage.getItem('dataArray');
       // if (itemToDelete) {
       //   sessionStorage.removeItem('dataArray');
       // }
     }
   
  } else
    alert("Please check the Check-in and Check-out Date");
  }
    }

  

