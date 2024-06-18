import { createClient } from "@sanity/client";
import imageUrlBuilder  from "@sanity/image-url";

export const client = createClient({
    projectId: "rrgezjvo",
    dataset: "production",
    apiVersion: "2024-06-07",
    useCdn: true,
    token: import.meta.env.REACT_PUBLIC_SANITY_TOKEN

})


const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)