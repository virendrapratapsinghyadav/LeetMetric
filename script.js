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
    const cardStatsContainer = document.querySelector(".stats-card");

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



 async function fetchUserDetails(username) {
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`
    try{
        searchButton.textContent = "Searching..";
        searchButton.disabled = true;
        const response = await fetch(url);
        const parsedData = await response.json();
        if(!response.ok){
            throw new Error("Unable to fetch user data")
        }
        
        console.log("Logging data: ",parsedData);
        displayUserData(parsedData);
    }

    catch(error){
          statsContainer.innerHTML = `<p>Data not Found</p>`;
    }

    finally{
        searchButton.textContent = "Search";
        searchButton.disabled = false;
    }
 }


 function displayUserData(userData){
        const easySolved = userData.easySolved || 0;
        const mediumSolved = userData.mediumSolved || 0;
        const hardSolved = userData.hardSolved || 0;

        const easytotal = userData.totalEasy; // avoid division by 0
        const mediumtotal = userData.totalMedium; 
        const hardtotal = userData.totalHard; 

        const easyPercent = (easySolved / easytotal) * 100;
        const mediumPercent = (mediumSolved / mediumtotal) * 100;
        const hardPercent = (hardSolved / hardtotal) * 100;

        easyProgressCircle.style.setProperty('--progress-degree', `${easyPercent}%`);
        mediumProgressCircle.style.setProperty('--progress-degree', `${mediumPercent}%`);
        hardProgressCircle.style.setProperty('--progress-degree', `${hardPercent}%`);

        easyLabel.innerHTML = `${easySolved}/${easytotal}<br>Easy`;
        mediumLabel.innerHTML = `${mediumSolved}/${mediumtotal}<br>Medium`;
        hardLabel.innerHTML = `${hardSolved}/${hardtotal}<br>Hard`;


        const cardsData = [
            {label: "Total Problems", value:userData.totalQuestions.toLocaleString()},
            {label: "Solved Problems", value:userData.totalSolved.toLocaleString()},
            {label: "Acceptance Rate", value:userData.acceptanceRate},
            {label: "Leetcode Ranking", value:userData.ranking.toLocaleString()}
        ]
        
        cardStatsContainer.innerHTML = cardsData.map(
            cdata=>
            `<div class="card">
            <h4>${cdata.label}</h4>
            <p>${cdata.value}</p>
            </div>`
        ).join("")


 }


  searchButton.addEventListener('click', function(){
    const username = usernameInput.value;
    if(validateUserName(username)){
        fetchUserDetails(username);
    console.log("loggin username: ",username);
    }
 })

 })







