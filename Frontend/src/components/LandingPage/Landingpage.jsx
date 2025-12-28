import React, { useState } from 'react';

const Landingpage = () => {
    const [images, setImages] = useState([]);
    const [newImage, setNewImage] = useState({
        title: '',
        description: '',
        imageUrl: ''
    });
    const [isAdding, setIsAdding] = useState(false);
    const [imageError, setImageError] = useState({});

    const handleAddImage = () => {
        if (newImage.title && newImage.imageUrl) {
            const newImageObj = { 
                ...newImage, 
                id: Date.now(),
                date: new Date().toLocaleDateString()
            };
            setImages([newImageObj, ...images]);
            setNewImage({ title: '', description: '', imageUrl: '' });
            setIsAdding(false);
        }
    };

    const handleDeleteImage = (id) => {
        setImages(images.filter(img => img.id !== id));
    };

    const handleImageError = (id) => {
        setImageError(prev => ({ ...prev, [id]: true }));
    };

    return (
        <div className="bg-gray-50 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                                Landing Page Images
                            </h1>
                            <p className="text-gray-600">
                                Manage images for your landing page
                            </p>
                        </div>
                        
                        <button
                            onClick={() => setIsAdding(true)}
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm hover:shadow w-full sm:w-auto"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Add New Image
                        </button>
                    </div>
                </div>

                {/* Add Image Form */}
                {isAdding && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Add New Image</h2>
                            <button
                                onClick={() => setIsAdding(false)}
                                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1 rounded"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={newImage.title}
                                    onChange={(e) => setNewImage({...newImage, title: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Enter image title"
                                    maxLength={60}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Image URL <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={newImage.imageUrl}
                                    onChange={(e) => setNewImage({...newImage, imageUrl: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={newImage.description}
                                    onChange={(e) => setNewImage({...newImage, description: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                                    rows="3"
                                    placeholder="Enter image description"
                                    maxLength={200}
                                />
                            </div>
                            
                            <div className="flex gap-2 pt-2">
                                <button
                                    onClick={handleAddImage}
                                    disabled={!newImage.title || !newImage.imageUrl}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Save Image
                                </button>
                                <button
                                    onClick={() => setIsAdding(false)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Images Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800">
                                All Images
                            </h2>
                            {images.length > 0 && (
                                <span className="text-sm text-gray-600">
                                    {images.length} {images.length === 1 ? 'image' : 'images'}
                                </span>
                            )}
                        </div>
                    </div>
                    
                    {images.length === 0 ? (
                        <div className="text-center py-12 px-4">
                            <div className="mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">No images yet</h3>
                            <p className="text-gray-500 mb-4 max-w-sm mx-auto">
                                Click "Add New Image" to add your first landing page image
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Image
                                        </th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {images.map((image) => (
                                        <tr key={image.id} className="hover:bg-gray-50 transition-colors">
                                            {/* Image Column */}
                                            <td className="py-3 px-4">
                                                <div className="flex items-center">
                                                    <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden border border-gray-300">
                                                        {imageError[image.id] ? (
                                                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            </div>
                                                        ) : (
                                                            <img 
                                                                src={image.imageUrl} 
                                                                alt={image.title}
                                                                className="w-full h-full object-cover"
                                                                onError={() => handleImageError(image.id)}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            
                                            {/* Title Column */}
                                            <td className="py-3 px-4">
                                                <div>
                                                    <h3 className="font-medium text-gray-900 mb-1">
                                                        {image.title}
                                                    </h3>
                                                    <div className="flex items-center text-xs text-gray-500">
                                                        <span className="truncate max-w-[200px]">
                                                            {image.imageUrl.substring(0, 40)}...
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            
                                            {/* Description Column */}
                                            <td className="py-3 px-4">
                                                <div className="max-w-md">
                                                    <p className="text-gray-600 text-sm">
                                                        {image.description || (
                                                            <span className="text-gray-400 italic">No description</span>
                                                        )}
                                                    </p>
                                                </div>
                                            </td>
                                            
                                            {/* Actions Column */}
                                            <td className="py-3 px-4">
                                                <button
                                                    onClick={() => handleDeleteImage(image.id)}
                                                    className="text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    
                    {/* Table Footer */}
                    {images.length > 0 && (
                        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                            <div className="text-sm text-gray-600">
                                Showing <span className="font-medium">{images.length}</span> images
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Landingpage;