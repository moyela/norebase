import { useState, useEffect } from "react";
import { clearLikedTokens } from "../storage/localStorage";
import MobileTableView from "../components/mobile_table_view";
import WebTableView from "../components/web_table_view";

export default function LikedTokens() {
    const [tokens, setTokens] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetchTime, setFetchTime] = useState('')

    const BASE_URL = "https://api.coinlore.net/api/ticker/?id="

    let anyLikesYet = localStorage['likedTokens'] == undefined ? false : true;

    // check if liked tokens exist
    if (anyLikesYet === false) {return <div className="flex flex-row justify-around"> <h1 className="text-xl pt-10 min-h-screen">Please like a token to continue</h1></div>}
    else {
      let likedTokensList = JSON.parse(localStorage.getItem('likedTokens') || '{}');
      let likedTokensArray = Object.keys(likedTokensList);;
      let favouriteTokensList = likedTokensArray.join(',');

          
      useEffect(() => {

        const fetchTokens = async () => {
          setLoading(true);
          try {
            const response = await fetch(`${BASE_URL}${favouriteTokensList}`);
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

      }, []);

    }

    if (loading === true) {return <div className="flex flex-row justify-around"><h1 className="pt-10 min-h-screen text-xl">Loading...</h1></div>}
    return (
      <div className=' min-h-screen px-1 md:px-0 font-sans tracking-wide bg-green-100 flex flex-col '>
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