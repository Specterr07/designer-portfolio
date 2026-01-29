import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const ProjectDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${API_URL}/api/projects/${id}`);
        const data = await res.json();
        setProject(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Vivek Patel`;
    }
    
    // Cleanup: Reset title when leaving the page
    return () => {
      document.title = "Vivek Patel | Visual Artist";
    };
  }, [project]);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!project) return <div className="h-screen flex items-center justify-center">Project not found.</div>;

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. HERO SECTION (Horizontal Cover Image) */}
      <div className="w-full h-[60vh] md:h-[80vh] relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div> {/* Subtle darkening for text contrast if needed */}
        
        {/* Back Button (Floating) */}
        <Link to="/" className="absolute top-8 left-8 text-white bg-black/50 px-4 py-2 rounded-full text-sm hover:bg-black transition backdrop-blur-sm">
          ← Back to Portfolio
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-white p-8 md:p-12 shadow-xl">
          
          {/* 2. TITLE HEADER */}
          <div className="text-center mb-12 border-b pb-8">
            <p className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-3">
              {project.category}
            </p>
            <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-6 leading-tight">
              {project.title}
            </h1>
            
            {/* Links */}
            <div className="flex justify-center gap-6 text-sm font-medium">
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  Live Project ↗
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-black hover:underline">
                  More Info ↗
                </a>
              )}
            </div>
          </div>

          {/* 3. LONG DESCRIPTION (Markdown) */}
          <article className="prose prose-lg mx-auto prose-headings:font-serif prose-headings:font-normal prose-a:text-blue-600 font-serif text-gray-600 leading-relaxed">
            <ReactMarkdown>{project.description}</ReactMarkdown>
          </article>

        </div>
      </div>

      {/* 4. SWIPEABLE GALLERY */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="mt-24 max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-serif text-center mb-8 italic">Project Gallery</h3>
          
          {/* Horizontal Scroll Container */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 no-scrollbar">
            {project.gallery.map((imgUrl, index) => (
              <div key={index} className="snap-center shrink-0 w-[85vw] md:w-[600px] aspect-[4/3]">
                <img 
                  src={imgUrl} 
                  alt={`Gallery ${index + 1}`} 
                  className="w-full h-full object-cover shadow-lg"
                />
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">Swipe to see more →</p>
        </div>
      )}

    </div>
  );
};

export default ProjectDetails;