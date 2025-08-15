'use client'
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <main className="bg-purple-100">
      <Navbar />

      {/* About Me */}
      <div className="bg-white py-12">
        <section className="container mx-auto pt-10 px-4 md:px-22">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="flex flex-col gap-4">
              <h2 className="font-medium text-3xl">About Me</h2>
              <p className="font-medium">
                As an aspiring web developer with three months of hands-on experience, I&apos;ve already built several personal projects that demonstrate my growing skills in this field.
              </p>
              <p>
                My name is Ming Lama, a passionate beginner in web development dedicated to continuous learning. I specialize in front-end technologies and enjoy transforming ideas into functional, user-friendly websites. Through my journey so far, I&apos;ve developed a strong foundation in HTML, CSS, JavaScript, and modern frameworks while constantly expanding my knowledge through practice and experimentation.
              </p>
            </div>

            {/* Regular Image (Not Circular) */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-full h-full min-h-[300px] max-w-[400px]">
                <Image
                  src="/office.avif"
                  alt="Office image"
                  fill
                  className="object-cover"
                  quality={90}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Projects */}
      <div className="pt-16">
        {/* heading */}
        <div className="flex flex-col gap-6 justify-center items-center text-center">
          <h2 className="font-medium text-2xl">
            Explore My <span className="relative inline-block">
              Projects
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current"></span>
            </span> Below
          </h2>
          <p className="w-full max-w-[600px] px-4">
            You can browse through my portfolio of web development projects, each representing milestones in my learning journey. These works showcase my growing expertise in front-end technologies and problem-solving abilities.
          </p>
        </div>

        {/* Cards */}
        <section className="container mx-auto pt-10 px-4 md:px-22 p-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 w-78">
              <Link
                href="https://weather-app-ochre-mu-10.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src="/project1-screenshot.png"
                    alt="Weather App Preview"
                    width={800}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 hover:bg-gray-400 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center">
                      Visit Live Site
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>

              {/* Description */}
              <div className="p-4 relative">
                <div className={`text-gray-600 overflow-hidden ${isExpanded ? 'max-h-full' : 'max-h-[3.6em]'}`}>
                  <h3 className="font-medium text-lg">Weather App</h3>
                  <p>
                    My Weather App provides real-time forecasts with a clean, intuitive interface. Built with React.js and Tailwind CSS, it fetches live data from the OpenWeather API to display current conditions, 5-day forecasts, and severe weather alerts. The app features location detection, temperature unit conversion, and responsive design that works seamlessly across all devices.
                  </p>
                </div>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-gray-600 hover:text-gray-800 text-sm inline-flex items-center ml-1 mt-1"
                >
                  {isExpanded ? 'Read Less' : 'Read More'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}