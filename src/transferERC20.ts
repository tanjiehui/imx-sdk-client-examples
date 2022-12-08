import { Link, ImmutableXClient, ImmutableMethodParams, ERC20TokenType } from '@imtbl/imx-sdk';
import { ethers } from "ethers";
import { Wallet } from '@ethersproject/wallet';
import { AlchemyProvider } from '@ethersproject/providers';
require('dotenv').config();

const provider = new AlchemyProvider(process.env.ETH_NETWORK, process.env.ALCHEMY_API_KEY);

// update variables
const senderAddress = '';
const symbol = '';
const decimals = 18;
const tokenAddress = '';
const receiverAddress = '';
const erc20Amount = '';

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

  const transferParams: ImmutableMethodParams.ImmutableTransferParamsTS = {
    sender: senderAddress,
    token: {
      type: ERC20TokenType.ERC20,
      data: {
        symbol: symbol,
        decimals: decimals,
        tokenAddress: tokenAddress
      }
    },
    quantity: ethers.BigNumber.from(ethers.utils.parseUnits(erc20Amount).toString()),
    receiver: receiverAddress
  };

  try {
    const createTransferResponse = await client.transfer(transferParams);
    console.log('createTransferResponse: ', createTransferResponse);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();