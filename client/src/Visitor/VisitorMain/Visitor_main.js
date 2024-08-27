import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../Env/EnvExport";
import VisitorTab from "../Visitor Tab/VisitorTab";

function Visitor_main() {
  const [outlets, setOutlets] = useState([]);
  async function getOutlets() {
    try {
      const res = await axios.get(`${apiUrl}/outlets`);
      console.log(res.data);
      setOutlets(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getOutlets();
  }, []);
  return (
    <div>
      {outlets.map((outlet) => (
        <div key={outlet._id}>
          <h1>{outlet.restaurantName}</h1>
        </div>
      ))}
      <VisitorTab />
    </div>
  );
}

export default Visitor_main;
