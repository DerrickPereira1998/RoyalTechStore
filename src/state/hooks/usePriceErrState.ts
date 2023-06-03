import { useRecoilValue } from "recoil"
import { useSetRecoilState } from "recoil"
import { priceErrState } from '../atom'

const usePriceErrState = (password: string) => {
  const setPriceErr = useSetRecoilState<string>(priceErrState)
  function checkPrice(){
    
  }
  return useRecoilValue(priceErrState)
}
  
export default usePriceErrState