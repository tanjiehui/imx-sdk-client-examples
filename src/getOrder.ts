import { ImmutableXClient } from '@imtbl/imx-sdk';


const apiAddress = process.env.PUBLIC_API_URL as string;

// update variables
const orderId = 1; 

(async () => {
  const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });

  try {
    const getOrderResponse = await client.getOrder({orderId: orderId});
    console.log('getOrderResponse: ', getOrderResponse);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();