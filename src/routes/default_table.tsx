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

    // const setTokenAsFavourite = (nameOfToken:any, idOfToken) => {
    //   try {
    //       window.localStorage.setItem(nameOfToken, JSON.stringify(idOfToken));
    //   }
    //   catch (error) {
    //       console.error(error);
    //   }
    // };

    return (
      <div className=' px-1 md:px-0 font-sans tracking-wide bg-green-100 flex flex-col '>
        <div className="flex flex-row mb-3 font-semibold border-b-2 border-b-black font-mono">
          <p className="basis-1/6">#️⃣Rank</p>
          <p className="basis-2/6">🪙Token</p>
          <p className="basis-1/5">📶Symbol</p>
          <p className="basis-1/4">💵Price </p>
          <p className="basis-3/6">🔄️Total Supply</p>
          {/* <div>+❤️?</div> */}
        </div>
        
        <div>
          <ul>
            {tokens.map((token:any) => {
              return (

                <li key={token.id} className='border-black border rounded-md flex flex-col gap-2 bg-slate-100 hover:bg-slate-300 p-1 mb-2'>  
                  <div className="flex flex-row justify-between text-sm">
                    <p className="basis-1/6">{token.rank}</p>
                    <p className="basis-2/6">{token.name}</p>
                    <p className="basis-1/6">{token.symbol}</p>
                    <p className="basis-1/4">${token.price_usd}</p>
                    <p className="basis-3/6">{token.tsupply} {token.symbol}</p>
                    {/* <button className="text-[#66b179] font-extrabold" onClick={setTokenAsFavourite(token.symbol, token.id)}>✓</button> */}
                  </div>
                </li>
              )
            })}   
          </ul>
        </div>

        <div className="flex flex-row font-mono justify-between">
          <div className="pt-1 basis-1/3">
            
            <p className="text-sm">{page} of {TOTAL_PAGES}</p>
          </div>
          <div className="pt-1 basis-1/3 text-yellow-600">
            
            <p className="text-sm">Last updated: {fetchTime}</p>
          </div>
          <div className="flex flex-row gap-7 basis-1/3 text-sm nav-bar">
            
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