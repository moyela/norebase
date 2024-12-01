import { useState, useEffect } from "react";
import { storeSessionStorageState, recallSessionStorageState } from "../storage/sessionStorage";
import MobileTableView from "../components/mobile_table_view";
import WebTableView from "../components/web_table_view";

export default function Home() {
    const BASE_URL = "https://api.coinlore.net/api/"
    const TOTAL_PAGES = 1341
    const PAGE_SESSION_STORAGE_KEY = 'currentPage'
    const START_SESSION_STORAGE_KEY = 'currentStart'

    const [tokens, setTokens] = useState([])
    const [page, setPage] = useState(recallSessionStorageState(PAGE_SESSION_STORAGE_KEY, 1))
    const [pageJumpValue, setPageJumpValue] = useState(page)
    const [pageJumpInputError, setPageJumpInputError] = useState(' ')
    const [start, setStart] = useState(recallSessionStorageState(START_SESSION_STORAGE_KEY, 0))
    const [loading, setLoading] = useState(false)
    const [fetchTime, setFetchTime] = useState('')

    // generate the start value for the api call based on which page we're on
    const generateStartValue = (pageValue:number) => (pageValue - 1) * 10
    
    // update state for the new page and start values
    const saveNewPageData = (pageValue:number) => {
      setPage(pageValue)
      setStart(generateStartValue(pageValue));
      storeSessionStorageState(PAGE_SESSION_STORAGE_KEY, pageValue) // store the current page in session storage
      storeSessionStorageState(START_SESSION_STORAGE_KEY, generateStartValue(pageValue)) // store the current start in session storage
    }

    // nextPage and previousPage change the pages and adjust the api call
    const nextPage = () => {
      setPage((prevPage:number) => {
          const newPage = prevPage + 1;
          saveNewPageData(newPage)
          return newPage;
      });
    };
    const previousPage = () => {
        setPage((prevPage:number) => {
            const newPage = prevPage - 1;
            saveNewPageData(newPage)
            return newPage;
        });
    };

    const handlePageJump = (newPage:any) => {
      let pageNumber = parseInt(newPage.target.value)

      if (pageNumber < 1 || pageNumber > TOTAL_PAGES) {
        setPageJumpInputError(`The page must be between 1 and ${TOTAL_PAGES}`)
      }
      else {
        setPageJumpInputError('')
        setPageJumpValue(pageNumber)
      }
    }
    
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
    }, [start, page]);

    if (loading === true) {return <div className="flex flex-row justify-around"><h1 className="pt-10 min-h-screen text-xl">Loading...</h1></div>}

    return (
      <div className='min-h-screen px-1 md:px-0 font-sans tracking-wide bg-green-100 flex flex-col min-w-92 '>
        {/* SEARCH BAR IN DEVELOPMENT GOES HERE
        --------------------------------------------------------
        <div className="flex flex-row justify-between font-bold font-mono">
          <div className="flex flex-row gap-4 mx-auto">
            <input type="number" className="w-16 h- text-center border-2 border-black rounded-md" value={page} onChange={(e) => setPage(parseInt(e.target.value))} />
            <button 
            className="font-bold px-3 py-1 hover:bg-black rounded-md bg-[#66b179] max-h-8 text-white" 
            onClick={() => saveNewPageData(page)}>
              SEARCH
            </button>
          </div>
        </div> 
        
        */}
        
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
        <div className="flex flex-row font-mono justify-between sm:mt-2">
          <div className="hidden sm:block pt-1 basis-1/4 font-bold">
            
            <p className="text-sm ">
              Page {page} of {TOTAL_PAGES}
            </p>
            <div className="">
              <div className="pt-2 flex flex-row gap-4">
                <input 
                  type="number" 
                  className="w-16 h-8 text-center border-2 border-black rounded-md" 
                  // defaultValue={checkCurrentPage()}
                  value={pageJumpValue} 
                  onChange={(pageJumpValue) => handlePageJump(pageJumpValue)} 
                />
                <button 
                  className="font-bold px-3 py-1 hover:bg-black rounded-md bg-[#66b179] max-h-8 text-white" 
                  onClick={() => saveNewPageData(pageJumpValue)}
                >
                  GO
                </button>
              </div>
      
        
              {pageJumpInputError && <div className='text-xs pt-1' style={{ color: 'red' }}>{pageJumpInputError}</div>}

            </div>
          </div>
          <div className="hidden sm:block pt-1 basis-4/9 font-bold text-red-600 ">
            
            <p className="text-sm mx-auto">Last updated: {fetchTime}</p>
          </div>
          <div className="mx-auto sm:mx-0">
            <div className="mx-auto sm:mx-0 mt-5 sm:mt-1 flex flex-row gap-2 text-sm max-h-8">
            
              <button 
              className={`font-bold px-3 py-1  rounded-md bg-[#66b179] ${page == 1 ? 'bg-gray-100 text-black' : 'text-white hover:bg-black'}`} 
              onClick={() => previousPage()}
              disabled={page === 1}
              >
                {'<<<<'}
              </button>
              
              <button 
              className={`font-bold px-3 py-1 hover:bg-black rounded-md bg-[#66b179] text-white ${page == TOTAL_PAGES ? 'bg-gray-100' : ''}`} 
              onClick={() => nextPage()}
              disabled={page === TOTAL_PAGES}
              >
                {'>>>>'}
              </button>
            </div>
      
          </div>
          
        </div>
      </div>
    );
  }