// JavaScript function to handle tab switching and Snake game
function openTab(event, tabName) {
    // Declare all variables
    var i, tabContent, tabLinks;

    // Get all elements with class="tab-content" and hide them
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Get all elements with class="tab-link" and remove the class "active"
    tabLinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.classList.add("active");
    

    // Prevent the default anchor link behavior
    event.preventDefault();
}

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('rain');
if (myParam != null) {
    document.getElementById("headerName").classList.add('text-rainbow-animation');
}

