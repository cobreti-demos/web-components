import '@interfaces/window';
import Application from './application';


const app = new Application();

window.application = app;

app.init();
