import ContactUs from "../../components/Footer/ContactUs/ContactUs";
import "./ContactUsPage.css";

export default function ContactUsPage() {
  return (
    <div className="ContactUsPage">
      <h2 className="title">יצירת קשר</h2>
      <p className="subTitle">
        נא למלא את טופס הפנייה ואחזור אלייך בהקדם האפשרי.
      </p>
      <div className="divContuctUs">
        <ContactUs className="PageContactUs" />
      </div>
    </div>
  );
}
