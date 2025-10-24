import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const GalleryWidget = () => {
  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=400&fit=crop',

  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAddImage = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImages = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push(e.target.result);
          if (newImages.length === files.length) {
            setImages([...images, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const triggerFileInput = () => {
    document.getElementById('imageUpload').click();
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    const visibleCount = getVisibleCount();
    if (currentIndex < Math.max(0, images.length - visibleCount)) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // Mobile
      if (window.innerWidth < 1024) return 2; // Tablet
    }
    return 3; // Desktop
  };

  const visibleImages = images.slice(currentIndex, currentIndex + getVisibleCount());

  return (
    <div className="w-full max-w-[750px] min-h-[400px] p-4 sm:p-6 md:p-8">
      {/* Main Widget Container */}
      <div className="bg-[#363C43] rounded-[18.89px] shadow-[5.67px_5.67px_3.78px_0px_#00000066] p-4 sm:p-5 md:p-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
          {/* Help Icon */}
          <div className="w-[24px] h-[24px] rounded-full bg-[#4A4E54] flex items-center justify-center shadow-inner cursor-pointer hover:bg-[#5A5E64] transition-colors flex-shrink-0">
            <span className="text-[#B8BFC4] text-[16px] font-bold leading-none">?</span>
          </div>

          {/* Gallery Title and Add Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 md:gap-16 w-full sm:w-auto">
            <div className="bg-[#171717] rounded-[20px] px-6 sm:px-8 md:px-10 py-3 sm:py-4 shadow-[inset_0px_4px_10px_2px_#00000060]">
              <h2 className="text-white text-[18px] sm:text-[20px] font-medium">Gallery</h2>
            </div>

            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              multiple
              onChange={handleAddImage}
              className="hidden"
            />
            
            <button
              onClick={triggerFileInput}
              className="group bg-[#FFFFFF08] hover:bg-[#FFFFFF15] rounded-[104px] px-6 sm:px-8 py-3 sm:py-4 flex items-center gap-2 shadow-[inset_0px_3.26px_3.26px_0px_#FFFFFF26,0px_3.26px_3.26px_0px_#00000040] transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
              <span className="text-white text-[11px] sm:text-[12px] font-semibold uppercase tracking-wide">Add Image</span>
            </button>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 ml-auto sm:ml-0">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] rounded-full bg-gradient-to-br from-[#303439] to-[#161718] flex items-center justify-center shadow-[4px_5px_30px_5px_#101213,-5px_-3px_30px_-10px_#96BEE7] disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[6px_7px_35px_7px_#101213,-7px_-5px_35px_-10px_#96BEE7] transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#6F787C]" strokeWidth={3} />
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentIndex >= Math.max(0, images.length - getVisibleCount())}
              className="w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] rounded-full bg-gradient-to-br from-[#303439] to-[#161718] flex items-center justify-center shadow-[4px_5px_30px_5px_#101213,-5px_-3px_30px_-10px_#96BEE7] disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[6px_7px_35px_7px_#101213,-7px_-5px_35px_-10px_#96BEE7] transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#6F787C]" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 px-1 sm:px-2">
          {visibleImages.map((image, index) => (
            <div
              key={currentIndex + index}
              className="aspect-square rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-[0px_4px_10px_2px_#00000040] hover:shadow-[0px_6px_20px_4px_#00000060] transition-all duration-300 hover:scale-105 cursor-pointer grayscale hover:grayscale-0"
            >
              <img
                src={image}
                alt={`Gallery image ${currentIndex + index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {images.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <p className="text-[#6F787C] text-lg">No images yet. Click "Add Image" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryWidget;