import { useState, useEffect } from "react";
import { toggleLikeToken } from "../storage/tokenLocalStorage";
import { clearLikedTokens } from "../storage/tokenLocalStorage";

export default function LikedTokens() {
    const [tokens, setTokens] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetchTime, setFetchTime] = useState('')

    const BASE_URL = "https://api.coinlore.net/api/ticker/?id="

    let anyLikesYet = localStorage['likedTokens'] == undefined ? false : true;

    // check if liked tokens exist
    if (anyLikesYet === false) {return <h1 className="min-h-screen">Please like a token to monitor it here...</h1>}
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
    
    // reload page after adding or removing a liked token
    const toggleLikeTokenAndReload = (tokenId:string, tokenName:string, tokenSymbol:string, tokenOldPrice:string) => {
      toggleLikeToken(tokenId, tokenName, tokenSymbol, tokenOldPrice);
      setTimeout(() => {location.reload()}, 2000);
    }

    if (loading === true) {return <h1 className="min-h-screen">Loading...</h1>}
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

        <div>
          <ul>
            {tokens.map((token:any, index:number) => {
              return (
                <>
                  {/* // mobile-view -------------------------------------------------------------------------- */}
                  <li key={token.nameid + ' mobile'} className={`flex sm:hidden flex-col p-1 ${index % 2 == 0 ? 'bg-gray-200' : 'bg-gray-50'}`}> 
                    <div className="flex flex-row justify-between text-sm px-4 pb-">
                      <div className="basis-1/2 flex flex-col gap-3">
                        <div>
                          <p className="font-bold font-mono text-xs">🪙Token</p>
                          <p><span className="font-bold">{token.rank}</span> {token.name}</p>
                        </div>
                        <div>
                          <p className="font-bold font-mono text-xs">📶Symbol</p>
                          <p>(<span className="font-bold font-mono">{token.symbol}</span>)</p>
                        </div>
                      </div>
                      <div className="basis-1/2 flex flex-col gap-3">
                        <div>
                          <p className="font-bold font-mono text-xs">💵Price</p>
                          <p><span className="font-bold">$</span><span className="font-bold text-red-600">{token.price_usd}</span></p>
                          </div>  
                        <div>
                          <p className="font-bold font-mono text-xs">🔄️Total Supply</p>
                          <p>{token.tsupply} <span className="font-bold font-mono">{token.symbol}</span></p>
                        </div>
                      </div>
        
                      <button className="text-[#66b179] font-extrabold" onClick={() => toggleLikeToken(token.id, token.nameid, token.symbol, token.price_usd)}>❤️</button>
                    </div>
                  </li>
                  {/* ---------------------------------------------------------------------------------------- */}

                  {/* // web-view -------------------------------------------------------------------------- */}
                  <li key={token.nameid + ' web'} className={`hidden sm:flex  flex-col bg-slate-100 px-4 py-2 ${index % 2 == 0 ? 'bg-slate-200' : 'bg-slate-100'}`}>  
                
                    <div className="flex flex-row justify-between text-sm">
                      <p className="hidden sm:block basis-1/6">{token.rank}</p>
                      <div className="basis-2/5">
                        <p >{token.name}</p>
                      </div>
                      <div  className="basis-1/6">
                        <p><span className="font-bold font-mono">{token.symbol}</span></p>
                      </div>
                      <div className="basis-1/4">
                        <p><span className="font-bold">$</span><span className="font-bold text-red-600">{token.price_usd}</span></p>
                      </div>
                      <div className="basis-3/6">
                        <p>{token.tsupply} <span className="font-bold font-mono">{token.symbol}</span></p>
                      </div>
                      <div className="relative pr-4">
                        <button className="absolute text-[#66b179] font-extrabold hover:text-lg" onClick={() => toggleLikeToken(token.id, token.nameid, token.symbol, token.price_usd)}>❤️</button>
                      </div>
                    </div>
                 
                  </li>
                  {/* ---------------------------------------------------------------------------------------- */}
                </>
              )
            })}   
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