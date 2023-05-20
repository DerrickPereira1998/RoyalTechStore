import { useSetRecoilState } from "recoil"
import {popupToggleState} from '../atom'

const useTogglePopup = () => {
  const togglePopup = useSetRecoilState(popupToggleState)
  return (() => {
    console.log('working')
    togglePopup(true)
  })
  
}

export default useTogglePopup