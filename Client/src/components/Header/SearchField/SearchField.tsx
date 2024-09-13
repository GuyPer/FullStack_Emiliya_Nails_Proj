import { useContext } from "react";
import AppButton from "../../AppButton/AppButton";
import "./SearchField.css";
import { SearchContext } from "../../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

interface ISearchField {
  onClick?: () => void;
}

let inputValue: string;

export default function SearchField(props: ISearchField) {
  const navigate = useNavigate();
  const search = useContext(SearchContext);
  const auth = useContext(AuthContext);

  const handleSearchBtn = () => {
    if (!auth?.isAdmin) {
      navigate("products");
      search?.setSearchVal(inputValue);
    } else {
      search?.setSearchVal(inputValue);
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    inputValue = event.target.value;
    if (search?.searchVal === null) {
      search.setSearchVal(inputValue);
    }
  };

  return (
    <div onClick={props.onClick} className="SearchField">
      <AppButton
        fnHandleBtn={handleSearchBtn}
        classname="btnNavbar"
        color="white"
        content={"חיפוש"}
        fontWeight={700}
        type={undefined}
      />
      <input
        onChange={handleInput}
        className="searchInput"
        type="text"
        dir="rtl"
      />
    </div>
  );
}
