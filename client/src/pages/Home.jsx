import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/api/projects`);
        const data = await res.json();
        setProjects(data);
      } catch (error) { console.error(error); }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-white"> {/* White background for magazine look */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 tracking-tight mb-4">
            PORTFOLIO
          </h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm">Visual Artist & Filmmaker</p>
        </header>

        {/* VOGUE GRID: 2 Columns, minimal gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-24">
          {projects.map((project) => (
            <Link to={`/project/${project._id}`} key={project._id} className="group cursor-pointer">
              
              {/* IMAGE CONTAINER */}
              <div className="overflow-hidden aspect-[3/4] mb-6 relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>

              {/* TEXT CONTENT */}
              <div className="text-center">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  {project.category}
                </p>
                <h2 className="text-3xl font-serif text-gray-900 mb-3 group-hover:underline decoration-1 underline-offset-4">
                  {project.title}
                </h2>
                <p className="text-gray-600 font-light italic font-serif text-sm max-w-sm mx-auto line-clamp-2">
                  {project.shortDescription}
                </p>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;