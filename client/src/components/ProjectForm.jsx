const ProjectForm = ({ formData, handleChange, handleSubmit, editingId, handleCancelEdit }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">
          {editingId ? "Edit Project" : "Add New Project"}
        </h2>
        {editingId && (
          <button 
            onClick={handleCancelEdit} 
            className="text-gray-500 hover:text-red-500 text-sm underline"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
          <input 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Description (For Card)</label>
          <input 
            name="shortDescription" 
            value={formData.shortDescription} 
            onChange={handleChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
            placeholder="A brief punchline..."
            required 
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Long Description (Markdown Supported)</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm" 
            rows="6" 
            placeholder="# My Heading&#10;Write your story here..."
            required
          ></textarea>
        </div>

        {/* Category & Image Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="Portrait">Portrait</option>
              <option value="Editorial">Editorial</option>
              <option value="Commercial">Commercial</option>
              <option value="Film/Video">Film/Video</option>
              <option value="Runway">Runway</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
            <input 
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              required 
              placeholder="https://..." 
            />
          </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Images (Comma Separated URLs)</label>
            <input 
              name="gallery" 
              value={formData.gallery} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
              placeholder="https://img1.com, https://img2.com" 
            />
            <p className="text-xs text-gray-500 mt-1">Paste multiple image links separated by commas.</p>
        </div>

        {/* Links Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Live Link (Optional)</label>
            <input 
              name="liveLink" 
              value={formData.liveLink} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              placeholder="https://..." 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GitHub / Video Link (Optional)</label>
            <input 
              name="githubLink" 
              value={formData.githubLink} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              placeholder="https://..." 
            />
          </div>
        </div>

        <button 
          type="submit" 
          className={`w-full text-white font-bold py-3 rounded-lg transition duration-300 ${
            editingId ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editingId ? "Update Project" : "Add Project"}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;