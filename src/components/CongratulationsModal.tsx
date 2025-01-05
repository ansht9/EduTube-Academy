import React from 'react';
import Modal from 'react-modal';
import { Award, Trophy, Scroll } from 'lucide-react';
import type { UserPlaylist } from '../types';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

Modal.setAppElement('#root');

interface CongratulationsModalProps {
  playlist: UserPlaylist;
  isOpen: boolean;
  onClose: () => void;
}

export const CongratulationsModal: React.FC<CongratulationsModalProps> = ({
  playlist,
  isOpen,
  onClose,
}) => {
  const { addCertificate } = useStore();
  const totalRewards = playlist.rewards + playlist.milestoneRewards;

  const handleGetCertificate = () => {
    addCertificate({
      playlistId: playlist.id,
      title: playlist.title,
      thumbnail: playlist.thumbnail,
      skills: playlist.skills,
      completedDate: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-lg p-8 w-full max-w-2xl outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75"
    >
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="text-center"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Trophy size={64} className="text-yellow-400" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Congratulations! 🎉
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            You've completed {playlist.title}!
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-700 p-4 rounded-lg">
              <Award size={32} className="text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{totalRewards}</p>
              <p className="text-gray-400">Total Rewards</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <Trophy size={32} className="text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {playlist.skills.length}
              </p>
              <p className="text-gray-400">Skills Gained</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {playlist.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetCertificate}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
          >
            <Scroll size={20} />
            Get Certificate for "{playlist.title}"
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
};