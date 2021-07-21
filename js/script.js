const availableBodyClasses = ["home", "over-ons", "werkwijze", "prijzen", "contact"];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function selectButton() {
    const urlParam_string = window.location.href,
        url = new URL(urlParam_string),
        urlParam = url.searchParams.get("view");
    selectedButton = document.querySelector(`header nav ul li input[value=${urlParam}]`);
    if (selectedButton) setBodyClass(selectedButton);
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
    collapseMenu();
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
    setTimeout(() => {
        window.location.href = href;
        e.target.parentNode.classList.add("flown");
    }, 1200);
    setTimeout(() => {
        e.target.parentNode.classList.remove("fly-over");
    }, 18000);

    setTimeout(() => {
        e.target.parentNode.classList.remove("flown");
    }, 2000);
}

function collapseMenu() {
    document.querySelector("input.burger").checked = false;
}


var stoppedScrollTimer = setTimeout(()=>{}, 0),
    checkScrollDisabled = false;
function checkBoxScroll(el) {
    if(!checkScrollDisabled) {
        const x = el.scrollLeft,
        maxScrollLeft = el.scrollWidth - el.clientWidth,
        perc = x / maxScrollLeft * 100,
        amountOfDots = el.getAttribute('data-dots'),
        pos = getPositionBasedOnPercentage(perc, amountOfDots);
        
        setDotActive(el, pos);
        clearTimeout(stoppedScrollTimer); 
        stoppedScrollTimer = setTimeout(()=> {
            const roundedPerc = getPercBasedOnPos(pos, amountOfDots),
                scrollPerc = maxScrollLeft / 100  * roundedPerc ;

                el.scrollLeft = scrollPerc;
        }, 250);
    }
}

function scrollOnClick(el, pos) {
    checkScrollDisabled = true;
    {
        const x = el.scrollLeft,
        maxScrollLeft = el.scrollWidth - el.clientWidth,
        roundedPerc = getPercBasedOnPos(pos),
        scrollPerc = maxScrollLeft / 100  * roundedPerc;
        
        el.scrollLeft = scrollPerc;
        setDotActive(el, pos);
    }
    setTimeout(() => {checkScrollDisabled = false}, 500);
}

function setDotActive(ul, pos) {
    const dots = ul.parentNode.querySelectorAll(".dots .dot");
    dots.forEach(dots => {
        dots.classList.remove('active');
    })
    dots[pos].classList.add("active");
}

function getPercBasedOnPos(pos, amountOfDots) {
    if(amountOfDots == 3) {
        if(pos == 0) return 0;
        else if(pos == 1) return 50;
        else if(pos == 2) return 100;
    }
    else {
        if(pos == 0) return 0;
        return 100; 
    }
}

function getPositionBasedOnPercentage(percentage, amountOfDots) {
    if(amountOfDots == 3) {
        if (percentage >= 0 && percentage <= 33) return 0;
        else if (percentage > 33 && percentage <= 66) return 1;
        else if (percentage > 66 && percentage <= 100) return 2;
    }
    else {
        if (percentage >= 0 && percentage <= 50) return 0;
        if (percentage = 50 && percentage <= 100) return 1;
    }
}

document.querySelectorAll("ul.block").forEach(ul => {
    ul.addEventListener('scroll', (e) => {
        checkBoxScroll(e.target);
    })
});