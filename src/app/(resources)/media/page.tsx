import { ResourcesTitle } from "@/app/components/resourcesTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faSpotify, IconDefinition } from "@fortawesome/free-brands-svg-icons";
import ScrollToHash from "@/utils/scrollToHash";
import '@/styles/resources.scss'
import Feedback from "@/app/components/feedback";
import Image from "next/image";


type Media = {
    id: number,
    uuid: string,
    name: string,
    description: string,
    link: string
    category: string,
    platform: string
    image: string,
    slug: string,
}

export default async function Media() {
    const API_URL = process.env.API_URL;

    await new Promise(resolve => setTimeout(resolve, 500));
    const response = await fetch(`${API_URL}api/resources/media`);
    const media = await response.json();

    const platforms_icons: { [key: string]: IconDefinition } = {
        'youtube': faYoutube,
        'spotify': faSpotify
    }

    return (
        <div className="resources-container">
            <ScrollToHash />
            <ResourcesTitle title="Japanese Media Library 💾" description="Explore various media resources to enhance your Japanese learning journey." />
            <Feedback
                title="Share your favorite Youtube channel or podcast 📀"
                categories={Object.keys(media)} />
            <hr className="resources-title-separator" />
            <div className="list-container media">
                {Object.keys(media).map((category, i) => (

                    <section key={i} className={`${media[category][0].slug}-container`}>
                        <a id={`${media[category][0].slug}-id`} className="anchor"></a>
                        <h2 className="category-title">{category}</h2>

                        <ul key={i} className="list-item-container media">
                            {media[category].map((item: Media) => (

                                <li key={item.uuid} className={`item-container ${item.slug} media`}>
                                    <Image src={item.image} alt={item.name} className="item-picture media" />
                                    <div className="item-infos">
                                        <a href={item.link} className="item media" target="_blank">{item.name} <FontAwesomeIcon className="icon" icon={platforms_icons[item.platform]} width={20} /></a>
                                        {item.description}
                                    </div>
                                    <Image src={item.image} alt={item.name} className="item-picture-bg" />
                                </li>

                            ))}
                        </ul>
                    </section>

                ))}
            </div>
        </div>
    )
}