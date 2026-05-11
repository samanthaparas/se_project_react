// React imports
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// Contexts and hooks
import CurrentUserContext from "../../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import useGeolocation from "../../hooks/useGeolocation";

// Utils/API
import {
  getItems,
  addItem,
  deleteItem,
  updateUserProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { signup, signin, checkToken } from "../../utils/auth";
import { apiKey, getDefaultCoordinates } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// Styles
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const navigate = useNavigate();

  const handleRegister = ({ name, avatar, email, password }) => {
    signup({ name, avatar, email, password })
      .then(() => {
        return handleLogin({ email, password });
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    return signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        closeActiveModal();
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser(null);
      });
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleDeleteClick = (card) => {
    setSelectedCard(card);
    setActiveModal("confirm-delete");
  };

  const onAddItem = (inputValues) => {
    const token = localStorage.getItem("jwt");

    addItem(inputValues, token)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (item = selectedCard) => {
    const token = localStorage.getItem("jwt");
    const id = item?._id ?? item?.id;

    if (!id) return;

    deleteItem(id, token)
      .then(() => {
        setClothingItems(
          clothingItems.filter(
            (existingItem) => (existingItem._id ?? existingItem.id) !== id,
          ),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, _id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const itemId = _id ?? id;

    const likeRequest = isLiked
      ? removeCardLike(itemId, token)
      : addCardLike(itemId, token);

    likeRequest
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) =>
            (item._id ?? item.id) === itemId ? updatedCard : item,
          ),
        );
      })
      .catch(console.error);
  };

  const closeActiveModal = () => setActiveModal("");

  const { coordinates, isLoading } = useGeolocation();
  const activeCoordinates = coordinates || getDefaultCoordinates();

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) return;

    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser(null);
      });
  }, []);

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleUpdateProfile = (values) => {
    const token = localStorage.getItem("jwt");

    updateUserProfile(values, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    getWeather(activeCoordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, [isLoading]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onAddClick={handleAddClick}
                      onEditProfileClick={handleEditProfileClick}
                      onCardLike={handleCardLike}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            buttonText="Add garment"
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            onLoginClick={handleLoginClick}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            onRegisterClick={handleRegisterClick}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteClick={handleDeleteClick}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === "confirm-delete"}
            onClose={closeActiveModal}
            onDelete={handleDeleteItem}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateProfile={handleUpdateProfile}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
