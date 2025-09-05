"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface Candidate {
  id: string;
  name: string;
  photo: string | null;
  votes: number;
  percentage: string;
}

interface VotingData {
  candidates: Candidate[];
  totalVotes: number;
  totalVoters: number;
  votedCount: number;
  turnoutPercentage: string;
}

export default function ResultChart({ data }: { data: VotingData }) {
  const colors = [
    "#FFD700", // Gold
    "#FF6B6B", // Red
    "#4ECDC4", // Teal
    "#45B7D1", // Blue
    "#96CEB4", // Green
    "#FECA57", // Orange
    "#FF9FF3", // Pink
    "#54A0FF", // Light Blue
  ];

  const pieData = {
    labels: data.candidates.map((c) => c.name),
    datasets: [
      {
        data: data.candidates.map((c) => c.votes),
        backgroundColor: colors.slice(0, data.candidates.length),
        borderColor: "#1a1a1a",
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: data.candidates.map((c) => c.name),
    datasets: [
      {
        label: "Jumlah Suara",
        data: data.candidates.map((c) => c.votes),
        backgroundColor: colors.slice(0, data.candidates.length),
        borderColor: colors.slice(0, data.candidates.length),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#ffffff",
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const percentage =
              data.candidates[context.dataIndex]?.percentage || "0";
            return `${label}: ${value} suara (${percentage}%)`;
          },
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.parsed.y || 0;
            const percentage =
              data.candidates[context.dataIndex]?.percentage || "0";
            return `${value} suara (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "#333333",
        },
      },
      x: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "#333333",
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="text-secondary text-2xl font-bold">
            {data.totalVotes}
          </h3>
          <p className="text-gray-300">Total Suara</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="text-secondary text-2xl font-bold">
            {data.votedCount}
          </h3>
          <p className="text-gray-300">Sudah Memilih</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="text-secondary text-2xl font-bold">
            {data.totalVoters}
          </h3>
          <p className="text-gray-300">Total Pemilih</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="text-secondary text-2xl font-bold">
            {data.turnoutPercentage}%
          </h3>
          <p className="text-gray-300">Partisipasi</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-center mb-4">
            Distribusi Suara
          </h3>
          <div className="max-w-md mx-auto">
            <Pie data={pieData} options={chartOptions} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-center mb-4">
            Perbandingan Suara
          </h3>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      {/* Detailed Results */}
      <div className="p-6 rounded-lg">
        <h3 className="text-xl font-bold text-center mb-6">Hasil Detail</h3>
        <div className="space-y-4">
          {data.candidates.map((candidate, index) => (
            <div
              key={candidate.id}
              className="flex items-center justify-between p-4 border-t"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: colors[index] }}
                ></div>
                <div>
                  <h4 className="font-bold text-lg">{candidate.name}</h4>
                  <p className="text-gray-300">
                    {candidate.votes} suara • {candidate.percentage}%
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-secondary">
                  {candidate.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
