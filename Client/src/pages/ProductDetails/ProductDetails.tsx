import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/ProductsInterfaces";
import { doGetProductById } from "../../Services/ProductService";
import AppButton from "../../components/AppButton/AppButton";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      const fetchProductDetails = async () => {
        const { error, result } = await doGetProductById(productId);
        if (error) {
          setError(error);
        } else if (result) {
          setProduct(result.data);
        }
      };
      fetchProductDetails();
    }
  }, [productId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ProductDetails">
      <h1 className="title">פרטי המוצר</h1>
      <div className="productDiv">
        <h3 className="subTitle">{product.title}</h3>
        <img
          className="productImg"
          src={product.image.url}
          alt={product.image.alt || "מוצר"}
        />
        <p className="productDescription">{product.description}</p>
        <p className="productPrice">מחיר: {product.price} ₪</p>
        <AppButton
          classname="btn"
          bootstarpButton="btn btn-primary"
          content={"חזרה למוצרים"}
          type={undefined}
          fnHandleBtn={() => {
            navigate("/products");
          }}
        />
      </div>
    </div>
  );
}
