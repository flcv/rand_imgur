
"use strict";

//GLOBALS... BAD PRACTICE USUALLY, BUT FINE FOR SUCH A SMALL SCRIPT
var breakLoop=false;
const startTime = Date.now();
var elapsedTime;
var harvestMode=false;
var len = 5;
//HTML ELEMENTS
var linkElement;
var butElement;
var harvestButElement;
var urlLenSliderElement;

window.onload = ()=>{

    //INITIALISE HTML ELEMENTS
    linkElement = document.getElementById("link");
    butElement = document.getElementById("but");
    harvestButElement = document.getElementById("but_harv");
    urlLenSliderElement = document.getElementById("URL_len");

    //INITIALISE SOME BASIC LOGIC
    document.getElementById("sliderVal").innerHTML = urlLenSliderElement.value;
    butElement.onclick = async()=>{harvestMode=false; len=urlLenSliderElement.value;newURL()};
    harvestButElement.onclick = async()=>{harvestMode=true; len=urlLenSliderElement.value;newURL()};

};


async function newURL(){

    butElement.onclick = ()=>{breakLoop=true};          //CLICKING EITHER BUTTON WHILE THE SCRIPT IS RUNNING
    harvestButElement.onclick = ()=>{breakLoop=true};   //WILL TERMINATE SCRIPT EXECUTION
    harvestButElement.innerText = "Finding an image... (0 secs)";
    butElement.innerText = "Harvesting images... (0 secs)";

    let text = '';
    let prefix = "https://i.imgur.com/";

    //GENERATE A RANDOM STRING OF LENGTH len (FROM THE SLIDER ON THE UI) THAT WILL BE APPENDED TO THE PREFIX
    for (let i = 0; i < len; i++) {
        text += '01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'[Math.floor(Math.random() * 62)];
    }
    let attemptURL = prefix + text + ".png";//suffix;

    //ELAPSED TIME
    elapsedTime = Date.now() - startTime;
    
    //CHANGE WHATEVER BUTTON WAS NOT CLICKED TO SAY "STOP"
    //IN REALITY, CLICKING EITHER BUTTON DURING EXECUTION WILL STOP THE SCRIPT
    if(!harvestMode){
        butElement.innerText = `Finding an image... (${elapsedTime/1000} secs)`;
        harvestButElement.innerText = `Stop`;
    } else {
        butElement.innerText = `Stop`;
        harvestButElement.innerText = `Harvesting images... (${elapsedTime/1000} secs)`;
    }

    //ATTEMPT TO FETCH THE IMAGE URL
    let res;
    try {
        res = await fetch(attemptURL);
    } catch(e){
        linkElement.innerText = "It may be possible Imgur has temporarily blocked you due to repeated image requests. Please try again later";
        return;
    }
    console.log(attemptURL);
    console.log(res);
    
    //IF THE GENERATED URL IS NOT VALID, IMGUR WILL RETURN THE BELOW "removed" URL
    //THUS, IF THIS IS NOT RETURNED, IT IS A VALID IMAGE
    if((res.url !== "https://i.imgur.com/removed.png" && !harvestMode)
    || breakLoop){ //THIS WILL ALSO RUN IF THE USER HAS CLICKED TO STOP SCRIPT EXECUTION
        
        //DISPLAY THE IMAGE ON SCREEN IF THIS PART OF CODE WAS RUN BECAUSE A VALID IMAGE WAS FOUND
        if(!breakLoop){
            document.getElementById("image_img").src = attemptURL;
            linkElement.innerHTML = `<a href=${attemptURL}>${attemptURL}</a>`;
        }
        butElement.innerText = "Show me a new image!";
        harvestButElement.innerText = "Harvest URLs";

        //RESET LOGIC
        breakLoop=false;
        butElement.onclick = async()=>{harvestMode=false; len=urlLenSliderElement.value;newURL()};
        harvestButElement.onclick = async()=>{harvestMode=true; len=urlLenSliderElement.value;newURL()};
        
        return; //EXIT SUCCESSFULLY
    } else if(res.url !== "https://i.imgur.com/removed.png"){
        //FOUND A VALID URL BUT IS IN "HARVEST" MODE, SO INSTEAD OF DISPLAYING THE IMAGE,
        //LIST ITS URL IN THE OUTPUT LOG
        document.getElementById("output").innerHTML+=`\n ${attemptURL} <a href=${attemptURL}>link</a>`;
        newURL(); //THEN REPEAT TO FIND A NEW URL
    } else {
        //THE GENERATED URL WAS INVALID, SO GENERATE A NEW ONE
        newURL();
    }
}
