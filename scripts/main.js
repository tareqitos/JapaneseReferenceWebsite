
// SIDEBAR //
toggleSidebar();

function toggleSidebar(){
    const button = document.getElementById("open-btn");
    const mainArea = document.getElementById("main");
    const sidebar = document.getElementById('sidebar');
    let isNavOpen;

    if(button === null || mainArea === null) {
        return;
    }

    button.addEventListener('click', () => {
        button.classList.toggle('open-btn--active');
        
        if (button.classList.contains('open-btn--active')) {
            isNavOpen = true;
            openNav();

        } else {
            isNavOpen = false;
            closeNav();
        }

        console.log("sidebar bool: " + isNavOpen);
    });

    mainArea.addEventListener('click', () => {
        if (button.classList.contains('open-btn--active')) {
            button.classList.toggle('open-btn--active');
        }
        isNavOpen = false;        
        closeNav();
    });

    sidebar.addEventListener('click', () => {
        if (button.classList.contains('open-btn--active')) {
            button.classList.toggle('open-btn--active');
        }
        isNavOpen = false;
        closeNav();
    });

}

function openNav(){
    const sidebar = document.getElementById('sidebar');
    sidebar.style.opacity = 1;
    sidebar.style.top = 75 + "px";
    sidebar.style.overflowY = "visible";
}

function closeNav(){
    const sidebar = document.getElementById('sidebar');
    sidebar.style.opacity = 0;
    sidebar.style.top = -400 + "px";
    setTimeout(function(){
        sidebar.style.overflowY = "hidden";
        console.log("I am the third log after 5 seconds");
    }, 50);
}

function navPositionRight(){
    const nav = document.getElementById('nav-sticky');
    const footer = document.getElementById('footer');
    const main = document.getElementById('main');

    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150 && window.innerWidth < 600) {
        if (nav.parentNode) {
            nav.parentNode.removeChild(nav);
        }
        // Insérez-le avant le footer
        footer.parentNode.insertBefore(nav, footer);
        nav.style.top = null;
        nav.style.bottom =  15 + "px";
        nav.style.marginBottom = 2 + "em";
    } else {
        if (nav.parentNode) {
            nav.parentNode.removeChild(nav);
        }
        // Insérez-le avant le main
        main.parentNode.insertBefore(nav, main);
        nav.style.top = 15 + "px";
        nav.style.bottom =  null;
    }
}

// COLLAPSE CATEGORY //

collapseCategories();

function collapseCategories(){

    document.querySelectorAll('.collapse-button').forEach(button => {
        const collapseContent = button.nextElementSibling;
        button.addEventListener('click', () => {
            
            button.classList.toggle('collapse-button--active');
    
            if (button.classList.contains('collapse-button--active')) {
                collapseContent.style.maxHeight = 0;
                collapseContent.style.opacity = 0;
                collapseContent.style.marginTop = 0;
                collapseContent.style.overflowY = "hidden";

                window.addEventListener('resize', () => {
                    collapseContent.style.maxHeight = 0;
                });

            } else {
                collapseContent.style.maxHeight = collapseContent.scrollHeight + 'px';
                collapseContent.style.opacity = 1;
                collapseContent.style.marginTop = 40 + 'px';
                collapseContent.style.overflowY = "visible";
                
                if (collapseContent.style.maxHeight !== 0) {
                    window.addEventListener('resize', () => {
                        collapseContent.style.maxHeight = collapseContent.scrollHeight + 'px';
                    });
                }
            }
        });
    });
}

// BACK TO TOP BUTTON //

const backToTopButton = document.getElementById("back-to-top");
const footer = document.getElementById("footer");

window.onscroll = function(){
    scrollFunction();
    navPositionRight();
};

backToTopButton.addEventListener("click", backToTop)

backToTopButton.addEventListener("scoll", (event) => {
    console.log(backToTopButton.scrollTop);
});


function isFooterVisible(){
    const rect = footer.getBoundingClientRect();
    return rect.top <= window.innerHeight + 50;
}

function scrollFunction(){
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150 && !isFooterVisible()) {
        backToTopButton.style.opacity = 1;
        backToTopButton.style.zIndex = 99;
    }else {
        backToTopButton.style.opacity = 0;
        backToTopButton.style.zIndex = -99;
    }
}

function backToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// COLOR SCHEME //

darkTheme();

function darkTheme(){
    const html = document.getElementsByTagName("html")[0];
    const themeSwitch = document.getElementById("theme-logo");
    const autoDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

    // Fonction pour définir le thème et enregistrer la préférence de l'utilisateur
    function setTheme(theme) {
        if(theme === "dark"){
            html.classList.toggle("nightMode");
            themeSwitch.innerHTML = "明";
            localStorage.setItem("themePreference", "dark");
        }else{
            html.classList.remove("nightMode");
            themeSwitch.innerHTML = "暗";
            localStorage.setItem("themePreference", "light");
        }
    }
    
    // Vérifie s'il y a une préférence de thème enregistrée dans localStorage
    const userThemePreference = localStorage.getItem("themePreference");

    if (userThemePreference) {
        setTheme(userThemePreference); // Si une préférence utilisateur est enregistrée, utilisez-la
    } else if (autoDarkTheme.matches) {
        setTheme("dark"); // Sinon, utilisez le thème automatique
    } else {
        setTheme("light");
    }

    themeSwitch.addEventListener("click", () => {
        html.classList.contains("nightMode");
        if(html.classList.contains("nightMode")){
            setTheme("light");
        }else{
            setTheme("dark");
        }
    });
}


