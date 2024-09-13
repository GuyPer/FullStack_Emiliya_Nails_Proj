import {
  IGalleryImage,
  IGalleryResponse,
} from "../interfaces/GalleryImagesInterfaces";

const localApiString: string = "http://localhost:3000/gallery";

const getToken = async (): Promise<string | null> => {
  const token = localStorage.getItem("userToken");
  if (token) {
    return token;
  } else {
    return null;
  }
};

// -------------------------------------------------------------
//  GET ALL GALLERY IMAGES
// -------------------------------------------------------------

export const doGetAllGalleryImages = async (): Promise<{
  error: string | null;
  result: IGalleryResponse | null;
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
//  GET SPECIFIC GALLERY IMAGE
// -------------------------------------------------------------

export const doGetSpecificImage = async (
  imageTitle: string
): Promise<{
  error: string | null;
  result: IGalleryResponse | null;
}> => {
  try {
    const response = await fetch(`${localApiString}/${imageTitle}`, {
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
//  POST GALLERY IMAGE BY ADMIN
// -------------------------------------------------------------

export const doPostGalleryImageByAdmin = async (formData: object) => {
  try {
    const token = await getToken();
    if (!token) return "No token found";
    const response = await fetch(`${localApiString}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-auth-token": token },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      return `Error: "Failed to update image"}`;
    }
    return "image updated successfully!";
  } catch (err) {
    const errMessage = (err as Error).message;
    return `Error: ${errMessage}`;
  }
};

// -------------------------------------------------------------
//  EDIT GALLERY IMAGE BY ADMIN
// -------------------------------------------------------------

export const doEditGalleryImageByAdmin = async (
  galleryImageTitle: string | undefined,
  formData: IGalleryImage
): Promise<string> => {
  try {
    const token = await getToken();
    if (!token) return "No token found";
    const response = await fetch(`${localApiString}/${galleryImageTitle}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-auth-token": token },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) {
      return `Error: ${data.message || "Failed to update Image"}`;
    }
    return "Image updated successfully!";
  } catch (err) {
    const errMessage = (err as Error).message;
    return `Error: ${errMessage}`;
  }
};

// -------------------------------------------------------------
//  DELETE GALLERY IMAGE BY ADMIN
// -------------------------------------------------------------

export const doDeleteSpecificImage = async (
  galleryImageTitle: string
): Promise<{
  error: string | undefined;
  result: IGalleryImage | undefined;
}> => {
  try {
    const token = await getToken();
    if (!token) return { error: "No token found", result: undefined };
    const response = await fetch(`${localApiString}/${galleryImageTitle}`, {
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
