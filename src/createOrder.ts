import { ERC721TokenType, ETHTokenType, ImmutableMethodParams, ImmutableXClient } from '@imtbl/imx-sdk';
import { ethers } from "ethers";
import { Wallet } from '@ethersproject/wallet';
import { AlchemyProvider } from '@ethersproject/providers';
require('dotenv').config();

const provider = new AlchemyProvider(process.env.ETH_NETWORK, process.env.ALCHEMY_API_KEY);

// update variables
const userAddress = '';
const tokenId = '';
const tokenAddress = '';
const ethAmount = '';

(async () => {
  const apiAddress = process.env.PUBLIC_API_URL as string;
  const wallet = new Wallet(process.env.PRIVATE_KEY as string);
  const signer = wallet.connect(provider);
  const starkContractAddress = process.env.STARK_CONTRACT_ADDRESS;
  const registrationContractAddress = process.env.REGISTRATION_CONTRACT_ADDRESS;

  const client = await ImmutableXClient.build({ 
    publicApiUrl: apiAddress,
    signer: signer,
    starkContractAddress,
    registrationContractAddress,
    enableDebug: true
  });

  const orderParams: ImmutableMethodParams.ImmutableGetSignableOrderParamsTS = {
    user: userAddress,
    tokenSell: {
      type: ERC721TokenType.ERC721,
      data: {
        tokenId: tokenId,
        tokenAddress: tokenAddress
      }
    },
    amountSell: ethers.BigNumber.from('1'),
    tokenBuy: {
      type: ETHTokenType.ETH,
      data: {
          decimals: 18
      }
    },
    amountBuy: ethers.BigNumber.from(ethers.utils.parseEther(ethAmount).toString())
  };

  try {
    const createOrderResponse = await client.createOrder(orderParams);
    console.log('createOrderResponse: ', createOrderResponse);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();