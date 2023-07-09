const searchUserName = document.querySelector('[searchUserNameForm');
const searchIcon = document.querySelector('[searchIcon]');
const searchBar = document.querySelector('[searchBar]');
const searchBtn = document.querySelector('[searchBtn]');
const errorText = document.querySelector('[errorText]');
const profileImg = document.querySelector('[profile-Img]');
const profileName = document.querySelector('[profileName]');
const githubUserName = document.querySelector('[githubUserName]');
const joinDate = document.querySelector('[joinDate]');
const profileBio = document.querySelector('[profileBio]');
const repoNumber = document.querySelector('[repoNumber]');
const followersNumber = document.querySelector('[followersNumber]');
const followingNumbers = document.querySelector('[followingNumbers]');
const locationDetails = document.querySelector('[locationDetails]');
const websiteLink = document.querySelector('[websiteLink]');
const twitterID = document.querySelector('[twitterID]');
const companyName = document.querySelector('[companyName]');
const searchUserNameContainer = document.querySelector('.search-user-name-container');
const profileContentContainer = document.querySelector('.profile-content');
const locationImg = document.querySelector('[locationImg]');
const webLinkImg = document.querySelector('[webLinkImg]');
const twitterImg = document.querySelector('[twitterImg]');
const companyImg = document.querySelector('[companyImg]');


const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const defaultUser = "Man0sh-r0y";
getUserData(defaultUser);

searchUserName.addEventListener('submit', (event) => {
    event.preventDefault();// as I donot want to reload the page and submit anything
    const userName = searchBar.value;
    if (userName === "")
        return;
    getUserData(userName);
});

searchBar.addEventListener('input', () => {
    errorText.style.display = "none";// If I start typing anything then error msg will be disabled
});

searchBar.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        if (searchBar.value === "") {
            getUserData(searchBar.value);// If I press enter key then also I can get search result
        }
    }
});


async function getUserData(userName) {
    try {
        const response = await fetch(`https://api.github.com/users/${userName}`);
        const data = await response.json();
        renderUserData(data);
    }
    catch (error) {
        alert(error.message);
    }
}


function renderUserData(data) {

    if (data?.message === "Not Found") {
        errorText.textContent = "User not found";
        errorText.style.display = "block";
        errorText.style.color = "red";
        // errorText.style.position = "absolute";
        // errorText.style.left = "63%";
        errorText.style.marginBottom = "1rem";
        errorText.style.textAlign = "center";
        return;
    }

    errorText.style.display = "none";
    profileImg.src = data?.avatar_url;
    profileName.textContent = data?.name;
    githubUserName.href = `https://github.com/${data?.login}`;
    githubUserName.textContent = '@'+ data?.login;
    joinDate.textContent = `Joined ${new Date(data?.created_at).getDate()} ${month[new Date(data?.created_at).getMonth()]} ${new Date(data?.created_at).getFullYear()}`;
    profileBio.textContent = data?.bio;
    repoNumber.textContent = data?.public_repos;
    followersNumber.textContent = data?.followers;
    followingNumbers.textContent = data?.following;
    locationDetails.textContent = data?.location;
    websiteLink.href = data?.blog;
    websiteLink.textContent = data?.blog;
    twitterID.href = `https://twitter.com/${data?.twitter_username}`;
    twitterID.textContent = data?.twitter_username;
    companyName.textContent = data?.company;

    checkIfNotNull(data);// check if data is not null
}

function checkIfNotNull(data) {

    if(data?.location === null) 
        locationDetails.textContent = 'Not Available';
    
    if(data?.blog === "") 
        websiteLink.textContent = 'Not Available';
    
    if (data?.twitter_username === null) 
        twitterID.textContent = 'Not Available';
    
    if (data?.company === null) 
        companyName.textContent = 'Not Available';
    
}

// Apply dark mode

const themeMode = document.querySelector('.themmeSwitch-mode');// theme mode text
const themeIcon = document.querySelector('.themeSwitch-icon');// theme mode icon
let getTheme = JSON.parse(localStorage.getItem('PageTheme'));

if (getTheme === "DARK") {
    changeTheme();
} 

themeIcon.onclick = changeTheme;
themeMode.onclick = changeTheme;


function changeTheme() {
    document.body.classList.toggle('dark-theme');// if this class is present then remove it and if not then add it
    if (document.body.classList.contains('dark-theme')) 
        applyDarkMode();
    else 
        applyLightMode();
}

function applyDarkMode() {
    themeIcon.src = "assets/sun-icon.svg";
    themeMode.innerText = 'LIGHT';
    // chnaging properties of the elements
    searchUserNameContainer.style.boxShadow = 'none';
    profileContentContainer.style.boxShadow = 'none';
    profileImg.style.border = '3px solid #ffffff';
    searchIcon.style.filter = 'brightness(0) invert(1)';
    locationImg.style.filter = 'brightness(0) invert(1)';
    webLinkImg.style.filter = 'brightness(0) invert(1)';
    twitterImg.style.filter = 'brightness(0) invert(1)';
    companyImg.style.filter = 'brightness(0) invert(1)';
    githubUserName.style.color = '#87CEFA';
    // setting localStorage properties to save dark mode in browser
    localStorage.setItem('PageTheme', JSON.stringify("DARK"));
}

function applyLightMode() {
    themeIcon.src = "assets/moon-icon.svg";
    themeMode.innerText = 'DARK';
    // chnaging properties of the elements
    searchUserNameContainer.style.boxShadow = '1em 1em 1em 0em rgb(220, 213, 213)';
    profileContentContainer.style.boxShadow = '1rem 2rem 2rem 2rem rgba(204, 201, 201, 0.92)';
    profileImg.style.border = 'none';
    searchIcon.style.filter = 'none';
    locationImg.style.filter = 'none';
    webLinkImg.style.filter = 'none';
    twitterImg.style.filter = 'none';
    companyImg.style.filter = 'none';
    githubUserName.style.color = '#0079ff';
    // setting localStorage properties to save Light mode in browser
    localStorage.setItem('PageTheme', JSON.stringify("LIGHT"));
}


