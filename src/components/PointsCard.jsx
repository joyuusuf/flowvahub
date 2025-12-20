export default function PointsCard({ points }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-gray-600 font-medium">Points Balance</h3>
      <p className="text-4xl font-bold text-purple-600 mt-2">{points}</p>

      <div className="mt-4">
        <p className="text-sm text-gray-500">Progress to $5 Gift Card</p>
        <progress
          className="w-full h-2 mt-2"
          value={points}
          max={5000}
        />
      </div>
    </div>
  );
}
