import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Login} from './login.tsx';
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
        const user = userEvent.setup();
        const usernameInput = container.querySelector('input[id=username]') as HTMLInputElement;
        expect(usernameInput).not.toBeNull();

        const pwdInput = container.querySelector('input[id=password]') as HTMLInputElement;
        expect(pwdInput).not.toBeNull();

        const submitBtn = container.querySelector('input[type=submit]');
        expect(submitBtn).not.toBeNull();

        //
        //  do not use vi.useFakeTimers(); with user.type
        //      it makes the test timeout
        //
        await user.type(usernameInput, '1234567890');
        await user.type(pwdInput, '1234567890');

        expect(submitBtn).toBeEnabled();
    });

    test('submit button trigger event', async () => {

        const usernameValue = '1234567890';
        const passwordValue = '0987654321';

        const onLogin = vi.fn();

        const { container } = render(<Login onLogin={onLogin}></Login>);
        const user = userEvent.setup();

        const usernameInput = container.querySelector('input[id=username]') as HTMLInputElement;
        expect(usernameInput).not.toBeNull();

        const pwdInput = container.querySelector('input[id=password]') as HTMLInputElement;
        expect(pwdInput).not.toBeNull();

        const submitBtn = container.querySelector('input[type=submit]');
        expect(submitBtn).not.toBeNull();

        await user.type(usernameInput, usernameValue);
        await user.type(pwdInput, passwordValue);

        expect(submitBtn).toBeEnabled();

        if (submitBtn) {
            await user.click(submitBtn);
        }

        expect(onLogin).toHaveBeenCalledWith({
            username: usernameValue,
            password: passwordValue
        });
    });

    test('submit button does not trigger event', async () => {

        const usernameValue = '1234567890';
        const passwordValue = '0987654321';

        const onLogin = vi.fn();

        const { container } = render(<Login></Login>);
        const user = userEvent.setup();

        const usernameInput = container.querySelector('input[id=username]') as HTMLInputElement;
        expect(usernameInput).not.toBeNull();

        const pwdInput = container.querySelector('input[id=password]') as HTMLInputElement;
        expect(pwdInput).not.toBeNull();

        const submitBtn = container.querySelector('input[type=submit]');
        expect(submitBtn).not.toBeNull();

        await user.type(usernameInput, usernameValue);
        await user.type(pwdInput, passwordValue);

        expect(submitBtn).toBeEnabled();

        if (submitBtn) {
            await user.click(submitBtn);
        }

        expect(onLogin).not.toHaveBeenCalled();
    });
});

