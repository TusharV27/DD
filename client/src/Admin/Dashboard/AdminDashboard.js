import React, { Component, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

// class Chart1 extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       options: {
//         chart: {
//           id: "area-chart",
//           toolbar: {
//             show: false,
//           },
//         },
//         xaxis: {
//           categories: [
//             "Monday",
//             "Tuesday",
//             "Wednesday",
//             "Thursday",
//             "Friday",
//             "Saturday",
//             "Sunday",
//           ],
//         },
//         yaxis: {
//           min: 0,
//           //   max: 100,
//           tickAmount: 5,
//         },
//         markers: {
//           size: 5,
//           colors: ["#fff"],
//           strokeColors: "#000",
//           strokeWidth: 2,
//           hover: {
//             size: 7,
//           },
//         },
//         dataLabels: {
//           enabled: false,
//         },
//         stroke: {
//           curve: "smooth",
//           width: 4,
//         },
//         fill: {
//           type: "solid",
//         },
//         tooltip: {
//           enabled: true,
//           theme: "dark",
//         },
//         colors: ["#87CEEB", "#F38C6A"], // Colors for the two lines
//         legend: {
//           show: true,
//         },
//         tooltip: {
//           shared: true,
//         },
//       },
//       series: [
//         {
//           name: "Submitted Welcome Form",
//           data: [60, 40, 70, 80, 50, 60, 90],
//         },
//         {
//           name: "Not Submitted Welcome Form",
//           data: [30, 20, 40, 50, 30, 40, 60], // Example data
//         },
//       ],
//     };
//   }

//   render() {
//     return (
//       <div className="p-4">
//         <div className="bg-white rounded-lg shadow-md p-4">
//           <Chart
//             options={this.state.options}
//             series={this.state.series}
//             type="line"
//             height="400"
//           />
//         </div>
//       </div>
//     );
//   }
// }

class VisitorChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Accepted",
          data: [],
        },
        {
          name: "No Thanks",
          data: [],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            borderRadiusApplication: "end",
            borderRadiusWhenStacked: "last",
            dataLabels: {
              position: "top",
            },
          },
        },
        xaxis: {
          type: "datetime",
          labels: {
            format: "dd/MM/yy",
          },
          title: {
            text: "Date",
          },
        },
        yaxis: {
          title: {
            text: "Number of Visitors",
          },
        },
        legend: {
          position: "right",
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
      },
    };
  }

  componentDidMount() {
    this.fetchVisitorData();
  }

  fetchVisitorData = async () => {
    try {
      // Retrieve the ID from sessionStorage
      const storedId = JSON.parse(sessionStorage.getItem("restAdmin"))._id;
      console.log(storedId);
      if (!storedId) {
        console.error("No ID found in sessionStorage.");
        return;
      }

      // Fetch data using the retrieved ID
      const response = await axios.get(
        `http://localhost:5000/api/visitor-data/${storedId}`
      );
      const visitors = response.data;

      const dayCounts = visitors.reduce((acc, visitor) => {
        const date = new Date(visitor.visitingDateTime);
        const day = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        if (!acc[day]) {
          acc[day] = { accepted: 0, noThanks: 0 };
        }
        if (visitor.isAccepted) {
          acc[day].accepted += 1;
        } else {
          acc[day].noThanks += 1;
        }
        return acc;
      }, {});

      const dates = Object.keys(dayCounts);
      const acceptedCounts = Object.values(dayCounts).map(
        (day) => day.accepted
      );
      const noThanksCounts = Object.values(dayCounts).map(
        (day) => day.noThanks
      );

      this.setState({
        series: [
          {
            name: "Accepted",
            data: acceptedCounts,
          },
          {
            name: "No Thanks",
            data: noThanksCounts,
          },
        ],
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories: dates,
          },
        },
      });
    } catch (error) {
      console.error("Error fetching visitor data:", error);
    }
  };

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

const Home_Card = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Most Clicked Items
          </h2>
          <div>
            <label htmlFor="category-filter" className="mr-2 text-gray-600">
              Filter by Categories
            </label>
            <select
              id="category-filter"
              className="border rounded-lg p-2 text-gray-700"
            >
              <option>All</option>
              {/* Add more options if needed */}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              imgSrc:
                "https://biancazapatka.com/wp-content/uploads/2020/09/best-vegan-mushroom-risotto.jpg",
              title: "Margherita Pizza",
              price: "₹249",
              clicks: "189 Clicks",
            },
            {
              imgSrc:
                "https://1.bp.blogspot.com/-CNzUMIzUQQM/V9p6d7-4PqI/AAAAAAABb2g/o2-Fir11lp0OBLdFd5YXMFetf9Jmc4o5QCLcB/s1600/Gluten%2BFree%2BMargherita%2BPizza%2B%25281%2529.jpg",
              title: "Misu Dumpling",
              price: "₹249",
              clicks: "148 Clicks",
            },
            {
              imgSrc:
                "https://taylahskitchen.com/wp-content/uploads/2020/09/burgie033.jpg",
              title: "Watermelon Pepper Soup",
              price: "₹249",
              clicks: "85 Clicks",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center p-4 border rounded-lg shadow-sm"
            >
              <img
                src={item.imgSrc}
                alt={item.title}
                className="w-24 h-24 rounded-lg object-cover mr-4"
              />
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600">{item.price}</p>
                <p className="text-gray-600">{item.clicks}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Most Time Spent on Products
          </h2>
          <div>
            <label htmlFor="time-filter" className="mr-2 text-gray-600">
              Filter by Time
            </label>
            <select
              id="time-filter"
              className="border rounded-lg p-2 text-gray-700"
            >
              <option>This Week</option>
              {/* Add more options if needed */}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              imgSrc:
                "https://taylahskitchen.com/wp-content/uploads/2020/09/burgie033.jpg",
              title: "Margherita Pizza",
              time: "91 Minutes",
            },
            {
              imgSrc:
                "https://1.bp.blogspot.com/-CNzUMIzUQQM/V9p6d7-4PqI/AAAAAAABb2g/o2-Fir11lp0OBLdFd5YXMFetf9Jmc4o5QCLcB/s1600/Gluten%2BFree%2BMargherita%2BPizza%2B%25281%2529.jpg",
              title: "Misu Dumpling",
              time: "85 Minutes",
            },
            {
              imgSrc:
                "https://biancazapatka.com/wp-content/uploads/2020/09/best-vegan-mushroom-risotto.jpg",
              title: "Watermelon Pepper Soup",
              time: "80 Minutes",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center p-4 border rounded-lg shadow-sm"
            >
              <img
                src={item.imgSrc}
                alt={item.title}
                className="w-24 h-24 rounded-lg object-cover mr-4"
              />
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function AdminDashboard() {
  return (
    <div className="p-6 space-y-8">
      <div className="w-full max-w-full mx-auto">
        <VisitorChart />
      </div>
      <div className="w-full max-w-full mx-auto">
        <Home_Card />
      </div>
    </div>
  );
}

export default AdminDashboard;
