
import { useContext, useEffect } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import './Header.css'
import NavbarMenu from './NavbarMenu/NavbarMenu'

export default function Header() {

  const theme = useContext(ThemeContext)

  useEffect(() => {
    theme?.loadThemeFromLS()
}, [theme?.isLightMode])


  return (
    <div className={`Header ${theme?.isLightMode?`light`:`dark`}`}>
      <NavbarMenu/>
    </div>
  )
}
