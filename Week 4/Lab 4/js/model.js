export class GroceryModel {
  constructor() {
    try {
      const savedGroceries = null; // array to hold groceries
      // TODO: Add a line of code that retrieves groceries from local storage into savedGroceries
      if (!Array.isArray(savedGroceries) || !this._allValid(savedGroceries)) {
        throw new Error('Invalid grocery payload');
      }
      this.groceries = savedGroceries;
    } catch (e) {
      // Provide starter entries if local storage is empty/corrupt.
      this.groceries = [
        { itemName: 'Apples', quantity: '5' },
        { itemName: 'Milk', quantity: '1 gallon' }
      ];
    }
  }

  isValidItem(item) {
    return (
      typeof item === 'object' &&
      item !== null &&
      typeof item.itemName === 'string' &&
      typeof item.quantity === 'string'
    );
  }

  allValid(groceries) {
    for (let i = 0; i < groceries.length; i++) {
      if (!this.isValidItem(groceries[i])) {
        return false;
      }
    }
    return true;
  }

  commit(groceries) {
    // TODO: write this method
  }

  subscribeGroceryListChanged(callback) {
    this.onGroceryListChanged = callback;
  }

  addGrocery(itemName, quantity) {
    const newGrocery = { itemName, quantity };
    
    // TODO: add the new grocery to the array of groceries and put it in local storage
   
    return true;
  }

  deleteGrocery(index) {
    // TODO: Remove the grocery from the array and update local storage.
  }
}