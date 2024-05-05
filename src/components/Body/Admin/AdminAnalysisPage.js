import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

// ChartJS.register(ArcElement, Tooltip, Legend); // Register necessary Chart.js plugins

const BarChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Created Events Per Day",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // Reddish
          "rgba(54, 162, 235, 0.2)", // Blueish
          "rgba(255, 206, 86, 0.2)", // Yellowish
          "rgba(75, 192, 192, 0.2)", // Greenish
          "rgba(153, 102, 255, 0.2)", // Purplish
          "rgba(255, 159, 64, 0.2)", // Orangeish
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Reddish
          "rgba(54, 162, 235, 1)", // Blueish
          "rgba(255, 206, 86, 1)", // Yellowish
          "rgba(75, 192, 192, 1)", // Greenish
          "rgba(153, 102, 255, 1)", // Purplish
          "rgba(255, 159, 64, 1)", // Orangeish
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const processedData = processData(data);
    setChartData({
      labels: processedData.labels,
      datasets: [
        {
          ...chartData.datasets[0], // Spread existing dataset configuration
          data: processedData.counts,
        },
      ],
    });
  }, [data]);

  const processData = (data) => {
    const counts = {}; // Object to store counts per day
    const labels = [];

    data.forEach((item) => {
      const date = new Date(item.createdAt.$date);
      const year = date.getFullYear();
      const month = date.getMonth(); // 0-indexed
      const day = date.getDate();

      const key = `${year}-${month + 1}-${day}`; // Format key with padded month
      counts[key] = (counts[key] || 0) + 1; // Increment count for the day
    });

    // Sort labels chronologically (optional)
    labels.push(...Object.keys(counts).sort()); // Extract and potentially sort keys

    return { labels, counts };
  };

  return (
    <div className="h-[80vh] w-full p-8 ">
      <p className="text-white text-center">object uploaded by Days</p>
      <Bar
        data={chartData}
        options={{
          responsive: true, // Maintain aspect ratio on resize
          maintainAspectRatio: false, // Allow for custom chart size adjustments (if needed)

          scales: {
            x: {
              // Target the x-axis
              grid: {
                color: "rgba(153, 153, 153, 0.29)", // Set gridline color to white
              },
              ticks: {
                color: "white", // Set tick label color to white
              },
            },
            y: {
              // Target the y-axis
              grid: {
                color: "rgba(153, 153, 153, 0.29)", // Set gridline color to white
              },
              ticks: {
                color: "white", // Set tick label color to white
              },
            },
          },
        }}
      />
    </div>
  );
};

const AdminAnalysisPage = () => {
  const [data, setData] = useState([
    {
      createdAt: {
        $date: "2024-03-15T21:20:02.281Z",
      },
    },
    {
      createdAt: {
        $date: "2024-03-15T21:59:12.076Z",
      },
    },
    {
      createdAt: {
        $date: "2024-03-16T22:55:50.516Z",
      },
    },
    {
      createdAt: {
        $date: "2024-03-17T16:51:42.897Z",
      },
    },
    {
      createdAt: {
        $date: "2024-03-19T21:45:54.751Z",
      },
    },
    {
      createdAt: {
        $date: "2024-03-19T22:02:43.984Z",
      },
    },
    {
      createdAt: {
        $date: "2024-03-19T22:02:43.986Z",
      },
    },
    {
      createdAt: {
        $date: "2024-03-19T22:09:58.186Z",
      },
    },
    {
      createdAt: {
        $date: "2024-03-19T22:16:23.408Z",
      },
    },
    {
      createdAt: {
        $date: "2024-03-21T09:49:08.201Z",
      },
    },
    {
      createdAt: {
        $date: "2024-03-23T07:48:56.751Z",
      },
    },
    {
      createdAt: {
        $date: "2024-03-23T07:51:14.663Z",
      },
    },
    {
      createdAt: {
        $date: "2024-04-06T20:00:33.568Z",
      },
    },
    {
      createdAt: {
        $date: "2024-04-06T20:02:22.957Z",
      },
    },
    {
      createdAt: {
        $date: "2024-04-06T20:08:39.518Z",
      },
    },
    {
      createdAt: {
        $date: "2024-04-06T20:09:29.596Z",
      },
    },
    {
      createdAt: {
        $date: "2024-04-06T20:10:45.011Z",
      },
    },
    {
      createdAt: {
        $date: "2024-04-06T20:12:30.332Z",
      },
    },
    {
      createdAt: {
        $date: "2024-04-15T13:00:15.733Z",
      },
    },
    {
      createdAt: {
        $date: "2024-04-26T16:04:30.684Z",
      },
    },
  ]);

  return (
    <div className="grid-cols-1 grid gap-0">
      <BarChart data={[...data]} />
      
    </div>
  );
};

export default AdminAnalysisPage;
