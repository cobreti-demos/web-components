import {afterEach, beforeEach, describe, expect, test, vi} from 'vitest';
import {render} from "@testing-library/react";
import {Header} from "@components/header/header.tsx";
import {userEvent} from "@testing-library/user-event";
import { JSDOM } from 'jsdom';

describe('header', async () => {

    const usernameValue = '1234567890';
    const passwordValue = '0987654321';

    beforeEach(() => {
    })

    afterEach(()=> {
        vi.clearAllMocks();
        vi.resetAllMocks();
        vi.resetModules();
        vi.restoreAllMocks();
    })

    test('callback called', async () => {
        const mockedDOM = new JSDOM(`<div id='header-container'></div>`);

        global.document = mockedDOM.window.document;

        const headerContainer = document.querySelector('#header-container') as HTMLElement;
        expect(headerContainer).not.toBeNull();

        if (headerContainer) {
            const {container} = render(<Header container={headerContainer}></Header>, {
                container: headerContainer
            });
            expect(container).toBeInTheDocument();

            const loginEvents: CustomEvent[] = [];

            vi.spyOn(headerContainer, 'dispatchEvent')
                .mockImplementation((ev) => {

                    if (ev.type == 'on-login') {
                        const cev = ev as CustomEvent;
                        loginEvents.push(cev);
                        return true;
                    }
                    return false;
                });

            const user = userEvent.setup({
                document: mockedDOM.window.document
            });

            const usernameInput = document.querySelector('input[id=username]') as HTMLInputElement;
            // const usernameInput = await screen.findByLabelText('username');
            expect(usernameInput).not.toBeNull();

            const pwdInput = document.querySelector('input[id=password]') as HTMLInputElement;
            expect(pwdInput).not.toBeNull();

            const submitBtn = document.querySelector('input[type=submit]');
            expect(submitBtn).not.toBeNull();

            //
            //  do not use vi.useFakeTimers(); with user.type
            //      it makes the test timeout
            //
            await user.type(usernameInput, usernameValue);
            await user.type(pwdInput, passwordValue);

            expect(submitBtn).toBeEnabled();

            if (submitBtn) {
                await user.click(submitBtn);
            }

            expect(loginEvents).toHaveLength(1);

            const firstEvent = loginEvents[0];
            expect(firstEvent).not.toBeNull();
            expect(firstEvent.detail?.credentials?.username).toEqual(usernameValue);
            expect(firstEvent.detail?.credentials?.password).toEqual(passwordValue);
            expect(firstEvent.cancelable).toBeTruthy();
            expect(firstEvent.bubbles).toBeTruthy();
            expect(firstEvent.composed).toBeTruthy();
        }
    })


    test('callback not called if container not specified', async () => {
        const mockedDOM = new JSDOM(`<div id='header-container'></div>`);

        global.document = mockedDOM.window.document;

        const headerContainer = document.querySelector('#header-container') as HTMLElement;
        expect(headerContainer).not.toBeNull();

        if (headerContainer) {
            const {container} = render(<Header></Header>, {
                container: headerContainer
            });
            expect(container).toBeInTheDocument();

            const loginEvents: CustomEvent[] = [];

            vi.spyOn(headerContainer, 'dispatchEvent')
                .mockImplementation((ev) => {

                    if (ev.type == 'on-login') {
                        const cev = ev as CustomEvent;
                        loginEvents.push(cev);
                        return true;
                    }
                    return false;
                });

            const user = userEvent.setup({
                document: mockedDOM.window.document
            });

            const usernameInput = document.querySelector('input[id=username]') as HTMLInputElement;
            // const usernameInput = await screen.findByLabelText('username');
            expect(usernameInput).not.toBeNull();

            const pwdInput = document.querySelector('input[id=password]') as HTMLInputElement;
            expect(pwdInput).not.toBeNull();

            const submitBtn = document.querySelector('input[type=submit]');
            expect(submitBtn).not.toBeNull();

            //
            //  do not use vi.useFakeTimers(); with user.type
            //      it makes the test timeout
            //
            await user.type(usernameInput, usernameValue);
            await user.type(pwdInput, passwordValue);

            expect(submitBtn).toBeEnabled();

            if (submitBtn) {
                await user.click(submitBtn);
            }

            expect(loginEvents).toHaveLength(0);
        }
    })
});
