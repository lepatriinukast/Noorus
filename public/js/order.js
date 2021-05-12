/* jshint esversion: 8 */

// This module contains js code that runs on the order page.


// Export a function that adds the grayout class on the price elements.

export const addGreyout = (element) => {

  // Add the class to the parent of the provided element to cover both the price and the eur sign.

  if (!element.parentNode.classList.contains("greyout")) {
    element.parentNode.classList.add("greyout");
  }
};


// Export a function that removes the grayout class on the price elements.

export const removeGreyout = (element) => {

  // Remove the class from the parent of the provided element to cover both the price and the eur sign.

  if (element.parentNode.classList.contains("greyout")) {
    element.parentNode.classList.remove("greyout");
  }
};



// Export a function which changes the item count when a plus or minus button is clicked.

export const changeCount = (element) => {

// The event could have been triggered by the button or its child element.
// Get the id attribute of the button.

  const id = element.closest(".signBtn").id;

// The id has information on whether the button represents a plus or a minus sign.
// Handle the plus sign.

  if (id.indexOf("plus") !== -1) {

    // Using the button id, get the corresponding item count element.

    let itemCount = document.getElementById("itemCount" + id.slice(7));

   // If the item count is less than maximum, augment it by one.

   if (itemCount.value < 99) {
     itemCount.value ++;
     changePrice(itemCount);
   }

    // Handle the minus sign.

  } else if (id.indexOf("minus") !== -1) {

    // Using the button id, get the corresponding item count element.

    let itemCount = document.getElementById("itemCount" + id.slice(8));

    // If the item count is more than minimum, decrease it by one.

    if (itemCount.value > 0) {
      itemCount.value --;

      changePrice(itemCount);
    }
  }
};


// Export a function, which converts the item count value into an accepted one,
// in case the inputted value is invalid.

export const validateCount = (element) => {

  // Check the inputted item count value
  // and if it is outside the allowed range, convert it back to a valid number.
  // Also make sure that the number is an integer.

  if (element.value) {
    if (element.value < 0) {
      element.value = 0;
    } else if (element.value > 99) {
      element.value = 99;
    } else {
      element.value = parseInt(element.value);
    }
  }
};


// Export a function which changes the displayed price,
// when the item count is changed.

export const changePrice = (element) => {

  // Utilise the id of the item count to get a corresponding price element.

  const price = document.getElementById("price" + element.id.slice(9));

  // The price for one item is stored in a hidden-input which can be accessed by utilising the id of the item count.

  const initialPrice = document.getElementById("hiddenPrice" + element.id.slice(9));

  // If the item count is 0, show the price for one item, but add the greyout effect.

  if (element.value == 0) {
    price.innerHTML = initialPrice.value;
    addGreyout(price);

    // Elsewise, display a new price, which is the initial price multiplied by the item count.
    // Make sure that the price doesn't have a greyout effect.

  } else {
    price.innerHTML = (initialPrice.value * element.value);
    removeGreyout(price);
  }
};


// Export a function which calculates and displays the total cost of the selected shop items.

export const calculateSum = () => {

  // Get an array of all the price elements on the page.

  const priceList = document.querySelectorAll(".price");

  // Create an empty array that will be populated by selected price elements.

  const selected = [];

  // Loop through the array of price elements and check for the classlist of their parent nodes.
  // If the greyout class is missing, it means that the corresponding price element is selected.
  // Get the inner HTML of the selected prices, convert it to a number and push it to the empty array.

  for (let i = 0; i < priceList.length; i++) {
    if (!priceList[i].parentNode.classList.contains("greyout")) {
      selected.push(Number(priceList[i].innerHTML));
    }
  }

  // If there are any selected prices, loop through them and calculate their sum.

  if (selected.length > 0) {
    const sum = selected.reduce(function(a,b) {
      return a + b;
    });

    // Display the sum.

    document.getElementById("sum").innerHTML = sum;

    // Set the value of the corresponding hidden input to be equal to the sum.

    document.getElementById("hiddenSum").value = sum;
  } else {

    // If there are no selected prices, display 0 as the total sum.

    document.getElementById("sum").innerHTML = 0;

   // Set the value of the corresponding hidden input to be an empty string.

    document.getElementById("hiddenSum").value = "";
  }
};
