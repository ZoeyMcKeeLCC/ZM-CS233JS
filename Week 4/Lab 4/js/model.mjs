/*
Code Written by Brian Bird, Modfied by Zoey McKee on 4/24/2026
AI Policy: No generate tools were used in the creation of this project
*/

export class GroceryModel {
  constructor() {
    try {
      console.log("//Retreiving groceries")
      const savedGroceries = JSON.parse(localStorage.getItem('groceries')); // array to hold groceries
      console.log("//Retreied groceries")
      console.log(savedGroceries)
      console.log(typeof savedGroceries)
      // TODO: Add a line of code that retrieves groceries from local storage into savedGroceries
      if (!Array.isArray(savedGroceries) || !this.allValid(savedGroceries)) {
        throw new Error('Invalid grocery payload');
      }
      this.groceries = savedGroceries;
    } catch (e) {
      console.log("Caught GroceryModel Exception")
      // Provide starter entries if local storage is empty/corrupt.
      this.groceries = [
        { itemName: 'Apples', quantity: '5' },
        { itemName: 'Milk', quantity: '1 gallon' }
      ];
    }
  }

  //Checks if indivdual item is valid
  isValidItem(item) {
    return (
      typeof item === 'object' &&
      item !== null &&
      typeof item.itemName === 'string' &&
      typeof item.quantity === 'string'
    );
  }

  //Iterates through groceries list and checkls if they are valid
  allValid(groceries) {
    for (let i = 0; i < groceries.length; i++) {
      if (!this.isValidItem(groceries[i])) {
        return false;
      }
    }
    return true;
  }

  //Writes to localStorage
  commit(groceries) {
    // TODO: write this method
    localStorage.setItem("groceries", JSON.stringify(groceries));

  }

  subscribeGroceryListChanged(callback) {
    this.onGroceryListChanged = callback;
  }

  //Adds grocery item to list, updates localStorage
  addGrocery(itemName, quantity) {
    const newGrocery = { itemName, quantity };
    
    // TODO: add the new grocery to the array of groceries and put it in local storage
    this.groceries.push(newGrocery);
    this.commit(this.groceries)
   
    return true;
  }

  //Removes grocery item at given index, updates localStorage
  deleteGrocery(index) {
    // TODO: Remove the grocery from the array and update local storage.
    this.groceries.splice(index, 1);
    this.commit(this.groceries)
  }
}