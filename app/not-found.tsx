import Link from "next/link";

export default function NotFound() {
  return (
    <div className= 
      {`flex flex-col items-center justify-center h-screen 
      bg-gradient-to-r from-blue-400 to-blue-600 bg-cover bg-center text-white`}>
      <h1 className="text-8xl font-extrabold drop-shadow-lg">404</h1>
      <p 
        className="text-2xl mx-4 my-4 text-center drop-shadow-md">
          Oops! The page you are looking for does not exist or has not been implemented yet.
      </p>
      <p 
        className="text-2xl mx-4 text-center drop-shadow-md">
          Sorry about that inconvenience!
      </p>
      <Link href="/" className="mt-6 px-6 py-3 bg-yellow-400 text-black text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition-all">
        Back to Home
      </Link>
    </div>
  );
}
