import {describe, test, afterEach, vi, beforeEach, Mock, expect} from 'vitest';

import {MainComponent} from "./main.ts";
import {Application} from "../../application.ts";
import {BehaviorSubject} from "rxjs";
import {IApplication} from "@interfaces/application.ts";

describe('MainComponent', async () => {

    beforeEach( () => {
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

        const app = new Application();
        const initSubject = new BehaviorSubject<IApplication|null>(null);
        vi.spyOn(app, 'initObservable', 'get').mockReturnValue(initSubject);

        const main = new MainComponent(app);

        const initSpy = vi.spyOn(main, 'init').mockImplementation(() => {
            console.log('called');
        });

        initSubject.next(app);

        expect(initSpy).toHaveBeenCalled();
    });


    test('make sure init function is called only once', async () => {
        vi.spyOn(Application.prototype as any, 'constructor').mockImplementation(() => {});

        const app = new Application();
        const initSubject = new BehaviorSubject<IApplication|null>(null);
        vi.spyOn(app, 'initObservable', 'get').mockReturnValue(initSubject);

        const main = new MainComponent(app);

        const initSpy = vi.spyOn(main, 'init').mockImplementation(() => {
            console.log('called');
        });

        initSubject.next(app);
        initSubject.next(app);

        expect(initSpy).toHaveBeenCalled();
        expect(initSpy).toHaveBeenCalledTimes(1);
    });
});
