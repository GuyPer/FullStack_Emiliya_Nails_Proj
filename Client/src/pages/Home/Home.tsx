import "./Home.css";
import HomeGallery from "./HomeGallery/HomeGallery";
import HomeMainPhoto from "./HomeMainPhoto/HomeMainPhoto";
import HomeTitle from "./HomeTitle/HomeTitle";

export default function Home() {
  return (
    <div className="Home Page">
      <div className="titleAndMainPhoto">
        <div className="photo">
          <HomeMainPhoto />
        </div>
        <div className="title">
          <HomeTitle />
        </div>
      </div>
      <div className="gallery">
        <HomeGallery />
      </div>
    </div>
  );
}
