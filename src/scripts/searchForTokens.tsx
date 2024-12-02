import {COINLORE_TOKEN_LIST} from '../../lib/coinLoreTokenList';


let x = COINLORE_TOKEN_LIST;
console.log(x)
// function to fetch data on all the tokens available on coinlore 
const fetchTokens = async () => {
    const BASE_URL = "https://api.coinlore.net/api/";
    let start = 0;
    let tokenData: any[] = [];
    let count = 0;
    
    while (start < 1300) {
      try {
        const response = await fetch(`${BASE_URL}tickers/?start=${start}&limit=100`);
        const tokenDataRaw = await response.json();
        console.log(tokenDataRaw);
        tokenData.push(...tokenDataRaw.data);
        start += 100;
        console.log(`call number ${++count}, produced ${tokenData.length} tokens`);
      } 
      catch (error) {
        console.error('Error fetching tokens:', error);
      }
    }
  
    console.log(`The final result has ${tokenData.length} tokens`);
    console.log(tokenData)
    return tokenData;
  };
  
  fetchTokens();
  // ----------------------------------------------------------------------------------------------------