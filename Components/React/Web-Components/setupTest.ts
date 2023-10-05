import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

//
//  Those declarations are taken from
//      @testing-library/jest-dom/matchers.d.ts
//  they are needed to extends type for TS syntax
//
declare global {
    namespace jest {
        interface Matchers<R> {
            toBeValid(): R
            toBeInTheDocument(): R
            toBeVisible(): R
            toBeDisabled(): R
            toBeEnabled(): R
        }
    }
}
