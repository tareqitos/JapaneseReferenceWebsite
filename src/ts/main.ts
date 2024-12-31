import { getElementScrollPosition, handleSidebar } from "./navbar.js";
import { updateLinks } from "./updateLinks.js";
import { toggleTheme } from "./themeToggle.js";

interface Link {
    id: string;
    name: string;
    link: string;
    description: string;
    category: string;
}

const form = document.querySelector('.form') as HTMLFormElement
const links_container = document.querySelector(".links-container");


let links: Link[] = [];
let categories: string[] = [];

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

form.addEventListener("submit", (event) => { event.preventDefault() });

const initializeScript = async () => {
    await fetchAndInitializeLinks()
    await getElementScrollPosition()
    handleSidebar();
}

initializeScript();

toggleTheme();
export {links, categories, links_container};