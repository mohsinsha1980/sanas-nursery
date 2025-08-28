export default function HomeBannerLoading() {
  return (
    <div className="container animate-pulse m-4">
      <div className="grid grid-cols-3 gap-[30px]">
        <div className="w-full h-[400px] bg-gray-300 rounded-lg"></div>
        <div className="grid gap-4">
          <div className="w-full h-[180px] bg-gray-300 rounded-lg"></div>
          <div className="w-full h-[180px] bg-gray-300 rounded-lg"></div>
        </div>

        <div className="w-full h-[400px] bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );
}
