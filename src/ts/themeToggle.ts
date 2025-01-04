export function toggleTheme() {
    const html = document.querySelector('html') as HTMLElement; 
    const toggle_theme_btns = document.querySelectorAll('.theme-toggle, .theme-toggle-sidebar')
    
    const get_stored_theme = localStorage.getItem('theme') ;

    let theme = 'light';

    get_stored_theme ?  theme = get_stored_theme : theme

    html.setAttribute('data-theme', theme);


    toggle_theme_btns.forEach((button) => {
        const icon = button.firstElementChild.classList;
        console.log(theme)
        theme == 'dark' ? icon.replace('fa-sun', 'fa-moon') : icon.replace('fa-moon', 'fa-sun')
        button.addEventListener('click', () => {
            switch (theme) {
                case 'dark': 
                theme = 'light'
                html.dataset.theme = theme
                icon.replace('fa-moon', 'fa-sun')
                break;
    
                case 'light': 
                theme = 'dark'
                html.dataset.theme = theme
                icon.replace('fa-sun', 'fa-moon')
                break;
            }
    
            localStorage.setItem('theme', theme)
        });
    })
}
