import {Application} from "./application.ts";

let app: Application | null = null;

(async function() {
    app = new Application();

    await app.init();
})();

