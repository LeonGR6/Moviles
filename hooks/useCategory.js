import { useContext } from 'react'
import SubstanceContext from '../context/categoryProvider.js'

 const useCategory = () => {
    return useContext(SubstanceContext) 
}
export default useCategory;