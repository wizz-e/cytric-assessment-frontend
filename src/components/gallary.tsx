import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { axiosInstance } from "../config/api";
import { motion } from "motion/react";

export interface Nft {
  name: string;
  description: string;
  logoUrl: string;
  nftId: number;
}

export default function Gallary() {
  const { address } = useAccount();

  const { data: nfts, isLoading } = useQuery({
    queryKey: ["nfts", address],
    queryFn: async () => {
      if (!address) return [];
      const response = await axiosInstance.get<Nft[]>(`/nfts/user/${address}`);
      return response.data;
    },
    enabled: !!address,
  });

  if (!address) return null;

  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold text-center lg:text-start mt-3 lg:mt-0 text-white">
        Your NFT Gallery
      </h2>
      {isLoading ? (
        <div className=" bg-red-500 mx-auto w-full"></div>
      ) : nfts?.length === 0 ? (
        <div className="text-gray-400">
          No NFTs found, please mint your first one using the widget above!
        </div>
      ) : (
        <div className="grid   grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
          {nfts?.map((nft, index) => (
            <motion.div
              key={nft.nftId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group overflow-hidden rounded-xl lg:w-[90%] backdrop-blur-sm bg-black/40 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                <div className="h-65  overflow-hidden">
                  <img
                    src={nft.logoUrl ?? "/placeholder.svg"}
                    alt={nft.name}
                    className="w-full h-full bg-cover object-center object-cover transform group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {nft.name}
                  </h3>
                  <p className="text-gray-400">{nft.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
