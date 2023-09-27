import {describe, expect, test, vi, beforeEach, afterEach} from 'vitest';
import {StateChanges, StateEngine} from "./state-engine.ts";
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

    test('updating state trigger stateChangeObservable', async () => {
        const stateEngine = new StateEngine<TestState>({});

        let stateChangeData : StateChanges<TestState> | null = null;

        const onStateChange = vi.fn()
            .mockImplementation( (changes: StateChanges<TestState>) => {
                stateChangeData = changes;
            });

        stateEngine.stateChangeObservable
            .subscribe(onStateChange);

        stateEngine.update({
            value1: 5
        });

        vi.advanceTimersByTime(2000);


        expect(onStateChange).toBeCalled();
        expect(stateChangeData).not.toBeNull();

        if (stateChangeData) {
            const {state, oldState} = stateChangeData;

            expect(oldState).not.toBeNull();
            expect(oldState).toEqual({});
            expect(state).not.toBeNull();
            expect(state).toEqual({value1: 5});
        }
    });

    test('update is merging states', async () => {

        const stateEngine = new StateEngine<TestState>({ value1: 5});

        let stateChangeData: StateChanges<TestState> | null = null;

        const onStateChange = vi.fn()
            .mockImplementation((changes) => {
                stateChangeData = changes;
            });

        stateEngine.stateChangeObservable
            .subscribe(onStateChange);

        stateEngine.update({ value2: 10});

        vi.advanceTimersByTime(2000);

        expect(stateChangeData).not.toBeNull();

        if (stateChangeData) {
            const {state, changes, oldState} = stateChangeData;

            expect(oldState).toEqual({value1: 5});

            expect(state).toEqual({
                value1: 5,
                value2: 10
            });

            expect(changes).toEqual({value2: 10});
        }
    });
});
