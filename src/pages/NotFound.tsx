import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full transition-colors duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
