import { motion } from "motion/react";
import { Check, Share2 } from "lucide-react";

interface MintSuccessProps {
  nft: {
    name: string;
    description: string;
    logoUrl: string;
    nftId: number;
  };
  onMintAnother: () => void;
}

export function MintSuccess({ nft, onMintAnother }: MintSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-md mx-auto"
    >
      <div className="backdrop-blur-sm bg-black/40 border border-purple-500/20 rounded-xl p-6">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
            <Check className="w-6 h-6 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-500 mb-2">
            NFT Minted Successfully!
          </h2>
          <p className="text-gray-400">
            Your NFT has been created and added to your collection
          </p>
        </div>

        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={nft.logoUrl || "/placeholder.svg"}
              alt={nft.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>

          <div className="space-y-2 text-left">
            <div>
              <label className="text-sm text-gray-400">NFT Name</label>
              <h3 className="text-white font-semibold">{nft.name}</h3>
            </div>

            <div>
              <label className="text-sm text-gray-400">Description</label>
              <p className="text-white">{nft.description}</p>
            </div>

            <div>
              <label className="text-sm text-gray-400">NFT ID</label>
              <p className="text-purple-500">#{nft.nftId}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <button
              onClick={() => {
                navigator.share?.({
                  title: nft.name,
                  text: nft.description,
                  url: window.location.href,
                });
              }}
              className="px-4 py-2 border cursor-pointer border-gray-700 hover:border-purple-500 text-white rounded-lg transition-colors duration-200 font-medium flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={onMintAnother}
              className="px-4 py-2 bg-gradient-to-r from-pink-400 justify-center to-purple-600 cursor-pointer inline-flex items-center gap-2 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              <img src="/logo-white.svg" alt="logo " className="w-4 h-4" />
              Mint Another
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
