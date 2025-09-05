"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TimeLeft = ({ initialTimeLeft }: { initialTimeLeft: number }) => {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          // 1 detik tersisa
          clearInterval(interval);
          // Refresh halaman ketika countdown selesai
          window.location.reload();
          return 0;
        }
        return prev - 1000; // Kurangi 1 detik (1000ms)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (milliseconds: number): TimeLeft => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  };

  if (timeLeft <= 0) {
    return (
      <p className="mb-6 font-light text-base md:text-lg text-red-400 text-center">
        ⏰ Waktu voting telah berakhir
      </p>
    );
  }

  const time = formatTime(timeLeft);

  return (
    <div className="text-center">
      <p className="font-light text-base md:text-lg text-gray-400 mb-2">
        Waktu tersisa untuk voting:
      </p>

      {/* Countdown Display */}
      <div className="flex justify-center gap-4">
        {time.days > 0 && (
          <div className="  px-3 py-2">
            <div className=" text-white text-3xl font-bold ">{time.days}</div>
            <div className="text-white/50 mt-3">Hari</div>
          </div>
        )}

        <div className="  px-3 py-2">
          <div className=" text-white text-3xl font-bold">
            {time.hours.toString().padStart(2, "0")}
          </div>
          <div className="text-white/50 mt-3">Jam</div>
        </div>

        <div className="  px-3 py-2">
          <div className=" text-white text-3xl font-bold">
            {time.minutes.toString().padStart(2, "0")}
          </div>
          <div className="text-white/50 mt-3">Menit</div>
        </div>

        <div className="  px-3 py-2">
          <div className=" text-white text-3xl font-bold">
            {time.seconds.toString().padStart(2, "0")}
          </div>
          <div className="text-white/50 mt-3">Detik</div>
        </div>
      </div>
    </div>
  );
};

export default TimeLeft;
