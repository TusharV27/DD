import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaFilter, FaFileExcel, FaUsers } from "react-icons/fa";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const AdminAnalytics = () => {
  const [filter, setFilter] = useState("Filter");
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const calendarRef = useRef(null);

  // Initial data
  const customerData = [
    {
      id: 1,
      name: "Aman Gupta",
      visitDate: "06/07/2024",
      timeOfVisit: "8:26 PM",
      dob: "26/06/2001",
    },
    {
      id: 2,
      name: "Raj Jha",
      visitDate: "06/07/2024",
      timeOfVisit: "8:26 PM",
      dob: "26/06/2001",
    },
    {
      id: 3,
      name: "Pankaj Jha",
      visitDate: "06/07/2024",
      timeOfVisit: "8:26 PM",
      dob: "26/06/2001",
    },
    {
      id: 4,
      name: "Mantha S",
      visitDate: "6/07/2024",
      timeOfVisit: "8:26 PM",
      dob: "26/06/2001",
    },
    {
      id: 5,
      name: "Satish Lodha",
      visitDate: "06/07/2024",
      timeOfVisit: "8:26 PM",
      dob: "26/06/2001",
    },
    {
      id: 6,
      name: "Yog Patel",
      visitDate: "12/02/2024",
      timeOfVisit: "8:26 PM",
      dob: "26/06/2001",
    },
    {
      id: 7,
      name: "Mihir Jethva",
      visitDate: "13/04/2024",
      timeOfVisit: "8:26 PM",
      dob: "26/06/2001",
    },
    {
      id: 8,
      name: "Sejal Barva",
      visitDate: "08/07/2024",
      timeOfVisit: "8:26 PM",
      dob: "26/06/2001",
    },
    {
      id: 9,
      name: "Dhruv Goswami",
      visitDate: "06/07/2024",
      timeOfVisit: "8:26 PM",
      dob: "26/06/2001",
    },
    {
      id: 10,
      name: "Suti Joshi",
      visitDate: "15/04/2024",
      timeOfVisit: "8:26 PM",
      dob: "26/06/2001",
    },
    {
      id: 11,
      name: "Saurabh Tiwari",
      visitDate: "03/07/2024",
      timeOfVisit: "8:26 PM",
      dob: "26/06/2001",
    },
    {
      id: 12,
      name: "Happy Sonani",
      visitDate: "04/07/2024",
      timeOfVisit: "8:26 PM",
      dob: "26/06/2001",
    },
    {
      id: 13,
      name: "Khushboo Shah",
      visitDate: "02/07/2024",
      timeOfVisit: "8:26 PM",
      dob: "26/06/2001",
    },
    {
      id: 14,
      name: "Ruta Mavani",
      visitDate: "06/04/2024",
      timeOfVisit: "8:26 PM",
      dob: "26/06/2001",
    },
    {
      id: 15,
      name: "Khushi Shah",
      visitDate: "10/07/2024",
      timeOfVisit: "8:26 PM",
      dob: "26/06/2001",
    },
    {
      id: 16,
      name: "Krisha Vaghasiya",
      visitDate: "06/07/2024",
      timeOfVisit: "8:26 PM",
      dob: "26/06/2001",
    },
    {
      id: 17,
      name: "Isha Mangukiya",
      visitDate: "06/03/2024",
      timeOfVisit: "8:26 PM",
      dob: "26/06/2001",
    },
    {
      id: 18,
      name: "Shubh Aanghan",
      visitDate: "06/02/2024",
      timeOfVisit: "8:26 PM",
      dob: "26/06/2001",
    },
    {
      id: 19,
      name: "Priyanshi Raval",
      visitDate: "06/01/2024",
      timeOfVisit: "8:26 PM",
      dob: "26/06/2001",
    },
    {
      id: 20,
      name: "Narendra Modi",
      visitDate: "06/04/2024",
      timeOfVisit: "8:26 PM",
      dob: "26/06/2001",
    },
  ];

  useEffect(() => {
    setFilteredData(customerData); // Initialize with all customer data
  }, []);

  useEffect(() => {
    // Function to handle clicks outside of the calendar
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterChange = (value) => {
    setFilter(value);
    setShowCalendar(false);
    let filteredData = [];
    const today = new Date();
    if (value === "Last Week") {
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      filteredData = customerData.filter((customer) => {
        const visitDate = new Date(customer.visitDate);
        return visitDate >= lastWeek && visitDate <= today;
      });
    } else if (value === "This Month") {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      filteredData = customerData.filter((customer) => {
        const visitDate = new Date(customer.visitDate);
        return visitDate >= startOfMonth && visitDate <= today;
      });
    } else if (value === "By Calendar") {
      setShowCalendar(true);
    }
    setFilteredData(filteredData);
  };

  const handleDateRangeChange = (ranges) => {
    setDateRange([ranges.selection]);
    const { startDate, endDate } = ranges.selection;
    const filteredData = customerData.filter((customer) => {
      const visitDate = new Date(customer.visitDate);
      return visitDate >= startDate && visitDate <= endDate;
    });
    setFilteredData(filteredData);
    setShowCalendar(false); // Close calendar after selecting date range
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredData = customerData.filter((customer) =>
      customer.name.toLowerCase().includes(query)
    );
    setFilteredData(filteredData);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Customer Insights</h2>
        <div className="flex items-baseline p-4 bg-white rounded-lg shadow-md h-24">
          <div className="mr-4">
            <p className="text-3xl font-bold">545</p>
            <h1 className="text-sm font-light">Total Customers</h1>
          </div>
          <FaUsers className="text-blue-600 text-2xl" />
        </div>
      </div>
      <div className="flex items-center mb-5">
        <div className="flex items-center border border-gray-300 rounded-md p-2 mr-5">
          <FaSearch className="mr-2" />
          <input
            type="text"
            placeholder="Search by name or phone number"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border-none outline-none"
          />
        </div>
        <div className="relative mr-5">
          <button
            className="flex items-center bg-gray-100 text-black px-4 py-2 text-base font-medium rounded-md"
            onClick={() => handleFilterChange(filter)}
          >
            <FaFilter className="mr-2" />
            <span>{filter}</span>
          </button>
          <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md">
            <a
              href="#"
              onClick={() => handleFilterChange("Last Week")}
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              Last Week
            </a>
            <a
              href="#"
              onClick={() => handleFilterChange("This Month")}
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              This Month
            </a>
            <a
              href="#"
              onClick={() => handleFilterChange("By Calendar")}
              className="block px-4 py-2 text-black hover:bg-gray-100"
            >
              By Calendar
            </a>
          </div>
          {showCalendar && (
            <div
              className="absolute top-full left-0 mt-2 z-10 bg-white border border-gray-300 rounded-lg shadow-lg p-4"
              ref={calendarRef}
            >
              <DateRangePicker
                ranges={dateRange}
                onChange={handleDateRangeChange}
                className="w-full"
              />
            </div>
          )}
        </div>
        <div className="flex items-center text-blue-600 text-sm">
          <FaFileExcel className="mr-2" />
          <span>Download Excel Report</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Sr No.</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Visit Date</th>
              <th className="p-3 text-left">Time of Visit</th>
              <th className="p-3 text-left">Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((customer, index) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{customer.name}</td>
                <td className="p-3">{customer.visitDate}</td>
                <td className="p-3">{customer.timeOfVisit}</td>
                <td className="p-3">{customer.dob}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAnalytics;
