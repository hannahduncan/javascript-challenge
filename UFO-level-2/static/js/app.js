// from data.js
var tableData = data;

// Find html tags/selectors
var thead = d3.select("thead");
var tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var submit = d3.select("form")


// Define function that appends values from key,value pairs in each "data" object 
// entry to a table
// TO DO: Maybe just make theader = ["Date", "City", "State", "Country","Shape","Duration","Comments"]
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

console.log(tableData[0])

// Define filter function
function filterer(data, att, value) {
    var filteredArray = data.filter(function(data) {
        return data[att] == value});
    return filteredArray;
};


// QUESTION: What's the difference between d3.event.target.value and 
// d3.select("input").property("value")?

// Define function to make table for filtered date
function handle() {
    d3.event.preventDefault();
    var dateInput = d3.select("#datetime").property("value");
    var cityInput = d3.select("#city").property("value");
    var stateInput = d3.select("#state").property("value");
    var countryInput = d3.select("#country").property("value");
    var shapeInput = d3.select("#shape").property("value");

    var inputs = [dateInput, cityInput, stateInput, countryInput, shapeInput];
    var atts = ["datetime", "city", "state", "country", "shape"];
    var specifiedInputs = [];
    var specifiedAtts = [];
    
    for (var i=0; i<inputs.length; i++) {
        if (inputs[i] != "") {
            specifiedInputs.push(inputs[i]);
            specifiedAtts.push(atts[i]);
        };
    };

    var currentArray = filterer(tableData, specifiedAtts[0], specifiedInputs[0]);

    for (var i=1; i < specifiedInputs.length; i++) {
        var filtered = filterer(currentArray, specifiedAtts[i], specifiedInputs[i]);
        currentArray = filtered;
    };

    // Remove existing table
    d3.selectAll("tr").remove();

    var theader = ["Date", "City", "State", "Country","Shape","Duration","Comments"]
    var header = thead.append("tr")
    theader.forEach(function(att) {
        header.append("td").text(att);
    });

    if (specifiedInputs.length > 1) {
        var table = tabler(filtered);
    }
    else {
        var table = tabler(currentArray);
    }
    
};

// Create event handlers
button.on("click",handle);
submit.on("submit",handle);



