// src/components/VisitorChart.js
import React, { Component } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

class VisitorChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {
        chart: {
          type: "area",
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Daily Visitor Count",
          align: "left",
        },
        subtitle: {
          text: "Number of Visitors per Day",
          align: "left",
        },
        xaxis: {
          type: "datetime",
          title: {
            text: "Date",
          },
        },
        yaxis: {
          opposite: true,
          title: {
            text: "Number of Visitors",
          },
        },
        legend: {
          horizontalAlign: "left",
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#00E396"],
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0.1,
            stops: [0, 100],
          },
        },
      },
    };
  }

  async componentDidMount() {
    try {
      const { outletId } = this.props;
      const response = await axios.get(
        `http://localhost:5000/api/visitor-data/66b9da23f7866495e87029fb`
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

      const dates = Object.keys(dayCounts).map((date) =>
        new Date(date).toISOString()
      );
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
            data: dates.map((date, index) => ({
              x: date,
              y: acceptedCounts[index],
            })),
          },
          {
            name: "No Thanks",
            data: dates.map((date, index) => ({
              x: date,
              y: noThanksCounts[index],
            })),
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching visitor data:", error);
    }
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ApexCharts
            options={this.state.options}
            series={this.state.series}
            type="area"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default VisitorChart;
