/*
 ** 04-15-21 jdj: Super Dog Events:
 **              .Start with a statically defined list of objects and create a local storage object array.
 **              .Read the array back from local storage and post a table through the HTML template to start the page.
 **              .Hook a button into the js here to allow adding to the local storage array.
 **              .Add simple validation to the form data.
 **
 **      Logic:  .Grab the input range numbers to build the integer array.
 **
 **
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



loadEventData();

function loadEventData() {
    let eventData = [];
    eventData = getEventData();
    displayEventData(eventData);
    return null;
} // end of loadEventData()


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
    obj["attendance"] = document.getElementById("newAttendance").value;
    obj["date"] = document.getElementById("newDate").value;

    eventData.push(obj);

    localStorage.setItem("eventArray", JSON.stringify(eventData));

    displayEventData(eventData);
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
        dataRow.getElementById("attendance").textContent = eventData[i].attendance;
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
 **
 */
function formatDateMMDDYYYY(dateString) {


    let d = new Date(dateString);

    let mm = d.getMonth(d);
    let dd = d.getDay(d);
    let yy = d.getFullYear(d);


    let dateStrmmddyy = `${d.getMonth()}/${d.getDay()}/${d.getFullYear()}`;

    return dateStrmmddyy;
} // end of formatDateMMDDYYYY()

/**
 ** end of site.js
 */