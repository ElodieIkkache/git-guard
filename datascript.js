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
	//just get the differents links for the data!!
	//and close the containers for the visualisations? i'll tell you as soon as i know ^^
	getRepo();
	link1 = "https://api.github.com/repos/" + owner + "/" + repo + "/stats/contributors";
	link23 = "https://api.github.com/repos/" + owner + "/" + repo + "/commits";
	link4 = "https://api.github.com/repos/" + owner + "/" + repo + "/commits?path="; //add path later 
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
	
	//the data axis
	/*var date = [];
	var scale; //July 2016 to March 2017  */
	/*var numberOfYears = toy23 - fromy23; //1    
	var numberOfMonth = 12*numberOfYears + tom23 - fromm23 + 1; //12 + 3 - 7 = 8 + 1 = 9*/
	
	var date = [];

	var y;
	var m;
	var fmonthcounter = fromm23; //may 2016, jun 2018
	var tmonthcounter = 1;
	var normalcounter = 1;
	
	if(fromy23!=toy23) {
		for (y = fromy23; y <= toy23; y++){
			if (y == fromy23) {
				while(fmonthcounter<=12) {
					date[date.length]= fmonthcounter + "/" + y;					
					fmonthcounter++;
				}
			}

			//if it is the last year but too late for the month
			else if (y == toy23) {
				console.log("elseif");
				while(tmonthcounter<=tom23) {
					date[date.length]= tmonthcounter + "/" + y;
					tmonthcounter++;
				}
			}
			//if it is within time limits
			else {
				console.log("else");
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
			commitsByDate[commitsByDate.length] = 0;
		}
		
		for (var j=0; j<jsonfile.length; j++){
			console.log(jsonfile[j]["author"]["login"] == name);
			if (jsonfile[j]["author"]["login"] == name){
				console.log("is it true?");
				year = jsonfile[j]["commit"]["author"]["date"].substring(0, 4);
				month = parseInt(jsonfile[j]["commit"]["author"]["date"].substring(5, 7));
				k = month + "/" + year;
				for (var i= 0; i<date.length; i++){
					if (date[i] == k){
						commitsByDate[i] += 1;
						console.log("is it still true?");
					}
				}
			}
			else {
				console.log(jsonfile[j]["author"]["login"]);
			}
		}
		
		
		fortheauthor = {
			x: date, 
			y: commitsByDate, 
			type: 'scatter'
		};
		data23[data23.length] = fortheauthor;
	}
}














//Forth visualisation --> there is a form!! submit button should make a section appear
function visualisationFour() {
	//this is the function called from the html page for the 4th visualisation
	//console.log(link4);
	getlink4(); //sets the parameters
	//console.log(filePath);
	var v4Data = visualisation(link4); //get the json file
	console.log(v4Data);
	processdataV4(v4Data); //transfrom it into usable data
}

function getlink4() {
	filePath = getFilepath();
	console.log(filePath);
	link4 += filePath;
	console.log(link4);
	fromm4 = parseInt(document.getElementById("Frommonth4").value);
	fromy4 = parseInt(document.getElementById("Fromyear4").value);
	tom4 = parseInt(document.getElementById("Tomonth4").value);
	toy4 = parseInt(document.getElementById("Toyear4").value);
	//startLineNo = document.forms["form4"]["lineFrom"].value;
	//endLineNo = document.forms["form4"]["lineTo"].value;
}

function getFilepath() {
	var gitpath = (document.forms["form4"]["file"].value).trim(); //gets entire filepath as string
	console.log(gitpath);
	var arrPath = gitpath.split("/");
	console.log(arrPath);
	var len = arrPath.length;
	console.log(len);
	var i;
	var finalPath = new String();
	for (i=7; i<len; i++) {
		if(i==len-1) {
			console.log(typeof(arrPath[i]));
			finalPath = finalPath + arrPath[i];
			console.log(finalPath);
		}
		else {
			finalPath = finalPath + arrPath[i] + "/";
			console.log(finalPath);
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
			if (y == fromy4) {
				while(fmonthcounter<=12) {
					date[date.length]= fmonthcounter + "/" + y;					
					fmonthcounter++;
				}
			}

			//if it is the last year but too late for the month
			else if (y == toy4) {
				console.log("elseif");
				while(tmonthcounter<=tom4) {
					date[date.length]= tmonthcounter + "/" + y;
					tmonthcounter++;
				}
			}
			//if it is within time limits
			else {
				console.log("else");
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
	var authordict = {}
	var auth;
	var year;
	var month;
	var k;
	for (var j=0; j<jsonfile.length; j++){
		auth = jsonfile[j]["author"]["login"];
		year = jsonfile[j]["commit"]["author"]["date"].substring(0, 4);
		month = parseInt(jsonfile[j]["commit"]["author"]["date"].substring(5, 7));
		k = month + "/" + year;
		
		if (auth in authordict) {
			for (var i= 0; i<date.length; i++){
					if (date[i] == k){
						authordict[auth][i] += 1;
					}
				}
		}
		else {
			authordict[auth] = [];
			for (var b = 0; b < date.length; b++){
				authordict[auth][authordict[auth].length] = 0;
			}
			for (var i= 0; i<date.length; i++){
					if (date[i] == k){
						authordict[auth][i] += 1;
					}
				}
		}
		
	}
	
	var authors4 = [];
	var zaxis = [];
	for (var key in authordict) {
		authors4[authors4.length] =  key;
		zaxis[zaxis.length] = authordict[key];
	}
	
	data4 = [
	  {
		z: zaxis,
		x: date,
		y: authors4,
		type: 'heatmap'
	  }
	];
	
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
