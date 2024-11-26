import { toggleLikeToken } from "../storage/tokenLocalStorage";

export default function WebTableView(tableData: any) {
    return (
            <>
                {
                    tableData.map((token:any) => {
              
                        return (
                    
                            <li key={token.id} className='border-black border rounded-md hidden sm:flex  flex-col gap-2 bg-slate-100 p-1 mb-2'>  
                                <div className="flex flex-row justify-between text-sm">
                                <p className="hidden sm:block basis-1/6">{token.rank}</p>
                                <div className="basis-2/5">
                                    <p >{token.name}</p>
                                </div>
                                <div  className="basis-1/6">
                                    <p>{token.symbol}</p>
                                </div>
                                <div className="basis-1/4">
                                    <p><span className="font-bold">$</span><span className="font-bold text-red-600">{token.price_usd}</span></p>
                                </div>
                                <div className="basis-3/6">
                                    <p>{token.tsupply} <span className="font-bold">{token.symbol}</span></p>
                                </div>
                                    <button className="text-[#66b179] font-extrabold text-xs hover:text-lg" onClick={() => toggleLikeToken(token.id, token.nameid, token.symbol, token.price_usd)}>❤️</button>
                                </div>
                            </li>
                        )
                })}   
            </>
    );
}
