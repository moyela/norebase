import { TOTAL_PAGES } from "../routes/default_table";
import { useState, useEffect } from "react";
import MobileTableView from "../components/mobile_table_view";
import WebTableView from "../components/web_table_view";

export const searchForTokens = async (searchQueryInput:string) => {  
    const [searchQuery, setSearchQuery] = useState(searchQueryInput)
    const [searchQueryOutcome, setSearchQueryOutcome] = useState([])

    console.log('called searchForTokens')
    
    useEffect(() => {

        console.log('called performSearch') 

        const fetchTokens = async (start:number) => {
            console.log('called fetchTokens') 

            const BASE_URL = "https://api.coinlore.net/api/";
            let tokenData: any[] = [];
            let count = 0;
            
            try {
                const response = await fetch(`${BASE_URL}tickers/?start=${start}&limit=100`);
                const tokenDataRaw = await response.json();
                console.log(tokenDataRaw);
                tokenData.push(...tokenDataRaw.data);
                console.log(`call number ${++count}, produced ${tokenData.length} tokens`);
            } 
            catch (error) {
                console.error('Error fetching tokens:', error);
            }

            console.log(`The final result has ${tokenData.length} tokens`); console.log(tokenData)
            return tokenData;
        };

        let start = 0;
        while (start < TOTAL_PAGES) {
            setTimeout(() => {}, 1000);
            let tokenData = await fetchTokens(start); let tokenStringDataArray:string[] = [];
            tokenData.forEach((token:any) => {tokenStringDataArray.push(`${token.nameid + token.symbol + '!***!' + token.id}`)})
            let searchResult = tokenStringDataArray.filter((tokenStringData:string) => tokenStringData.includes(searchQuery));
            searchQueryOutcome.push(...searchResult);
            start += 100;
        }
        console.log('completed while loop in searchForTokens') 

     

    }, [searchQuery])


    // const performSearch = async (searchQuery:string) => {
      
    // }

    // performSearch(searchQuery);
    // console.log('completed performSearch in searchForTokens')
    // return searchQueryOutcome
}

// export const searchForTokens = async (searchQuery: string) => {
//       // let searchQueryOutcome: string[] = [];
//     console.log('called searchForTokens') 
//     const performSearch = async (searchQuery: string): Promise<string[]> => {
//       console.log('called performSearch') 

//       const BASE_URL = "https://api.coinlore.net/api/";
//       const results: string[] = [];
  
//       try {
//         for (let start = 0; start < TOTAL_PAGES; start += 100) {
//           const response = await fetch(`${BASE_URL}tickers/?start=${start}&limit=100`);
//           const tokenDataRaw = await response.json();
  
//           if (tokenDataRaw.data) { // Check for existence of data before processing
//             const tokenStringDataArray = tokenDataRaw.data.map((token: any) => {
//               return `${token.nameid + token.symbol + '-' + token.id}`;
//             });
//             const searchResult = tokenStringDataArray.filter((tokenStringData: string) =>
//               tokenStringData.includes(searchQuery)
//             );
//             results.push(...searchResult);
//           } else {
//             console.warn(`No data found at page ${start / 100 + 1}`);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching tokens:', error);
//       }
  
//       return results;
//     };
  
//     return await performSearch(searchQuery);
// };