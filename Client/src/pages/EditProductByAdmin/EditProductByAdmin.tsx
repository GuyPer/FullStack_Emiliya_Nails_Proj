import { useParams } from "react-router-dom";
import "./EditProductByAdmin.css";
import { useContext, useEffect, useState } from "react";
import {
  doEditProductByAdmin,
  doGetProductById,
} from "../../Services/ProductService";
import AppButton from "../../components/AppButton/AppButton";
import { ToastsContext } from "../../context/ToastsContext";

export default function EditProductByAdmin() {
  const params = useParams<{ productId: string }>();
  const productId = params.productId;
  const toast = useContext(ToastsContext);

  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        const { error, result } = await doGetProductById(productId);
        if (error) {
          setError(error);
        } else {
          setProductTitle(result.data.title);
          setProductDescription(result.data.description);
          setProductImageUrl(result.data.image.url);
          setProductPrice(result.data.price);
        }
      };

      fetchProduct();
    }
  }, [productId]);

  const handleSubmit = async () => {
    const formData = {
      title: productTitle,
      description: productDescription,
      image: { url: productImageUrl },
      price: productPrice,
    };
    const result = await doEditProductByAdmin(productId, formData);
    toast?.addToast(result);
  };
  return (
    <div className="EditProductByAdmin">
      <div className="container">
        <h1 className="title">ערוך מוצר</h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="productDetails">
            <p className="productId">מוצר עם מזהה ייחודי: {productId}</p>
            <label>כותרת:</label>
            <input
              type="text"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
            />
            <label>תיאור:</label>
            <input
              type="text"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
            <label>תמונה:</label>
            <input
              type="text"
              value={productImageUrl}
              onChange={(e) => setProductImageUrl(e.target.value)}
            />
            <label>מחיר:</label>
            <input
              type="text"
              value={productPrice === 0 ? "" : productPrice}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^\d+$/.test(value)) {
                  setProductPrice(Number(value));
                }
              }}
            />
            <AppButton
              content={"אישור"}
              type={"submit"}
              fnHandleBtn={handleSubmit}
              bootstarpButton="btn btn-success"
              classname="submitBtn"
            />
          </div>
        )}
      </div>
    </div>
  );
}
