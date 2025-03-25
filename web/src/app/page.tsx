"use client";

import { useState } from "react";
// @ts-expect-error because this is temporary
import confetti from "canvas-confetti";

export default function Home() {
  const [answered, setAnswered] = useState(false);
  const [isNoClicked, setIsNoClicked] = useState(false);

  const handleYesClick = () => {
    setAnswered(true);
    setIsNoClicked(false);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff0000", "#ff69b4", "#ffffff"],
    });
  };

  const handleNoClick = () => {
    setIsNoClicked(true);
    // Reset the "try again" message after 1 second
    setTimeout(() => {
      setIsNoClicked(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      {/* Image anchored at the top */}
      <img
        src={answered ? "/us2.jpeg" : "/us.jpg"} // Change this to your new image path
        alt="Prom image"
        style={{
          width: "448px",
          height: "597px",
          objectFit: "contain",
          position: "fixed",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: "10",
        }}
      />

      {/* Main content */}
      <main className="flex flex-col gap-[32px] items-center bg-opacity-70 bg-black rounded-lg p-8 mt-[597px]">
        <h1 className="text-4xl font-bold text-white text-center">
          Will You Go to Prom With Me?
        </h1>

        {!answered ? (
          <div className="flex flex-col gap-4 items-center">
            {isNoClicked && (
              <p className="text-lg text-white text-center animate-shake">
                Try again
              </p>
            )}
            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <button
                onClick={handleYesClick}
                className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-green-500 text-white hover:bg-green-600 font-medium text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 sm:w-auto ${
                  isNoClicked ? "animate-shake" : ""
                }`}
              >
                Yes
              </button>
              <button
                onClick={handleNoClick}
                className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-red-500 text-white hover:bg-red-600 font-medium text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 sm:w-auto ${
                  isNoClicked ? "animate-shake" : ""
                }`}
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <p className="text-lg text-white text-center">
            Yay! I can&apos;t wait, cutie!
          </p>
        )}
      </main>

      <footer className="flex gap-[24px] flex-wrap items-center justify-center text-white mb-8 mt-auto">
        {/* Footer content */}
      </footer>

      {/* Add this style tag for the shake animation */}
      <style jsx>{`
        @keyframes shake {
          0% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          50% {
            transform: translateX(5px);
          }
          75% {
            transform: translateX(-5px);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
