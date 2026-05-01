import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toDateString();

  return (
    <div className="clock">
      <h2>🕒 Live Time</h2>
      <h1>{formattedTime}</h1>
      <p>{formattedDate}</p>
    </div>
  );
}