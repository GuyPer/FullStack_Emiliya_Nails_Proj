import { useContext, useEffect, useState } from "react";
import "./UsersPageForAdmin.css";
import {
  doDeleteUser,
  doFetchAllUsersFromServer,
} from "../../Services/UserService";
import { IUsers } from "../../interfaces/UserInterfaces";
import AppButton from "../../components/AppButton/AppButton";
import { useNavigate } from "react-router-dom";
import { ToastsContext } from "../../context/ToastsContext";
import { SearchContext } from "../../context/SearchContext";
import Modal from "../Modal/Modal";

export default function UsersPageForAdmin() {
  const search = useContext(SearchContext);
  const toast = useContext(ToastsContext);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<IUsers[]>([]);
  const [filteredusers, setFilteredUsers] = useState<IUsers[]>([]);
  const [isUserDeleted, setIsUserDeleted] = useState<Boolean>(false);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (search?.searchVal) {
      // Filter users based on the search value
      const filtered = users.filter((user) => {
        const fullName = `${user.name.first.toLowerCase()} ${user.name.last.toLowerCase()}|| ${user.name.last.toLowerCase()} ${user.name.first.toLowerCase()}`;

        return fullName.includes(search.searchVal.toLowerCase());
      });

      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [search?.searchVal, users]);

  useEffect(() => {
    search?.setSearchVal("");
    setIsUserDeleted(false);
    const fetchData = async () => {
      const { error, result } = await doFetchAllUsersFromServer();
      if (error) {
        setError(error);
      } else if (result && result.data && Array.isArray(result.data)) {
        setUsers(result.data);
      } else {
        console.error("Fetched data is not an array", result);
      }
    };
    fetchData();
  }, [isUserDeleted]);

  const handleProfileDetailsBtn = (userId: string) => {
    localStorage.setItem("userProfileByAdmin", `${userId}`);
    navigate("/UserProfile");
  };

  const confirmDeleteGalleryImage = async () => {
    if (userToDelete) {
      await doDeleteUser();
      localStorage.removeItem("userIdToDelete");
      setIsUserDeleted(true);
      toast?.addToast("User deleted successfully");
      setIsModalVisible(false);
    }
  };

  const handleDeleteUserByAdminBtn = async (userId: string) => {
    localStorage.setItem("userIdToDelete", `${userId}`);
    const userToDelete = localStorage.getItem("userIdToDelete");
    setUserToDelete(userToDelete);
    setIsModalVisible(true);
  };

  return (
    <div className="UsersPageForAdmin">
      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={confirmDeleteGalleryImage}
        whatToDelete={"יוזר"}
      />
      <div className="container">
        <h1 className="title">רשימת משתמשים</h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <ul className="listContainer">
            {filteredusers.length > 0 ? (
              filteredusers.map((user) => (
                <li className="usersList" key={user._id}>
                  <p>
                    שם: {user.name.first} {user.name.last}
                  </p>
                  <div className="buttonsDiv">
                    <AppButton
                      bootstarpButton="btn btn-primary"
                      classname="buttons"
                      content={"פרופיל משתמש"}
                      type={"submit"}
                      fnHandleBtn={() => handleProfileDetailsBtn(user._id)}
                    />
                    <AppButton
                      bootstarpButton="btn btn-danger"
                      classname="buttons"
                      content={"מחק משתמש"}
                      type={"submit"}
                      fnHandleBtn={() => handleDeleteUserByAdminBtn(user._id)}
                    />
                  </div>
                </li>
              ))
            ) : (
              <p className="pNoProductsFounded">
                אין מוצרים זמינים אשר תואמים את החיפוש שלך
              </p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
