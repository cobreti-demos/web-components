import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Login } from './login.tsx';
import { userEvent } from '@testing-library/user-event';

describe('login', async() => {

    beforeEach(() => {
    })

    afterEach(()=> {
        vi.clearAllMocks();
        vi.resetAllMocks();
        vi.resetModules();
        vi.restoreAllMocks();
    })

    test('basic login rendering', async () => {

        const { container } = render(<Login></Login>);
        expect(container).toBeInTheDocument();

        const inputElms = container.querySelectorAll('input');
        const submitBtn = container.querySelector('input[type=submit]');
        expect(inputElms).toHaveLength(3);
        expect(submitBtn).not.toBeNull();
        expect(submitBtn).toBeDisabled();
    });

    test('button enabled with valid inputs', async () => {
        const { container } = render(<Login></Login>);
        const user = userEvent.setup({
            delay: null,
            document: global.document,

        });
        const usernameInput = container.querySelector('input[id=username]') as HTMLInputElement;
        expect(usernameInput).not.toBeNull();

        const pwdInput = container.querySelector('input[id=password]') as HTMLInputElement;
        expect(pwdInput).not.toBeNull();

        const submitBtn = container.querySelector('input[type=submit]');
        expect(submitBtn).not.toBeNull();

        await user.type(usernameInput, '1234567890');
        await user.type(pwdInput, '1234567890');

        expect(submitBtn).not.toBeDisabled();
    });
});

