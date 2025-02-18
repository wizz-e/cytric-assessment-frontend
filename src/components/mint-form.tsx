import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { motion } from "motion/react";
import { Abi } from "viem";
import { axiosInstance } from "../config/api";
import { toast } from "sonner";
import { ABIDATA } from "./abi";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Nft } from "./gallary";
import { MintSuccess } from "./mint-sucess";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  logoUrl: z.string().url("Invalid URL format"),
});

type FormTypes = z.infer<typeof formSchema>;

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const ABI: Abi = ABIDATA as Abi;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function MintForm() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const queryClient = useQueryClient();
  const [mintedNft, setMintedNft] = useState<Nft | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormTypes>({
    resolver: zodResolver(formSchema),
  });

  const generateUniqueId = async () => {
    let isUnique = false;
    let tokenId = 0;

    while (!isUnique) {
      tokenId = Math.floor(Math.random() * 1000000);
      const result = await publicClient?.readContract({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "checkId",
        args: [BigInt(tokenId)],
      });
      isUnique = result === false;
    }
    return tokenId;
  };

  const onSubmit = async (data: FormTypes) => {
    if (!address || !walletClient) return;

    try {
      const tokenId = await generateUniqueId();

      const nftData = {
        ...data,
        nftId: tokenId,
        userWalletAddress: address,
      };

      await axiosInstance.post("/nfts", {
        ...data,
        nftId: tokenId,
        userWalletAddress: address,
      });

      const hash = await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "mint",
        args: [BigInt(tokenId), `${BASE_URL}/nfts/${tokenId}`],
      });
      if (!publicClient) {
        toast.error("Public client is not available");
        return;
      }

      await publicClient.waitForTransactionReceipt({ hash });
      reset();
      queryClient.invalidateQueries({ queryKey: ["nfts", address] });
      setMintedNft(nftData);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errMessage = Array.isArray(error.response.data.message)
          ? error.response.data.message[0]
          : error.response.data.message || "An unknown error occurred";
        toast.error(errMessage);
      } else {
        toast.error("Minting failed. Please try again.");
      }
    }
  };

  if (mintedNft) {
    return (
      <MintSuccess
        nft={mintedNft}
        onMintAnother={() => {
          setMintedNft(null);
          reset();
        }}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-md mx-auto"
    >
      <div className="backdrop-blur-sm bg-black/40 border border-purple-500/20 rounded-xl p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Mint Your NFT</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-200"
            >
              NFT Name
            </label>
            <input
              id="name"
              {...register("name")}
              className={`w-full px-4 py-2 bg-black/50 border ${
                errors.name ? "border-red-500" : "border-purple-500/20"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-500 transition-colors`}
              placeholder="Enter NFT name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-200"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              className={`w-full px-4 py-2 bg-black/50 border ${
                errors.description ? "border-red-500" : "border-purple-500/20"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-500 transition-colors min-h-[100px] resize-none`}
              placeholder="Describe your NFT"
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="logoUrl"
              className="block text-sm font-medium text-gray-200"
            >
              Image URL
            </label>
            <input
              id="logoUrl"
              {...register("logoUrl")}
              className={`w-full px-4 py-2 bg-black/50 border ${
                errors.logoUrl ? "border-red-500" : "border-purple-500/20"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-500 transition-colors`}
              placeholder="Enter image URL"
            />
            {errors.logoUrl && (
              <p className="text-sm text-red-500">{errors.logoUrl.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-600 cursor-pointer hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 font-medium"
          >
            {isSubmitting ? "Minting..." : "Mint NFT"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
