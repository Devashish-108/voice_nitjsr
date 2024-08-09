import { LuConstruction } from "react-icons/lu";
import Logo from '../../../assets/img/under-construction.png'
import './under-construction.css'

export default function underConstructionHeader() {
  return (
    <div className='UnderConstructionMsg'>
        <img style={{ maxWidth: "30px" }} src={Logo}/> This Page is Still Under Construction <img style={{ maxWidth: "30px" }} src={Logo}/>
    </div>
  )
}
