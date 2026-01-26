const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-50">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-pink-200 border-t-pink-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-linear-to-r from-pink-300 to-pink-500 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
