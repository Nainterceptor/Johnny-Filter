/*
 * Johnny Hallyday Filter - Content Script
 *
 * This is the primary JS file that manages the detection and filtration of Johnny Hallyday from the web page.
 */

// Variables
var regex = /Johnny/i;
var search = regex.exec(document.body.innerText);

var selector = ":contains('Johnny'), :contains('JOHNNY'), :contains('johnny')";


// Functions
function filterMild() {
	console.log("Filtering Johnny Hallyday with Mild filter...");
	return $(selector).filter("h1,h2,h3,h4,h5,p,span,li");
}

function filterDefault () {
	console.log("Filtering Johnny Hallyday with Default filter...");
	return $(selector).filter(":only-child").closest('div');
}

function filterVindictive() {
	console.log("Filtering Johnny Hallyday with Vindictive filter...");
	return $(selector).filter(":not('body'):not('html')");
}

function getElements(filter) {
   if (filter == "mild") {
	   return filterMild();
   } else if (filter == "vindictive") {
	   return filterVindictive();
   } else if (filter == "aggro") {
	   return filterDefault();
   } else {
     return filterMild();
   }
}

function filterElements(elements) {
	console.log("Elements to filter: ", elements);
	elements.fadeOut("fast");
}


// Implementation
if (search) {
   console.log("Johnny Hallyday found on page! - Searching for elements...");
   chrome.storage.sync.get({
     filter: 'aggro',
   }, function(items) {
	   console.log("Filter setting stored is: " + items.filter);
	   elements = getElements(items.filter);
	   filterElements(elements);
	   chrome.runtime.sendMessage({method: "saveStats", johnnys: elements.length}, function(response) {
			  console.log("Logging " + elements.length + " johnnys.");
		 });
	 });
  chrome.runtime.sendMessage({}, function(response) {});
}
