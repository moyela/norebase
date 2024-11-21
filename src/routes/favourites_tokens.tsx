import { useState, useEffect } from "react";

export default function FavouriteTokens() {
    const [tokens, setTokens] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetchTime, setFetchTime] = useState('')

    const BASE_URL = "https://api.coinlore.net/api/ticker/?id="

    useEffect(() => {

      const fetchTokens = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${BASE_URL}90,80,89,47305,121613,126769`);
          const tokenData = await response.json();
          setTokens(tokenData);
          console.log(tokenData)
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
      
      // console.log(`loaded page ${page}`)
      // console.log(`listing coins from rank ${start + 1}`)

    }, []);

    if (loading === true) {return <h1>Loading...</h1>}

    return (
      <div className=' px-1 md:px-0 font-sans tracking-wide bg-green-100 flex flex-col '>
        <div className="hidden sm:flex flex-row mb-3 font-semibold border-b-2 border-b-black font-mono">
          <p className="basis-1/6">#️⃣Rank</p>
          <p className="basis-2/6">🪙Token</p>
          <p className="basis-1/5">📶Symbol</p>
          <p className="basis-1/4">💵Price</p>
          <p className="basis-3/6">🔄️Total Supply</p>
        </div>

        {/* paginator and fetch-time for mobile */}
        <div className="sm:hidden font-bold flex flex-row justify-between pb-3 px-3">
          <div className=" text-red-600">  
              <p className="text-sm">Last updated: {fetchTime}</p>
          </div>
        </div>

        <div>
          <ul>
            {tokens.map((token:any) => {
              return (
                <>
                  {/* // mobile-view -------------------------------------------------------------------------- */}
                  <li key={token.id * 1001} className='border-black border rounded-md flex sm:hidden  flex-col gap-2 bg-slate-100 hover:bg-slate-300 p-1 mb-2'>  
                    <div className="flex flex-row justify-between text-sm">
                      <p className="hidden md:block basis-1/6">{token.rank}</p>
                      <div className="basis-1/2 flex flex-col gap-3">
                        <div>
                          <p className="font-bold">🪙Token</p>
                          <p><span className="font-bold">{token.rank}</span> {token.name}</p>
                        </div>
                        <div>
                          <p className="font-bold">📶Symbol</p>
                          <p>({token.symbol})</p>
                        </div>
                      </div>
                      <div className="basis-1/2 flex flex-col gap-3">
                        <div>
                          <p className="font-bold">💵Price</p>
                          <p><span className="font-bold">$</span>{token.price_usd}</p>
                          </div>  
                        <div>
                          <p className="font-bold">🔄️Total Supply</p>
                          <p>{token.tsupply} <span className="font-bold">{token.symbol}</span></p>
                        </div>
                      </div>
        
                      <button className="text-[#66b179] font-extrabold" onClick={() => {}}>💔</button>
                    </div>
                  </li>


                  {/* // web-view -------------------------------------------------------------------------- */}
                  <li key={token.id * 3003} className='border-black border rounded-md hidden sm:flex  flex-col gap-2 bg-slate-100 hover:bg-slate-300 p-1 mb-2'>  
                    <div className="flex flex-row justify-between text-sm">
                      <p className="hidden sm:block basis-1/6">{token.rank}</p>
                      <div className="basis-2/6">
                        <p >{token.name}</p>
                      </div>
                      <div  className="basis-1/6">
                        <p>{token.symbol}</p>
                      </div>
                      <div className="basis-1/4">
                        <p><span className="font-bold">$</span>{token.price_usd}</p>
                      </div>
                      <div className="basis-3/6">
                        <p>{token.tsupply} <span className="font-bold">{token.symbol}</span></p>
                      </div>
                      <button className="text-[#66b179] font-extrabold" onClick={() => {}}>💔</button>
                    </div>
                  </li>
                </>
              )
            })}   
          </ul>
        </div>
        {/* footer of the table */}
        <div className="flex flex-row font-mono justify-between">
          <div className="hidden sm:block pt-1 mx-auto font-bold text-red-600">
            
            <p className="text-sm">Last updated: {fetchTime}</p>
          </div>
        </div>
      </div>
    );
  }