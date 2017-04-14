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
var filePath;

var data4;

//visualisation 5
var numberOfLines;
var data5;
var layout5;





//FUNCTIONS

//First submit button : get the repository link
function readRepository() {
	getRepo();
	link1 = "https://api.github.com/repos/" + owner + "/" + repo + "/stats/contributors"; //same for visualisation 5
	link23 = "https://api.github.com/repos/" + owner + "/" + repo + "/commits";
	link4 = "https://api.github.com/repos/" + owner + "/" + repo + "/commits?path="; //add path later 
}

function getRepo() {
	userInput = document.forms["GitLink"]["fname"].value;	
	var arrOfInputs = userInput.split("/");
	owner = arrOfInputs[3];
	repo = arrOfInputs[4];
}

//commun fonctions
function visualisation(link) {
	var xmlHttpObjective_1 = new XMLHttpRequest();
	xmlHttpObjective_1.open("GET",link, false);
	xmlHttpObjective_1.send(null);
	var responseObjective_1 =  JSON.parse(xmlHttpObjective_1.responseText);
	return responseObjective_1;
}




//First visualisation --> /!\no from!! so it's either with the container button or a 'display graph' button

function visualisationOne(){
	//this is the function called from the html page for the first visualisation
	var v1Data = visualisation(link1); //get the json file
	processdataV1(v1Data); //transfrom it into usable data
}


function processdataV1(jsonfile){
	//this function takes a json as an input and formats the data so that it is ready for the first visualisation (2 graphs)
	
	dataauthors = [];
	datacommits = [];
	dataadditions = [];
	datadeletions = [];
		
	//gather the data for the visualisation
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
	
	//data for the first visualisation : bar chart of commits for each author
	data1A = [{
				  x: dataauthors,
				  y: datacommits,
				  type: 'bar'
				}];

	//data for the second visualisation : stacked bar chart of commits for each author
	//each trace1 is deletions, trace 2 is additions
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
		barmode: 'group'
	};
	
}
	
	
	
//Second and third visualisations --> there is a form!! submit button should make a section appear
function visualisationTwoThree(){
	//this is the function called from the html page for the third visualisation
	getlink23(); //sets the authors, dates
	var v23Data = visualisation(link23); //get the json file
	processdataV23(v23Data); //transfrom it into usable data
}

function getlink23() {
	usernames = document.forms["form23"]["author"].value; //gets the username(s) as string , authors separated by ,
	arrOfAuthors = usernames.split(","); //use string.trim() before checking author to remove white sapces
	for (var i=0; i< arrOfAuthors.length; i++){
		arrOfAuthors[i] = arrOfAuthors[i].trim() ;
	}
	fromm23 = parseInt(document.getElementById("Frommonth23").value);
	fromy23 = parseInt(document.getElementById("Fromyear23").value);
	tom23 = parseInt(document.getElementById("Tomonth23").value);
	toy23 = parseInt(document.getElementById("Toyear23").value);
}

function processdataV23(jsonfile){
	//this function takes a json as an input and formats the data so that it is ready for the second and third visualisation
	
	var date = [];

	var y;
	var m;
	var fmonthcounter = fromm23;
	var tmonthcounter = 1;
	var normalcounter = 1;
	
	if(fromy23!=toy23) {
		for (y = fromy23; y <= toy23; y++){
			//if it is the first year but too early for the month
			if (y == fromy23) {
				while(fmonthcounter<=12) {
					date[date.length]= fmonthcounter + "/" + y;					
					fmonthcounter++;
				}
			}

			//if it is the last year but too late for the month
			else if (y == toy23) {
				while(tmonthcounter<=tom23) {
					date[date.length]= tmonthcounter + "/" + y;
					tmonthcounter++;
				}
			}
			//if it is within time limits
			else {
				while(normalcounter<=12) {
					date[date.length]= normalcounter + "/" + y;
					normalcounter++;
				}
				normalcounter=1;
			}
				
		}
	}
	
	else {
		while(fmonthcounter<=tom23) {
			date[date.length]= fmonthcounter + "/" + fromy23;	
			fmonthcounter++;
		}
	}
	
	//gather the data for the visualisation that correspond to requirements 2 and 3.
	data23 = [];
	var name;
	var commitsByDate;
	var year;
	var month;
	var k;
	var fortheauthor; 
	
	for (var a=0; a<arrOfAuthors.length; a++){
		name = arrOfAuthors[a];
		commitsByDate = [];
		for (var l = 0; l<date.length; l++){
			//set the number of commits for each period of time to 0
			commitsByDate[commitsByDate.length] = 0;
		}
		
		for (var j=0; j<jsonfile.length; j++){
			//for each commit, if the author is one of the members selected ...
			if (jsonfile[j]["author"]["login"] == name){
				//..and that the date is within the limits...
				year = jsonfile[j]["commit"]["author"]["date"].substring(0, 4);
				month = parseInt(jsonfile[j]["commit"]["author"]["date"].substring(5, 7));
				k = month + "/" + year;
				for (var i= 0; i<date.length; i++){
					if (date[i] == k){
						//...change the number of commits
						commitsByDate[i] += 1;
					}
				}
			}
			else {
			}
		}
		
		
		fortheauthor = {
			x: date, 
			y: commitsByDate, 
			type: 'scatter'
		};
		//final data for the visualisation
		data23[data23.length] = fortheauthor;
	}
}














