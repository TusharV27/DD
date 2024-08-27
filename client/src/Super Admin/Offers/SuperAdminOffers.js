// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { apiUrl } from "../../Env/EnvExport";

// export default function OfferPage() {
//   const [offers, setOffers] = useState([]);

//   const [selectedOffer, setSelectedOffer] = useState(null);

//   useEffect(() => {
//     // Fetch and set offers data here
//     axios.get(`${apiUrl}/api/promotions`).then((response) => {
//       setOffers(response.data);
//       console.log(response.data);
//     });
//   }, []);

//   const handleOpenModal = (offer) => {
//     setSelectedOffer(offer);
//   };

//   const handleCloseModal = () => {
//     setSelectedOffer(null);
//   };

//   const handleApprove = (offerId) => {
//     // Handle approval logic here
//     axios.post(`${apiUrl}/api/promotions/approve/${offerId}`);
//     console.log(`Offer ${offerId} approved`);
//   };

//   const handleReject = (offerId) => {
//     // Handle rejection logic here
//     axios.post(`${apiUrl}/api/promotions/reject/${offerId}`);
//     console.log(`Offer ${offerId} rejected`);
//   };

//   return (
//     <>
//       <section>
//         <div className="min-h-screen bg-gray-100">
//           <main className="p-8">
//             <section className="mb-12">
//               <h2 className="text-3xl font-semibold text-gray-800 mb-6">
//                 Offers Approval
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {offers.map((offer) => (
//                   <div key={offer._id}>
//                     <div className=" bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl relative">
//                       <div
//                         className={`h-4 w-4 rounded-full absolute top-2 right-2 ${
//                           offer.isSuperAdminApprove
//                             ? "bg-green-500"
//                             : "bg-red-500"
//                         }`}
//                       ></div>
//                       <h3 className="text-2xl font-bold mb-2">
//                         {offer.subHeader}
//                       </h3>
//                       <p className="text-gray-600 mb-2">{offer.tagline}</p>
//                       <p className="text-gray-500 mb-2">
//                         Restaurant: {offer.restaurantName}
//                       </p>
//                       <ul className="list-disc pl-5 mb-4">
//                         {offer.conditions && offer.conditions.length > 0 ? (
//                           offer.conditions.map((point, index) => (
//                             <li key={index} className="text-gray-700">
//                               {point}
//                             </li>
//                           ))
//                         ) : (
//                           <li className="text-gray-700">
//                             No conditions available
//                           </li>
//                         )}
//                       </ul>
//                       <div className="flex justify-between items-center">
//                         <button
//                           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                           onClick={() => handleOpenModal(offer)}
//                         >
//                           View Details
//                         </button>
//                         <div className="flex space-x-2">
//                           {!offer.isSuperAdminApprove ? (
//                             <button
//                               className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
//                               onClick={() => handleApprove(offer._id)}
//                             >
//                               Approve
//                             </button>
//                           ) : null}

//                           <button
//                             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
//                             onClick={() => handleReject(offer._id)}
//                           >
//                             {offer.isRejected ? "Re-approve" : "Reject"}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                     {offer.isRejected && (
//                       <div className="bg-red-500 text-white px-4 py-2 rounded-md">
//                         Rejected
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </main>
//         </div>
//       </section>

//       {/* Modal for Offer Details */}
//       {selectedOffer && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
//             <button
//               className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
//               onClick={handleCloseModal}
//             >
//               &times;
//             </button>
//             <h3 className="text-3xl font-bold mb-2">{selectedOffer.header}</h3>
//             <p className="text-gray-600 mb-2">{selectedOffer.tagline}</p>
//             <p className="text-gray-500 mb-2">
//               Restaurant: {selectedOffer.restaurantName}
//             </p>
//             <p className="text-gray-500 mb-2">
//               Location: {selectedOffer.location}
//             </p>
//             <p className="text-gray-500 mb-4">
//               Offer Duration: {selectedOffer.offerDuration}
//             </p>
//             <ul className="list-disc pl-5 mb-4">
//               {selectedOffer.description.map((point, index) => (
//                 <li key={index} className="text-gray-700">
//                   {point}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../Env/EnvExport";

export default function OfferPage() {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    // Fetch and set offers data here
    axios.get(`${apiUrl}/api/promotions`).then((response) => {
      setOffers(response.data);
      console.log(response.data);
    });
  }, []);

  const handleOpenModal = (offer) => {
    setSelectedOffer(offer);
  };

  const handleCloseModal = () => {
    setSelectedOffer(null);
  };

  const updateOfferState = (updatedOffer) => {
    setOffers((prevOffers) =>
      prevOffers.map((offer) =>
        offer._id === updatedOffer._id ? updatedOffer : offer
      )
    );
  };

  const handleApprove = (offerId) => {
    axios
      .post(`${apiUrl}/api/promotions/approve/${offerId}`)
      .then(() => {
        // Update the offer state to reflect approval
        setOffers((prevOffers) =>
          prevOffers.map((offer) =>
            offer._id === offerId
              ? { ...offer, isSuperAdminApprove: true, isRejected: false }
              : offer
          )
        );
        console.log(`Offer ${offerId} approved`);
      })
      .catch((error) => {
        console.error("There was an error approving the offer!", error);
      });
  };

  const handleReject = (offerId) => {
    axios
      .post(`${apiUrl}/api/promotions/reject/${offerId}`)
      .then(() => {
        // Update the offer state to reflect rejection
        setOffers((prevOffers) =>
          prevOffers.map((offer) =>
            offer._id === offerId
              ? {
                  ...offer,
                  isRejected: !offer.isRejected,
                  isSuperAdminApprove: false,
                }
              : offer
          )
        );
        console.log(`Offer ${offerId} rejected`);
      })
      .catch((error) => {
        console.error("There was an error rejecting the offer!", error);
      });
  };

  return (
    <>
      <section>
        <div className="min-h-screen bg-gray-100">
          <main className="p-8">
            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Offers Approval
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {offers.map((offer) => (
                  <div key={offer._id}>
                    <div className=" bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl relative">
                      <div
                        className={`h-4 w-4 rounded-full absolute top-2 right-2 ${
                          offer.isSuperAdminApprove
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <h3 className="text-2xl font-bold mb-2">
                        {offer.subHeader}
                      </h3>
                      <p className="text-gray-600 mb-2">{offer.tagline}</p>
                      <p className="text-gray-500 mb-2">
                        Restaurant: {offer.restaurantName}
                      </p>
                      <ul className="list-disc pl-5 mb-4">
                        {offer.conditions && offer.conditions.length > 0 ? (
                          offer.conditions.map((point, index) => (
                            <li key={index} className="text-gray-700">
                              {point}
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-700">
                            No conditions available
                          </li>
                        )}
                      </ul>
                      <div className="flex justify-between items-center">
                        {/* <button
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                          onClick={() => handleOpenModal(offer)}
                        >
                          View Details
                        </button> */}
                        <div className="flex space-x-2">
                          {!offer.isSuperAdminApprove && !offer.isRejected ? (
                            <button
                              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                              onClick={() => handleApprove(offer._id)}
                            >
                              Approve
                            </button>
                          ) : null}

                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            onClick={() => handleReject(offer._id)}
                          >
                            {offer.isRejected ? "Re-approve" : "Reject"}
                          </button>
                        </div>
                      </div>
                    </div>
                    {offer.isRejected && (
                      <div className="bg-red-500 text-white px-4 py-2 rounded-md">
                        Rejected
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </section>

      {/* Modal for Offer Details */}
      {selectedOffer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <h3 className="text-3xl font-bold mb-2">{selectedOffer.header}</h3>
            <p className="text-gray-600 mb-2">{selectedOffer.tagline}</p>
            <p className="text-gray-500 mb-2">
              Restaurant: {selectedOffer.restaurantName}
            </p>
            <p className="text-gray-500 mb-2">
              Location: {selectedOffer.location}
            </p>
            <p className="text-gray-500 mb-4">
              Offer Duration: {selectedOffer.offerDuration}
            </p>
            <ul className="list-disc pl-5 mb-4">
              {selectedOffer.description.map((point, index) => (
                <li key={index} className="text-gray-700">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
