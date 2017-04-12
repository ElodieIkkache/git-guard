//global
var link1;
var link23;
var link4;
var link5;
var userInput;
var owner;
var repo;
var returnObj;
var arrOfAuthors;
var fromd23;
var fromm23;
var fromy23;
var tod23;
var tom23;
var toy23;
var fromd4;
var fromm4;
var fromy4;
var tod4;
var tom4;
var toy4;
var filePath;
var startLineNo;
var endLineNo;

var fromDateISO23;
var toDateISO23;

var fromDateISO4;
var toDateISO4;

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





//FUNCTIONS

//First submit button : get the repository link
function readRepository() {
	//just get the differents links for the data!!
	//and close the containers for the visualisations? i'll tell you as soon as i know ^^
	getRepo();
	link1 = "https://api.github.com/repos/" + owner + "/" + repo + "/stats/contributors";
	link23 = "https://api.github.com/repos/" + owner + "/" + repo + "/commits";
	link4 = "https://api.github.com/repos/" + owner + "/" + repo + "/commits?path="; //add path later 
}

function getlink23() {
	usernames = document.forms["form23"]["author"].value; //gets the username(s) as string , authors separated by ,
	console.log(usernames);
	arrOfAuthors = usernames.split(","); //use string.trim() before checking author
	fromd23 = document.getElementById("fromday23").value;
	fromm23 = document.getElementById("frommonth23").value;
	fromy23 = document.getElementById("fromyear23").value;
	tod23 = document.getElementById("today23").value;
	tom23 = document.getElementById("tomonth23").value;
	toy23 = document.getElementById("toyear23").value;
	fromDateISO23 = getDateFromNo(fromd23, fromm23, fromy23);
	toDateISO23 = getDateFromNo(tod23, tom23, toy23);
}

function getlink4() {
	filePath = getFilepath();
	link4 += filePath;
	console.log(filepath);
	fromm4 = parseInt(document.getElementById("frommonth4").value);
	fromy4 = parseInt(document.getElementById("fromyear4").value);
	tom4 = parseInt(document.getElementById("tomonth4").value);
	toy4 = parseInt(document.getElementById("toyear4").value);
	//startLineNo = document.forms["form4"]["lineFrom"].value;
	//endLineNo = document.forms["form4"]["lineTo"].value;
}

function getFilepath() {
	var gitpath = (document.forms["form4"]["file"].value).trim; //gets entire filepath as string
	var arrPath = gitpath.split("/");
	var len = arrPath.length();
	var i=0;
	var finalPath;
	for (i=7; i<len; i++) {
		if(i=len-1) {
			finalPath +=arrPath[i];
		}
		else {
			finalPath +=arrPath[i]+"/";
		}
	}
	return finalPath;
}

function getDateFromNo(d,m,y) {
	var year = parseInt(y);
	console.log(year);
	console.log(month);
	console.log(day);
	var month = parseInt(m) - 1;
	var day = parseInt(d) + 1;
	var d = new Date(year,month,day);
	console.log(d);
	var n = d.toISOString();
	console.log(n);
	var arrOfDates = n.split("T");
	var d2 = arrOfDates[0] + "T";
	return d2;
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

function dumpResponse() {
  // `this` will refery to the `XMLHTTPRequest` object that executes this function
  console.log(this.responseText);
}




//First visualisation --> /!\no from!! so it's either with the container button or a 'display graph' button

function visualisationOne(){
	//this is the function called from the html page for the first visualisation
	console.log(link1);
	var v1Data = visualisation(link1); //get the json file
	processdataV1(v1Data); //transfrom it into usable data
	console.log(dataauthors);
	console.log(datacommits);
}

function visualisationTwoThree(){
	//this is the function called from the html page for the third visualisation
	console.log(link23);
	getlink23(); //sets the authors, dates
	console.log(arrOfAuthors);
	console.log(fromDateISO23);
	console.log(toDateISO23);
	var v23Data = visualisation(link23); //get the json file
	console.log(v23Data);
	//processdataV23(v23Data); //transfrom it into usable data
}

function visualisationFour() {
	//this is the function called from the html page for the 4th visualisation
	//console.log(link4);
	getlink4(); //sets the parameters
	console.log(filePath);
	var v4Data = visualisation(link4); //get the json file
	console.log(v4Data);
	//processdataV4(v4Data); //transfrom it into usable data
}

function visualisation(link) {
var xmlHttpObjective_1 = new XMLHttpRequest();
xmlHttpObjective_1.open("GET",link, false); // false for synchronous request
xmlHttpObjective_1.send(null);
var responseObjective_1 =  JSON.parse(xmlHttpObjective_1.responseText);
//console.log(typeof(responseObjective_1));
//console.log(responseObjective_1);
return responseObjective_1;
}


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
