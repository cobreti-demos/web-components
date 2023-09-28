import {afterEach, beforeEach, describe, test, vi, expect} from 'vitest';
import { JSDOM } from 'jsdom';
import {AddressForm} from "./address-form.ts";
import * as RxJxModule from 'rxjs';

describe('address-form', async () => {

    beforeEach(() => {
        vi.useFakeTimers();
    })

    afterEach(()=> {
        vi.clearAllMocks();
        vi.resetAllMocks();
        vi.resetModules();
        vi.restoreAllMocks();
        vi.useRealTimers();
    })

    test('connected callback add nodes', async () => {

        const mockedDOM = new JSDOM(`<div class="root"></div>`);

        const form = new AddressForm();

        global.document = mockedDOM.window.document;
        const rootElm = document.querySelector('.root');

        expect(rootElm).not.toBeNull();

        if (rootElm) {
            form.connectedCallback(rootElm);

            const formElm = rootElm.querySelector('.address-form');
            const styleElm = rootElm.querySelector('style');

            expect(formElm).not.toBeNull();
            expect(styleElm).not.toBeNull();
        }
    });

    test('connected callback register event listeners', async () => {
        const mockedDOM = new JSDOM(`<div class="root"></div>`);
        const form = new AddressForm();

        const spyFromEvent = vi.spyOn(RxJxModule, 'fromEvent');

        global.document = mockedDOM.window.document;
        const rootElm = document.querySelector('.root');

        expect(rootElm).not.toBeNull();

        if (rootElm) {
            form.connectedCallback(rootElm);

            expect(spyFromEvent).toBeCalledTimes(3);
        }

    });

    test('postal code change event', async () => {
        const mockedDOM = new JSDOM(`<div class="root"></div>`);

        const form = new AddressForm();

        const spyPostalCodeChange = vi.spyOn(form as any, 'onPostalCodeChanged');

        global.document = mockedDOM.window.document;
        const rootElm = document.querySelector('.root');

        expect(rootElm).not.toBeNull();

        if (rootElm) {
            form.connectedCallback(rootElm);

            const postalCodeInput = rootElm.querySelector('#postal-code') as HTMLInputElement;

            expect(postalCodeInput).not.toBeNull();

            postalCodeInput.value = 'test';
            postalCodeInput.dispatchEvent(
                new mockedDOM.window.Event('input', { bubbles: false, cancelable: true })
            );

            vi.advanceTimersByTime(form.debounceTime);

            expect(spyPostalCodeChange).toBeCalled();
            expect(form.state).toEqual({postalCode: 'test'});
        }
    });

    test('address change event', async () => {
        const mockedDOM = new JSDOM(`<div class="root"></div>`);

        const form = new AddressForm();

        const spyAddressChanged = vi.spyOn(form as any, 'onAddressChanged');

        global.document = mockedDOM.window.document;
        const rootElm = document.querySelector('.root');

        expect(rootElm).not.toBeNull();

        if (rootElm) {
            form.connectedCallback(rootElm);

            const addressInput = rootElm.querySelector('#address') as HTMLInputElement;

            expect(addressInput).not.toBeNull();

            addressInput.value = 'new address';
            addressInput.dispatchEvent(
                new mockedDOM.window.Event('input', { bubbles: false, cancelable: true })
            );

            vi.advanceTimersByTime(form.debounceTime);

            expect(spyAddressChanged).toBeCalled();
            expect(form.state).toEqual({address: 'new address'});
        }
    });

    test('city change event', async () => {
        const mockedDOM = new JSDOM(`<div class="root"></div>`);

        const form = new AddressForm();

        const spyCityChanged = vi.spyOn(form as any, 'onCityChanged');

        global.document = mockedDOM.window.document;
        const rootElm = document.querySelector('.root');

        expect(rootElm).not.toBeNull();

        if (rootElm) {
            form.connectedCallback(rootElm);

            const cityInput = rootElm.querySelector('#city') as HTMLInputElement;

            expect(cityInput).not.toBeNull();

            cityInput.value = 'new city';
            cityInput.dispatchEvent(
                new mockedDOM.window.Event('input', { bubbles: false, cancelable: true })
            );

            vi.advanceTimersByTime(form.debounceTime);

            expect(spyCityChanged).toBeCalled();
            expect(form.state).toEqual({city: 'new city'});
        }
    });

    test('state change lead to dispatch custom event', async () => {
        const mockedDOM = new JSDOM(`<div class="root"></div>`);

        const form = new AddressForm();

        global.document = mockedDOM.window.document;
        const rootElm = document.querySelector('.root');

        expect(rootElm).not.toBeNull();

        if (rootElm) {
            let dispatchedEvent: Event | null = null;

            form.dispatchEventObservable
                .subscribe((event) => {
                    dispatchedEvent = event;
                });

            form.connectedCallback(rootElm);

            form.updateState({
                city: 'test'
            });

            vi.advanceTimersByTime(form.stateEngine.updateDebounceTime);

            expect(dispatchedEvent).not.toBeNull();
        }
    });

    test('disconnectedCallback trigger disconnected event', async () => {

        const form = new AddressForm();

        let disconnectedCalled = false;

        form.disconnected.subscribe(() => { disconnectedCalled = true;})

        form.disconnectedCallback();

        expect(disconnectedCalled).toBeTruthy();
    });

    test('event handlers not added if DOM elements not present', async () => {

        const mockedDOM = new JSDOM(`<div class="root"></div>`);
        const form = new AddressForm();

        const spySetupDOM = vi.spyOn(form, 'setupDOM')
            .mockImplementation((parent: ParentNode) => {});
        const spyFromEvent = vi.spyOn(RxJxModule, 'fromEvent');

        global.document = mockedDOM.window.document;
        const rootElm = document.querySelector('.root');

        expect(rootElm).not.toBeNull();

        if (rootElm) {
            form.connectedCallback(rootElm);

            expect(spyFromEvent).not.toBeCalled();
        }
    });
})
