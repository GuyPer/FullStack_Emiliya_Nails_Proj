import { useLocation } from "react-router-dom";
import "./EditGalleryImage.css";
import { IGalleryImage } from "../../interfaces/GalleryImagesInterfaces";
import { doEditGalleryImageByAdmin } from "../../Services/GalleryImagesService";
import { ToastsContext } from "../../context/ToastsContext";
import { useContext, useEffect, useState } from "react";

export default function EditGalleryImage() {
  const location = useLocation();
  const data: IGalleryImage | null = location.state || null;
  const toast = useContext(ToastsContext);

  const [title, setTitle] = useState(data?.title || "");
  const [imageUrl, setImageUrl] = useState(data?.image.url || "");
  const [imageAlt, setImageAlt] = useState(data?.image.alt || "");

  useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      setImageUrl(data.image.url || "");
      setImageAlt(data.image.alt || "");
    }
  }, [data]);

  const handleClickOnEditBtn = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const formData: IGalleryImage = {
      _id: data?._id || "",
      title: title,
      image: { url: imageUrl, alt: imageAlt },
    };
    const result = await doEditGalleryImageByAdmin(data?.title, formData);
    toast?.addToast(result);
  };

  if (!data) {
    return <div>אין נתונים לעריכה</div>;
  }

  return (
    <div className="EditGalleryImage">
      <h1>עריכת תמונה</h1>
      <form className="formEditGalleryImage">
        <label>מזהה ייחודי:</label>
        <input type="text" value={data._id} readOnly />
        <label>כותרת:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>כתובת התמונה:</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <label>תיאור התמונה:</label>
        <input
          type="text"
          value={imageAlt}
          onChange={(e) => setImageAlt(e.target.value)}
        />
        <button
          className="button btn btn-success"
          onClick={handleClickOnEditBtn}
        >
          אישור
        </button>
      </form>
    </div>
  );
}
