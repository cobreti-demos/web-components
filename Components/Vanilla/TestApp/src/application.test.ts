import {afterEach, beforeEach, describe, expect, it, test, vi, Mock } from 'vitest';
import { JSDOM } from 'jsdom';

import {Application} from './application.js';
import * as MainComponentModule from "./components/main/main.ts";
import {IApplication} from "@interfaces/application.ts";
import * as RxJsModule from "rxjs";


describe('Application', () => {

    let mockedFetch: Mock<any, any>;
    let mockedDOM: JSDOM;

    beforeEach(() => {
        mockedFetch = vi.fn();
        mockedDOM = new JSDOM();

        mockedFetch.mockReturnValue({
            ok: true,
            text: () => { return JSON.stringify([
                {
                    'url': 'value 1'
                }
            ])}
        });


        global.fetch = mockedFetch;
        global.document = mockedDOM.window.document;
    });

    afterEach( () => {
        vi.clearAllMocks();
        vi.resetAllMocks();
        vi.resetModules();
        vi.restoreAllMocks();
    });

    test('expect loadWebComponents to be called by init', async (context) => {
        const app = new Application();

        const loadWebComponentSpy = vi.spyOn(Application.prototype as any, 'loadWebComponents').mockImplementation(async () => {});

        await app.init();

        expect(loadWebComponentSpy).toHaveBeenCalled();

        loadWebComponentSpy.mockReset();
    });

    test('loadWebComponent fetch failed', async (context) => {
        mockedFetch.mockReturnValue({
            ok: false
        });

        const consoleErrorSpy = vi.spyOn(global.console, 'error').mockImplementation(() => {});

        const app = new Application();
        await app.init();

        expect(consoleErrorSpy).toHaveBeenCalled();
    });

    test('loadWebComponent fetch succeeded with 1 url', async (context) => {

        const app = new Application();
        await app.init();

        const scripts = document.head.getElementsByTagName('script');

        expect(scripts).toHaveLength(1);

        expect(scripts[0].src).toBe('value 1');
    });

    test('loadWebComponent fetch succeeded with 2 url', async (context) => {
        mockedFetch.mockReturnValue({
            ok: true,
            text: () => { return JSON.stringify([
                {
                    'url': 'value 1',
                },
                {
                    'url': 'value 2',
                }
            ])}
        });

        const app = new Application();
        await app.init();

        const scripts = document.head.getElementsByTagName('script');

        expect(scripts).toHaveLength(2);
        expect(scripts[0].src).toBe('value 1');
        expect(scripts[1].src).toBe('value 2');
    });

    test('expect main component to be created', async (context) => {

        const MainComponent = MainComponentModule.MainComponent;

        const t = MainComponent.prototype.constructor;
        const mockedMainComponent = vi.spyOn(MainComponentModule, 'MainComponent').mockImplementation((app : IApplication) => {
            return {} as MainComponentModule.MainComponent
        });

        const app = new Application();
        await app.init();

        expect(mockedMainComponent).toHaveBeenCalled();
    });

    test('init subject triggered', async () => {

        const BehaviorSubject = RxJsModule.BehaviorSubject;
        const mockedBehaviorSubject = vi.spyOn(BehaviorSubject.prototype as any, 'next').mockImplementation( () => {} );

        const app = new Application();
        await app.init();

        expect(mockedBehaviorSubject).toHaveBeenCalled();
        expect(mockedBehaviorSubject).toHaveBeenCalledTimes(1);
    });
})
