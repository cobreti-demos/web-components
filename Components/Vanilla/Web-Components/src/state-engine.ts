import { Observable, Subject, debounceTime } from "rxjs";
import { stateDiff } from "./state-diff";
import {StateChanges} from "@vanilla-web-component/api";


export class StateEngine<STATETYPE extends {}> {

    readonly _updateDebounceTime = 2000;

    _state: STATETYPE = {} as STATETYPE;
    _lastDispatchedState: STATETYPE = {} as STATETYPE;

    private _tickSubject = new Subject<void>();
    _dispatchUpdateSubject = new Subject<StateChanges<STATETYPE>>();

    constructor(initialState: STATETYPE) {
        this._state = initialState;
        this._lastDispatchedState = {...initialState};

        this._tickSubject
            .pipe(debounceTime(this._updateDebounceTime))
            .subscribe( x => {
                this.onTick();
            });
    }

    get updateDebounceTime() : number { return this._updateDebounceTime; }

    get stateChangeObservable(): Observable<StateChanges<STATETYPE>> {
        return this._dispatchUpdateSubject;
    }

    update(newState: STATETYPE) {
        this._state = { ...this._state, ...newState };

        this._tickSubject.next();
    }

    get state() { return this._state; }

    onTick() {
        const changes = stateDiff(this._state, this._lastDispatchedState);
        const oldState = this._lastDispatchedState;
        this._lastDispatchedState = {...this.state};

        this._dispatchUpdateSubject.next({
            oldState,
            state: this._state,
            changes
        });
    }
}
