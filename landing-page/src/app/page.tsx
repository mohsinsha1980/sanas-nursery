import Link from "next/link";
import Logo from "../components/Logo";
import SocialMedia from "../components/SocialMedia";

export default function Home() {
  const youtubeVideos = [
    {
      id: "H_M_HWpIXi4",
      title: "Famous Client Review - Plant Care Experience",
      description:
        "Hear from our satisfied client about their amazing plant care journey with Sanas Nursery",
    },
    {
      id: "YkRXrzl-4Qw",
      title: "Client Testimonial - Wholesale Nursery Service",
      description:
        "Real feedback from a famous client about our wholesale nursery services and quality",
    },
    {
      id: "GXMY8H6Dmhg",
      title: "Client Review - Plant Selection & Quality",
      description:
        "What our famous clients say about our plant selection and quality standards",
    },
    {
      id: "dkD3dF1rL5M",
      title: "Client Testimonial - Nursery Management",
      description:
        "Hear from satisfied clients about our professional nursery management and service",
    },
  ];

  return (
    <div className="bg-white">
      <section
        className="relative bg-gradient-to-br py-20 bg-center bg-cover"
        style={{ backgroundImage: "url('/bg.png')" }}
      >
        <div className="container-custom text-center py-10 z-50">
          <h1 className="text-4xl md:text-6xl font-bold text-accent-900 mb-6">
            Welcome to <span className="text-primary-600">Sanas Nursery</span>
          </h1>
          <p className="text-xl text-accent-600 mb-8 max-w-3xl mx-auto">
            We're working hard to bring you an amazing experience. Our main
            website is under construction, but we're excited to share what's
            coming soon!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Get in Touch
            </Link>
            <Link
              href="https://www.instagram.com/wholesalenursery?igsh=MXZ5MnFlMzVvM2Vsaw%3D%3D&utm_source=qr"
              className="btn-secondary"
              target="_"
            >
              Watch Videos
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="mt-8 z-50">
            <p className="text-lg text-accent-600 mb-4">
              Connect with us on social media:
            </p>
            <div className="flex justify-center z-50">
              <SocialMedia />
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 z-10 pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary-300 rounded-full opacity-20 z-10 pointer-events-none"></div>
      </section>

      {/* YouTube Videos Section */}
      <section id="videos" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-900 mb-4">
              Client Reviews & Testimonials
            </h2>
            <p className="text-xl text-accent-600 max-w-2xl mx-auto">
              Hear what our famous clients have to say about Sanas Nursery. Real
              experiences and honest feedback from satisfied customers.
            </p>
          </div>

          {/* Video Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {youtubeVideos.map((video, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <iframe
                    className="w-full h-48"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-accent-900 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-accent-600 text-sm">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className=" mt-2 text-right mr-1 text-primary-500 hover:underline hover:text-primary-700 ">
            <Link
              href="https://www.instagram.com/wholesalenursery?igsh=MXZ5MnFlMzVvM2Vsaw%3D%3D&utm_source=qr"
              target="_"
            >
              View more
            </Link>
          </div>

          {/* Video CTA */}
          <div className="text-center mt-12">
            <p className="text-lg text-accent-600 mb-8">
              Want to become our next satisfied client? Contact us to experience
              the Sanas Nursery difference!
            </p>
            <Link href="/contact" className="btn-primary py-3">
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-accent-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-900 mb-4">
              What's Coming Soon
            </h2>
            <p className="text-xl text-accent-600 max-w-2xl mx-auto">
              We're building something special for you. Here's a glimpse of what
              to expect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-lg bg-white hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-accent-900 mb-2">
                Amazing Experience
              </h3>
              <p className="text-accent-600">
                We're crafting an experience that will exceed your expectations
                and make every interaction memorable.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-lg bg-white hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-secondary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-accent-900 mb-2">
                Secure & Reliable
              </h3>
              <p className="text-accent-600">
                Your security and privacy are our top priorities. We're building
                with the latest security standards.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-lg bg-white hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-accent-900 mb-2">
                Built with Love
              </h3>
              <p className="text-accent-600">
                Every detail is crafted with care and attention. We're
                passionate about delivering excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16  bg-cover"
        style={{ backgroundImage: "url('/bg-contact.jpg')" }}
      >
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold  text-accent-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-accent-900  mb-8 max-w-2xl mx-auto">
            Don't miss out on the launch! Get in touch with us to stay informed
            about our progress.
          </p>
          <Link
            href="/contact"
            className="bg-primary-400  hover:bg-primary-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-white"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
}
