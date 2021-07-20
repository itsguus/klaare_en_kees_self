const availableBodyClasses = ["home", "over-ons", "werkwijze", "prijzen", "contact"];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function selectButton() {
    const urlParam_string = window.location.href,
        url = new URL(urlParam_string),
        urlParam = url.searchParams.get("view");
    selectedButton = document.querySelector(`header nav ul li input[value=${urlParam}]`);
    if(selectedButton) setBodyClass(selectedButton);
}
selectButton();

function setBodyClass(el) {
    const newName = el.value;
    for (const cls of availableBodyClasses) {
        document.body.classList.remove(cls);
    }
    document.body.classList.add(newName);
    addToUrl(newName);
    updateTitle(newName);
}

function updateTitle(name) {
    const baseTitle = "Klaar & Kees Media";
    name = capitalizeFirstLetter(name);
    if (name == "Home") {
        document.title = baseTitle;
    }
    else
        document.title = `${name} | ${baseTitle}`;
}

function addToUrl(name) {
    const baseurl = window.location.host;
    history.pushState({
        id: "Hoi"
    }, `${name} | Klaar & Kees Media`, `/?view=${name}`);
}

function clickToMail(e) {
    e.preventDefault();
    e.target.parentNode.classList.add("fly-over");
    const href = e.target.getAttribute('href');
    setTimeout( () => {
        window.location.href = href; 
        e.target.parentNode.classList.add("flown");
    }, 1200); 
    setTimeout( () => {
        e.target.parentNode.classList.remove("fly-over");
    }, 18000); 

    setTimeout( () => {
        e.target.parentNode.classList.remove("flown");
    }, 2000); 
}