import { categories } from "./main.js";

// Navbar scroll

export const getElementScrollPosition = async () => {
    const categories_pos = categories.map((category) => {
        const element = document.getElementById(`${category}-id`);
        return element ? Math.floor(element.getBoundingClientRect().top + window.scrollY) : 0;
    });

    let offset = 300;
    let activeCategoryIndex: number | null = null;

    window.addEventListener('scroll', () => {
        const scroll = window.scrollY + offset;

        categories_pos.forEach((category_pos, index) => {
            const navbar_category_item = document.querySelector(`.navbar-${categories[index]} a`);
            if (navbar_category_item) {
                if (category_pos < scroll) {
                    if (activeCategoryIndex !== index) {
                        if (activeCategoryIndex !== null) {
                            const previous_navbar_category_item = document.querySelector(`.navbar-${categories[activeCategoryIndex]} a`);
                            if (previous_navbar_category_item) {
                                previous_navbar_category_item.classList.remove('active');
                            }
                        }
                        navbar_category_item.classList.add('active');
                        activeCategoryIndex = index;
                    }
                } else {
                    navbar_category_item.classList.remove('active');
                }
            }
        });
    });
};

export function handleSidebar() {
    const sidebar_button_open = document.querySelector('.open') as HTMLButtonElement;
    const sidebar_button_close = document.querySelector('.close') as HTMLButtonElement;
    const sidebar = document.querySelector('.sidebar-main') as HTMLDivElement;

    const handleSidebarToggle = (event: { preventDefault: () => void; }) => {
        if (!sidebar.classList.contains('active')) {
            setTimeout(() => {
                sidebar.classList.toggle('active');
            }, 10);

            sidebar.style.display = 'flex';
        } else {
            sidebar.classList.toggle('active');
        }
    };

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1200 && sidebar.classList.contains('active')) sidebar.classList.toggle('active');
    });

    sidebar_button_open.addEventListener("click", handleSidebarToggle);
    sidebar_button_close.addEventListener("click", handleSidebarToggle);
}

