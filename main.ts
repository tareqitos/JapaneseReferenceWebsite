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
    try {
        const response = await fetch("links.json");
        const result = await response.json();
        links = await result;
        generateLinks();
        return result;
    } catch (err) {
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
    console.log(categories)

    categories.forEach((category) => {
        const category_container = document.createElement('div')
        const category_name = document.createElement('h2')
        category_container.classList.add(`${category}-container`);
        category_name.innerText = category;

        category_container.appendChild(category_name)

        filtered_links.forEach((link: Link) => {
            const link_item_container = document.createElement("div")
            link_item_container.classList.add('link-item-container')
            const link_item = document.createElement("a");
            const link_desc = document.createElement("p");
            link_item.id = link.category + '-' + link.id;
            link_item.href = link.link;
            link_item.innerText = link.name;
            link_desc.innerText = link.description;
            
            if (link.category === category) {
                category_container.appendChild(link_item_container)
            }
            link_item_container.append(link_item, link_desc);
        });
        links_container.append(category_container)
    })
    
}

input_field.addEventListener("input", async () => {
    filterLinksByQuery();

    function filterLinksByQuery() {
        const query: string = input_field.value.trim();
        console.log(query);

        const filtered_links: Link[] = links.filter((link) => {
            return link.name.toLowerCase().match(query.toLowerCase());
        });

        updateLinks(filtered_links);

        if (filtered_links.length === 0) {
            const empty_list_message = document.createElement("p")
            empty_list_message.classList.add('empty-list-message');
            empty_list_message.innerHTML = 'No results for ' + query;

            links_container.appendChild(empty_list_message);
        }
    }
});

form.addEventListener("submit", (event) => { event.preventDefault() });

fetchAndInitializeLinks()

