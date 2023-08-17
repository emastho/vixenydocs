import { browser } from "$app/environment";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function load() {
    let image;

    image = { src: "https://http.cat/200" }


    if (browser) {
        image = new Image()

        image.src = "https://http.cat/200"
    }

    await delay(2000);

    return {
        meow: image
    }

}