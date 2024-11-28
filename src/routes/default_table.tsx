import { useState, useEffect } from "react";
import { toggleLikeToken } from "../storage/tokenLocalStorage";
import { storeCurrentPage, recallCurrentPage, storeCurrentStart, recallCurrentStart } from "../storage/sessionStorage";



export default function Home() {
    const [tokens, setTokens] = useState([])
    const [page, setPage] = useState(recallCurrentPage())
    const [start, setStart] = useState(recallCurrentStart())
    const [loading, setLoading] = useState(false)
    const [fetchTime, setFetchTime] = useState('')
    // const [favouriteTokensList, setFavouriteTokensList] = useState("")

    const BASE_URL = "https://api.coinlore.net/api/"
    const TOTAL_PAGES = 1219

    // nextPage and previousPage change the pages and adjust the api call
    const nextPage = () => {
      setPage((prevPage:number) => {
          const newPage = prevPage + 1;
          setStart((newPage - 1) * 10);
          storeCurrentStart((newPage - 1) * 10) // store the current start in session storage
          storeCurrentPage(newPage) // store the current page in session storage
          return newPage;
      });
    };

    const previousPage = () => {
        setPage((prevPage:number) => {
            const newPage = prevPage - 1;
            setStart((newPage - 1) * 10);
            storeCurrentStart((newPage - 1) * 10) // store the current start in session storage
            storeCurrentPage(newPage) // store the current page in session storage
            return newPage;
        });
    };
    
    useEffect(() => {

      const fetchTokens = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${BASE_URL}tickers/?start=${start}&limit=10`);
          const tokenData = await response.json();
          setTokens(tokenData.data);
          // console.log(tokenData.data)
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
      
      // console.log(`listing coins from rank ${start + 1} to ${start + 11}`)

    }, [start,page]);

    if (loading === true) {return <div className="flex flex-row justify-around"><h1 className="pt-10 min-h-screen text-xl">Loading...</h1></div>}

    // const toggleLikeToken = (tokenName:string, tokenId:string) => {
    //   tokenLocalStorage.toggleLikeToken(tokenName, tokenId)
    // }

    return (
      <div className='min-h-screen px-1 md:px-0 font-sans tracking-wide bg-green-100 flex flex-col min-w-92 '>
        <div className="hidden sm:flex sm:mt-2 flex-row mb-3 font-semibold border-b-2 border-b-black font-mono">
          <p className="basis-1/6">#️⃣Rank</p>
          <p className="basis-2/6">🪙Token</p>
          <p className="basis-1/5">📶Symbol</p>
          <p className="basis-1/4">💵Price</p>
          <p className="basis-3/6">🔄️Total Supply</p>
        </div>

        {/* paginator and fetch-time for mobile */}
        <div className="sm:hidden font-bold flex flex-col justify-between pb-3 px-3">
          <div className="mx-auto">
              
              <p className="text-sm">Page {page} of {TOTAL_PAGES}</p>
            </div>
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
                  <li key={token.nameid + ' mobile'} className={`flex sm:hidden flex-col p-1 mx-4 ${index % 2 == 0 ? 'bg-gray-200' : 'bg-white'}`}> 
                    <div className="flex flex-row justify-between text-sm px-4 py-2">
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
                  <li key={token.nameid + ' web'} className={`hidden sm:flex  flex-col bg-slate-100 px-4 py-2 ${index % 2 == 0 ? 'bg-slate-200' : 'bg-white'}`}>  
                
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
                        <button className="absolute hover:top-[-5px] text-[#66b179] font-extrabold hover:text-xl" onClick={() => toggleLikeToken(token.id, token.nameid, token.symbol, token.price_usd)}>❤️</button>
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
        <div className="flex flex-row font-mono justify-between sm:mt-2">
          <div className="hidden sm:block pt-1 basis-1/5 font-bold">
            
            <p className="text-sm">Page {page} of {TOTAL_PAGES}</p>
          </div>
          <div className="hidden sm:block pt-1 basis-4/9 font-bold text-red-600 ">
            
            <p className="text-sm mx-auto">Last updated: {fetchTime}</p>
          </div>
          <div className="mx-auto sm:mx-0 mt-5 sm:mt-1 flex flex-row gap-2 text-sm nav-bar">
            
            <button 
            className={`font-bold px-3 py-1 hover:bg-black rounded-md bg-[#66b179] text-white ${page == 1 ? 'hidden' : ''}`} 
            onClick={() => previousPage()}
            disabled={page === 1}
            >
              {'<<<<'}
            </button>
            
            <button 
            className={`font-bold px-3 py-1 hover:bg-black rounded-md bg-[#66b179] text-white ${page == TOTAL_PAGES ? 'hidden' : ''}`} 
            onClick={() => nextPage()}
            disabled={page === TOTAL_PAGES}
            >
              {'>>>>'}
            </button>
          </div>
        </div>
      </div>
    );
  }