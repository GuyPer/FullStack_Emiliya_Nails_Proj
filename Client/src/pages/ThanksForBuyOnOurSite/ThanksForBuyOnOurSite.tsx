import { useNavigate } from "react-router-dom";
import AppButton from "../../components/AppButton/AppButton";
import "./ThanksForBuyOnOurSite.css";

export default function ThanksForBuyOnOurSite() {
  const navigate = useNavigate();

  const handleBtn = () => {
    navigate("../home");
  };

  return (
    <div className="ThanksForBuyOnOurSite">
      <h1 className="title">הרכישה בוצעה בהצלחה</h1>
      <h3 className="subtitle">תודה שבחרת בנו!</h3>
      <AppButton
        classname="btn"
        bootstarpButton="btn-primary"
        content={"בחזרה לדף הבית"}
        type={"submit"}
        fnHandleBtn={() => handleBtn()}
      />
    </div>
  );
}
