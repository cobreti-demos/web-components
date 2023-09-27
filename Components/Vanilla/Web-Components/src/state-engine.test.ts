import {describe, expect, test, vi, beforeEach, afterEach} from 'vitest';
import {StateEngine} from "./state-engine.ts";
import {Subject} from "rxjs";

interface TestState {
    value1?: number,
    value2?: number
}

describe('state-engine', async () => {

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

    test('update should merge states', async () => {
        const stateEngine = new StateEngine<TestState>({});

        const spyNext = vi.spyOn(Subject.prototype as any, 'next');

        stateEngine.update({
            value1: 10
        });


        expect(stateEngine.state).toEqual({ value1: 10 });
        expect(spyNext).toBeCalled();
        expect(spyNext).toHaveBeenCalledTimes(1);
    });

    test('updating state calls onTick', async () => {
        const stateEngine = new StateEngine<TestState>({});
        const spyOnTick = vi.spyOn(stateEngine, 'onTick')
            .mockImplementation(() => {});

        stateEngine.update({
            value1: 8
        });

        vi.advanceTimersByTime(2000);

        expect(spyOnTick).toBeCalled();
        expect(spyOnTick).toBeCalledTimes(1);
    });

    test('updating state twice calls onTick only once', async () => {
        const stateEngine = new StateEngine<TestState>({});
        const spyOnTick = vi.spyOn(stateEngine, 'onTick')
            .mockImplementation(() => {});

        stateEngine.update({
            value1: 8
        });

        stateEngine.update({
            value2: 5
        });

        vi.advanceTimersByTime(2000);

        expect(spyOnTick).toBeCalled();
        expect(spyOnTick).toBeCalledTimes(1);
    });
});
