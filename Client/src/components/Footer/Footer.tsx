import { useContext, useEffect } from "react";
import ConnectionLogosFooter from "./ConnectionLogosFooter/ConnectionLogosFooter";
import ContactUs from "./ContactUs/ContactUs";
import Copiright from "./Copiright/Copiright";
import "./Footer.css";
import QuickLinksFooter from "./QuickLinksFooter/QuickLinksFooter";
import { ThemeContext } from "../../context/ThemeContext";

export default function Footer() {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    theme?.loadThemeFromLS();
  }, [theme?.isLightMode]);

  return (
    <div className={`Footer ${theme?.isLightMode ? `light` : `dark`}`}>
      <ContactUs className="FooterContactUs" />
      <div className="footerMostElements">
        <Copiright />
        <ConnectionLogosFooter />
        <QuickLinksFooter />
      </div>
    </div>
  );
}
