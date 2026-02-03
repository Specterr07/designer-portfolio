// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';

const Dashboard = () => {
  // --- STATE ---
  const [formData, setFormData] = useState({
    title: "", 
    shortDescription: "", 
    description: "",      
    category: "Portrait", 
    image: "", 
    gallery: "",          
    liveLink: "", 
    githubLink: ""
  });
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // --- API URL (Best Practice from .env) ---
  // Fallback to localhost if .env is missing for now
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  // --- EFFECT: Load Projects ---
  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    document.title = "Dashboard | Admin Panel";
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      shortDescription: project.shortDescription || "",
      description: project.description,
      category: project.category,
      image: project.image,
      gallery: project.gallery ? project.gallery.join(', ') : "",
      liveLink: project.liveLink || "",
      githubLink: project.githubLink || ""
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ 
      title: "", 
      shortDescription: "", 
      description: "", 
      category: "Portrait", 
      image: "", 
      gallery: "", 
      liveLink: "", 
      githubLink: "" 
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await fetch(`${API_URL}/api/projects/${id}`, { method: 'DELETE', headers: {
    'x-auth-token': localStorage.getItem('token') } 
    });
      setProjects(projects.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/api/projects/${editingId}` : `${API_URL}/api/projects`;

    const payload = {
      ...formData,
      gallery: formData.gallery.split(',').map(url => url.trim()).filter(url => url !== "")
    };

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'x-auth-token': localStorage.getItem('token') },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(editingId ? "✅ Project Updated!" : "✅ Project Added!");
        handleCancelEdit(); // Reset form
        fetchProjects();    // Refresh list
      }
    } catch (error) {
      alert("❌ Error saving project");
    }
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Component 1: The Form */}
        <ProjectForm 
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editingId={editingId}
          handleCancelEdit={handleCancelEdit}
        />

        {/* Component 2: The List */}
        <ProjectList 
          projects={projects}
          handleEdit={handleEditClick}
          handleDelete={handleDelete}
        />

      </div>
    </div>
  );
};

export default Dashboard;