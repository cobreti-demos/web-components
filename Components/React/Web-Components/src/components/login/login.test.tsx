import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Login } from './login.tsx';


// declare global {
//     namespace jest {
//         interface Matchers<R> {
//             toBeValid(): R
//         }
//     }
// }

describe('login', async() => {

    it('basic login rendering', async () => {

        const { baseElement, container } = render(<Login></Login>);
        console.log('testing');
        expect(baseElement).toBeInTheDocument();

        const inputElms = container.querySelectorAll('input');
        const submitBtn = container.querySelector('input[type=submit]');
        expect(inputElms).toHaveLength(3);
        expect(submitBtn).toBeDisabled();
    })
});

