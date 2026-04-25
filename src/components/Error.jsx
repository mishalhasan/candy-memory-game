import { useGameNavigation } from "../hooks/useGameNavigation";

export default function Error() {
  const { goHome, apiReset } = useGameNavigation();

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-10 text-center">
        <p className="text-lg font-body text-pink-700">
          Something went wrong. Please try again later.
        </p>

        <div className="flex gap-5">
          <button
            className=" font-emphasis w-fit px-6 py-3 bg-blue-300 text-pink-100  font-bold rounded-xl shadow-lg hover:bg-pink-300 hover:scale-105 transition transform duration-200"
            onClick={apiReset}
          >
            Restart Game
          </button>

          <button
            className=" font-emphasis w-fit px-6 py-3 bg-pink-50 text-pink-400 font-semibold rounded-xl shadow-lg hover:bg-pink-300 hover:text-pink-50 hover:scale-105 transition transform duration-200"
            onClick={goHome}
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
