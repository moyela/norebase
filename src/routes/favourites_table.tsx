import { useState, useEffect } from "react";

export default function Best() {
  const [tokens, setTokens] = useState([])
    const [page, setPage] = useState(1)
    const [start, setStart] = useState(0)
    const [loading, setLoading] = useState(false)
    const [fetchTime, setFetchTime] = useState()
    const [favouriteTokens, setFavouriteTokens] = useState("")

    const BASE_URL = "https://api.coinlore.net/api/"

    const getFavouriteTokensIds = () => {
      let tokenIds = '';
    
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        
        if (i === 0){
          tokenIds += value  
        }
        else {
          tokenIds += ',' + value
        }
    
      }
    
      return tokenIds;
    }

    useEffect(() => {
      const fetchTokens = async () => {
        setLoading(true)
        let favouritesApiCall = getFavouriteTokensIds();
        const response = await fetch(`${BASE_URL}/ticker  /?id=${favouritesApiCall}`, {mode: 'no-cors'});
        const tokenData = await response.json();
        setTokens(tokenData.data);
        setLoading(false)
        let date = new Date();
        setFetchTime(`${date.toLocaleTimeString()} | ${date.toLocaleDateString()}`)
      }
      

      fetchTokens();

    }, [page]);

    if (loading === true) {return <h1>Loading...</h1>}


    return (
      <div className=' px-1 md:px-0 font-sans tracking-wide bg-green-100 flex flex-col '>
        <div className="flex flex-row mb-3 font-semibold border-b-2 border-b-black font-mono">
          <p className="basis-2/6">🪙Token</p>
          <p className="basis-1/5">📶Symbol</p>
          <p className="basis-1/4">💵Price </p>
          <p className="basis-3/6">🔄️Total Supply</p>
        </div>
        
        <div>
          <ul>
            {tokens.map((token) => {
              return (

                <li key={token.id} className='border-black border rounded-md flex flex-col gap-2 bg-slate-100 p-1 mb-2'>  
                  <div className="flex flex-row justify-between text-sm">
                    <p className="basis-2/6">{token.name}</p>
                    <p className="basis-1/6">{token.symbol}</p>
                    <p className="basis-1/4">${token.price_usd}</p>
                    <p className="basis-3/6">{token.tsupply} {token.symbol}</p>
                  </div>
                </li>
              )
            })}   
          </ul>
        </div>

        <div className="flex flex-row justify-between font-mono">
          <div className="pt-1">
            <p className="text-sm">You have {localStorage.length} favourites</p>
          </div>
          <div className="pt-1 text-yellow-600">
           <p className="text-sm">Last updated: {fetchTime}</p>
          </div>
          <div className="text-sm nav-bar">
            <button className="px-3 py-1 rounded-xl bg-[#66b179] text-white" onClick={() => localStorage.clear()}>
              CLEAR FAVOURITES
            </button>
          </div>
        </div>
      </div>
    );
  }