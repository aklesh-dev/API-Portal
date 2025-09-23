import NotFound from "@/assets/404-Error.svg";

const PageNotFound = () => {
  return (
    <div
      className="min-h-screen bg-no-repeat bg-contain bg-center"
      style={{
        backgroundImage: `url(${NotFound})`,
      }}
    />
  );
};

export default PageNotFound;
