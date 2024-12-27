interface Link {
    id: string;
    name: string;
    link: string;
    description: string;
    category: string;
}

const links_container = document.querySelector(".links-container");
let links: Link[];

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


fetchAndInitializeLinks()

const generateLinks = () => {
    links_container.innerHTML = '';
    let categories: string[] = [];
    // !categories.includes(link.category) ? categories.push(link.category) : '';
    updateLinks(links);
    console.log(categories)
}

const updateLinks = (filtered_links: Link[]) => {
    links_container.innerHTML = '';

    filtered_links.forEach((link: Link) => {
        const link_item_container = document.createElement("div")
        link_item_container.classList.add('link-item-container')
        const link_item = document.createElement("a");
        const link_desc = document.createElement("p");
        link_item.id = link.id;
        link_item.href = link.link;
        link_item.innerText = link.name;
        link_desc.innerText = link.description;

        links_container.appendChild(link_item_container);
        link_item_container.append(link_item, link_desc);
    });
} 

const form = document.querySelector('.form') as HTMLFormElement
const input_field = document.getElementById("input-field") as HTMLInputElement;
const submit_button = document.querySelector(".btn") as HTMLButtonElement;

input_field.addEventListener("input", async () => {
    filterLinksByQuery();

    function filterLinksByQuery() {
        const query: string = input_field.value.trim();
        console.log(query);

        const filtered_links: Link[] = links.filter((link) => {
            return link.name.toLowerCase().match(query.toLowerCase());
        });

        updateLinks(filtered_links);
    }
});





