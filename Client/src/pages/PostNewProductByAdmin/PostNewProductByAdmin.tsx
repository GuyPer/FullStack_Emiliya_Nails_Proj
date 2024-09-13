import { useContext, useState } from "react";
import "./PostNewProductByAdmin.css";
import AppButton from "../../components/AppButton/AppButton";
import { doPostProductByAdmin } from "../../Services/ProductService";
import { ToastsContext } from "../../context/ToastsContext";
import { useNavigate } from "react-router-dom";

export default function PostNewProductByAdmin() {
  const toast = useContext(ToastsContext);
  const navigate = useNavigate();
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");
  const [productPrice, setProductPrice] = useState(0);

  const handleSubmit = async () => {
    const formData = {
      title: productTitle,
      description: productDescription,
      image: { url: productImageUrl },
      price: productPrice,
    };
    const result = await doPostProductByAdmin(formData);
    toast?.addToast(result);
    if (result === "Product updated successfully!") {
      navigate("/products");
    }
  };

  return (
    <div className="PostNewProductByAdmin">
      <div className="container">
        <h1 className="title">פרסם מוצר חדש</h1>
        <div className="productDetails">
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
      </div>
    </div>
  );
}
