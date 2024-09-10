import { AbiCoder, getAddress, ParamType } from 'ethers';

import {
  chain_info,
  ERC20TokenDetailsFromProvider,
  xchainRPC,
  AclOptions,
  isERC20TokenContract,
  guessStorageSlot,
  getBlockHeaderRLP,
  fetchAccountProof,
  getNftContractType,
} from '@oasisprotocol/side-dao-contracts';
import {
  VITE_CONTRACT_ACL_ALLOWALL,
  VITE_CONTRACT_ACL_STORAGEPROOF,
  VITE_CONTRACT_ACL_TOKENHOLDER,
  VITE_CONTRACT_ACL_VOTERALLOWLIST,
} from '../constants/config'
import { Poll, PollManager } from "../types"
import { encryptJSON } from './crypto.demo';
import { Pinata } from './Pinata';

export { parseEther} from "ethers"

export const chainsForXchain: [number, string][] = Object.keys(chain_info)
  .map(id => parseInt(id))
  .filter(chainId => !chain_info[chainId].cannotMakeStorageProofs)
  .map(chainId => [chainId, chain_info[chainId].name])

// Check if an address is valid
export const isValidAddress = (address: string) => {
  try {
    getAddress(address)
  } catch (e: any) {
    if (e.code == 'INVALID_ARGUMENT') {
      return false
    } else {
      console.log("Unknown problem:", e)
      return true
    }
  }
  return true
}

export const getSapphireTokenDetails = async (address: string) => {
  const chainId = 23294
  const rpc = xchainRPC(chainId);
  try {
    return await ERC20TokenDetailsFromProvider(getAddress(address), rpc);
  } catch {
    return undefined
  }
}

/**
 *  Encode the %%values%% as the %%types%% into ABI data.
 *
 *  @returns DataHexstring
 */
const abiEncode = (types: ReadonlyArray<string | ParamType>, values: ReadonlyArray<any>): string => {
  const abi = AbiCoder.defaultAbiCoder();
  return abi.encode(types, values)
}

export const getAllowAllACLOptions = (): [string, AclOptions] => {
  return [
    '0x', // Empty bytes is passed
    {
      address: VITE_CONTRACT_ACL_ALLOWALL,
      options: { allowAll: true },
    },
  ];
}

export const getAllowListAclOptions = (addresses: string[]): [string, AclOptions] => {
  return [
    abiEncode(['address[]'], [addresses]),
    {
      address: VITE_CONTRACT_ACL_VOTERALLOWLIST,
      options: { allowList: true },
    },
  ];
}

export const getTokenHolderAclOptions = (tokenAddress: string): [string, AclOptions] => {
  return [
    abiEncode(['address'], [tokenAddress]),
    {
      address: VITE_CONTRACT_ACL_TOKENHOLDER,
      options: { token: tokenAddress },
    },
  ];
}

type ChainId = number | string
const parseChainId = (id: ChainId): number => (typeof id === "number") ? id : parseInt(id)

export const getXchainAclOptions = async (
  props: {
    id: ChainId,
    contractAddress: string,
    slotNumber: number,
    blockHash: string,
  },
  updateStatus?: ((status: string | undefined) => void) | undefined,
): Promise<[string, AclOptions]> => {
  const {id, contractAddress, slotNumber, blockHash} = props
  const showStatus = updateStatus ?? ((message?: string | undefined) => console.log(message))
  const chainId = parseChainId(id);
  const rpc = xchainRPC(chainId);
  showStatus("Getting block header RLP")
  const headerRlpBytes = await getBlockHeaderRLP(rpc, blockHash);
  // console.log('headerRlpBytes', headerRlpBytes);
  showStatus("Fetching account proof")
  const rlpAccountProof = await fetchAccountProof(rpc, blockHash, contractAddress);
  // console.log('rlpAccountProof', rlpAccountProof);
  return [
    abiEncode(
      ['tuple(tuple(bytes32,address,uint256),bytes,bytes)'],
      [
        [
          [
            blockHash,
            contractAddress,
            slotNumber,
          ],
          headerRlpBytes,
          rlpAccountProof,
        ],
      ],
    ),
    {
      address: VITE_CONTRACT_ACL_STORAGEPROOF,
      options: {
        xchain: {
          chainId,
          blockHash,
          address: contractAddress,
          slot: slotNumber,
        },
      },
    },
  ];
}

export const isERC20Token = async (id: ChainId, address: string) =>
  isERC20TokenContract(xchainRPC(parseChainId(id)), address)

export const getERC20TokenDetails = async (id: ChainId, address: string) => {
  const rpc = xchainRPC(parseChainId(id));
  return await ERC20TokenDetailsFromProvider(getAddress(address), rpc);
}

export const checkXchainTokenHolder = async (id: ChainId, tokenAddress: string, holderAddress: string, progressCallback?: (progress: string) => void) => {
  const rpc = xchainRPC(parseChainId(id));
  try {
    return await guessStorageSlot(rpc, tokenAddress, holderAddress, "latest", progressCallback)
  } catch (_) {
    return undefined
  }
}

export const getNftType = async ( id: ChainId, address: string ): Promise<string | undefined> => {
  const rpc = xchainRPC(parseChainId(id));
  return getNftContractType(address, rpc)
}

export const getLatestBlock = async (props: ChainId) =>
  await xchainRPC(parseChainId(props)).getBlock("latest");

export const createPoll = async (
  pollManager: PollManager,
  creator: string,
  props: {
    question: string,
    description: string,
    answers: string[],
    aclData: string,
    aclOptions: AclOptions,
    subsidizeAmount: bigint | undefined,
    publishVotes: boolean,
    closeTime: Date | undefined,
  },
  updateStatus: (message: string) => void,
) => {
  const {
    question, description, answers,
    aclData, aclOptions,
    subsidizeAmount,
    publishVotes, closeTime,
  } = props

  updateStatus("Compiling data")
  const poll: Poll = {
    creator,
    name: question,
    description,
    choices: answers,
    options: {
      publishVotes,
      closeTimestamp: closeTime ? closeTime.getTime() / 1000 : 0,
    },
    acl: aclOptions,
  };

  const { key, cipherbytes } = encryptJSON(poll);

  updateStatus("Saving poll data to IPFS")
  const ipfsHash = await Pinata.pinData(cipherbytes);

  if (!ipfsHash) throw new Error("Failed to save to IPFS, try again!")
  // console.log('Poll ipfsHash', ipfsHash);
  // updateStatus("Saved to IPFS")

  const proposalParams: PollManager.ProposalParamsStruct = {
    ipfsHash,
    ipfsSecret: key,
    numChoices: answers.length,
    publishVotes: poll.options.publishVotes,
    closeTimestamp: poll.options.closeTimestamp,
    acl: aclOptions.address,
  };

  console.log("params are", proposalParams)
  console.log("ACL data is", aclData)

  updateStatus("Calling signer")
  const createProposalTx = await pollManager.create(proposalParams, aclData, {
    value: subsidizeAmount ?? 0n,
  });

  console.log("TX created.", createProposalTx)

  console.log('doCreatePoll: creating proposal tx', createProposalTx.hash);

  updateStatus("Sending transaction")

  const receipt = (await createProposalTx.wait())!;
  if (receipt.status !== 1) {
    console.log("Receipt is", receipt)
    throw new Error('createProposal tx receipt reported failure.');
  }
  const proposalId = receipt.logs[0].data;

  updateStatus("Created poll")

  // console.log('doCreatePoll: Proposal ID', proposalId);

  return proposalId;
}