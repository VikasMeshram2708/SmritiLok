import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Preserve Your Journey,{" "}
              <span className="text-indigo-600">Forever</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Smriti Lok is the most beautiful way to document your life's
              journey. Capture memories, reflections, and growth in one secure
              place.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-md shadow-indigo-100">
                <Link href="/journeys">Start Your Journey - {"It's"} Free</Link>
              </button>
              <Link
                href="/explore"
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Explore
              </Link>
            </div>
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((item) => (
                  <img
                    key={item}
                    src={`https://randomuser.me/api/portraits/${
                      item % 2 === 0 ? "women" : "men"
                    }/${item}0.jpg`}
                    className="w-10 h-10 rounded-full border-2 border-white"
                    alt="User"
                  />
                ))}
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">
                  Trusted by <span className="font-semibold">10,000+</span>{" "}
                  journey keepers
                </p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-gray-500 ml-1">4.9/5.0</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-indigo-100 rounded-2xl"></div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-blue-100 rounded-2xl"></div>
              <div className="relative bg-white p-2 rounded-xl shadow-xl border border-gray-100">
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                    className="w-full h-auto"
                    alt="Journey example"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2">
                    My Himalayan Trek - Day 3
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Today we reached 12,000 feet. The view was breathtaking...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-indigo-600 font-medium">
                      June 12, 2023
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-indigo-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button className="text-gray-400 hover:text-indigo-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Journey, Beautifully Organized
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Smriti Lok offers powerful features to make your journey logging
              effortless and meaningful.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                ),
                title: "Rich Media Entries",
                description:
                  "Add photos, videos, audio notes, and text to create multi-dimensional memories.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                ),
                title: "Smart Search",
                description:
                  "Find any moment instantly with our AI-powered search across all your entries.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "Timeline View",
                description:
                  "See your journey unfold chronologically with our beautiful timeline interface.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Loved by Journey Keepers Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our users say about
              Smriti Lok.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "Smriti Lok has transformed how I document my travels. It's like having a beautiful, private museum of my life.",
                name: "Sarah Johnson",
                role: "Travel Blogger",
                avatar: "https://randomuser.me/api/portraits/women/43.jpg",
              },
              {
                quote:
                  "As someone who journals daily, Smriti Lok's organization features save me hours while making my entries more meaningful.",
                name: "Michael Chen",
                role: "Author & Journalist",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-lg text-gray-700 mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    className="w-12 h-12 rounded-full mr-4"
                    alt={testimonial.name}
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join thousands of others preserving their most precious memories
            with Smriti Lok.
          </p>
          <button className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition shadow-lg">
            <Link href="/journeys">Get Started - {"It's"} Free</Link>
          </button>
        </div>
      </section>
    </div>
  );
}
