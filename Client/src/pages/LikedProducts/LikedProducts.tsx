import { useContext, useEffect, useState } from "react";
import "./LikedProducts.css";
import { LikedProductsContext } from "../../context/LikedProductContext";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import AppButton from "../../components/AppButton/AppButton";
import { doGetAllProducts } from "../../Services/ProductService";
import { IProduct } from "../../interfaces/ProductsInterfaces";
import { Link } from "react-router-dom";

export default function LikedProducts() {
  const search = useContext(SearchContext);
  const likeProduct = useContext(LikedProductsContext);
  const { likedProductsArray } = useContext(LikedProductsContext)!;
  const [favProducts, setFavProducts] = useState<IProduct[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchAllProductsfromServer = async () => {
      let { error, result } = await doGetAllProducts();
      if (result) {
        const userId = localStorage.getItem("userId");
        const likedArrayByUser = localStorage.getItem(`${userId}`);
        const filteredProducts = result.data.filter((product: IProduct) =>
          likedArrayByUser?.includes(product._id)
        );
        search?.setSearchVal("");
        setFavProducts(filteredProducts);
        setIsLoading(false);
      }
      if (error) {
        setError(error);
      }
    };
    fetchAllProductsfromServer();
  }, [likedProductsArray]);

  const handleClickOnImg = (productId: string) => {
    localStorage.setItem("productIdToRender", `${productId}`);
    navigate("../myProducts/ProductDetails");
  };

  useEffect(() => {
    const likedArrayToLS = JSON.stringify(likeProduct?.likedProductsArray);
    localStorage.setItem("likedProductsArray", `${likedArrayToLS}`);
  }, [likeProduct?.likedProducts]);

  const handleLikedByUser = (productId: string) => {
    likeProduct?.likedProducts(productId);
  };

  return (
    <div
      className={`LikedProducts Page ${favProducts?.length === 0 ? `Empty` : ``}`}
    >
      <h1 className="title">מוצרים מועדפים </h1>
      {isLoading ? (
        <div>טוען...</div>
      ) : favProducts?.length ? (
        <div>
          <Link to={"/shoppingCart"}>
            <AppButton
              classname="shoppingCartBtn"
              bootstarpButton="btn btn-primary"
              content={"לעגלת הקניות"}
              type={"submit"}
            />
          </Link>
          <div className="productsContainer">
            {favProducts
              .filter((product) =>
                product.title
                  .toLocaleLowerCase()
                  .includes(search?.searchVal.toLocaleLowerCase() || "")
              )
              .map((product) => (
                <div key={product._id} className={`productsDiv `}>
                  <h2 className="productsTitle">{product.title}</h2>
                  <img
                    className="productsImages"
                    src={product.image.url}
                    alt={product.image.alt || "מוצר"}
                    onClick={() => handleClickOnImg(product._id)}
                  />
                  <h5 className="productsDescription">{product.description}</h5>
                  <p className="priceOfProducts">{`${product.price}`} ₪</p>
                  <div className="removeBtn">
                    <AppButton
                      fnHandleBtn={() => handleLikedByUser(product._id)}
                      bootstarpButton="btn btn-danger"
                      classname="removeBtn"
                      content={"Remove"}
                      type={undefined}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p className="pNoFavProducts">
          לא נבחרו מוצרים מועדפים, עלייך להיכנס למוצרים ולבחור בהם על ידי לחיצה
          על סימון הלב.
        </p>
      )}
    </div>
  );
}
