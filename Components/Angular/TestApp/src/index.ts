import './style.css'
import {Application} from "./application.ts";

(async function(){


    const app = new Application();

    window.application = app;

    await app.init();
}());


