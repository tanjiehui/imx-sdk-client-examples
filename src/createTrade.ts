import { ERC721TokenType, ETHTokenType, ImmutableMethodParams, ImmutableXClient } from '@imtbl/imx-sdk';
import { ethers } from "ethers";
import { Wallet } from '@ethersproject/wallet';
import { AlchemyProvider } from '@ethersproject/providers';
require('dotenv').config();

const provider = new AlchemyProvider(process.env.ETH_NETWORK, process.env.ALCHEMY_API_KEY);

// update variables
const userAddress = '';
const orderId = 123;
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

  const tradeParams: ImmutableMethodParams.ImmutableGetSignableTradeParamsTS = {
    orderId: orderId,
    user: userAddress,
    tokenBuy: {
      type: ERC721TokenType.ERC721,
      data: {
        tokenId: tokenId,
        tokenAddress: tokenAddress
      }
    },
    amountBuy: ethers.BigNumber.from('1'),
    tokenSell: {
      type: ETHTokenType.ETH,
      data: {
          decimals: 18
      }
    },
    amountSell: ethers.BigNumber.from(ethers.utils.parseEther(ethAmount).toString())
  };

  try {
    const createTradeResponse = await client.createTrade(tradeParams)
    console.log('createTradeResponse: ', createTradeResponse);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();