import { Link } from "react-router-dom";
import "./QuickLinksFooter.css";

export default function QuickLinksFooter() {
  return (
    <div className="QuickLinksFooter">
      <Link className="linksFooter" to={"/"}>
        דף הבית
      </Link>
      <Link className="linksFooter" to={"/products"}>
        מוצרים
      </Link>
    </div>
  );
}
