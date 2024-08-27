import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { apiUrl } from "../../Env/EnvExport";

// Popup component for adding new promotions
const AddPromotionPopup = ({ isOpen, onClose, onAddPromotion }) => {
  const [subHeader, setSubHeader] = useState("");
  const [tagline, setTagline] = useState("");
  const [conditions, setConditions] = useState([""]);
  const [restaurantId, setRestaurantId] = useState("");
  const [restaurantName, setRestaurantName] = useState("");

  const handleAddLine = () => {
    setConditions([...conditions, ""]);
  };

  const handleRemoveLine = (index) => {
    const newConditions = conditions.filter((_, i) => i !== index);
    setConditions(newConditions);
  };

  const handleLineChange = (index, value) => {
    const newConditions = [...conditions];
    newConditions[index] = value;
    setConditions(newConditions);
  };

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("restAdmin"));
    setRestaurantId(data._id);
    setRestaurantName(data.name);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        subHeader,
        tagline,
        conditions,
        promoType: "Default Promo Type",
        restaurantId,
        restaurantName,
      };

      const response = await axios.post(`${apiUrl}/api/promotions`, payload);

      if (response.status === 201) {
        const newPromotion = response.data;
        onAddPromotion(newPromotion);
        onClose();
      } else {
        console.error("Failed to add promotion, status code:", response.status);
      }
    } catch (error) {
      console.error("Error submitting promotion", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Add New Promotion</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black text-[16px] font-semibold">
              SubHeader:
            </label>
            <input
              type="text"
              value={subHeader}
              onChange={(e) => setSubHeader(e.target.value)}
              className="mt-1 p-2 w-full border-b-2 border-dashed border-black bg-white rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-[16px] font-semibold">
              Tagline:
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="mt-1 p-2 w-full border-b-2 border-dashed border-black bg-white rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-[16px] font-semibold">
              Conditions:
            </label>
            {conditions.map((condition, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={condition}
                  onChange={(e) => handleLineChange(index, e.target.value)}
                  className="mt-1 p-2 w-full border-b-2 border-dashed border-black bg-white rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveLine(index)}
                  className="ml-2 text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddLine}
              className="text-blue-500"
            >
              Add Condition
            </button>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Component for displaying promotions
const Promotions = ({ promotions }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {promotions.map((promo) => (
        <PromotionCard
          key={promo._id}
          subHeader={promo.subHeader}
          tagline={promo.tagline}
          conditions={promo.conditions}
          imagePath="/Card.svg"
          isApproved={promo.isSuperAdminApprove}
          id={promo._id}
          isLive={promo.isLive}
        />
      ))}
    </div>
  );
};

const PromotionCard = ({
  subHeader,
  tagline,
  conditions,
  imagePath,
  isApproved,
  id,
  isLive,
}) => {
  const handleLive = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/promotions/isLive/${id}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[30rem] flex justify-between items-center border-2 border-dashed border-black bg-white p-6 rounded-lg flex-col">
      <div className="relative">
        <img src={imagePath} alt="Promo" className="w-96" />
        <button>
          <div className="absolute top-0 right-0 p-2 bg-transparent rounded-full border-2 border-black">
            <MdDelete size={15} />
          </div>
        </button>
        <div className="absolute top-0 w-full">
          <h1 className="absolute top-3 w-full text-center">{subHeader}</h1>
          <h1 className="absolute top-12 w-full text-center">{tagline}</h1>
          <p className="absolute top-24 w-full flex justify-center">
            <div className="flex flex-col items-start">
              {conditions.map((condition, index) => (
                <li key={index}>{condition}</li>
              ))}
            </div>
          </p>
        </div>
      </div>
      <div>
        {isApproved ? (
          <div className="bg-green-500 text-white px-4 py-2 rounded-md">
            Approved
            {isLive ? (
              <button
                className="bg-green-500 ml-4 border-2 border-green-900 text-white px-4 py-2 rounded-md"
                onClick={handleLive}
              >
                Live
              </button>
            ) : (
              <button
                className="bg-red-500 ml-4 text-white px-4 py-2 rounded-md"
                onClick={handleLive}
              >
                Not Live
              </button>
            )}
          </div>
        ) : (
          <div className="bg-red-300 text-black px-4 py-2 rounded-md">
            Not Approved by Super Admin
          </div>
        )}
      </div>
    </div>
  );
};

function AdminOffers() {
  const [promotions, setPromotions] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchPromotions = async () => {
    try {
      const data = JSON.parse(sessionStorage.getItem("restAdmin"));
      const response = await axios.get(`${apiUrl}/api/promotions/${data._id}`);
      setPromotions(response.data);
    } catch (error) {
      console.error("Error fetching promotions", error);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleAddPromotion = (promotion) => {
    setPromotions((prevPromotions) => [...prevPromotions, promotion]);
  };

  return (
    <>
      <div className="flex-1 p-10 bg-[#fafafb]">
        <div className="text-4xl font-bold mb-4">All running promotions</div>
        <div className="text-xl font-semibold underline mb-8">
          Currently {promotions.length} offers live!
        </div>
        <Promotions promotions={promotions} />
        <div
          className="flex items-center justify-center text-lg font-bold mt-8 cursor-pointer"
          onClick={() => setIsPopupOpen(true)}
        >
          <img src="./group-5.svg" className="w-6 h-6" alt="Add more" />
          <span className="ml-2 text-gray-700">Add more</span>
        </div>
        <AddPromotionPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onAddPromotion={handleAddPromotion}
        />
      </div>
    </>
  );
}

export default AdminOffers;
