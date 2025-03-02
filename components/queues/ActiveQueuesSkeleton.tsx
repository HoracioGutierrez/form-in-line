export default function ActiveQueuesSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-5">
          <div className="flex justify-between mb-3">
            <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        </div>
      ))}
    </div>
  );
}
