import '@interfaces/window';
import { Application } from './application';

(async function(){

    
    const app = new Application();

    window.application = app;

    await app.init();
}());


