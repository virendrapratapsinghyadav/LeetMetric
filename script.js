//  here listerner is added to document not on things written inside this 
 document.addEventListener("DOMContentLoaded", function(){

    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");

     function validateUserName(username){
    if(username.trim()===""){
        alert('Enter non- empty username')
        return false;
    }
    const regex = /^[a-zA-Z0-9_-]{1,15}$/;
    const isMatching = regex.test(username);
    if(!isMatching){
        alert("Invalid Username")
    }
    return isMatching;
 }

 searchButton.addEventListener('click', function(){
    const username = usernameInput.value;
    if(validateUserName(username)){
    console.log("loggin username: ",username);
    }
 })

 })







