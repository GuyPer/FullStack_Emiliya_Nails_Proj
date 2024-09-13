import { Route, Routes } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./Default.css";
import Home from "../../pages/Home/Home";
import Gallery from "../../pages/Gallery/Gallery";
import About from "../../pages/About/About";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Products from "../../pages/Products/Products";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";
import UserProfile from "../../pages/User/UserProfile/UserProfile";
import EditUser from "../../pages/User/EditUser/EditUser";
import LikedProducts from "../../pages/LikedProducts/LikedProducts";
import ContactUsPage from "../../pages/ContactUsPage/ContactUsPage";
import EditProductByAdmin from "../../pages/EditProductByAdmin/EditProductByAdmin";
import PostNewProductByAdmin from "../../pages/PostNewProductByAdmin/PostNewProductByAdmin";
import UsersPageForAdmin from "../../pages/UsersPageForAdmin/UsersPageForAdmin";
import ShoppingCart from "../../pages/ShoppingCart/ShoppingCart";
import ThanksForBuyOnOurSite from "../../pages/ThanksForBuyOnOurSite/ThanksForBuyOnOurSite";
import EditGalleryImage from "../../pages/EditGalleryImage/EditGalleryImage";
import AddNewGalleryImage from "../../pages/AddNewGalleryImage/AddNewGalleryImage";
import ProductDetails from "../../pages/ProductDetails/ProductDetails";

export default function Default() {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    theme?.loadThemeFromLS();
  }, []);

  return (
    <div className="Default">
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/addGallery" element={<AddNewGalleryImage />} />
          <Route path="/gallery/editGallery" element={<EditGalleryImage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="userProfile/edituser" element={<EditUser />} />
          <Route path="shoppingCart" element={<ShoppingCart />} />
          <Route path="users" element={<UsersPageForAdmin />} />
          <Route path="userProfile/LikedProducts" element={<LikedProducts />} />
          <Route
            path="/products/EditProductByAdmin/:productId"
            element={<EditProductByAdmin />}
          />
          <Route
            path="/products/PostNewProductByAdmin"
            element={<PostNewProductByAdmin />}
          />
          <Route path="contacts" element={<ContactUsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route
            path="shoppingCart/purchased"
            element={<ThanksForBuyOnOurSite />}
          />
        </Routes>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
