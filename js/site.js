/*
 ** 04-14-21 jdj: Fizz Buzz Game:
 **              .take two input numbers and build a return table array displaying all numbers within the range.
 **              .Identify which number(s) are divisible by 3, 5 or both and display Fizz, Buzz, FizzBuzz respectively.
 **              .In addition allow the user to enter two alternate numbers other than 3 or 5 and use those variables
 **               to determine Fizz, Buzz or FizzBuzz.
 **              .HTML hook
 **             "document.getElementById("submitBtn").addEventListener("click", fz_FizzBuzzTableArray);"
 **
 **      Logic:  .Grab the input range numbers to build the integer array.
 **              .add reasonable and limits on what the user can enter.see userInputBad()
 **              .take the number and build the array.getRange()
 **              .Parse the array to identify numbers divisible by the modulo values. DisplayData()
 */

function fz_FizzBuzzTableArray() {


    //  alert("here: 2nd .js")
    let startNum = parseInt(document.getElementById("numOne").value);
    let endNum = parseInt(document.getElementById("numTwo").value);

    let outputMsg = document.getElementById("FizzBuzzNotes"); // get the message field object once 
    outputMsg.innerText = "";

    if (userInputBad(startNum, endNum, outputMsg) == true) {
        return;
    }


    let numbers = getRange(startNum, endNum);
    displayData(numbers);

    outputMsg.classList.add("noteBuzzOk");
    outputMsg.innerText = "Success !";
}


/*
 ** Function to control basic error handling.
 ** .don't allow negative range numbers.  Don't care about the mods
 ** .make sure they're a valid range.
 ** .limit the table range to 1000
 ** .for display reasons don't allow the start number past 1million
 */
function userInputBad(startNum, endNum, outputMsg) {


    // clear any previous values set.  Seems to max out and retain the last style on subsequent .add calls.
    outputMsg.classList.remove("noteBuzzErr");
    outputMsg.classList.remove("noteBuzzOk");
    /*
        if (startNum < 0 || endNum < 0) {
            outputMsg.classList.add("noteBuzzErr");
            outputMsg.innerText = "Please try using positive numbers for the table range.";
            return true;
        }
    */
    if (startNum >= endNum) {
        outputMsg.classList.add("noteBuzzErr");
        outputMsg.innerText = "Please ensure the start value is less than the end value.";
        return true;
    }

    if ((endNum - startNum) > 1000) {
        outputMsg.classList.add("noteBuzzErr");
        outputMsg.innerText = "Please try to keep the range under 1,000.";
        return true;
    }

    if (startNum > 999999999) {
        outputMsg.classList.add("noteBuzzErr");
        outputMsg.innerText = "Please keep the number values under 1 million.";
        return true;
    }

    return false;
}
// end of userInputBad()

/*
 ** Build and return an array of numbers from user's range.
 */
function getRange(start, end) {
    let numberArray = [];

    for (let index = start; index <= end; index++) {
        //fizzbuzz logic will be added here

        numberArray.push(index);
    }

    return numberArray;
}
// end of getRange()


/*
 ** .display the numbers on the page
 ** .have a repeating template where we don 't know how many rows or columns
 ** .we will derive, from the html template, the total columns.
 **
 ** .when the teamplate is returned the tr,td is returned as a string.
 ** .you have to parse and count each 
 ** .clonenode(true) turns into a document and you can use query selectors on it.
 ** .(true) returns the whole template (tr,tds) where (false) only returns the single tr.
 ** .importnode can get data NOT on the CURRENT doument.
 ** .clonenode is the current document.
 ** .comes back as an array where you can use the .length property for the count.
 **     <td> </td>  
 **     <td> </td>  
 **     <td> </td>  
 **     <td> </td>  
 **     <td> </td>  
 */
function displayData(numberArray) {
    const rowTemplate = document.getElementById("FB-Data-Template"); // gets the <tr rows> and <td columns> from the html id= tage
    const resultsBody = document.getElementById("resultsBody"); // is the area where the table will be displayed
    let colCount = rowTemplate.content.cloneNode(true).querySelectorAll("td").length;
    let modFizz = parseInt(document.getElementById("modFizz").value);
    let modBuzz = parseInt(document.getElementById("modBuzz").value);
    let cssFBStyle = "";


    resultsBody.innerHTML = ""; // clears table after every event

    // loop over the array and the write the value to a page.
    for (let i = 0; i < numberArray.length; i += colCount) {
        let dataRow = rowTemplate.content.cloneNode(true); // get the tr and multiple td

        let cols = dataRow.querySelectorAll("td"); // gets the array of td columns

        // loop over the columns.
        for (let colIndex = 0; colIndex < cols.length; colIndex++) {

            cssFBStyle = ""; // re-initialize each iteration, cell
            let value = numberArray[i + colIndex]; // error checking for when there are no more numbers in the array

            if (typeof value === "undefined") { // check for out of bounds on the array
                value = ""; // will write an empty string as were out numbers for the current row.
            } else if (value % modFizz == 0 && value % modBuzz == 0) {
                value = `${value} FizzBuzz`;
                cssFBStyle = "boldFizzBuzz";
            } else if (value % modFizz == 0) {
                // check for even value and make bold using the modulas operator: divisble by two.
                //      cols[colIndex].classList.add("boldIt"); // cols is the actual td row with properties so classlist has all the styles.
                value = `${value} Fizz`;
                cssFBStyle = "boldFizz";

            } else if (value % modBuzz == 0) {
                // check for even value and make bold using the modulas operator: divisble by two.
                //   cols[colIndex].classList.add("boldIt"); // cols is the actual td row with properties so classlist has all the styles.
                value = `${value} Buzz`;
                cssFBStyle = "boldBuzz";
            }

            cols[colIndex].textContent = value; // textcontent is the areaa between the <td>textcontent</td>
            if (cssFBStyle != "") {
                cols[colIndex].classList.add(cssFBStyle); // cols is the actual td row with properties so classlist has all the styles.
            }
        }

        /*
         ** commits back to the page for each row and column
         ** and will be <tr> <td> <td> <td> <td> .etc
         */
        resultsBody.appendChild(dataRow); // commits back to the page for each row and column 
    }
} // end of displayData()

/*
 ** end of site.js
 */