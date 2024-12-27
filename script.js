const links_container = document.querySelector(".links-container");
let links;
const fetchAndInitializeLinks = async () => {
    try {
        const response = await fetch("links.json");
        const result = await response.json();
        links = await result;
        generateLinks();
        return result;
    }
    catch (err) {
        console.error("Error: " + err);
    }
};
const generateLinks = () => {
    links_container.innerHTML = '';
    let categories = [];
    // !categories.includes(link.category) ? categories.push(link.category) : '';
    updateLinks(links);
    console.log(categories);
};
const updateLinks = (filtered_links) => {
    links_container.innerHTML = '';
    filtered_links.forEach((link) => {
        const link_item_container = document.createElement("div");
        link_item_container.classList.add('link-item-container');
        const link_item = document.createElement("a");
        const link_desc = document.createElement("p");
        link_item.id = link.id;
        link_item.href = link.link;
        link_item.innerText = link.name;
        link_desc.innerText = link.description;
        links_container.appendChild(link_item_container);
        link_item_container.append(link_item, link_desc);
    });
};
const header = document.querySelector('header');
const form = document.querySelector('.form');
const input_field = document.getElementById("input-field");
const submit_button = document.querySelector(".btn");
form.addEventListener("submit", (event) => { event.preventDefault(); });
input_field.addEventListener("input", async () => {
    filterLinksByQuery();
    function filterLinksByQuery() {
        const query = input_field.value.trim();
        console.log(query);
        const filtered_links = links.filter((link) => {
            return link.name.toLowerCase().match(query.toLowerCase());
        });
        updateLinks(filtered_links);
        if (filtered_links.length === 0) {
            const empty_list_message = document.createElement("p");
            empty_list_message.classList.add('empty-list-message');
            empty_list_message.innerHTML = 'No results for ' + query;
            links_container.appendChild(empty_list_message);
        }
    }
});
fetchAndInitializeLinks();
