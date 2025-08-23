'use client';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import AdminAddCard from '@/components/AdminAddCard';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [isExpanded, setIsExpanded] = useState({});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 1
  });
  const [isEditing, setIsEditing] = useState(null);

  // Fetch projects with pagination
  const fetchProjects = async (page = 1) => {
    try {
      const res = await fetch(`/api/projects?page=${page}&limit=${pagination.limit}`);
      const { data, pagination: paginationData } = await res.json();
      setProjects(data);
      setPagination(paginationData);
    } catch (error) {
      console.error("Fetch error:", error);
      // Fallback to localStorage if API fails
      const saved = localStorage.getItem('projects');
      if (saved) setProjects(JSON.parse(saved));
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await fetch('/api/projects', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
        setProjects(prev => prev.filter(p => p._id !== id));
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  const toggleExpand = (id) => {
    setIsExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <main className="bg-purple-100">
      <Navbar />

      {/* About Me - completely unchanged */}
      <div id="about-me" className="bg-white py-12">
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
        {/* heading - unchanged */}
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

        {/* Cards - structure unchanged, only dynamic rendering added */}
        <section className="container mx-auto pt-10 px-4 md:px-22 p-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Hardcoded Weather App Card - unchanged */}
            {/* <div className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 w-78">
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

              <div className="p-4 relative">
                <div className={`text-gray-600 overflow-hidden ${isExpanded['weather'] ? 'max-h-full' : 'max-h-[3.6em]'}`}>
                  <h3 className="font-medium text-lg">Weather App</h3>
                </div>
              </div>
            </div> */}

            {/* Dynamically rendered projects */}
            {projects.map((project) => (
              <div key={project._id} className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 w-78">
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={project.imageUrl || '/default-project.png'}
                      alt={`${project.title} Preview`}
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

                <div className="p-4">
                  <h3 className="font-medium text-lg text-gray-600">{project.title}</h3>
                </div>
              </div>
            ))}

            {/* Add new project card - unchanged */}
            {/* <div className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-2 border-dashed border-gray-300 w-78 hover:border-blue-400">
              <Link
                href="/add-card"
                className="block w-full h-full"
              >
                <div className="relative h-full min-h-[12rem] bg-gray-50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-50 transition-colors duration-300 p-4">
                  <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600 group-hover:scale-110">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span className="text-gray-600 group-hover:text-blue-600 font-medium">
                    Add New Project
                  </span>
                </div>
              </Link>
            </div> */}
            <AdminAddCard />

          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}