//Forth visualisation --> there is a form!! submit button should make a section appear
function visualisationFour() {
	//this is the function called from the html page for the 4th visualisation
	getlink4(); //sets the parameters
	var v4Data = visualisation(link4); //get the json file
	processdataV4(v4Data); //transfrom it into usable data
}

function getlink4() {
	filePath = getFilepath();
	link4 += filePath;
	fromm4 = parseInt(document.getElementById("Frommonth4").value);
	fromy4 = parseInt(document.getElementById("Fromyear4").value);
	tom4 = parseInt(document.getElementById("Tomonth4").value);
	toy4 = parseInt(document.getElementById("Toyear4").value);
}

function getFilepath() {
	var gitpath = (document.forms["form4"]["file"].value).trim(); //gets entire filepath as string
	var arrPath = gitpath.split("/");
	var len = arrPath.length;
	var i;
	var finalPath = new String();
	for (i=7; i<len; i++) {
		if(i==len-1) {
			finalPath = finalPath + arrPath[i];
		}
		else {
			finalPath = finalPath + arrPath[i] + "/";
		}
	}
	return finalPath;
}



function processdataV4(jsonfile){
	//this function takes a json as an input and formats the data so that it is ready for the forth visualisation
	var date = [];

	var y;
	var m;
	var fmonthcounter = fromm4; //may 2016, jun 2018
	var tmonthcounter = 1;
	var normalcounter = 1;
	
	if(fromy4!=toy4) {
		for (y = fromy4; y <= toy4; y++){
			//if it is the first year but too early for the month
			if (y == fromy4) {
				while(fmonthcounter<=12) {
					date[date.length]= fmonthcounter + "/" + y;					
					fmonthcounter++;
				}
			}

			//if it is the last year but too late for the month
			else if (y == toy4) {
				while(tmonthcounter<=tom4) {
					date[date.length]= tmonthcounter + "/" + y;
					tmonthcounter++;
				}
			}
			//if it is within time limits
			else {
				while(normalcounter<=12) {
					date[date.length]= normalcounter + "/" + y;
					normalcounter++;
				}
				normalcounter=1;
			}
				
		}
	}
	
	else {
		while(fmonthcounter<=tom4) {
			date[date.length]= fmonthcounter + "/" + fromy4;	
			fmonthcounter++;
		}
	}
	
	//to get the full list of authors even if they did not contribute to this file
	visualisationOne();
	
	var authordict = {}
	for (var z = 0; z < dataauthors.length; z++){
		authordict[dataauthors[z]] = [];
			for (var b = 0; b < date.length; b++){
				authordict[dataauthors[z]][authordict[dataauthors[z]].length] = 0;
			}
	}
	
	var auth;
	var year;
	var month;
	var k;
	for (var j=0; j<jsonfile.length; j++){
		auth = jsonfile[j]["author"]["login"];
		year = jsonfile[j]["commit"]["author"]["date"].substring(0, 4);
		month = parseInt(jsonfile[j]["commit"]["author"]["date"].substring(5, 7));
		k = month + "/" + year;
		
		for (var i= 0; i<date.length; i++){
				if (date[i] == k){
					authordict[auth][i] += 1;
				}
			}		
	}
	
	var zaxis = [];
	for (var key in authordict) {
		zaxis[zaxis.length] = authordict[key];
	}
	//data for the fourth visualisation
	data4 = [
	  {
		z: zaxis,
		x: date,
		y: dataauthors,
		type: 'heatmap'
	  }
	];
	
}








//Fifth visualisation --> /!\no from!! so it's either with the container button or a 'display graph' button
function visualisationFive(){
	//this is the function called from the html page for the first visualisation
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
	//data for the last visualisation
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
