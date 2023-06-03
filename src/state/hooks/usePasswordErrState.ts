import { useRecoilValue } from "recoil"
import { useSetRecoilState } from "recoil"
import { passwordErrState } from '../atom'

const usePasswordErrState = (password: string) => {
  const setPasswordErr = useSetRecoilState<string>(passwordErrState)
  function checkPassword(){
    
  }
  return useRecoilValue(passwordErrState)
}
  
  export default usePasswordErrState