/*
 ** 04-15-21 jdj: Super Dog Events:
 **              .Start with a statically defined list of objects and create a local storage object array.
 **              .Read the array back from local storage and post a table through the HTML template to start the page.
 **              .Hook a button into the js here to allow adding to the local storage array.
 **              .Add simple validation to the form data.
 **
 **      Logic:  .Grab the input range numbers to build the integer array.
 **              .sessionStorage will be used instead of localStorage.  Session will clear on browser exit where local will
 **               remain until you manually clear via the browser.
 **
 **
 **
 **
 */
let eventArray = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];



/*
 ** .Default display is all events.
 ** .filteredEvents will be udpated by matching city
 */
let filteredEvents = eventArray;



/**
 ** 
 ** loadEvenData()              .called firt on page load.
 **                             .calls getEvents() then displayEventData() to load the main table.
 **
 ** getEventData()               .reads localstorage named "eventArray" or initializes a new array from eventArray[]
 ** displayEventData(eventData)  creates main data table display.  Requires the array to be passed
 **
 ** buildDropDown()             .called from html body tag onload=
 **                             .builds the location stats drop down menu by location. buildDropDownMenu()
 **                             .updates the statistics table.
 **                             .updates the main data table.
 **
 **
 **
 **
 **
 **
 */






//build a dropdown of specific cities

/*
 **
 ** maps in js:
 ** distinctEvents[] is a new array.  We just want a unique list of cities from the eventarray[]
 **
 ** [...new "new array": read about the 3 dots within js
 ** [   set "create a subset"]
 ** [   .map "copy data from the array"
 ** [    =>  only unique cities.
 **
 **
 ** the html below builds a list of anchor tags into resultHTML then posts.
 **
 */

function buildDropDown() {
    buildDropDownMenu(); // build city drop down list
    displayStats(); // display event stats by location
    loadEventData(); // loads main data table.
    return null;
}

/*
 ** .create location drop down menu for statistics
 ** .takes a copy of the current data table
 ** .creates a new array with just a list of distinct city names.
 ** .builds the line level html with onclick=getEvent to allow a location specific selection and refresh
 ** .ending html that includes all locations.
 */
function buildDropDownMenu() {


    let eventDD = document.getElementById("eventDropDown");
    let eventDataList = getEventData(); /* get the list from disk or the static array at the top */

    /*
     ** .take into account city mixed and punctuation.  Slight differences create multiple list entries
     ** .run through through the data array and normalize each city field.
     ** .build a normalized city string array for the distinct call
     ** .also keep the original display version.  Don't care wich one distinct includes.
     */
    /*
    let cityObjArr = [{
        displayCity: "",
        normalizedCity: ""
    }];
    */

    let cityObjArr = [{
        displayCity: "",
        normalizedCity: ""
    }];
    let obj = {};

    for (let x = 0; x < eventDataList.length; x++) {
        //    cityObjArr[x].displayCity = eventDataList[x].city;
        //   cityObjArr[x].normalizedCity = normalizeString(cityObjArr[x].displayCity);

        obj["displayCity"] = eventDataList[x].city;
        obj["normalizedCity"] = normalizeString(eventDataList[x].city);
        cityObjArr.push(obj);

        /*
        if (x == 0) {
            //            cityObjArr[x] = obj;
            cityObjArr[y].displayCity = eventDataList[x].city;
            cityObjArr[y].normalizedCity = normalizeString(eventDataList[x].city);
        } else {
            // cityObjArr.push(obj);
            //            cityObjArr[y] = obj;
            cityObjArr[y].displayCity = eventDataList[x].city;
            cityObjArr[y].normalizedCity = normalizeString(eventDataList[x].city);

        }
        */
    }

    // testing   let distinctCityArr = [...new Set(cityObjArr.map((cityObjArr) => cityObjArr.normalizedcity))];


    /*   let distinctEvents = [...new Set(eventArray.map((eventArray) => eventArray.city))]; */
    let distinctEvents = [...new Set(eventDataList.map((eventDataList) => eventDataList.city))];




    /* builds the html for the drop down list selction  as an <li> and anchor <a>: not recommended method but we're new...for now */
    let linkHTMLEnd =
        '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All" >All</a>';

    let resultHTML = "";

    for (let i = 0; i < distinctEvents.length; i++) {
        resultHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
    }
    resultHTML += linkHTMLEnd;
    eventDD.innerHTML = resultHTML;

    return null;

} // end of buildDropDown



/*
 **
 **
 **
 ** function after .filter where the code follows to check.filter(function (item) )
 ** item because a passed parm-local variable (name doesn't matter). it knows the array object has the .city propriety so we're checking
 ** the location city variable we got from the drop down list the use selected to match.  If true it creates the new filterEvents array with just the
 ** matching city value.  filteredevents[] is declared globally.
 **
 **
 **
 */


//show stats for a specific location
function getEvents(element) {
    let city = element.getAttribute("data-string");
    let curEvents = JSON.parse(localStorage.getItem("eventArray")) || eventArray;

    filteredEvents = curEvents;
    document.getElementById("statsHeader").innerHTML = `Stats For ${city} Events`;
    if (city != "All") {
        //Explain how array filtering works-
        filteredEvents = curEvents.filter(function (item) {
            if (item.city == city) {
                return item;
            }
        });
    }
    displayStats();
} // end of getEvents


/**
 ** .build stats display totals
 */
