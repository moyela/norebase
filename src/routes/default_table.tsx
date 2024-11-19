import { useState, useEffect } from "react";

export default function Home() {
    const [tokens, setTokens] = useState([])
    const [page, setPage] = useState(1)
    const [start, setStart] = useState(0)
    const [fetchTime, setFetchTime] = useState("")
    const BASE_URL = "https://api.coinlore.net/api/"

    // findStart uses the page number to calculate the start value for the API call
    const findStart = (page) => {
      if (page === 1) {
        setStart(0)
      } else if (page > 1) {
        setStart((page - 1) * 10)
      }
    }

    // nextPage and previousPage change the pages and adjust the api call
    const nextPage = () => {setPage(page + 1)} 
    const previousPage = () => {if (page > 1) {setPage(page - 1)} }

    useEffect(() => {

      const fetchTokens = async () => {
        const response = await fetch(`${BASE_URL}/tickers/?start=${start}&limit=10`);
        const tokenData = await response.json();
        setTokens(tokenData.data);
      }
      
      findStart(page)
      fetchTokens();

    }, [page, start]);


    return (
      <div className=' px-1 md:px-0 font-sans tracking-wide bg-green-100 flex flex-col '>
        <div className="flex flex-row mb-3 font-semibold border-b-2 border-b-black">
          <p className="basis-2/6">Name</p>
          <p className="basis-1/6">Symbol</p>
          <p className="basis-1/4">Price (USD)</p>
          <p className="basis-3/6">Total Supply</p>
        </div>
        
        <div>
          {tokens.map((token, index) => {
            return (
              <ul>
                <li key={index} className='border-black border rounded-md flex flex-col gap-2 bg-slate-100 p-1 mb-2'>
                  <div className="flex flex-row justify-between text-sm">
                    <p className="basis-2/6">{token.name}</p>
                    <p className="basis-1/6">{token.symbol}</p>
                    <p className="basis-1/4">${token.price_usd}</p>
                    <p className="basis-3/6">{token.tsupply} {token.symbol}</p>
                    <button className="text-[#66b179] font-extrabold">✓</button>
                  </div>
                </li>
              </ul>
            )
          })}      
        </div>

        <div className="flex flex-row justify-between">
          <div className="">
            <p className="text-sm">Page: {page}</p>
          </div>
          <div className="flex flex-row gap-7 text-sm nav-bar">
            <button className="px-3 py-1 rounded-xl bg-[#66b179] text-white" onClick={() => previousPage()}>
              PREVIOUS
            </button>
       
            <button className="px-3 py-1 rounded-xl bg-[#66b179] text-white" onClick={() => nextPage()}>
              NEXT
            </button>
          </div>
        </div>
      </div>
    );
  }