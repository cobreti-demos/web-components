import {describe, test, afterEach, vi, beforeEach, Mock, expect} from 'vitest';

import {MainComponent} from "./main.ts";
import {Application} from "../../application.ts";
import {BehaviorSubject} from "rxjs";
import {IApplication} from "@interfaces/application.ts";
import {JSDOM} from "jsdom";




function createDummyApplication() {
    const app = new Application();
    const initSubject = new BehaviorSubject<IApplication|null>(null);
    vi.spyOn(app, 'initObservable', 'get').mockReturnValue(initSubject);

    return {
        app,
        initSubject
    };
}


describe('MainComponent', async () => {

    let mockedDOM: JSDOM;

    beforeEach( () => {
        mockedDOM = new JSDOM();

        global.document = mockedDOM.window.document;
    });

    afterEach( () => {
        vi.clearAllMocks();
        vi.resetAllMocks();
        vi.resetModules();
        vi.restoreAllMocks();
    });

    test('make sure init function not called until app is ready', async () => {
        vi.spyOn(Application.prototype as any, 'constructor').mockImplementation(() => {});

        const app = new Application();
        const initSubject = new BehaviorSubject<IApplication|null>(null);
        vi.spyOn(app, 'initObservable', 'get').mockReturnValue(initSubject);

        const main = new MainComponent(app);

        const initSpy = vi.spyOn(main, 'init').mockImplementation(() => {
            console.log('called');
        });

        expect(initSpy).toHaveBeenCalledTimes(0);
    });

    test('make sure init function is called', async () => {
        vi.spyOn(Application.prototype as any, 'constructor').mockImplementation(() => {});

        const { app, initSubject } = createDummyApplication();

        // const app = new Application();
        // const initSubject = new BehaviorSubject<IApplication|null>(null);
        // vi.spyOn(app, 'initObservable', 'get').mockReturnValue(initSubject);

        const main = new MainComponent(app);

        const initSpy = vi.spyOn(main, 'init').mockImplementation(() => {
            console.log('called');
        });

        initSubject.next(app);

        expect(initSpy).toHaveBeenCalled();
    });


    test('make sure init function is called only once', async () => {
        vi.spyOn(Application.prototype as any, 'constructor').mockImplementation(() => {});

        const { app, initSubject } = createDummyApplication();

        // const app = new Application();
        // const initSubject = new BehaviorSubject<IApplication|null>(null);
        // vi.spyOn(app, 'initObservable', 'get').mockReturnValue(initSubject);

        const main = new MainComponent(app);

        const initSpy = vi.spyOn(main, 'init').mockImplementation(() => {
            console.log('called');
        });

        initSubject.next(app);
        initSubject.next(app);

        expect(initSpy).toHaveBeenCalled();
        expect(initSpy).toHaveBeenCalledTimes(1);
    });

    test('html should not be added if app id element not found', async() => {

        const { app, initSubject } = createDummyApplication();

        const main = new MainComponent(app);

        initSubject.next(app);

        const mainComponentElm = global.document.querySelectorAll('.form-container');

        expect(mainComponentElm).toHaveLength(0);
    });

    test('HTML and style should  be added if app id element exists', async() => {
        const { app, initSubject } = createDummyApplication();

        const main = new MainComponent(app);

        mockedDOM = new JSDOM("<div id='root'></div>");
        global.document = mockedDOM.window.document;

        initSubject.next(app);

        expect(app.rootElm).not.toBeNull();

        const mainComponentElm = app.rootElm?.querySelectorAll('.form-container');
        const styleElm = app.rootElm?.querySelectorAll('style')

        expect(mainComponentElm).toHaveLength(1);
        expect(styleElm).toHaveLength(1);
    });

    test('event listener added if form found', async() => {
        const { app, initSubject } = createDummyApplication();

        mockedDOM = new JSDOM(`<div id='root'>
                                    <div class='form'></div>
                                </div>`);
        global.document = mockedDOM.window.document;

        const formElm = global.document.querySelector('.form');

        expect(formElm).not.toBeNull();
        if (formElm) {
            const spyFormElm = vi.spyOn(formElm, 'addEventListener');
            const main = new MainComponent(app);

            initSubject.next(app);

            const mainComponentElm = app.rootElm?.querySelectorAll('.form-container');

            expect(mainComponentElm).toHaveLength(1);
            expect(spyFormElm).toBeCalled();
        }
    });

    test('console log called when event triggered', async() => {
        const { app, initSubject } = createDummyApplication();

        mockedDOM = new JSDOM(`<div id='root'>
                                    <div class='form'></div>
                                </div>`);
        global.document = mockedDOM.window.document;

        const formElm = global.document.querySelector('.form');

        expect(formElm).not.toBeNull();
        if (formElm) {
            const main = new MainComponent(app);

            initSubject.next(app);

            const mainComponentElm = app.rootElm?.querySelectorAll('.form-container');
            const ev = new mockedDOM.window.CustomEvent('state-changed', {
                bubbles: false
            });




            formElm.dispatchEvent(ev);

            expect(mainComponentElm).toHaveLength(1);
        }
    });


});
