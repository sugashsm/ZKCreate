import { Base_SEPOLIA_ID } from "../connection";
import { getAuthContract } from "../constants/contract";
import { getProvider } from "../constants/provider";

export const isSupportedChain = (chainId: number): boolean =>
  chainId === Base_SEPOLIA_ID;

export const getReadWriteAuthContract = async (provider: any) => {
  const readWriteProvider = getProvider(provider);

  const signer = await readWriteProvider.getSigner();

  return getAuthContract(signer);
};
