import { atom } from "recoil";

export const popupToggleState = atom<boolean>({
  key: 'popupToggleState',
  default: false
})