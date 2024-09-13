import { useContext, useEffect, useState } from "react";
import "./ShoppingCart.css";
import { AuthContext } from "../../context/AuthContext";
import { IProduct } from "../../interfaces/ProductsInterfaces";
import { doGetProductById } from "../../Services/ProductService";
import AppButton from "../../components/AppButton/AppButton";
import { ToastsContext } from "../../context/ToastsContext";
import { TiDelete } from "react-icons/ti";
import { LikedProductsContext } from "../../context/LikedProductContext";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart() {
  const toast = useContext(ToastsContext);
  const auth = useContext(AuthContext);
  const likedProducts = useContext(LikedProductsContext);
  const userId = auth?.userDetails?._id;
  const cartProductsPerUserId = localStorage.getItem(`${userId}`);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [quantities, setQuantities] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);
    if (cartProductsPerUserId) {
      const productIds = JSON.parse(cartProductsPerUserId);
      const fetchProductDetails = async (productIds: string[]) => {
        const productDetails: IProduct[] = [];
        for (let productId of productIds) {
          const { error, result } = await doGetProductById(productId);
          if (!error && result) {
            productDetails.push(result.data);
          }
        }
        setProducts(productDetails);
        setQuantities(Array(productDetails.length).fill(1));
        setLoading(false);
      };
      fetchProductDetails(productIds);
    }
  }, [cartProductsPerUserId]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = products.reduce(
        (sum, product, index) => sum + product.price * quantities[index],
        0
      );
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [products, quantities]);

  const increaseQuantity = (index: number) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index]++;
    setQuantities(updatedQuantities);
  };

  const decreaseQuantity = (index: number) => {
    const updatedQuantities = [...quantities];
    if (updatedQuantities[index] > 1) {
      updatedQuantities[index]--;
    }
    setQuantities(updatedQuantities);
  };

  const deleteQuantity = (index: number, product: string) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    const updatedQuantities = quantities.filter((_, i) => i !== index);

    setProducts(updatedProducts);
    setQuantities(updatedQuantities);
    likedProducts?.likedProducts(product);
  };

  const handlePayBtn = () => {
    toast?.addToast("התשלום בוצע בהצלחה");
    localStorage.setItem(`${localStorage.getItem("userId")}`, "");
    navigate("purchased");
  };

  return (
    <div className="ShoppingCart">
      <h1 className="title">עגלת הקניות</h1>
      {products.length === 0 ? (
        <p className="emptyCartMessage">
          עגלת הקניות ריקה, היכנסי למוצרים ותבחרי על ידי סימון בכפתור הלב את
          המוצרים אותם תרצי להוסיף לעגלה.
        </p>
      ) : loading ? (
        <div className="loading">טוען...</div>
      ) : (
        <div>
          {auth?.isSignedIn &&
            cartProductsPerUserId &&
            cartProductsPerUserId.length > 0 && (
              <div>
                <ul className="cartContainer">
                  {products.map((product: IProduct, index: number) => (
                    <li className="lineOfProduct " key={index}>
                      <p>שם מוצר: {product.title}</p>
                      {product.image && product.image.url ? (
                        <img
                          className="imageOfProduct"
                          src={product.image.url}
                          alt={product.image.alt || "תמונה"}
                        />
                      ) : (
                        <></>
                      )}
                      <div className="quantityControl">
                        <p
                          className="plusSign"
                          onClick={() => increaseQuantity(index)}
                        >
                          +
                        </p>
                        <p>{quantities[index]}</p>
                        <p
                          className="minusSign"
                          onClick={() => decreaseQuantity(index)}
                        >
                          -
                        </p>
                      </div>
                      <p>מחיר ליחידה: {product.price} ₪</p>
                      <p>מחיר כולל: {product.price * quantities[index]} ₪</p>
                      <div className="deleteProductFromShoppingCart">
                        <TiDelete
                          onClick={() => deleteQuantity(index, product._id)}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="totalPriceTitle">מחיר משוקלל: {totalPrice} ₪</p>
                <AppButton
                  classname="paymentBtn"
                  bootstarpButton="btn btn-success"
                  content={"בצע תשלום"}
                  type={"submit"}
                  fnHandleBtn={() => handlePayBtn()}
                />
              </div>
            )}
        </div>
      )}
    </div>
  );
}
