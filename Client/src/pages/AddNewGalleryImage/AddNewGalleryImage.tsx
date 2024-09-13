import { useContext, useState } from "react";
import "./AddNewGalleryImage.css";
import { ToastsContext } from "../../context/ToastsContext";
import { doPostGalleryImageByAdmin } from "../../Services/GalleryImagesService";

export default function AddNewGalleryImage() {
  const toast = useContext(ToastsContext);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  const handleAddNewImage = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const formData = {
      title,
      image: {
        url: imageUrl,
        alt: imageAlt,
      },
    };
    const result = await doPostGalleryImageByAdmin(formData);
    if (result) {
      toast?.addToast("התמונה התווספה בהצלחה");
    }
  };

  return (
    <div className="AddNewGalleryImage">
      <h1>הוספת תמונה</h1>
      <form className="formEditGalleryImage">
        <label>כותרת:</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
        <label>כתובת התמונה:</label>
        <input type="text" onChange={(e) => setImageUrl(e.target.value)} />
        <label>תיאור התמונה:</label>
        <input type="text" onChange={(e) => setImageAlt(e.target.value)} />
        <button onClick={handleAddNewImage} className="button btn btn-success">
          אישור
        </button>
      </form>
    </div>
  );
}
