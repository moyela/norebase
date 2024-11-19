import { useState, useEffect } from "react";

export default function Best() {

    const [tokens, setTokens] = useState([])
    const [page, setPage] = useState(1)
    const BASE_URL = "https://api.coinlore.net/api/"

    useEffect(() => {
      const fetchTokens = async () => {
        const response = await fetch(`${BASE_URL}/tickers/?start=0&limit=10`);
        const tokenData = await response.json();
        setTokens(tokenData.data);
      }

      fetchTokens();

    }, []);

    return (
      <div className=' px-4 md:px-0 font-sans tracking-wide bg-green-100 flex flex-col '>
        <div className="flex flex-row mb-3 font-semibold border-b-2 border-b-black">
          <p className="basis-1/4">Rank</p>
          <p className="basis-3/6">Name</p>
          <p className="basis-1/4">Symbol</p>
          <p className="basis-1/4">Price(USD)</p>
        </div>
        
        <div>
          {tokens.map((token, index) => {
            return (
              <ul>
                <li key={index} className='border-black border rounded-md flex flex-col gap-2 bg-slate-100 p-1 mb-2'>
                  <div className="flex flex-row justify-between text-sm">
                    <p className="basis-1/4">{token.rank}</p>
                    <p className="basis-3/6">{token.name}</p>
                    <p className="basis-1/4">{token.symbol}</p>
                    <p className="basis-1/4">${token.price_usd}</p>
                  </div>
                </li>
              </ul>
            )
          })}      
        </div>    
    </div>
    );
  }
