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

    test('expect main component to be created', async (context) => {

        const MainComponent = MainComponentModule.MainComponent;

        const t = MainComponent.prototype.constructor;
        const mockedMainComponent = vi.spyOn(MainComponentModule, 'MainComponent').mockImplementation((app : IApplication) => {
            return {} as MainComponentModule.MainComponent
        });

        const app = new Application();

        vi.spyOn((app as any)._webComponentLoader, 'loadWebComponentsWithDirectoryUrl')
            .mockImplementation(async() => { });

        await app.init();

        expect(mockedMainComponent).toHaveBeenCalled();
    });

    test('init subject triggered', async () => {

        const BehaviorSubject = RxJsModule.BehaviorSubject;
        const mockedBehaviorSubject = vi.spyOn(BehaviorSubject.prototype as any, 'next').mockImplementation( () => {} );

        const app = new Application();

        vi.spyOn((app as any)._webComponentLoader, 'loadWebComponentsWithDirectoryUrl')
            .mockImplementation(async() => { });

        await app.init();

        expect(mockedBehaviorSubject).toHaveBeenCalled();
        expect(mockedBehaviorSubject).toHaveBeenCalledTimes(1);
    });

    test('rootElm returns null if no root id found', async () => {
        const app = new Application();

        vi.spyOn((app as any)._webComponentLoader, 'loadWebComponentsWithDirectoryUrl')
            .mockImplementation(async() => { });


        await app.init();

        expect(app.rootElm).toBeNull();
    });

    test('rootElm returns the element with id root', async () => {
        mockedDOM = new JSDOM("<div id='root'></div>");
        global.document = mockedDOM.window.document;

        const app = new Application();

        vi.spyOn((app as any)._webComponentLoader, 'loadWebComponentsWithDirectoryUrl')
            .mockImplementation(async() => { });

        await app.init();

        expect(app.rootElm).not.toBeNull();
    });
})
