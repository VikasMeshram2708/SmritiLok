import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        {/* Icon */}
        <div className="mb-6">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            className="text-red-500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="#fee2e2"
            />
            <path
              d="M12 8v4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="1" fill="currentColor" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Sorry, we {"couldn't"} find the page {"you're"} looking for.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5-8l2 2m-2-2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8"
            />
          </svg>
          Return Home
        </Link>
      </div>
    </div>
  );
}
