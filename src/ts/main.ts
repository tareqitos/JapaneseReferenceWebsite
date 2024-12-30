interface Link {
    id: string;
    name: string;
    link: string;
    description: string;
    category: string;
}

const header = document.querySelector('header') as HTMLHeadingElement
const form = document.querySelector('.form') as HTMLFormElement
const input_field = document.getElementById("input-field") as HTMLInputElement;
const submit_button = document.querySelector(".btn") as HTMLButtonElement;
const links_container = document.querySelector(".links-container");


let links: Link[];
let categories = [];

const fetchAndInitializeLinks = async () => {
    const waiting_for_response = document.createElement('p');
    try {
        waiting_for_response.innerText = 'Loading links...';
        links_container.appendChild(waiting_for_response);

        const response = await fetch("./assets/json/links.json");
        const result = await response.json();
        links = result;

        links_container.removeChild(waiting_for_response);
        generateLinks();
        return result;
    } catch (err) {
        waiting_for_response.innerText = 'Failed to load links. Please try again later.';
        console.error("Error: " + err);
    }
};

const generateLinks = () => {
    links_container.innerHTML = '';
    updateLinks(links);
}

const updateLinks = (filtered_links: Link[]) => {
    links_container.innerHTML = '';

    links.filter((link) => !categories.includes(link.category) ? categories.push(link.category) : '')

    if (filtered_links.length === 0) {
        const empty_list_message = document.createElement("p")
        empty_list_message.classList.add('empty-list-message');
        empty_list_message.innerHTML = 'No results for ' + input_field.value;

        links_container.appendChild(empty_list_message);
        return;
    }

    const fragment = document.createDocumentFragment();

    categories.forEach((category) => {
        const anchor = document.createElement('anchor')
        anchor.classList.add('anchor')
        anchor.id = `${category}-id`

        const category_container = document.createElement('section')
        const category_name = document.createElement('h2')
        const links_list = document.createElement('ul')

        category_name.classList.add('category-title')
        links_list.classList.add('link-list')

        category_container.classList.add(`${category}-container`);
        category_name.innerText = category == 'beginner' ? category_name.innerText = 'Beginner essentials' : category.charAt(0).toUpperCase() + category.slice(1);

        category_container.appendChild(category_name)
        category_container.appendChild(links_list)

        filtered_links.forEach((link: Link) => {
            if (link.category.includes(category)) {
                const link_item_container = document.createElement("li")
                link_item_container.classList.add('link-item-container', `${category}`)


                const link_icon = createLinkIcon(category);

                const link_item = document.createElement("a");
                link_item.classList.add('link-item')
                link_item.id = link.category + '-' + link.id;
                link_item.href = link.link;
                link_item.innerText = link.name;
                link_item.target = 'blank'

                link_item_container.append(link_icon, link_item, ' - ' + link.description);
                links_list.appendChild(link_item_container)
            }
        });

        if (links_list.childElementCount > 0) {
            fragment.append(anchor, category_container);
        }
        // category_container.dataset.aos = 'fade-up'
        // category_container.dataset.aosDuration = '300'
        // category_container.dataset.aosAnchorPlacement = 'top-bottom'
    })

    links_container.appendChild(fragment)
}

function createLinkIcon(category: string): HTMLElement {
    const icon = document.createElement("i");
    const icon_classes = {
        'beginner': ["fa-solid", "fa-flag-checkered"],
        'dictionary': ["fa-solid", "fa-book"],
        'grammar': ["fa-solid", "fa-spell-check"],
        'vocabulary': ["fa-solid", "fa-language"],
        'reading': ["fa-solid", "fa-book-open"],
        'miscellaneous': ["fa-solid", "fa-bookmark"],
        'application': ["fa-solid", "fa-microchip"]
    };

    const classes = icon_classes[category];
    if (classes) {
        icon.classList.add(...classes);
    }
    return icon;
}

input_field.addEventListener("input", async () => {
    filterLinksByQuery();

    function filterLinksByQuery() {
        const query: string = input_field.value.trim();
        console.log(query);

        const filtered_links: Link[] = links.filter((link) => {
            return link.name.toLowerCase().includes(query.toLowerCase()) || link.description.toLowerCase().includes(query.toLowerCase());
        });

        updateLinks(filtered_links);
    }
});

form.addEventListener("submit", (event) => { event.preventDefault() });

const sidebar_button_open = document.querySelector('.open') as HTMLButtonElement;
const sidebar_button_close = document.querySelector('.close') as HTMLButtonElement;
const sidebar = document.querySelector('.sidebar-main') as HTMLDivElement


const handleSidebarToggle = (event: { preventDefault: () => void; }) => {
    if (!sidebar.classList.contains('active')) {
        setTimeout(() => {
            sidebar.classList.toggle('active')
        }, 10);
    
        sidebar.style.display = 'flex'
    } else {
        sidebar.classList.toggle('active')
    }
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 1200 && sidebar.classList.contains('active')) sidebar.classList.toggle('active')
})

sidebar_button_open.addEventListener("click", handleSidebarToggle)
sidebar_button_close.addEventListener("click", handleSidebarToggle)

const getElementScrollPosition = async () => {
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

const initializeScript = async () => {
    await fetchAndInitializeLinks()
    await getElementScrollPosition()
}

initializeScript();