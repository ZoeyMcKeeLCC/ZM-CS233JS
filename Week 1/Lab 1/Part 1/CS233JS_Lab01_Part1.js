/* CS233JS, Beginning JavaScipt Programming, Lane Community College *
 * Lab 1, Part 1: Exercise starter file by Brian Bird, spring 2026  *
 * For each of the exercise problems, complete the function.                 */
'use strict'

/* 
1. Check file upload—-a logical operation using OR 
(You won't really upload files, this is just code that checks a file's type.)

Complete the function named checkFileType to check file extensions for allowed upload types.
The parameter will hold a file extension (that's the part of the file name after the dot).
If the extension is either .doc, .docx, or .pdf, return "Accepted", otherwise return "Wrong type".
*/
function checkFileType(extension) {
   // TODO: check the file types and return "Accepted" or "Wrong type".
   
   let extensions = [".doc", ".pdf", ".docx"];
   if(extensions.includes(extension)){

        return "Accepted";

   }
   return "Wrong type";
}

// 2. Use a do while loop to count the number of characters in a sentence (including spaces and .).
function countChars(text) {
    let index = 0; // Beginning position of the string
    let char = ""; // The character at the current position

    while(index < text.length){
       
        index += 1

    }
    // TODO: Write the code to complete the exercise.
    return index;
}

// 3. Use a while loop to count the number of words in a sentence.
function countWords(text) {
    // TODO: Write the code to complete the exercise.
    // Hint: How do we know where one word stops and the next word starts?
    let buffer = text.split(" ");
    console.log(buffer.length);
    return buffer.length;
}

// 4. Use a for loop to raise a number to a power
function power(base, exponent) {
    let result = 1; // any number raised to the power of 0 will be 1
    // TODO: Write a loop that will multiply the base by iteslf the number of times specified by exponent.
    // Hint: Use this statement inside the loop: result = result * base 

    for(let i = 0; i < exponent; i++){

        result = result * base;

    }
    console.log(result);
    return result;
}

/* 5.  initialize an array with integer values 9, 7, 5, 4, 3, 2, 1
 then prints the index of the first occurrence of the value 3 using the `indexOf()` function.
*/
function findIndexOfThree() {
    const values = [9, 7, 5, 4, 3, 2, 1];
    // TODO: Use indexOf() to find and return the index of 3.
    return values.indexOf(3);
}

/* 6. Initialize a 2D array of integers: 
1, 2, 3, 4
1, 3, 5 7
2, 4, 6, 8
return the sum of all the elements */
function sum2DArray() {
    const numbers = [[1, 2, 3, 4],[1, 3, 5, 7],[2, 4, 6, 8]]; // TODO: Initialize this as a 2D array
    let total = 0;

    for(let i = 0; i < numbers.length; i++){

        for(let j = 0; j < numbers[i].length; j++){

            total += numbers[i][j];

        }

    }
    // TODO: Use loops to add all values in the 2D array, then return total.
    return total;
}

/* 7. Create an object literal that represents a car with these properties: 
make, Toyota; model, Prius year, 2003; color, white, and a method that returns a string describing the car. */
function describeCar() {
    const car = {
        make: "Toyota",
        model: "Prius",
        year: "2003",
        color: "white",

        describe(){

            return this.year + " " + this.color + " " + this.make + " " + this.model

        }
        // TODO: add the properties and method
    };
    return car.describe();
}

/* 8. Create an object literal that represents a student's class list and contains a property for each class they are taking. 
Add a method that uses a loop to return the average grade.
*/
function averageClassGrade() {
    
    const classList = {
        classes: [

            {name: "Alegebra", grade: 90},
            {name: "CS 233JS", grade: 90},
            {name: "real class", grade: 90}

        ],
        // TODO: Add an array of objects with class name and grade properties
        // TODO: Add a method that returns the average grade
    
        getAverageGrade(){

            let grades = 0

            for(let i = 0; i < this.classes.length; i++){

                grades += this.classes[i].grade;

            }

            return grades/this.classes.length;

        }
    
    };


    return classList.getAverageGrade();
}

/* 9. Using a button to get input.
Complete echoFavoriteDessert() so it gets the desert name from 
the input element and returns it.
*/
function echoFavoriteDessert() {
    const favoriteDessert = document.getElementById("favoriteDessertInput").value;
    // TODO: Get the name of the desert from the input element on the web page


    return favoriteDessert;
}

function setFavoriteDessert() {
    const input = document.getElementById("favoriteDessertInput");
    const output = document.getElementById("favoriteDessertOutput");
    output.innerHTML = favoriteDessertText(input.value);
}

// 10. Validate a username. Write a regex pattern that will match a string containing 
// between 8 and 15 upper or lower case letters or numbers.
let pattern = /^[a-zA-Z0-9]{8,15}$/;