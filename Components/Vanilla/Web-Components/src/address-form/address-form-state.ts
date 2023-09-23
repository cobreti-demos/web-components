export interface AddressFormState {
    address?: string,
    city?: string,
    postalCode?: string
}

export type AddressFormStateKeys = Array<keyof AddressFormState>;