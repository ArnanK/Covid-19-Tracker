// The images used in this app came from:
// [1] https://www.fda.gov/files/covid19-1600x900.jpg

//Instructions: 
//1.)User needs to select a state on the dropdown menu where it states "[Select a State]"
//2.)User then needs to type a date in the correct format. ex: 4/10, 3/4, 5/1, etc. 
//The date must be within 90 days and cannot be the date the time you are running the program.
//3.) The user then clicks the enter button
//4.) User is able to go back to the homepage and select different options
 

//The property here is to make the error message hidden because the user did not type anything yet
setProperty("errorMessage","hidden",true);

//This is the event that occurs when you type the enter key
//It runs it through  covidText() which also uses the covidCases() and covidDeaths() functions to generate a text
//Uses the list from stateURL to generate the state map image
onEvent("enterKey","click",function(){
  setImageURL("stateImage", stateURL(getText("stateDropdown")));
  setText("casesText", covidText(getText("stateDropdown"), getText("dateSelector")));
});

//This is a basic UI control to make the user go back to the home screen to have other inputs
onEvent("homeButton","click",function(){
  setScreen("homePage");
});

//This function is meant to create a filtered list out of the database
//We have the parameters where we input the state and date within the program
//After it runs the filtered list on a loop and creates an updated array, it returns the updated list back to the function for further use.
function covidCases(stateInput,dateInput){
  var stateList = getColumn("COVID-19 Cases per US State", "State");
  var covidList = getColumn("COVID-19 Cases per US State", "Total Confirmed Cases");
  var date = getColumn("COVID-19 Cases per US State", "Date");
  var updatedCases = [];

  for(var i = 0; i < stateList.length - 1; i++){
    if(stateInput == stateList[i]&& dateInput == date[i].substring(4, date.length)){
      updatedCases = covidList[i];
      setScreen("resultPage");
    }else{
      setProperty("errorMessage","hidden",false);
      
    }
  }
  return updatedCases;
}

////This function is meant to create a filtered list out of the database
//We have the parameters where we input the state and date within the program
//After it runs the filtered list on a loop and creates an updated array, it returns the updated list back to the function for further use.
function covidDeaths(stateInput,dateInput){
  var stateList = getColumn("COVID-19 Cases per US State", "State");
  var deathList = getColumn("COVID-19 Cases per US State", "Total Deaths");
  var date = getColumn("COVID-19 Cases per US State", "Date");
  var updatedDeaths = [];

  for(var i = 0; i < stateList.length - 1; i++){
    if(stateInput == stateList[i]&& dateInput == date[i].substring(4, date.length)){
      updatedDeaths = deathList[i];
      setScreen("resultPage");
    }else{
      setProperty("errorMessage","hidden",false);
      
    }
  }
  return updatedDeaths;
}

//This function is to put a URL image on the next page depicting which state the user selected.
//This function uses a parameter where you input a state, and based on that it runs it through a for loop to create a filtered list for the URL
//The function returns the filtered list "updatedMap" so we could use it in our program
function stateURL(stateInput){
  var stateList = getColumn("US States", "State Name");
  var mapList = getColumn("US States", "Map");
  var updatedMap = [];
  
  for(var i = 0; i < stateList.length - 1; i++){
    if(stateInput == stateList[i]){
      updatedMap = mapList[i];
    }
  }
  return updatedMap;
}

//This function is used to create the text for cases, deaths, states, and dates for the result page
//This function uses a single string variable which I typed the result for. It also uses parameters for user input
//This function returns the string so it could be set into the onEvent UI control
function covidText(stateText, dateText){
  var i = "";
  i = "Results for " + stateText + ":" + "\n" + "Total Covid-19 Cases: " + covidCases(stateText,dateText) + "\n" + "Total Deaths: " + covidDeaths(stateText,dateText)+ "\n" + "Date: " + dateText ; 
  return i;
}