const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="h-[6rem] p-2 flex flex-col items-center justify-center gap-2 border-t-2">
      <p className="font-medium text-lg max-sm:text-sm">
        &copy; {year} API Services Portal | All services are secure and
        compliant
      </p>

      <div className="flex gap-4 font-normal text-[0.9rem] max-sm:text-sm">
        <a
          href="/api/health"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 active:scale-90 transition duration-200 ease-in"
        >
          System Health Check
        </a>

        <a
          href="http://124.41.227.48:8099/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 active:scale-90 transition duration-200 ease-in"
        >
          API Documentation
        </a>

        <a
          href="/api/redoc"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 active:scale-90 transition duration-200 ease-in"
        >
          Support
        </a>
      </div>
    </div>
  );
};

export default Footer;
