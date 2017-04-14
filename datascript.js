var link;
var userInput;
var owner;
var repo;
var returnObj;

function readDataForV1() {
	getRepo();
	link = "https://api.github.com/repos/" + owner + "/" + repo + "/stats/contributors";
	var v1Data = readData(link);
	console.log(v1Data);
	processdataV1(v1Data);
}

function readData(link) {
getRepo();
//link = "https://api.github.com/repos/" + owner + "/" + repo + "/stats/contributors";
//console.log(typeof(link));
//console.log(link);
var xmlHttpObjective_1 = new XMLHttpRequest();
xmlHttpObjective_1.open("GET", link, false); // false for synchronous request
xmlHttpObjective_1.send(null);
var responseObjective_1 =  JSON.parse(xmlHttpObjective_1.responseText);
//console.log(typeof(responseObjective_1));
//console.log(responseObjective_1);
return responseObjective_1;
}

function dumpResponse() {
  // `this` will refery to the `XMLHTTPRequest` object that executes this function
  console.log(this.responseText);
}

function getRepo() {
userInput = document.forms["GitLink"]["fname"].value;	
var arrOfInputs = userInput.split("/");
owner = arrOfInputs[3];
repo = arrOfInputs[4];
console.log(userInput);
console.log(arrOfInputs);
console.log(owner);
console.log(repo);
}


var dataauthors;
var datacommits;
var dataadditions;
var datadeletions;
var data1A;
var data1B;
var layout1B;


function processdataV1(responseText){
	
dataauthors = [];
datacommits = [];
dataadditions = [];
datadeletions = [];
	

for (var i = 0; i<responseText.length; i++) {

	dataauthors[dataauthors.length] = responseText[i]["author"]["login"];
	datacommits[datacommits.length] = responseText[i]["total"];	
	
	var addition = 0;
	var deletion = 0;
	
	for (var j = 0; j<responseText[i]["weeks"].length; j++){
		addition += responseText[i]["weeks"][j]["a"];
		deletion += responseText[i]["weeks"][j]["d"];
	}
	
	dataadditions[dataadditions.length] = addition;
	datadeletions[datadeletions.length] = deletion;
}

data1A = [{
			  x: dataauthors,
			  y: datacommits,
			  type: 'bar'
			}];

var trace1 = {
  x: dataauthors,
  y: datadeletions,
  name: 'deletions',
  type: 'bar'
};

var trace2 = {
  x: dataauthors,
  y: dataadditions,
  name: 'additions',
  type: 'bar'
};

data1B = [trace1, trace2];

layout1B = {
	barmode: 'stack'
};
}