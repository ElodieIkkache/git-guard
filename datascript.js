//global
var link1;
var link23;
var link4;
var link5;
var userInput;
var owner;
var repo;

//visualisation1
var dataauthors;
var datacommits;
var dataadditions;
var datadeletions;

var data1A;
var data1B;
var layout1B;

//visualisation 2 and 3
var arrOfAuthors;
var fromm23;
var fromy23;
var tom23;
var toy23;

var data23

//visualisation 4
var fromm4;
var fromy4;
var tom4;
var toy4;

//visualisation 5
var numberOfLines;
var data5;
var layout5;





//FUNCTIONS

//First submit button : get the repository link
function readRepository() {
	//just get the differents links for the data!!
	//and close the containers for the visualisations? i'll tell you as soon as i know ^^
	getRepo();
	link1 = "https://api.github.com/repos/" + owner + "/" + repo + "/stats/contributors";
	link23 = "https://api.github.com/repos/" + owner + "/" + repo + "/commits";
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







//commun fonctions
function visualisation(link) {
	var xmlHttpObjective_1 = new XMLHttpRequest();
	xmlHttpObjective_1.open("GET",link, false); // false for synchronous request
	xmlHttpObjective_1.send(null);
	var responseObjective_1 =  JSON.parse(xmlHttpObjective_1.responseText);
	//console.log(typeof(responseObjective_1));
	//console.log(responseObjective_1);
	return responseObjective_1;
}
/*
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
*/
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
function visualisationTwoThree(){
	//this is the function called from the html page for the third visualisation
	console.log(link23);
	getlink23(); //sets the authors, dates
	var v23Data = visualisation(link23); //get the json file
	console.log(v23Data);
	processdataV23(v23Data); //transfrom it into usable data
}

function getlink23() {
	usernames = document.forms["form23"]["author"].value; //gets the username(s) as string , authors separated by ,
	console.log(usernames);
	arrOfAuthors = usernames.split(","); //use string.trim() before checking author
	fromm23 = parseInt(document.getElementById("Frommonth23").value);
	fromy23 = parseInt(document.getElementById("Fromyear23").value);
	tom23 = parseInt(document.getElementById("Tomonth23").value);
	toy23 = parseInt(document.getElementById("Toyear23").value);
}
/*
function processdataV23(jsonfile){
	//this function takes a json as an input and formats the data so that it is ready for the second and third visualisation
	
	//the data axis
	var date = [];
	var scale;
	var numberOfYears = toy23 - fromy23;
	var numberOfMonth = 12*numberOfYears + tom23 - fromm23;

	var date = [];
	for (var y = fromy23; y<= toy23; y++){
		for (var m=1; m<=12; m++){
			//if it is the good year but too early for the months
			if (y == fromy23) {
				console.log("does it goes inside the too early");
				if (m < fromm23){
					console.log(m);
				}
			}
			//if it is the last year but too late for the month
			else if (y == toy23) {
				if (m>tom23){
					console.log(m);
				}
			}
			//if it is within time limits
			else {
				date[date.length]= m + "/" + y;
			}
			
		}
	}
	console.log("this should be the right date");
	console.log(date);
	data23 = [];
	for (var a=0; a<arrOfAuthors.length; a++){
		var name = arrOfAuthors[a];
		var commitsByDate = new Array(date.length).fill(0);
		
		for (var j=0; j<jsonfile.length; j++){
			if (jsonfile[j]["author"]["login"]==name){
				var year = jsonfile[j]["commit"]["author"]["date"].substring(0, 4);
				var month = jsonfile[j]["commit"]["author"]["date"].substring(5, 7);
				for (var i= 0; i<date.length; i++){
					if (date[i] == month + "/" + year){
						commitsByDate[i] += 1;
					}
				}
			}
		}
		
		var fortheauthor = {
			x: date, 
			y: commitsByDate, 
			type: 'scatter'
		};
		data23[data23.length] = fortheauthor;
	}
}
*/













//Forth visualisation --> there is a form!! submit button should make a section appear

function processdataV4(jsonfile){
	//this function takes a json as an input and formats the data so that it is ready for the forth visualisation
}














//Fifth visualisation --> /!\no from!! so it's either with the container button or a 'display graph' button
function visualisationFive(){
	//this is the function called from the html page for the first visualisation
	console.log(link1);
	var v5Data = visualisation(link1); //get the json file
	processdataV5(v5Data); //transfrom it into usable data
}

function processdataV5(jsonfile){
	//this function takes a json as an input and formats the data so that it is ready for the fifth visualisation
	var dataauthors5 = [];
	var datacontributions = [];
	numberOfLines = 0;
		

	for (var i = 0; i<jsonfile.length; i++) {

		dataauthors5[dataauthors5.length] = jsonfile[i]["author"]["login"];	
		
		var addition = 0;
		var deletion = 0;
		
		for (var j = 0; j<jsonfile[i]["weeks"].length; j++){
			addition += jsonfile[i]["weeks"][j]["a"];
			deletion += jsonfile[i]["weeks"][j]["d"];
		}
		datacontributions[datacontributions.length] = addition + deletion;
		numberOfLines = numberOfLines + addition - deletion;
	}

	data5 = [{
	  values: datacontributions,
	  labels: dataauthors5,
	  type: 'pie'
	}];

	layout5 = {
	  height: 400,
	  width: 500
	};
	
}
