import { toggleLikeToken } from "../storage/tokenLocalStorage";

export default function MobileTableView(tableData: any) {
    return (
        <>
            {
                tableData.map((token:any) => {
            
                    return (
                        
                        <li key={token.id} className='border-black border rounded-md flex sm:hidden  flex-col gap-2 bg-slate-100 p-1 mb-2'>  
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
                                <p><span className="font-bold">$</span><span className="font-bold text-red-600">{token.price_usd}</span></p>
                                </div>  
                                <div>
                                <p className="font-bold">🔄️Total Supply</p>
                                <p>{token.tsupply} <span className="font-bold">{token.symbol}</span></p>
                                </div>
                            </div>
                
                            <button className="text-[#66b179] font-extrabold" onClick={() => toggleLikeToken(token.id, token.nameid, token.symbol, token.price_usd)}>❤️</button>
                            </div>
                        </li>                  
                    )
            })}   
        </>
    );
}
