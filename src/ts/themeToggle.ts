export function toggleTheme() {
    const html = document.querySelector('html');
    const toggle_theme_btn = document.querySelector('.theme-toggle');
    const toggle_theme_icon = toggle_theme_btn.firstElementChild;
    const get_stored_theme = localStorage.getItem('theme');

    let theme = 'dark';

    get_stored_theme ?  theme = get_stored_theme : theme

    html.setAttribute('data-theme', theme);

    const switchTheme = () => {
        if (theme == 'dark') {
            theme = 'light'
            html.dataset.theme = theme
            toggle_theme_icon.classList.replace('fa-moon', 'fa-sun')
        } else {
            theme = 'dark'
            html.dataset.theme = theme
            toggle_theme_icon.classList.replace('fa-sun', 'fa-moon')
        }
        localStorage.setItem('theme', theme)
    };

    toggle_theme_btn.addEventListener('click', switchTheme);
}
