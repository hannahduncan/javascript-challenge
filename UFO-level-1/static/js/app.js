// from data.js
var tableData = data;

// Find html tags/selectors
var thead = d3.select("thead");
var tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var submit = d3.select("form");


// Define function that appends values from key,value pairs in each "data" object 
// entry to a table
function tabler(data) {
    data.forEach(function(ufo) {
        var row = tbody.append("tr");
        Object.entries(ufo).forEach(function([key,value]) {
            row.append("td").text(value);
        });
    });
};

// Create unfiltered table
tabler(tableData);


// Define filter function
function dateFilter(data, date) {
    var filteredArray = data.filter(function(data) {
        return data.datetime == date});
    return filteredArray;
};

// QUESTION: What's the difference between d3.event.target.value and 
// d3.select("input").property("value")?

// Define function to make table for filtered date
function handle() {
    d3.event.preventDefault();
    var input = d3.select("#datetime").property("value");

    // Remove existing table
    d3.selectAll("tr").remove();

    var data = dateFilter(tableData,input);
    
    var theader = ["Date", "City", "State", "Country","Shape","Duration","Comments"]
    var header = thead.append("tr")
    theader.forEach(function(att) {
        header.append("td").text(att);
    });
    
    var table = tabler(data);
};

// Create event handlers
button.on("click",handle);
submit.on("submit",handle);



