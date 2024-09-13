import { useContext, useEffect, useState } from "react";
import "./Gallery.css";
import { IGalleryImage } from "../../interfaces/GalleryImagesInterfaces";
import {
  doDeleteSpecificImage,
  doGetAllGalleryImages,
  doGetSpecificImage,
} from "../../Services/GalleryImagesService";
import { AuthContext } from "../../context/AuthContext";
import { MdDelete, MdEdit } from "react-icons/md";
import AppButton from "../../components/AppButton/AppButton";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import { ToastsContext } from "../../context/ToastsContext";

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState<IGalleryImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const auth = useContext(AuthContext);
  const toast = useContext(ToastsContext);
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState<Boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);

  useEffect(() => {
    setIsDeleted(false);
    const fetchAllGalleryImagesfromServer = async () => {
      const { error, result } = await doGetAllGalleryImages();
      if (error) {
        setError(error);
      } else if (result && Array.isArray(result.data)) {
        setGalleryImages(result.data);
      } else {
        console.error("Fetched data is not an array", result);
      }
    };
    fetchAllGalleryImagesfromServer();
  }, [isDeleted]);

  const handleEditGalleryImage = async (ImageTitle: string) => {
    const { error, result } = await doGetSpecificImage(ImageTitle);
    if (error) {
      setError(error);
    } else if (result) {
      navigate("/gallery/editGallery", { state: result.data });
    }
  };

  const confirmDeleteGalleryImage = async () => {
    if (imageToDelete) {
      const { error, result } = await doDeleteSpecificImage(imageToDelete);
      if (error) {
        setError(error);
      } else if (result) {
        setIsDeleted(true);
        setIsModalVisible(false);
        toast?.addToast("התמונה נמחקה בהצלחה!");
      }
    }
  };

  const handleDeleteGalleryImage = async (ImageTitle: string) => {
    setImageToDelete(ImageTitle);
    setIsModalVisible(true);
  };

  const handleAddGalleryImageBtn = () => {
    navigate("/gallery/addGallery");
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="Gallery">
      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={confirmDeleteGalleryImage}
        whatToDelete={"תמונה"}
      />
      {auth?.isAdmin && (
        <AppButton
          classname="adminBtnForNewImage"
          content={"הוספת תמונה על ידי מנהלת האתר"}
          type={"submit"}
          bootstarpButton="btn btn-primary"
          fnHandleBtn={handleAddGalleryImageBtn}
        />
      )}
      <h1 className="titleOfGallery">גלריית העבודות שלי </h1>
      <div className="imagesContainer">
        {galleryImages.length > 0 ? (
          galleryImages.map((image) => (
            <div key={image._id} className="galleryImagesDiv">
              <img
                className="galleryImages"
                src={image.image.url}
                alt={image.image.alt || "לק ג'ל"}
              />
              {auth?.isAdmin && (
                <div className="editDeleteImageDiv">
                  <MdDelete
                    onClick={() => handleDeleteGalleryImage(image.title)}
                  />
                  <MdEdit onClick={() => handleEditGalleryImage(image.title)} />
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="GalleryNotAvailable">גלריית תמונות בטעינה</p>
        )}
      </div>
    </div>
  );
}
