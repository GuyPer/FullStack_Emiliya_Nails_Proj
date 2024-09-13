import "./ContactUs.css";
import AppButton from "../../AppButton/AppButton";
import AppFormInput from "../../AppFormInput/AppFormInput";
import {
  validateEmail,
  validatePhone,
  validateFullName,
} from "../../../utils/formRegexValidations";
import { useContext, useState } from "react";
import { ToastsContext } from "../../../context/ToastsContext";
import emailjs from "emailjs-com";

export default function ContactUs({ className }: { className?: string }) {
  const toast = useContext(ToastsContext);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
  const userId = import.meta.env.VITE_EMAILJS_USER_ID || "";

  const handleInput = (inputName: string, value: string) => {
    switch (inputName) {
      case "fullName":
        setFullName(value);
        if (!validateFullName(value) && value != "") {
          setFullNameError(
            "שם מלא חייב להיות בין 2 ל-50 תווים בעברית או באנגלית"
          );
        } else {
          setFullNameError("");
        }
        break;
      case "email":
        setEmail(value);
        if (!validateEmail(value) && value != "") {
          setEmailError("אנא הכנס כתובת אימייל תקינה");
        } else {
          setEmailError("");
        }
        break;
      case "phone":
        setPhone(value);
        if (!validatePhone(value) && value != "") {
          setPhoneError("אנא הכנס מספר טלפון ישראלי תקין");
        } else {
          setPhoneError("");
        }
        break;
      case "subject":
        setSubject(value);
        if ((value.length < 2 || value.length > 50) && value != "") {
          setSubjectError("נושא חייב להיות בין 2 ל-50 תווים");
        } else {
          setSubjectError("");
        }
        break;
      case "message":
        setMessage(value);
        if (value.length > 300) {
          setMessageError("הודעה חייבת להיות עד 300 תווים");
        } else {
          setMessageError("");
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !fullNameError &&
      !emailError &&
      !phoneError &&
      !subjectError &&
      !messageError &&
      fullName &&
      email &&
      phone &&
      subject &&
      message
    ) {
      emailjs
        .send(
          serviceId,
          templateId,
          {
            fullName,
            email,
            phone,
            subject,
            message,
          },
          userId
        )
        .then(
          () => {
            toast?.addToast("פנייה זאת נשלחה בהצלחה!");
          },
          () => {
            toast?.addToast("An error occurred while sending the form");
          }
        );
    } else {
      toast?.addToast("אנא וודא שכל השדות מולאו כהלכה");
    }
  };

  return (
    <div className={`${className}`}>
      <h5 className="contactUsTitle">יצירת קשר</h5>
      <form className="contactUsForm" onSubmit={handleSubmit}>
        <AppFormInput
          inputId="fullName"
          inputName="fullName"
          inputType="text"
          inputHtmlFor="fullName"
          placeholder="שם מלא"
          value={fullName}
          required={true}
          className={`formInputs ${fullNameError ? "invalid" : ""}`}
          onChange={(e) => handleInput("fullName", e.target.value)}
          labelContent={""}
        />
        {fullNameError && <p className="errorText">{fullNameError}</p>}

        <AppFormInput
          inputId="phone"
          inputName="phone"
          inputType="tel"
          inputHtmlFor="phone"
          placeholder="טלפון"
          value={phone}
          required={true}
          className={`formInputs ${phoneError ? "invalid" : ""}`}
          onChange={(e) => handleInput("phone", e.target.value)}
          labelContent={""}
        />
        {phoneError && <p className="errorText">{phoneError}</p>}

        <AppFormInput
          inputId="email"
          inputName="email"
          inputType="email"
          inputHtmlFor="email"
          placeholder="אימייל"
          value={email}
          required={true}
          className={`formInputs ${emailError ? "invalid" : ""}`}
          onChange={(e) => handleInput("email", e.target.value)}
          labelContent={""}
        />
        {emailError && <p className="errorText">{emailError}</p>}

        <AppFormInput
          inputId="subject"
          inputName="subject"
          inputType="text"
          inputHtmlFor="subject"
          placeholder="נושא"
          value={subject}
          required={true}
          className={`formInputs ${subjectError ? "invalid" : ""}`}
          onChange={(e) => handleInput("subject", e.target.value)}
          labelContent={""}
        />
        {subjectError && <p className="errorText">{subjectError}</p>}

        <AppFormInput
          inputId="message"
          inputName="message"
          inputType="text"
          inputHtmlFor="message"
          placeholder="הודעה"
          value={message}
          required={true}
          className={`formInputs ${messageError ? "invalid" : ""}`}
          onChange={(e) => handleInput("message", e.target.value)}
          labelContent={""}
        />
        {messageError && <p className="errorText">{messageError}</p>}

        <div className="divBtn">
          <AppButton
            classname="sendBtn"
            color="white"
            bootstarpButton="btn btn succeed"
            content={"שלח"}
            fontWeight={700}
            type={"submit"}
          />
        </div>
      </form>
    </div>
  );
}
