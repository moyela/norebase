import { useState, useEffect } from "react";
import { clearLikedTokens } from "../storage/localStorage";
import MobileTableView from "../components/mobile_table_view";
import WebTableView from "../components/web_table_view";
import { TOTAL_PAGES } from "./default_table";

const BASE_URL = "https://api.coinlore.net/api/ticker/?id="


export default function LikedTokens() {
    const [tokens, setTokens] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetchTime, setFetchTime] = useState('')
    const [searching, setSearching] = useState(false)


    let anyLikesYet = localStorage['likedTokens'] == undefined ? false : true;

    // check if liked tokens exist
    // if (anyLikesYet === false) {return <div className="flex flex-row justify-around"> <h1 className="text-xl pt-10 min-h-screen">Please like a token to continue</h1></div>}
    
    // let likedTokensList = JSON.parse(localStorage.getItem('likedTokens') || '{}');
    // let likedTokensArray = Object.keys(likedTokensList);;
    // let favouriteTokensList = likedTokensArray.join(',');

    if (searching == false) {
      return (
        <div className="flex flex-row justify-around">
          <SearchBar/>
          <h1 className="text-xl pt-10 min-h-screen">Please search for a token</h1>
        </div>
      )} 
    else {
      useEffect(() => {

        const fetchTokens = async () => {
          setLoading(true);
          try {
            const response = await fetch(`${BASE_URL}${searchForToken()}`);
            const tokenData = await response.json();
            setTokens(tokenData);
            // console.log(tokenData)
          } 
          catch (error) {
            console.error('Error fetching tokens:', error);
          } 
          finally {
            setLoading(false);
          }
        }
        
        fetchTokens();
        let date = new Date();
        setFetchTime(`${date.toLocaleTimeString()} | ${date.toLocaleDateString()}`)

      }, [searching])

    }


    if (loading === true) {return <div className="flex flex-row justify-around"><h1 className="pt-10 min-h-screen text-xl">Loading...</h1></div>}
    return (
      <div className=' min-h-screen px-1 md:px-0 font-sans tracking-wide bg-green-100 flex flex-col '>
        <SearchBar/>

        <div className="hidden sm:flex flex-row mb-3 font-semibold border-b-2 border-b-black font-mono">
          <p className="basis-1/6">#️⃣Rank</p>
          <p className="basis-2/6">🪙Token</p>
          <p className="basis-1/5">📶Symbol</p>
          <p className="basis-1/4">💵Price</p>
          <p className="basis-3/6">🔄️Total Supply</p>
        </div>

        {/* paginator and fetch-time for mobile */}
        <div className="sm:hidden font-semibold flex flex-row justify-between pb-3 px-3">
          <div className=" text-red-600 mx-auto">  
              <p className="text-sm">Last updated: {fetchTime}</p>
          </div>
        </div>
        
        {/* Actual data from useEffect */}
        <div>
          <ul>
            <div className="sm:hidden">
              <MobileTableView tableData={tokens} />
            </div>
            <div className="hidden sm:block">
              <WebTableView tableData={tokens} /> 
            </div>
          </ul>
        </div>
        {/* footer of the table */}
        <div className="flex flex-col font-mono justify-between sm:mt-2">
          <div className="hidden sm:block pt-1 mx-auto font-bold text-red-600">
            
            <p className="text-sm">Last updated: {fetchTime}</p>
          </div>
          <div className="flex flex-row gap-2 text-sm nav-bar mt-4 sm:mt-2">
            <button className="mx-auto px-3 py-1 hover:bg-black rounded-md bg-[#66b179] text-white" onClick={() => clearLikedTokens()}>
              CLEAR ALL
            </button>
          </div>
        </div>
      </div>
    );
  }

export function SearchBar () {
  const [tokenSearchQuery, setTokenSearchQuery] = useState('search for tokens')
  const [searchQueryOutcome, setSearchQueryOutcome] = useState<any>([])
  const [searching, setSearching] = useState(false)

   // SEARCH FUNCTIONS   =================================================================================
   const changeTokenSearchQuery = (newSearchQuery:any) => {
    setTokenSearchQuery(newSearchQuery.target.value)
  }

  const searchForToken = async () => {
    let searchStartIndex = 0;

    // searchStartIndex < TOTAL_PAGES
    while (searchStartIndex < 300) {
      let tokenDataRaw;
      let tokenData: any[] = [];
      let tokenStringDataArray:string[] = [];

      try {
        const response = await fetch(`${BASE_URL}tickers/?start=${searchStartIndex}&limit=100`);
        tokenDataRaw = await response.json();
      } 
      catch (error) {
        console.error('Error fetching tokens:', error);
      }
      
      tokenData.push(...tokenDataRaw.data);
      tokenData.forEach((token:any) => {tokenStringDataArray.push(`${token.nameid + token.symbol + '!***!' + token.id}`)})
      let searchResult:string[] = tokenStringDataArray.filter((tokenStringData:string) => tokenStringData.includes(tokenSearchQuery));
      let resultIds:string[] = searchResult.map((result:string) => result.split('!***!')[1])
      setSearchQueryOutcome(searchQueryOutcome.push(...resultIds))
      searchQueryOutcome.push(...resultIds);
      searchStartIndex += 100;
    }

    return searchQueryOutcome.join(', ')
    // return tokenSearchQuery
  }

  const handleSearch = async () => {
    let x = await searchForToken()
    console.log(x)
  }

  return (
    <div className="font-bold font-mono text-sm">
      <div className="flex flex-row gap-4 mx-auto">
        <input type="textarea" className="text-xs w-64 h-12 text-center border-2 border-black rounded-md" value={tokenSearchQuery} onChange={(e) => changeTokenSearchQuery(e)} />
        <button 
        className="font-bold px-3 py-1 hover:bg-black rounded-md bg-[#66b179] max-h-8 text-white" 
        onClick={() => handleSearch()}>
          SEARCH
        </button>
      </div>
    </div> 
  )
}  