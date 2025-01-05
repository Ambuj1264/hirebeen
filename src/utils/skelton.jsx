export const SkeletonLoader = () => {
    return (
      <div className="animate-pulse">
        <div className="bg-gray-300 h-8 w-48 mx-auto mb-4 rounded"></div>
        <div className="bg-gray-300 h-6 w-72 mx-auto mb-6 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="border p-4 rounded-md shadow-md bg-gray-200">
              <div className="bg-gray-300 h-32 w-full mb-4 rounded-md"></div>
              <div className="bg-gray-300 h-6 w-32 mb-2 rounded"></div>
              <div className="bg-gray-300 h-6 w-20 mb-4 rounded"></div>
              <div className="bg-gray-300 h-8 w-24 mx-auto rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  };