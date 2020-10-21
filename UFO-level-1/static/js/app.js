// from data.js
var tableData = data;

// YOUR CODE HERE!
function dateFilter(data, date) {
    var filteredArray = data.filter(function(data) {
        return data.datetime == date});
    return filteredArray;
}

var filtered = dateFilter(tableData, "1/1/2010");

filtered.forEach(function(element) {console.log(element.datetime)});

