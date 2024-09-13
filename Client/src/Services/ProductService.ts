import { IProduct, IProductResponse } from "../interfaces/ProductsInterfaces";

const localApiString: string = "http://localhost:3000/products";

const getToken = async (): Promise<string | null> => {
  const token = localStorage.getItem("userToken");
  if (token) {
    return token;
  } else {
    return null;
  }
};

// -------------------------------------------------------------
//  GET ALL PRODUCTS
// -------------------------------------------------------------

export const doGetAllProducts = async (): Promise<{
  error: string | null;
  result: IProductResponse | null;
}> => {
  try {
    const response = await fetch(`${localApiString}/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) return { error: data, result: null };
    return { error: null, result: data };
  } catch (err) {
    const errMessage = (err as Error).message;
    return { error: errMessage, result: null };
  }
};

// -------------------------------------------------------------
//  GET A SPECIFIC PRODUCT
// -------------------------------------------------------------

export const doGetProductById = async (productId: string) => {
  try {
    const response = await fetch(`${localApiString}/${productId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) return { error: data, result: null };
    return { error: null, result: data };
  } catch (err) {
    const errMessage = (err as Error).message;
    return { error: errMessage, result: null };
  }
};

// -------------------------------------------------------------
//  POST PRODUCT BY ADMIN
// -------------------------------------------------------------

export const doPostProductByAdmin = async (formData: object) => {
  try {
    const token = await getToken();
    if (!token) return "No token found";
    const response = await fetch(`${localApiString}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-auth-token": token },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      return `Error: "Failed to update product"}`;
    }
    return "Product updated successfully!";
  } catch (err) {
    const errMessage = (err as Error).message;
    return `Error: ${errMessage}`;
  }
};

// -------------------------------------------------------------
//  EDIT PRODUCT BY ADMIN
// -------------------------------------------------------------

export const doEditProductByAdmin = async (
  productId: string | undefined,
  formData: object
): Promise<string> => {
  try {
    const token = await getToken();
    if (!token) return "No token found";
    const response = await fetch(`${localApiString}/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-auth-token": token },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) {
      return `Error: ${data.message || "Failed to update product"}`;
    }
    return "Product updated successfully!";
  } catch (err) {
    const errMessage = (err as Error).message;
    return `Error: ${errMessage}`;
  }
};

// -------------------------------------------------------------
//  DELETE PRODUCT BY ADMIN
// -------------------------------------------------------------

export const doDeleteProduct = async (
  productId: string
): Promise<{ error: string | undefined; result: IProduct | undefined }> => {
  try {
    const token = await getToken();
    if (!token) return { error: "No token found", result: undefined };
    const response = await fetch(`${localApiString}/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      return { error: data, result: undefined };
    } else {
      return { error: undefined, result: data };
    }
  } catch (err) {
    const errMessage = (err as Error).message;
    return { error: errMessage, result: undefined };
  }
};
