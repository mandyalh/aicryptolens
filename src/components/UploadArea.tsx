import React from 'react';
import { Upload, X } from 'lucide-react';

interface UploadAreaProps {
  dragActive: boolean;
  image: string | null;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export function UploadArea({
  dragActive,
  image,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onFileInput,
  onRemoveImage
}: UploadAreaProps) {
  return (
    <div className="space-y-4">
      <label
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`upload-area block rounded-lg p-12 text-center cursor-pointer transition-all relative ${
          dragActive ? 'border-fuchsia-400 bg-fuchsia-500/10' : ''
        } ${image ? 'border-cyan-400 bg-cyan-500/10' : ''}`}
      >
        <input
          type="file"
          onChange={onFileInput}
          accept="image/*"
          className="hidden"
        />
        
        {image ? (
          <div className="relative">
            <img
              src={image}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                onRemoveImage();
              }}
              className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <Upload className="w-12 h-12 mb-4 mx-auto text-cyan-400" />
            <p className="text-gray-400">
              {dragActive
                ? "Drop your image here"
                : "Drag and drop your chart image here, or click to browse"}
            </p>
          </>
        )}
      </label>
    </div>
  );
}