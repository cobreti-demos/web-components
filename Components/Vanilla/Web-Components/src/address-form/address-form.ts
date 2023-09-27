import {Subject, debounceTime, fromEvent, takeUntil, Observable} from 'rxjs';
import template from './address-form.html?raw';
import styles from './address-form.scss?inline';
import { AddressFormState } from './address-form-state';
import { StateEngine } from '../state-engine';


export class AddressForm {

    private _debounceTime = 500;

    private _stateEngine: StateEngine<AddressFormState> = new StateEngine<AddressFormState>({});
    private _disconnected$ = new Subject<void>();
    private _dispatchEvent$ = new Subject<Event>();

    constructor() {
    }

    get state() : AddressFormState { return this._stateEngine.state; }
    get debounceTime(): number { return this._debounceTime; }

    get dispatchEventObservable() : Observable<Event> { return this._dispatchEvent$; }

    connectedCallback(parent: ParentNode) {
        const templateNode = document.createElement('template');
        templateNode.innerHTML = template;

        const styleNode = document.createElement('style');
        styleNode.textContent = styles;

        parent.appendChild(styleNode);
        parent.appendChild(templateNode.content.cloneNode(true));

        const postalCodeElm = parent.querySelector('#postal-code') as HTMLInputElement;
        if (postalCodeElm) {
            fromEvent(postalCodeElm, 'input')
                .pipe(
                    debounceTime(this._debounceTime),
                    takeUntil(this._disconnected$))
                .subscribe(ev => this.onPostalCodeChanged(postalCodeElm, ev));
        }

        const addressElm = parent.querySelector('#address') as HTMLInputElement;
        if (addressElm) {
            fromEvent(addressElm, 'input')
                .pipe(
                    debounceTime(this._debounceTime),
                    takeUntil(this._disconnected$))
                .subscribe(ev => this.onAddressChanged(addressElm, ev));
        }

        const cityElm = parent.querySelector('#city') as HTMLInputElement;
        if (cityElm) {
            fromEvent(cityElm, 'input')
                .pipe(
                    debounceTime(this._debounceTime),
                    takeUntil(this._disconnected$))
                .subscribe(ev => this.onCityChanged(cityElm, ev));
        }

        this._stateEngine.stateChangeObservable
            .pipe(takeUntil(this._disconnected$))
            .subscribe((data) => {
                this._dispatchEvent$.next(new CustomEvent('state-changed', {
                    detail: {
                        oldState: data.oldState,
                        changes: data.changes,
                        state: data.state
                    }
                }));
            });
    }

    disconnectedCallback() {
        console.log('disconnected');
        this._disconnected$.next();
    }

    private onPostalCodeChanged(elm: HTMLInputElement, ev: Event) {
        this.updateState({
            postalCode: elm.value
        });
    }

    private onAddressChanged(elm: HTMLInputElement, ev: Event) {
        this.updateState({
            address: elm.value
        });
    }

    private onCityChanged(elm: HTMLInputElement, ev: Event) {
        this.updateState({
            city: elm.value
        });
    }

    private updateState(newState: AddressFormState) {
        this._stateEngine.update(newState);
    }

}