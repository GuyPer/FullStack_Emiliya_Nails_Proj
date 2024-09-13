import { useContext } from "react";
import "./DarkMode.css";
import { IoSunny } from "react-icons/io5";
import {ThemeContext} from "../../../../context/ThemeContext";

export default function DarkMode() {

  const theme=useContext(ThemeContext)

  return (
    <div className="DarkMode">
      <IoSunny onClick={theme?.handleLightDarkModes}/>
    </div>
  );
}
