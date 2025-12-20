export default function StreakCard({ streak, onClaim }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-gray-600 font-medium">Daily Streak</h3>
      <p className="text-3xl font-bold text-purple-600 mt-2">
        {streak} day{streak !== 1 && "s"}
      </p>

      <button
        onClick={onClaim}
        className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium"
      >
        Claim Today’s Points
      </button>
    </div>
  );
}
