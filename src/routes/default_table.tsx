import { useState, useEffect } from "react";

export default function Home() {
    const [tokens, setTokens] = useState([])
    const [page, setPage] = useState(1)
    const [start, setStart] = useState(0)
    const [loading, setLoading] = useState(false)
    const [fetchTime, setFetchTime] = useState('')
    // const [favouriteTokens, setFavouriteTokens] = useState("")

    const BASE_URL = "https://api.coinlore.net/api/"
    const TOTAL_PAGES = 1219

    // nextPage and previousPage change the pages and adjust the api call
    const nextPage = () => {
      setPage(prevPage => {
          const newPage = prevPage + 1;
          setStart((newPage - 1) * 10);
          return newPage;
      });
    };

    const previousPage = () => {
        setPage(prevPage => {
            const newPage = prevPage - 1;
            setStart((newPage - 1) * 10);
            return newPage;
        });
    };
    
    useEffect(() => {

      const fetchTokens = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${BASE_URL}/tickers/?start=${start}&limit=10`);
          const tokenData = await response.json();
          setTokens(tokenData.data);
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
      
      console.log(`loaded page ${page}`)
      console.log(`listing coins from rank ${start + 1}`)

    }, [start,page]);

    if (loading === true) {return <h1>Loading...</h1>}

    return (
      <div className=' px-1 md:px-0 font-sans tracking-wide bg-green-100 flex flex-col '>
        <div className="hidden sm:flex flex-row mb-3 font-semibold border-b-2 border-b-black font-mono">
          <p className="basis-1/6">#️⃣Rank</p>
          <p className="basis-2/6">🪙Token</p>
          <p className="basis-1/5">📶Symbol</p>
          <p className="basis-1/4">💵Price</p>
          <p className="basis-3/6">🔄️Total Supply</p>
          {/* <div>+❤️?</div> */}
        </div>

        {/* paginator and fetch-time for mobile */}
        <div className="sm:hidden flex flex-row justify-between pb-3 px-3">
          <div className="">
              
              <p className="text-sm">{page} of {TOTAL_PAGES}</p>
            </div>
          <div className=" text-yellow-600">
              
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
                          <p>{token.tsupply} {token.symbol}</p>
                        </div>
                      </div>
        
                      {/* <button className="text-[#66b179] font-extrabold" onClick={setTokenAsFavourite(token.symbol, token.id)}>✓</button> */}
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
                        <p>{token.tsupply} {token.symbol}</p>
                      </div>
                      {/* <button className="text-[#66b179] font-extrabold" onClick={setTokenAsFavourite(token.symbol, token.id)}>✓</button> */}
                    </div>
                  </li>
                </>
              )
            })}   
          </ul>
        </div>
        {/* footer of the table */}
        <div className="flex flex-row font-mono justify-between">
          <div className="hidden sm:block pt-1 basis-1/3">
            
            <p className="text-sm">{page} of {TOTAL_PAGES}</p>
          </div>
          <div className="hidden sm:block pt-1 basis-2/5 text-yellow-600">
            
            <p className="text-sm">Last updated: {fetchTime}</p>
          </div>
          <div className="flex flex-row gap-7 sm:basis-1/3 text-sm nav-bar">
            
            <button className="px-3 py-1 hover:bg-black rounded-xl bg-[#66b179] text-white" onClick={() => previousPage()}
               disabled={page === 1}
            >
              PREVIOUS
            </button>
            <button className="px-3 py-1 hover:bg-black rounded-xl bg-[#66b179] text-white" onClick={() => nextPage()}
               disabled={page === TOTAL_PAGES}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    );
  }