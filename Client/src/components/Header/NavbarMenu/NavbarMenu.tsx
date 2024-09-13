import "./NavbarMenu.css";

import DarkMode from "../Theme/DarkMode/DarkMode";
import LightMode from "../Theme/LightMode/LightMode";
import { CgShoppingCart } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CompanyLogo from "../CompanyLogo/CompanyLogo";
import SearchField from "../SearchField/SearchField";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { AuthContext } from "../../../context/AuthContext";

export default function NavbarMenu() {
  const theme = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  const [isOpenMenuForMobile, setIsOpenMenuForMobile] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const hamburgerRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    const menu = menuRef.current as HTMLElement | null;
    const hamburger = hamburgerRef.current;

    if (
      menu &&
      !menu.contains(target) &&
      hamburger &&
      !hamburger.contains(target)
    ) {
      setIsOpenMenuForMobile(false);
    }
  };

  useEffect(() => {
    if (isOpenMenuForMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenMenuForMobile]);

  const handleBurgerMenuForMobile = () => {
    setIsOpenMenuForMobile(!isOpenMenuForMobile);
  };

  const handleBurgerMenuForMobileAndForLogoPlusSearch = () => {
    if (isOpenMenuForMobile === true) {
      setIsOpenMenuForMobile(false);
    }
  };

  const isAdminUserConnected = () => {
    if (auth?.isAdmin) {
      const adminID = localStorage.getItem("userId");
      localStorage.setItem("userProfileByAdmin", `${adminID}`);
    }
  };

  const handleUserBtn = () => {
    isAdminUserConnected();
    auth?.loadUserFromLS();
    if (window.innerWidth < 768) {
      handleBurgerMenuForMobile();
    }
    navigate("/UserProfile");
  };

  return (
    <div className="NavbarMenu">
      {/*Navbar For Mobile */}
      <div className="navbarForMobile">
        <CompanyLogo onClick={handleBurgerMenuForMobileAndForLogoPlusSearch} />
        <SearchField onClick={handleBurgerMenuForMobileAndForLogoPlusSearch} />
        <div ref={hamburgerRef}>
          <RxHamburgerMenu onClick={handleBurgerMenuForMobile} />{" "}
        </div>
      </div>
      {isOpenMenuForMobile && (
        <div ref={menuRef} className={`openedNavbarAfterClickOnBurger}`}>
          {isOpenMenuForMobile && auth?.isAdmin && (
            <Link
              onClick={handleBurgerMenuForMobile}
              className="links clickWidthForMobile"
              to={"/users"}
            >
              חשבונות
            </Link>
          )}
          <Link
            onClick={handleBurgerMenuForMobile}
            className="links clickWidthForMobile"
            to={"/products"}
          >
            מוצרים
          </Link>
          <Link
            onClick={handleBurgerMenuForMobile}
            className="links clickWidthForMobile"
            to={"/gallery"}
          >
            גלריה
          </Link>
          <Link
            onClick={handleBurgerMenuForMobile}
            className="links clickWidthForMobile"
            to={"/contacts"}
          >
            יצירת קשר
          </Link>
          {!auth?.isSignedIn && (
            <div className="clickWidthForMobile">
              <div>
                <Link
                  onClick={handleBurgerMenuForMobile}
                  className="links clickWidthForMobile"
                  to={"/login"}
                >
                  התחברי
                </Link>
              </div>
              <div>
                <Link
                  onClick={handleBurgerMenuForMobile}
                  className="links clickWidthForMobile"
                  to={"/signUp"}
                >
                  הירשמי
                </Link>
              </div>
            </div>
          )}
          {auth?.isSignedIn && (
            <div className="navbarDivForSignedInForMobile">
              <Link
                onClick={handleBurgerMenuForMobile}
                className="links clickWidthForMobile"
                to={"shoppingCart"}
              >
                <CgShoppingCart />
              </Link>
              <div
                className="links clickWidthForMobile"
                onClick={() => handleUserBtn()}
              >
                <FaUser />
              </div>
              <Link
                onClick={handleBurgerMenuForMobile}
                className="links clickWidthForMobile"
                to={"userProfile/LikedProducts"}
              >
                <FaHeart />
              </Link>
            </div>
          )}
          <Link
            onClick={handleBurgerMenuForMobile}
            className="links clickWidthForMobile"
            to={"/about"}
          >
            אודות
          </Link>
          <div
            className="links clickWidthForMobile"
            onClick={handleBurgerMenuForMobile}
          >
            {theme?.isLightMode ? <LightMode /> : <DarkMode />}
          </div>
        </div>
      )}
      {/*Navbar For Desktop */}
      <div className="navbarForDesktop">
        {auth?.isSignedIn && (
          <div className="navbarDivForSignedIn">
            <Link className="links" to={"shoppingCart"}>
              <CgShoppingCart />
            </Link>
            <div onClick={() => handleUserBtn()}>
              <FaUser />
            </div>
            <Link className="links" to={"userProfile/LikedProducts"}>
              <FaHeart />
            </Link>
          </div>
        )}
        {!auth?.isSignedIn && (
          <div className="signupLoginDivForDesktop">
            <Link className="links loginForDesktop" to={"/login"}>
              התחברי
            </Link>
            <Link className="links signupForDesktop" to={"/signUp"}>
              הירשמי
            </Link>
          </div>
        )}
        <SearchField />
        <CompanyLogo />
        <Link className="links" to={"/about"}>
          אודות
        </Link>
        <Link className="links" to={"/contacts"}>
          יצירת קשר
        </Link>
        <Link className="links" to={"/gallery"}>
          גלריה
        </Link>
        <Link className="links" to={"/products"}>
          מוצרים
        </Link>
        {auth?.isAdmin && (
          <Link className="links" to={"/users"}>
            חשבונות
          </Link>
        )}
        {theme?.isLightMode ? <LightMode /> : <DarkMode />}
      </div>
    </div>
  );
}
