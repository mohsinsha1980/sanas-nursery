export default function DetailsLoading() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-[100px] p-0 bg-gray-300 mb-12"></div>
      <div className="p-6 container grid grid-cols-2 items-start sm:grid-cols-1 sm:gap-2">
        <div>
          <section className="product-image-section flex gap-12">
            <div className="w-[501px] h-[668px] bg-gray-300 rounded sm:h-[400px]"></div>
            <div className="flex flex-col space-y-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="w-[100px] h-[125px] bg-gray-300 rounded sm:h-[100px]"
                ></div>
              ))}
            </div>
          </section>
        </div>
        <div className="space-y-4 self-start">
          <div className="w-1/2 h-12 bg-gray-300 rounded"></div>
          <div className="h-4 w-1/5 bg-gray-300 rounded"></div>
          <div className="h-4 w-2/6 bg-gray-300 rounded"></div>
          <div className="h-6 w-4/6 bg-gray-300 rounded"></div>
          <div className="h-4 w-2/6 bg-gray-300 rounded"></div>
          <div className="h-4 w-2/6 bg-gray-300 rounded"></div>
          <div className="h-6 w-4/6 bg-gray-300 rounded"></div>
          <div className="w-4/6 h-12 bg-gray-300 rounded"></div>
          <div className="h-4 w-2/6 bg-gray-300 rounded"></div>
          <div className="h-6 w-4/6 bg-gray-300 rounded"></div>
          <div className="w-4/6 h-12 bg-gray-300 rounded"></div>
          <div className="h-4 w-2/6 bg-gray-300 rounded"></div>
          <div className="h-6 w-4/6 bg-gray-300 rounded"></div>
          <div className="h-4 w-2/6 bg-gray-300 rounded"></div>
          <div className="h-6 w-4/6 bg-gray-300 rounded"></div>
          <div className="w-4/6 h-12 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="container mt-6 w-full h-[200px] p-0 bg-gray-300 mb-4 rounded-lg"></div>
    </div>
  );
}
