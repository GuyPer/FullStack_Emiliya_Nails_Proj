import "./Products.css";
import { useContext, useEffect, useState } from "react";
import {
  doDeleteProduct,
  doGetAllProducts,
} from "../../Services/ProductService";
import { IProduct } from "../../interfaces/ProductsInterfaces";
import { SearchContext } from "../../context/SearchContext";
import { LikedProductsContext } from "../../context/LikedProductContext";
import { AuthContext } from "../../context/AuthContext";
import { FaHeart } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastsContext } from "../../context/ToastsContext";
import AppButton from "../../components/AppButton/AppButton";
import Modal from "../Modal/Modal";

export default function Products() {
  const auth = useContext(AuthContext);
  const likedProduct = useContext(LikedProductsContext);
  const search = useContext(SearchContext);
  const toast = useContext(ToastsContext);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeletedProduct, setIsDeletedProduct] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    search?.setSearchVal("");
    const fetchAllProductsfromServer = async () => {
      setIsLoading(true);
      const { error, result } = await doGetAllProducts();
      if (error) {
        setError(error);
      } else if (result && Array.isArray(result.data)) {
        setProducts(result.data);
        setFilteredProducts(result.data); // Set initial filtered products to all products
      } else {
        console.error("Fetched data is not an array", result);
      }
      setIsLoading(false);
    };

    fetchAllProductsfromServer();
    setIsDeletedProduct(false);
  }, [isDeletedProduct === true]);

  useEffect(() => {
    if (likedProduct?.likedProductsArray) {
      const likedArrayToLS = JSON.stringify(likedProduct?.likedProductsArray);
      localStorage.setItem("likedProductssArray", `${likedArrayToLS}`);
    }
  }, [likedProduct?.likedProducts]);

  useEffect(() => {
    if (search?.searchVal) {
      // Filter products based on the search value
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(search.searchVal.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [search?.searchVal, products]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleLikedByUser = (productId: string) => {
    likedProduct?.likedProducts(productId);
  };

  const handlePostNewProductByAdmin = () => {
    navigate(`PostNewProductByAdmin`);
  };

  const handleEditProductByAdmin = (productId: string) => {
    navigate(`EditProductByAdmin/${productId}`);
  };

  const confirmDeleteProduct = async () => {
    if (productToDelete) {
      const { error, result } = await doDeleteProduct(productToDelete);
      if (error) {
        setError(error);
      } else if (result) {
        setIsDeletedProduct(true);
        setIsModalVisible(false);
        toast?.addToast("המוצר נמחק בהצלחה!");
      }
    }
  };

  const handleDeleteProductByAdmin = async (productId: string) => {
    setProductToDelete(productId);
    setIsModalVisible(true);
  };

  return (
    <div className="Products">
      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={confirmDeleteProduct}
        whatToDelete={"מוצר"}
      />
      {isLoading === true ? (
        <div className="loadingProducts">טוען מוצרים...</div>
      ) : (
        <div className="mainContainer">
          {auth?.isAdmin && (
            <AppButton
              classname="adminBtnForNewProduct"
              content={"יצירת מוצר חדש על ידי מנהלת האתר"}
              type={"submit"}
              fnHandleBtn={handlePostNewProductByAdmin}
              bootstarpButton="btn btn-primary"
            />
          )}
          <h1 className="title">המוצרים המומלצים שלי</h1>
          {!auth?.isSignedIn && (
            <p className="messageForNotSingedIn">
              עלייך להיות מחוברת על מנת שתוכלי לסמן מוצרים מועדפים או לרכוש את
              המוצרים
            </p>
          )}
          <div className="productsContainer">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  className="productsDiv"
                  key={product._id}
                >
                  <p className="productsTitle" onClick={() => navigate(`/product/${product._id}`)}>{product.title}</p>
                  <img
                    className="productsImages"
                    src={product.image.url}
                    alt={product.image.alt || "מוצר"}
                    onClick={() => navigate(`/product/${product._id}`)}
                  />
                  <p className="productsDescription" onClick={() => navigate(`/product/${product._id}`)}>{product.description}</p>
                  <p className="priceOfProducts">{product.price} ₪</p>
                  {auth?.isSignedIn && !auth.isAdmin && (
                    <div className="heartIcon">
                      <FaHeart
                        onClick={() => handleLikedByUser(product._id)}
                        className={`likeBtn ${likedProduct?.likedProductsArray.includes(product._id) ? `liked` : ``}`}
                      />
                    </div>
                  )}
                  {auth?.isSignedIn && auth.isAdmin && (
                    <div className="iconsForAdmin">
                      <div className="heartIcon">
                        <FaHeart
                          onClick={() => handleLikedByUser(product._id)}
                          className={`likeBtn ${likedProduct?.likedProductsArray.includes(product._id) ? `liked` : ``}`}
                        />
                      </div>
                      <div className="editIcon">
                        <MdEdit
                          onClick={() => handleEditProductByAdmin(product._id)}
                        />
                      </div>
                      <div className="deleteIcon">
                        <MdDelete
                          onClick={() =>
                            handleDeleteProductByAdmin(product._id)
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="pNoProductsFounded">
                אין מוצרים זמינים אשר תואמים את החיפוש שלך
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
