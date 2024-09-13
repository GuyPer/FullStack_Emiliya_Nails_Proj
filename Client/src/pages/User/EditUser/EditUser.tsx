import { useContext, useEffect, useState } from "react";
import "./EditUser.css";
import AppFormInput from "../../../components/AppFormInput/AppFormInput";
import { Button } from "react-bootstrap";
import { validatePhone } from "../../../utils/formRegexValidations";
import { useNavigate } from "react-router-dom";
import { ToastsContext } from "../../../context/ToastsContext";
import { AuthContext } from "../../../context/AuthContext";
import { ThemeContext } from "../../../context/ThemeContext";
import { IEditUser } from "../../../interfaces/UserInterfaces";
import { doEditUser, doGetUserById } from "../../../Services/UserService";

export default function EditUser() {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const toast = useContext(ToastsContext);
  const [isFormValid, setIsFormValid] = useState(false);
  const auth = useContext(AuthContext);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState<IEditUser>({
    name: {
      first: "",
      last: "",
    },
    phone: "",
    address: {
      city: "",
      street: "",
      houseNumber: 0,
      zip: 0,
    },
  });

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
    formData.name.first,
    formData.name.last,
    formData.address.city,
    formData.address.street,
    formData.address.houseNumber,
  ]);

  const getUserInfoFromServer = async (userId: string) => {
    let { error, result } = await doGetUserById(userId);
    if (result) {
      setIsPhoneValid(true);
      const filteredData = {
        name: {
          first: result.data.name.first,
          last: result.data.name.last,
        },
        phone: result.data.phone,
        address: {
          city: result.data.address.city,
          street: result.data.address.street,
          houseNumber: result.data.address.houseNumber,
          zip: result.data.address.zip,
        },
      };
      setFormData(filteredData);
    }
    if (error) {
      return error;
    }
  };

  useEffect(() => {
    const userIdToEdit = localStorage.getItem("userIdToEdit");
    if (userIdToEdit) {
      getUserInfoFromServer(userIdToEdit);
    }
  }, []);

  const handleInput =
    (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let input: string | number = event.target.value;
      if (type === "first" || type === "last") {
        setFormData({ ...formData, name: { ...formData.name, [type]: input } });
      } else if (type === "city" || type === "street") {
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

  const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phoneInput = event.target.value;
    if (!validatePhone(phoneInput) && phoneInput != "") {
      setIsPhoneValid(false);
      setFormData({ ...formData, phone: phoneInput });
    } else {
      setIsPhoneValid(true);
      setFormData({ ...formData, phone: phoneInput });
    }
  };

  const updateUserGlobal = (formData: IEditUser) => {
    if (auth?.userDetails) {
      auth.userDetails = {
        ...auth.userDetails,
        name: {
          ...auth.userDetails.name,
          first: formData.name.first,
          last: formData.name.last,
        },
        phone: formData.phone,
        address: {
          ...auth.userDetails.address,
          city: formData.address.city,
          street: formData.address.street,
          houseNumber: formData.address.houseNumber,
          zip: formData.address.zip,
        },
      };
    }
  };

  const handleBtn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const editUser = async (formData: IEditUser) => {
      let { error, result } = await doEditUser(formData);
      if (result) {
        updateUserGlobal(formData);
        toast?.addToast("User Updated ! ");
        localStorage.removeItem("userIdToEdit");
        if (auth?.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      }
      if (error) {
        return error;
      }
    };
    if (isFormValid === true) {
      editUser(formData);
    }
  };

  return (
    <div className={`EditUser ${theme?.isLightMode ? "light" : "dark"}`}>
      <h1 className="registerHeader">עריכת פרופיל:</h1>
      <form className="form">
        <AppFormInput
          className={"inputClass"}
          labelContent={"שם פרטי*"}
          inputId={"firstName"}
          inputType={"text"}
          inputHtmlFor={"firstName"}
          inputName={"firstName"}
          required={true}
          value={formData.name.first}
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
          value={formData.name.last}
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
          value={formData.phone}
          onChange={handlePhone}
        />
        {!isPhoneValid && (
          <p className="phoneInvalidMessage">
            טלפון חייב להיות מספר ישראלי סטנדרטי
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
          value={formData.address.city}
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
          value={formData.address.street}
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
          value={`${formData.address.houseNumber}`}
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
          value={`${formData.address.zip}`}
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
