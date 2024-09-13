import { useContext, useEffect, useState } from "react";
import "./UserProfile.css";
import { AuthContext } from "../../../context/AuthContext";
import AppButton from "../../../components/AppButton/AppButton";
import { Link, useNavigate } from "react-router-dom";
import { ToastsContext } from "../../../context/ToastsContext";
import { doDeleteUser, doGetUserById } from "../../../Services/UserService";
import Modal from "../../Modal/Modal";

export default function UserProfile() {
  const toast = useContext(ToastsContext);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserToDelete, setIsUserToDelete] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    auth?.loadUserFromLS();
  }, [auth?.isSignedIn]);

  useEffect(() => {
    if (auth && auth.isSignedIn) {
      setIsLoggedIn(true);
    }
  }, [auth]);

  const handleLogOut = () => {
    window.scrollTo(0, 0);
    setIsLoggedIn(!isLoggedIn);
    localStorage.removeItem("userId");
    localStorage.removeItem("null");
    localStorage.removeItem("userIdToEdit");
    if (auth) {
      auth.signOut();
    }
  };

  const handleEditProfile = () => {
    localStorage.setItem(`userIdToEdit`, `${localStorage.getItem("userId")}`);
    navigate("edituser");
  };

  const getUserInfoFromServer = async (userIdToDelete: string) => {
    let { error } = await doGetUserById(userIdToDelete);
    if (error) {
      alert(error);
    }
  };

  const confirmDeleteGalleryImage = async () => {
    if (userToDelete) {
      await getUserInfoFromServer(userToDelete);
      await deleteUser();
      handleLogOut();
      setIsModalVisible(false);
    }
  };

  const handledeleteUser = () => {
    localStorage.setItem("userIdToDelete", `${localStorage.getItem("userId")}`);
    const userIdToDelete = localStorage.getItem("userIdToDelete");
    if (userIdToDelete) {
      setUserToDelete(userIdToDelete);
      setIsModalVisible(true);
    }
  };

  const deleteUser = async () => {
    let { result, error } = await doDeleteUser();
    if (result) {
      toast?.addToast("User Deleted ! ");
      setIsUserToDelete(true);
      localStorage.removeItem("userIdToDelete");
      window.scrollTo(0, 0);
    }
    if (error) {
      return error;
    }
  };

  return (
    <>
      <div
        className={`UserProfile ${auth?.isSignedIn ? `loggedIn` : `loggedOut`}`}
      >
        <Modal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onConfirm={confirmDeleteGalleryImage}
          whatToDelete={"חשבון שלך"}
        />
        {auth?.isSignedIn && (
          <div className="userDetailsDiv">
            <h3 className="title">פרטי חשבון:</h3>
            <div className="userDetails">
              {auth.userDetails ? (
                <div className="userDetails">
                  <div className="name">
                    שם: {auth.userDetails.name.first}{" "}
                    {auth.userDetails.name.last}
                  </div>
                  <div className="phone">טלפון: {auth.userDetails.phone}</div>
                  <div className="email">אימייל: {auth.userDetails.email}</div>
                  <div>
                    <div className="userAddress">
                      כתובת:<br></br>
                      עיר: {auth.userDetails.address.city}
                      <br></br>
                      רחוב: {auth.userDetails.address.street}
                      <br></br>
                      מספר בית:{auth.userDetails.address.houseNumber}
                      <br></br>
                      מיקוד: {auth.userDetails.address.zip}
                    </div>
                  </div>
                </div>
              ) : (
                "Waiting"
              )}
            </div>
            {auth.isAdmin &&
              localStorage.getItem("userProfileByAdmin") ===
                localStorage.getItem("userId") && (
                <p className="adminAcount">חשבון מנהל</p>
              )}
            {auth.isSignedIn &&
              (!auth.isAdmin ||
                (auth.isAdmin &&
                  localStorage.getItem("userProfileByAdmin") ===
                    localStorage.getItem("userId"))) && (
                <div className="buttons">
                  <div className="editBtn">
                    <AppButton
                      classname="profileBtn button"
                      bootstarpButton="btn btn-primary"
                      fnHandleBtn={handleEditProfile}
                      content={"עריכת פרופיל"}
                      type={undefined}
                    />
                  </div>
                  <div className="logOutBtnDiv">
                    <AppButton
                      classname="logOutBtn button"
                      bootstarpButton="btn btn-secondary"
                      fnHandleBtn={handleLogOut}
                      content={"התנתקות"}
                      type={undefined}
                    />
                  </div>
                  <div className="logOutBtnDiv">
                    <AppButton
                      classname="deletUserButton button"
                      bootstarpButton="btn btn-danger"
                      fnHandleBtn={handledeleteUser}
                      content={"מחיקת חשבון"}
                      type={undefined}
                    />
                  </div>
                </div>
              )}
          </div>
        )}
        {isUserToDelete && !isLoggedIn && (
          <div className="loggedOutDiv">
            <h3 className="loggedOutHeader">
              חשבונך נמחק, תוכלי ליצור אחד חדש במקומו.
            </h3>
            <div className="btn SignupBtnAfterDeleteAccount">
              <Link style={{ textDecoration: "none" }} to="../signup">
                <AppButton
                  bootstarpButton="btn btn-success"
                  content="הירשמי"
                  type={undefined}
                />
              </Link>
            </div>
          </div>
        )}
        {!isLoggedIn && !isUserToDelete && (
          <div className="loggedOutDiv">
            <h3 className="loggedOutHeader">
              התנתקת מהמערכת, עלייך לבצע כניסה מחדש כדי להתחבר שוב.
            </h3>
            <div className="btn connctBtnAfterLogOut">
              <Link style={{ textDecoration: "none" }} to="../login">
                <AppButton
                  bootstarpButton="btn btn-success"
                  content="התחברי"
                  type={undefined}
                />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
