import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

// Example data structure
const data = {
  "Restaurant A": {
    formSubmitted: [60, 80, 70, 90, 100, 95, 120],
    noFormSubmitted: [60, 70, 60, 70, 80, 75, 80],
    totalCustomers: [120, 150, 130, 160, 180, 170, 200],
  },
  "Restaurant B": {
    formSubmitted: [45, 55, 50, 65, 60, 70, 75],
    noFormSubmitted: [45, 50, 40, 55, 50, 60, 65],
    totalCustomers: [90, 105, 90, 120, 110, 130, 140],
  },
  "Restaurant C": {
    formSubmitted: [30, 40, 35, 45, 50, 55, 60],
    noFormSubmitted: [30, 35, 30, 40, 35, 40, 45],
    totalCustomers: [60, 75, 65, 85, 85, 95, 105],
  },
};

const SuperAdminReports = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState("Restaurant A");

  const visitorSeries = [
    {
      name: `${selectedRestaurant} - Form Submitted`,
      data: data[selectedRestaurant].formSubmitted,
    },
    {
      name: `${selectedRestaurant} - No Form Submitted`,
      data: data[selectedRestaurant].noFormSubmitted,
    },
  ];

  const totalCustomerSeries = [
    {
      name: "Total Customers",
      data: data[selectedRestaurant].totalCustomers,
    },
  ];

  const commonOptions = {
    chart: {
      height: "100%",
      type: "area",
      toolbar: {
        show: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2024-08-01T00:00:00.000Z",
        "2024-08-02T00:00:00.000Z",
        "2024-08-03T00:00:00.000Z",
        "2024-08-04T00:00:00.000Z",
        "2024-08-05T00:00:00.000Z",
        "2024-08-06T00:00:00.000Z",
        "2024-08-07T00:00:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
    title: {
      text: `Daily Visitor Trends for ${selectedRestaurant}`,
      align: "left",
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
      floating: true,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 300,
          },
          xaxis: {
            labels: {
              rotate: -45,
            },
          },
        },
      },
      {
        breakpoint: 1000,
        options: {
          chart: {
            height: 400,
          },
        },
      },
    ],
  };

  const totalCustomerOptions = {
    ...commonOptions,
    chart: {
      ...commonOptions.chart,
      type: "line",
    },
    title: {
      text: "Total Number of Customers",
      align: "left",
    },
  };

  const handleRestaurantChange = (event) => {
    setSelectedRestaurant(event.target.value);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4">
        <label htmlFor="restaurant" className="mr-2 text-lg font-medium">
          Select Restaurant:
        </label>
        <select
          id="restaurant"
          value={selectedRestaurant}
          onChange={handleRestaurantChange}
          className="p-2 border border-gray-300 rounded"
        >
          {Object.keys(data).map((restaurant) => (
            <option key={restaurant} value={restaurant}>
              {restaurant}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full max-w-4xl mb-6 p-4 bg-white shadow-lg rounded-lg">
        <ReactApexChart
          options={commonOptions}
          series={visitorSeries}
          type="area"
          height={350}
        />
      </div>
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
        <ReactApexChart
          options={totalCustomerOptions}
          series={totalCustomerSeries}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default SuperAdminReports;
