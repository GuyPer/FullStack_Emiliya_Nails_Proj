import { useContext, useEffect, useState } from "react";
import AppFormInput from "../../components/AppFormInput/AppFormInput";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "../../utils/formRegexValidations";
import { Button } from "react-bootstrap";
import { doPostUser } from "../../Services/UserService";
import { ToastsContext } from "../../context/ToastsContext";

export default function SignUp() {
  const navigate = useNavigate();
  const toast = useContext(ToastsContext);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: {
      first: "",
      last: "",
    },
    phone: "",
    email: "",
    password: "",
    address: {
      city: "",
      street: "",
      houseNumber: 0,
      zip: 0,
    },
  });

  const postUser = async () => {
    try {
      let { error, result } = await doPostUser(formData);
      if (result) {
        toast?.addToast("You registered successfully!");
        navigate("/login");
      } else {
        throw new Error(error);
      }
    } catch (error) {
      alert(`Registration failed. ${error}.`);
    }
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordInput = event.target.value;
    if (!validatePassword(passwordInput) && passwordInput != "") {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
      setFormData({ ...formData, password: passwordInput });
    }
  };

  const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phoneInput = event.target.value;
    if (!validatePhone(phoneInput) && phoneInput != "") {
      setIsPhoneValid(false);
    } else {
      setIsPhoneValid(true);
      setFormData({ ...formData, phone: phoneInput });
    }
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailInput = event.target.value;
    if (!validateEmail(emailInput) && emailInput != "") {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
      setFormData({ ...formData, email: emailInput });
    }
  };

  const handleInput =
    (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let input: string | number = event.target.value;
      if (type === "first" || type === "middle" || type === "last") {
        setFormData({ ...formData, name: { ...formData.name, [type]: input } });
      } else if (type === "state" || type === "city" || type === "street") {
        setFormData({
          ...formData,
          address: { ...formData.address, [type]: input },
        });
      } else if (type === "houseNumber" || type === "zip") {
        input = parseInt(input);
        setFormData({
          ...formData,
          address: { ...formData.address, [type]: input },
        });
      } else {
        setFormData({ ...formData, [type]: input });
      }
    };

  // useEffect to check form validation
  useEffect(() => {
    if (
      isPhoneValid &&
      formData.name.first &&
      formData.name.last &&
      formData.address.city &&
      formData.address.street &&
      formData.address.houseNumber
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [
    isPhoneValid,
    isEmailValid,
    isPasswordValid,
    formData.name.first,
    formData.name.last,
    formData.address.city,
    formData.address.street,
    formData.address.houseNumber,
  ]);

  const handleBtn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (isFormValid === true) {
      postUser();
    }
  };

  return (
    <div className="SignUp">
      <h1 className="registerTitle">פרטי משתמש:</h1>
      <form className="form">
        <AppFormInput
          className={"inputClass"}
          labelContent={"שם פרטי*"}
          inputId={"firstName"}
          inputType={"text"}
          inputHtmlFor={"firstName"}
          inputName={"firstName"}
          required={true}
          onChange={handleInput("first")}
        />
        <AppFormInput
          className={"inputClass"}
          labelContent={"שם משפחה*"}
          inputId={"lastName"}
          inputType={"text"}
          inputHtmlFor={"lastName"}
          inputName={"lastName"}
          required={true}
          onChange={handleInput("last")}
        />
        <AppFormInput
          className={"inputClass"}
          labelContent={"מספר טלפון*"}
          inputId={"phone"}
          inputType={"tel"}
          inputHtmlFor={"phone"}
          inputName={"phone"}
          required={true}
          onChange={handlePhone}
        />
        {!isPhoneValid && (
          <p className="phoneInvalidMessage">טלפון חייב להכיל 10 ספרות</p>
        )}
        <AppFormInput
          className={"inputClass"}
          labelContent={"אימייל*"}
          inputId={"emailInput"}
          inputType={"email"}
          inputHtmlFor={"emailInput"}
          inputName={"email"}
          required={true}
          onChange={handleEmail}
        />
        {!isEmailValid && (
          <p className="emailInvalidMessage">
            אימייל חייב להיות אימייל סטנדרטי
          </p>
        )}
        <AppFormInput
          className={"inputClass"}
          labelContent={"סיסמא*"}
          inputId={"password"}
          inputType={"password"}
          inputHtmlFor={"password"}
          inputName={"password"}
          required={true}
          onChange={handlePassword}
        />
        {!isPasswordValid && (
          <p className="passwordInvalidMessage">
            !@#$%^&*-סיסמא חייבת להכיל לפחות 9 תווים הכוללים לפחות אות גדולה
            באנגלית אות קטנה באנגלית מספר ואחד מהתווים המיוחדים הבאים
          </p>
        )}
        <AppFormInput
          className={"inputClass"}
          labelContent={"עיר*"}
          inputId={"city"}
          inputType={"text"}
          inputHtmlFor={"city"}
          inputName={"city"}
          required={true}
          onChange={handleInput("city")}
        />
        <AppFormInput
          className={"inputClass"}
          labelContent={"רחוב*"}
          inputId={"street"}
          inputType={"text"}
          inputHtmlFor={"street"}
          inputName={"street"}
          required={true}
          onChange={handleInput("street")}
        />
        <AppFormInput
          className={"inputClass"}
          labelContent={"מספר בית*"}
          inputId={"houseNumber"}
          inputType={"number"}
          inputHtmlFor={"houseNumber"}
          inputName={"houseNumber"}
          required={true}
          onChange={handleInput("houseNumber")}
        />
        <AppFormInput
          className={"inputClass"}
          labelContent={"מיקוד"}
          inputId={"zip"}
          inputType={"text"}
          inputHtmlFor={"zip"}
          inputName={"zip"}
          required={true}
          onChange={handleInput("zip")}
        />
        <div className="form-group btnDiv">
          <Button
            className="SubmitBtn"
            onClick={handleBtn}
            variant="success"
            disabled={!isFormValid}
          >
            אישור
          </Button>
        </div>
      </form>
    </div>
  );
}
