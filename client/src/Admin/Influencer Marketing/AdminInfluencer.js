import React from "react";
import Img from "./img.jpg";

function AdminInfluencer() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="flex flex-col md:flex-row items-center bg-card p-6 md:p-8">
        <div className="md:w-2/3 p-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Have influencers make your{" "}
            <span className="font-bold">restaurant famous</span>!
          </h2>
          <ul className="list-none space-y-3 mb-4">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 text-lg md:text-xl">✔️</span>
              <span className="text-foreground text-lg md:text-xl">
                We connect you with our network of 5000+ influencers
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 text-lg md:text-xl">✔️</span>
              <span className="text-foreground text-lg md:text-xl">
                They visit your restaurant and make reels about you
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 text-lg md:text-xl">✔️</span>
              <span className="text-foreground text-lg md:text-xl">
                Your restaurant gets a boost in engagement
              </span>
            </li>
          </ul>
          <button className="bg-orange-500 text-destructive-foreground px-4 py-2 rounded-lg text-white mt-4 md:mt-0">
            Connect with us
          </button>
        </div>
        <div className="md:w-1/3 p-4">
          <img
            src={Img}
            alt="Illustration of influencer promoting a restaurant"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default AdminInfluencer;
