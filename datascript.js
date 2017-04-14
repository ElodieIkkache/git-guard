//global
var link1;
var link23;
var link4;
var link5;
var userInput;
var owner;
var repo;
var returnObj;

//visualisation1
var dataauthors;
var datacommits;
var dataadditions;
var datadeletions;
var data1A;
var data1B;
var layout1B;

//visualisation 2 and 3

//visualisation 4

//visualisation 5












//FONCTIONS

//First submit button : get the repository link
function readRepository() {
	//just get the differents links for the data!!
	//and close the containers for the visualisations? i'll tell you as soon as i know ^^
	getRepo();
	link1 = "https://api.github.com/repos/" + owner + "/" + repo + "/stats/contributors";
	var v1Data = visualisation1(link1);
	console.log(v1Data);
	processdataV1(v1Data);
	console.log(dataauthors);
	console.log(datacommits);
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










function visualisation1(link) {
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










//First visualisation --> /!\no from!! so it's either with the container button or a 'display graph' button
function processdataV1(jsonfile){
	//this function takes a json as an input and formats the data so that it is ready for the first visualisation (2 graphs)
	
	dataauthors = [];
	datacommits = [];
	dataadditions = [];
	datadeletions = [];
		

	for (var i = 0; i<jsonfile.length; i++) {

		dataauthors[dataauthors.length] = jsonfile[i]["author"]["login"];
		datacommits[datacommits.length] = jsonfile[i]["total"];	
		
		var addition = 0;
		var deletion = 0;
		
		for (var j = 0; j<jsonfile[i]["weeks"].length; j++){
			addition += jsonfile[i]["weeks"][j]["a"];
			deletion += jsonfile[i]["weeks"][j]["d"];
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
	
	
	
	
	
	
	
	
	
	
	
	
//Second and third visualisations --> there is a form!! submit button should make a section appear
function processdataV23(jsonfile){
	//this function takes a json as an input and formats the data so that it is ready for the second and third visualisation
}














//Forth visualisation --> there is a form!! submit button should make a section appear

function processdataV4(jsonfile){
	//this function takes a json as an input and formats the data so that it is ready for the forth visualisation
}














//Fifth visualisation --> /!\no from!! so it's either with the container button or a 'display graph' button
function processdataV5(jsonfile){
	//this function takes a json as an input and formats the data so that it is ready for the fifth visualisation
}
