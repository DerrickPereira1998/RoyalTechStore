import { useRecoilValue } from "recoil"
import {popupToggleState} from '../atom'

const usePopup = () => {
  return useRecoilValue(popupToggleState)
}

export default usePopup