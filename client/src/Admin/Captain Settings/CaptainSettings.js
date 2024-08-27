import React from "react";

function CaptainSettings() {
  return (
    <div className="p-6 bg-card text-card-foreground">
      <h2 className="text-lg font-semibold mb-4">Today</h2>
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div className="mb-2 sm:mb-0">
          <span className="font-bold">Total Calls:</span> 987
        </div>
        <div className="mb-2 sm:mb-0">
          <span className="font-bold">Total Accepted:</span> 16
        </div>
        <div className="mb-2 sm:mb-0">
          <span className="font-bold">Total Rejected:</span> 16
        </div>
        <div className="mb-2 sm:mb-0">
          <span className="font-bold">Average Response:</span> 7s
        </div>
        <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 ml-4 p-2 rounded mt-2 sm:mt-0">
          Filter
        </button>
      </div>
      <h3 className="text-lg font-semibold mt-6 mb-2">Captain Reports</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted text-muted-foreground">
              <th className="border border-border p-2">Sr No</th>
              <th className="border border-border p-2">Name</th>
              <th className="border border-border p-2">Total Calls</th>
              <th className="border border-border p-2">Total Received</th>
              <th className="border border-border p-2">Total Rejected</th>
              <th className="border border-border p-2">
                Average Response Time
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-muted/50">
              <td className="border border-border p-2">1</td>
              <td className="border border-border p-2">Pratik Tiwari</td>
              <td className="border border-border p-2">29</td>
              <td className="border border-border p-2">26</td>
              <td className="border border-border p-2">3</td>
              <td className="border border-border p-2">10 Seconds</td>
            </tr>
            <tr className="hover:bg-muted/50">
              <td className="border border-border p-2">2</td>
              <td className="border border-border p-2">Aman Gupta</td>
              <td className="border border-border p-2">36</td>
              <td className="border border-border p-2">31</td>
              <td className="border border-border p-2">5</td>
              <td className="border border-border p-2">15 Seconds</td>
            </tr>
            <tr className="hover:bg-muted/50">
              <td className="border border-border p-2">3</td>
              <td className="border border-border p-2">Raj Joshi</td>
              <td className="border border-border p-2">42</td>
              <td className="border border-border p-2">40</td>
              <td className="border border-border p-2">1</td>
              <td className="border border-border p-2">8 Seconds</td>
            </tr>
            <tr className="hover:bg-muted/50">
              <td className="border border-border p-2">4</td>
              <td className="border border-border p-2">Pankaj Jha</td>
              <td className="border border-border p-2">35</td>
              <td className="border border-border p-2">30</td>
              <td className="border border-border p-2">5</td>
              <td className="border border-border p-2">9 Seconds</td>
            </tr>
            <tr className="hover:bg-muted/50">
              <td className="border border-border p-2">5</td>
              <td className="border border-border p-2">Mantha S</td>
              <td className="border border-border p-2">18</td>
              <td className="border border-border p-2">18</td>
              <td className="border border-border p-2">0</td>
              <td className="border border-border p-2">5 Seconds</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CaptainSettings;
