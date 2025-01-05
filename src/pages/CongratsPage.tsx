import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Trophy, Award, Star, Gift, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import Web3 from 'web3';
import eduTokenABI from './EduTokenABI.json';
import frontendNft from './frontend_nft.png';
import reactNft from './react_nft.png';
import mernNft from './mern_nft.png';
import pythonNft from './python_nft.png';
import nftModified from './nft-modified.png';
import { contractABI } from './contractABI'; // Ensure this import is correct

const eduTokenContractAddress = "0xe3463E1B89e7bFcc6d2eB53ED5209F33D11F469C";
const nftContractAddress = "0x7825141569edb6A1F3867BEF0DE9eeEf34843971";

const playlistCIDs = {
  'PL-gW8Fj5TGrrASCHTylOPrc0nyxug2tVK': 'QmPSWS5hWsJFFbkPQBemEf7jowdm1SEWPt68e9qoVe2Vn4',
  'PLbtI3_MArDOn2wYYazc6Q2mzEo-28r1d0': 'QmbkXWwcaaroD2TAVvpHzhaFYe3L4ybEPmpiKpofC42fTj',
  'PL78RhpUUKSwfYr_bKHq7SWfTCBGad_xxP': 'QmbkXWwcaaroD2TAVvpHzhaFYe3L4ybEPmpiKpofC42fTj',
  'PLbtI3_MArDOmebicV5NFkhBMRJH8vhBEN': 'QmTGq2gpbhsUDuxy6VGMUe3gbuRFsU6b66xmEVRoBgqUKe',
  'PLbtI3_MArDOkXRLxdMt1NOMtCS-84ibHH': 'QmTGq2gpbhsUDuxy6VGMUe3gbuRFsU6b66xmEVRoBgqUKe'
};

// Mapping of playlist IDs to static images
const playlistImages = {
  'PL-gW8Fj5TGrrASCHTylOPrc0nyxug2tVK': frontendNft,
  'PLbtI3_MArDOn2wYYazc6Q2mzEo-28r1d0': reactNft,
  'PL78RhpUUKSwfYr_bKHq7SWfTCBGad_xxP': mernNft,
  'PLbtI3_MArDOmebicV5NFkhBMRJH8vhBEN': pythonNft,
  'PLbtI3_MArDOkXRLxdMt1NOMtCS-84ibHH': nftModified
};

// Mapping of playlist IDs to titles
const playlistTitles = {
  'PL-gW8Fj5TGrrASCHTylOPrc0nyxug2tVK': 'Frontend Developer',
  'PLbtI3_MArDOn2wYYazc6Q2mzEo-28r1d0': 'React Developer',
  'PL78RhpUUKSwfYr_bKHq7SWfTCBGad_xxP': 'MERN Developer',
  'PLbtI3_MArDOmebicV5NFkhBMRJH8vhBEN': 'Python Developer',
  'PLbtI3_MArDOkXRLxdMt1NOMtCS-84ibHH': 'NFT Developer'
};

