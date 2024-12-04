import { useState, useEffect } from "react";
import { storeSessionStorageState, recallSessionStorageState } from "../storage/sessionStorage";
// import { searchForTokens } from "../scripts/searchForTokens";
import MobileTableView from "../components/mobile_table_view";
import WebTableView from "../components/web_table_view";

export const TOTAL_PAGES = 1341;
const BASE_URL = "https://api.coinlore.net/api/"
const PAGE_SESSION_STORAGE_KEY = 'currentPage'
const START_SESSION_STORAGE_KEY = 'currentStart'

export default function Home() {

    const [tokens, setTokens] = useState([])
    const [start, setStart] = useState(recallSessionStorageState(START_SESSION_STORAGE_KEY, 0))
    const [page, setPage] = useState(recallSessionStorageState(PAGE_SESSION_STORAGE_KEY, 1))
    // const [tokenSearchQuery, setTokenSearchQuery] = useState('search for tokens')
    // const [searchQueryOutcome, setSearchQueryOutcome] = useState<any>([])
    const [pageJumpValue, setPageJumpValue] = useState(page)
    const [pageJumpInputError, setPageJumpInputError] = useState(' ')
    const [loading, setLoading] = useState(false)
    const [fetchTime, setFetchTime] = useState('')

    // PAGE CHANGING FUNCTIONS ===================================================================================
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
    // page jump takes you straight to the page you want to go to
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
    // ===========================================================================================================
    // ===========================================================================================================


    // // SEARCH FUNCTIONS   =================================================================================
    // const changeTokenSearchQuery = (newSearchQuery:any) => {
    //   setTokenSearchQuery(newSearchQuery.target.value)
    // }

    // const searchForToken = async () => {
    //   let searchStartIndex = 0;

    //   while (searchStartIndex < TOTAL_PAGES) {
    //     let tokenDataRaw;
    //     let tokenData: any[] = [];
    //     let tokenStringDataArray:string[] = [];

    //     try {
    //       const response = await fetch(`${BASE_URL}tickers/?start=${searchStartIndex}&limit=100`);
    //       tokenDataRaw = await response.json();
    //     } 
    //     catch (error) {
    //       console.error('Error fetching tokens:', error);
    //     }
        
    //     tokenData.push(...tokenDataRaw.data);
    //     tokenData.forEach((token:any) => {tokenStringDataArray.push(`${token.nameid + token.symbol + '!***!' + token.id}`)})
    //     let searchResult:string[] = tokenStringDataArray.filter((tokenStringData:string) => tokenStringData.includes(tokenSearchQuery));
    //     let resultIds:string[] = searchResult.map((result:string) => result.split('!***!')[1])
    //     searchQueryOutcome.push(...resultIds);
    //     searchStartIndex += 100;
    //   }

    //   return searchQueryOutcome.join(', ')
    //   // return tokenSearchQuery
    // }

    // const handleSearch = async () => {
    //   let x = await searchForToken()
    //   console.log(x)
    // }

    // // const text = async () => {return (<div></div>)}
    // // ===========================================================================================================
    // // ============================================================================================================


    useEffect(() => {setPageJumpValue(page)}, [page])
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
        {/* <div>{searchForToken('b')}</div>
        <div className="flex flex-row justify-between font-bold font-mono text-sm">
          <div className="flex flex-row gap-4 mx-auto">
            <input type="textarea" className="text-xs w-64 h- text-center border-2 border-black rounded-md" value={tokenSearchQuery} onChange={(e) => changeTokenSearchQuery(e)} />
            <button 
            className="font-bold px-3 py-1 hover:bg-black rounded-md bg-[#66b179] max-h-8 text-white" 
            onClick={() => handleSearch()}>
              SEARCH
            </button>
          </div>
        </div>  */}
        
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
            <div className={`sm:hidden font-bold`}>
              <div className="mx-auto pt-2 flex flex-row gap-4 ">
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
        
            </div>
          
          </div>
        </div>
        {pageJumpInputError && <div className='mx-auto text-mono text-xs pt-1' style={{ color: 'red' }}>{pageJumpInputError}</div>}        
      </div>
    );
  }