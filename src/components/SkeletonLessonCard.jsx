const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white rounded-2xl shadow p-6 border border-gray-200 space-y-4">
      <div className="h-5 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
};

export default SkeletonCard;