export const CongratsPage: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const navigate = useNavigate();
  const { userPlaylists, addCertificate } = useStore();
  const [tokenURI, setTokenURI] = useState('');
  const [eduTokenContract, setEduTokenContract] = useState(null);
  const [nftContract, setNftContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [transactionReceipt, setTransactionReceipt] = useState(null);
  const [mintedCIDs, setMintedCIDs] = useState<string[]>([]);
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const playlist = userPlaylists.find((p) => p.id === playlistId);

  if (!playlist) {
    navigate('/profile');
    return null;
  }

  const totalRewards = playlist.rewards + playlist.milestoneRewards;
  const unclaimedRewards = playlist.unclaimedRewards || 0;

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      connectMetaMask(web3Instance);
    } else {
      console.log('Ethereum object not found, install MetaMask.');
      alert('Please install MetaMask.');
    }

    const storedCIDs = JSON.parse(localStorage.getItem('mintedCIDs')) || [];
    setMintedCIDs(storedCIDs);

    if (playlistCIDs[playlistId]) {
      setTokenURI(playlistCIDs[playlistId]);
    }
  }, [playlistId]);

  const connectMetaMask = async (web3Instance: Web3) => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      const eduTokenContractInstance = new web3Instance.eth.Contract(eduTokenABI, eduTokenContractAddress);
      setEduTokenContract(eduTokenContractInstance);
      const nftContractInstance = new web3Instance.eth.Contract(contractABI, nftContractAddress);
      setNftContract(nftContractInstance);
      console.log('Contracts initialized:', eduTokenContractInstance, nftContractInstance);
      setError(null);
    } catch (error) {
      console.error('Error requesting accounts:', error);
      setError('Failed to load accounts. Make sure MetaMask is unlocked and connected.');
    }
  };

  const handleClaimRewards = async () => {
    if (!tokenURI) {
      alert('No CID available for this playlist.');
      return;
    }

    if (eduTokenContract && web3) {
      try {
        const transactionResponse = await eduTokenContract.methods.claimReward(unclaimedRewards).send({ from: account });
        console.log('Transaction response:', transactionResponse);
        alert('Reward claimed successfully!');
        setTransactionReceipt(transactionResponse);

        const updatedCIDs = [...mintedCIDs, tokenURI];
        setMintedCIDs(updatedCIDs);
        localStorage.setItem('mintedCIDs', JSON.stringify(updatedCIDs));

        addCertificate({
          playlistId: playlist.id,
          title: playlistTitles[playlistId],
          thumbnail: playlistImages[playlistId],
          skills: playlist.skills,
          completedDate: new Date().toISOString(),
          transactionHash: transactionResponse.transactionHash,
        });

        navigate('/profile');
      } catch (error) {
        console.error('Error claiming the reward:', error);
        alert('Failed to claim reward.');
      }
    }
  };

  const claimNFT = async () => {
    if (!tokenURI) {
      alert('No CID available for this playlist.');
      return;
    }

    if (nftContract && web3) {
      try {
        const transactionResponse = await nftContract.methods.mint(tokenURI).send({ from: account });
        console.log('Transaction response:', transactionResponse);
        alert('NFT Minted Successfully!');
        setTransactionReceipt(transactionResponse);

        const updatedCIDs = [...mintedCIDs, tokenURI];
        setMintedCIDs(updatedCIDs);
        localStorage.setItem('mintedCIDs', JSON.stringify(updatedCIDs));

        addCertificate({
          playlistId: playlist.id,
          title: playlistTitles[playlistId],
          thumbnail: playlistImages[playlistId],
          skills: playlist.skills,
          completedDate: new Date().toISOString(),
          transactionHash: transactionResponse.transactionHash,
        });

        navigate('/profile');
      } catch (error) {
        console.error('Error minting the NFT:', error);
        alert('Failed to mint NFT.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-800 rounded-lg p-8 text-center"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-8"
          >
            <Trophy size={80} className="text-yellow-400" />
          </motion.div>

          <h1 className="text-4xl font-bold text-white mb-6">
            Congratulations! 🎉
          </h1>

          <p className="text-xl text-gray-300 mb-8">
            You've completed {playlist.title}!
          </p>

          <p className="text-lg text-gray-300 mb-8">
            Playlist ID: {playlist.id}
          </p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-700 p-6 rounded-lg">
              <Award size={40} className="text-green-500 mx-auto mb-3" />
              <p className="text-3xl font-bold text-white">{totalRewards}</p>
              <p className="text-gray-400">Total Rewards</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <Star size={40} className="text-yellow-400 mx-auto mb-3" />
              <p className="text-3xl font-bold text-white">{unclaimedRewards}</p>
              <p className="text-gray-400">Unclaimed Rewards</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {playlist.skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-green-600 text-white rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClaimRewards}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3 mx-auto mb-4"
          >
            <Gift size={24} />
            Claim Rewards
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={claimNFT}
            className="bg-orange-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3 mx-auto"
          >
            <BadgeCheck size={24} />
            Get Certificate
          </motion.button>

          {transactionReceipt && (
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-white">Minted NFT Details:</h3>
              <p className="text-gray-300">Transaction Hash: {transactionReceipt.transactionHash}</p>
            </div>
          )}

          {!account && (
            <button
              onClick={() => connectMetaMask(web3)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Connect MetaMask
            </button>
          )}

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </motion.div>
      </div>
    </div>
  );
};
