import React from 'react';

interface ResizeHandleProps {
  onResize: (deltaY: number) => void;
}

export const ResizeHandle: React.FC<ResizeHandleProps> = ({ onResize }) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startY = e.clientY;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - startY;
      onResize(deltaY);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className="h-2 bg-gray-700 hover:bg-gray-600 cursor-ns-resize flex items-center justify-center"
      onMouseDown={handleMouseDown}
    >
      <div className="w-8 h-1 bg-gray-500 rounded-full" />
    </div>
  );
};