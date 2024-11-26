import { useState, useEffect } from "react";
import MobileTableView from "../components/mobile_table_view";
import WebTableView from "../components/web_table_view";

export default function Home() {
    const [tokens, setTokens] = useState([])
    const [page, setPage] = useState(1)
    const [start, setStart] = useState(0)
    const [loading, setLoading] = useState(false)
    const [fetchTime, setFetchTime] = useState('')

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
          const response = await fetch(`${BASE_URL}tickers/?start=${start}&limit=10`);
          const tokenData = await response.json();
          setTokens(tokenData.data);
          console.log(tokenData.data)
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

    if (loading === true) {return <h1>Loading...</h1>}

    let isMobileView = window.innerWidth < 640;

    return (
      <div className=' px-1 md:px-0 font-sans tracking-wide bg-green-100 flex flex-col '>
        <div className="hidden sm:flex sm:mt-2 flex-row mb-3 font-semibold border-b-2 border-b-black font-mono">
          <p className="basis-1/6">#️⃣Rank</p>
          <p className="basis-2/6">🪙Token</p>
          <p className="basis-1/5">📶Symbol</p>
          <p className="basis-1/4">💵Price</p>
          <p className="basis-3/6">🔄️Total Supply</p>
        </div>

        {/* paginator and fetch-time for mobile */}
        <div className="sm:hidden font-bold flex flex-row justify-between pb-3 px-3">
          <div className="">
              
              <p className="text-sm">Page {page} of {TOTAL_PAGES}</p>
            </div>
          <div className=" text-red-600">
              
              <p className="text-sm">Last updated: {fetchTime}</p>
          </div>
        </div>

        <div>
          {/* render mobile or web table based on the screen size */}
          <ul>
            {isMobileView ? <MobileTableView tokenData={tokens} /> : <WebTableView tokenData={tokens} />}
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
          <div className="flex flex-row gap-2 text-sm nav-bar">
            
            <button className="px-3 py-1 hover:bg-black rounded-md bg-[#66b179] text-white" onClick={() => previousPage()}
               disabled={page === 1}
            >
              ←
            </button>
            <button className="px-3 py-1 hover:bg-black rounded-md bg-[#66b179] text-white" onClick={() => nextPage()}
               disabled={page === TOTAL_PAGES}
            >
              →
            </button>
          </div>
        </div>
      </div>
    );
  }