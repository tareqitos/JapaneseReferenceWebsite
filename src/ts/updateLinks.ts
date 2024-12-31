import {links, categories, links_container} from "./main.js"

interface Link {
    id: string;
    name: string;
    link: string;
    description: string;
    category: string;
}

const input_field = document.getElementById("input-field") as HTMLInputElement;

export const updateLinks = (filtered_links: Link[]) => {
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