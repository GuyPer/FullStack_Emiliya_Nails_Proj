import { useContext } from "react"
import "./LightMode.css"
import { MdDarkMode } from 'react-icons/md'
import {ThemeContext} from "../../../../context/ThemeContext"

export default function LightMode() {

  const theme=useContext(ThemeContext)

  return (
    <div className='LightMode'>
        <MdDarkMode onClick={theme?.handleLightDarkModes}/>
    </div>
  )
}
