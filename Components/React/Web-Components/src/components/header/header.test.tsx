import {afterEach, beforeEach, describe, expect, test, vi} from 'vitest';
import {render} from "@testing-library/react";
import {Header} from "@components/header/header.tsx";
import {userEvent} from "@testing-library/user-event";
import { JSDOM } from 'jsdom';

describe('header', async () => {

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

            const dispatchEventSpy = vi.spyOn(headerContainer, 'dispatchEvent');

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
            await user.type(usernameInput, '1234567890');
            await user.type(pwdInput, '1234567890');

            expect(submitBtn).toBeEnabled();

            if (submitBtn) {
                await user.click(submitBtn);
            }

            expect(dispatchEventSpy).toHaveBeenCalled();
        }
    })
});
