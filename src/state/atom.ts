import { atom } from "recoil";

export const passwordErrState = atom<string>({
    key: 'passwordErrState',
    default: ""
})

export const priceErrState = atom<string>({
    key: 'priceErrState',
    default: ""
})

export const lettersErrState = atom<string>({
    key: 'lettersErrState',
    default: ""
})