function displayStats() {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    //display total attendance
    for (let i = 0; i < filteredEvents.length; i++) {
        currentAttendance = filteredEvents[i].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }

        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }
    }
    average = total / filteredEvents.length;

    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }
    );
} // end of displayStats




/*
 **
 **  04-15-21 .Main Table Functions to load, add new and display
 **  04-16-21 .now created buildDropDown() and hooked into html <body onload = "buildDropDown()">
 **            so it also gets called when the page is loaded and the body tag is read.
 **           .loadEventData() does get called first in the beginning of the page and creates the data table.
 **           .it then calls DisplayEventData(newobjtablelist) which wipes out the original display.
 **
 **           .now buildDropDown() gets called with also displayEventData() but without a passed list.  For the
 **            beginning of the excercise then wipes out the table again.
 **           .So, we want to omit the initialization call to loadEventData(); as buildDropDown() is now being
 **            called in the beginning.
 **           .Replace the displayEventData() call from within buildDropDown() with a loadEventdata() call.
 **
 **   note:   .loadEventData() moved to inside of buildDropDown()
 **
 */
loadEventData();


function loadEventData() {
    let eventData = [];
    eventData = getEventData();
    displayEventData(eventData);

    return null;
} // end of loadEventData()


function updateEvenDataDisplays() {

    loadEventData();
    displayStats();

    return null;
}


/**
 **
 ** The "||or" and "[]array" following the JSON call simply means give me the eventArray OR if not found return an empty array.
 ** Check if it was found.  If not then create it from the static data at the top and allocate a local store for it.
 ** Everything pushed through JSON has to be stringify"ed"...turns it into JSON.
 **
 */
function getEventData() {
    let eventData = JSON.parse(localStorage.getItem("eventArray")) || [];

    if (eventData.length == 0) {
        eventData = eventArray;
        localStorage.setItem("eventArray", JSON.stringify(eventData));
    }

    return eventData;
} // end of getEventData()

function saveEventFormData() {

    // grab the events out of local storage
    let eventData = JSON.parse(localStorage.getItem("eventArray")) || eventArray;

    let obj = {};

    obj["event"] = document.getElementById("newEvent").value;
    obj["city"] = document.getElementById("newCity").value;
    obj["state"] = document.getElementById("newState").value;
    obj["attendance"] = parseInt(document.getElementById("newAttendance").value, 10);
    obj["date"] = document.getElementById("newDate").value;

    eventData.push(obj);

    localStorage.setItem("eventArray", JSON.stringify(eventData));

    buildDropDown(); // update dropdown menu to included the new dataset entry if unuique.
    updateEvenDataDisplays(); // update the stats and main table data displays

    return null;
} // end of saveEventData()

function displayEventData(eventData) {
    const template = document.getElementById("Event-Data-Template");
    const resultsBody = document.getElementById("resultsBody");

    resultsBody.innerHTML = "";

    for (let i = 0; i < eventData.length; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("eventname").textContent = eventData[i].event;
        dataRow.getElementById("city").textContent = eventData[i].city;
        dataRow.getElementById("state").textContent = eventData[i].state;
        dataRow.getElementById("attendance").textContent = eventData[i].attendance.toLocaleString();
        dataRow.getElementById("date").textContent = formatDateMMDDYYYY(eventData[i].date);

        resultsBody.appendChild(dataRow);
    }
    return null;
} // end of displayEvenData()



/*
 ** .Formats the passed date string into a date object to return a string showwing mm/dd/yyyy
 ** .The passed string from the initial array or internal storage load shows "mm/dd/yyyy"
 ** .Strings grabbed from the form input date type show "yyyy/mm/dd"
 ** .Turn the string into a date object and use the js methods to individually acess the date 
 **  components to build the current string in a consistent format.
 ** .use individual date component variables to test individuall for NaN.
 ** 
 ** 
 */
function formatDateMMDDYYYY(dateString) {


    let dateObj = new Date(dateString);

    let mm = dateObj.getMonth(dateObj);
    let dd = dateObj.getDay(dateObj);
    let ccyy = dateObj.getFullYear(dateObj);


    if (isNaN(mm) == true) {
        mm = "00";
    }
    if (isNaN(dd) == true) {
        dd = "00";
    }
    if (isNaN(ccyy) == true) {
        ccyy = "00";
    }

    let dateStrmmddyy = `${mm}/${dd}/${ccyy}`;

    return dateStrmmddyy;

} // end of formatDateMMDDYYYY()


function compareStringsTheSame(str1, str2) {

    str1 = normalizeString(str1);
    str2 = normalizeString(str2);

    if (str1 == str2) {
        return true;
    }

    return false;
}


/*
 ** .remove all non alpha characters from the string and only leave 'A-Z' and '0-9'.  return string will be all CAPS !!!
 ** .white space and punctuation will be removed.
 */
function normalizeString(passedString) {
    let tmpWorkString = "";
    let returnString = "";
    let lenStr = 0;

    tmpWorkString = passedString;
    tmpWorkString = tmpWorkString.toUpperCase();
    lenStr = tmpWorkString.length;

    for (let x = 0; x < lenStr; x++) {
        if (tmpWorkString[x] >= 'A' && tmpWorkString[x] <= 'Z') {
            returnString = returnString + tmpWorkString[x];
            continue;
        }
        if (tmpWorkString[x] >= '0' && tmpWorkString[x] <= '9') {
            returnString = returnString + tmpWorkString[x];
            continue;
        }
        continue; // here for clarity; skip the character
    }

    return returnString;
}
/**
 ** end of site.js
 */