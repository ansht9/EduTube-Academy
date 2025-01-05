import React from 'react';
import Modal from 'react-modal';
import { X, BookOpen } from 'lucide-react';
import type { Playlist } from '../types';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

Modal.setAppElement('#root');

interface PlaylistModalProps {
  playlist: Playlist;
  isOpen: boolean;
  onClose: () => void;
}

export const PlaylistModal: React.FC<PlaylistModalProps> = ({
  playlist,
  isOpen,
  onClose,
}) => {
  const { addToProfile } = useStore();

  const handleAddToProfile = () => {
    addToProfile(playlist);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-lg p-6 w-full max-w-lg outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75"
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-white">{playlist.title}</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      <div className="mb-4">
        <img
          src={playlist.thumbnail}
          alt={playlist.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-300 text-sm mb-4">{playlist.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {playlist.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-green-600 text-white text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAddToProfile}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <BookOpen size={20} />
        Add to Profile
      </motion.button>
    </Modal>
  );
};