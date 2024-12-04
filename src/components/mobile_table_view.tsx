import { toggleLikeToken } from "../storage/localStorage";

export default function MobileTableView(tableData: any) {
    return (
        <> 
            {
                tableData.tableData.map((token:any, index:number) => {
            
                    return (
                        
                        <li key={token.nameid + ' mobile'} className={`flex sm:hidden flex-col p-1 mx-4 ${index % 2 == 0 ? 'bg-white' : 'bg-slate-200'}`}> 
                            <div className="flex flex-row justify-between text-sm px-4 py-2">
                                <div className="basis-1/2 flex flex-col gap-3">
                                    <div>
                                        <p className="font-bold font-mono text-xs">
                                            🪙Token
                                        </p>
                                        <p>
                                            <span className="font-bold">{token.rank}</span> {token.name}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-bold font-mono text-xs">
                                            📶Symbol
                                        </p>
                                        <p>
                                            (<span className="font-bold font-mono">{token.symbol}</span>)
                                        </p>
                                    </div>
                                </div>
                                <div className="basis-1/2 flex flex-col gap-3">
                                    <div>
                                        <p className="font-bold font-mono text-xs">
                                            💵Price
                                        </p>
                                        <p>
                                            <span className="font-bold">$</span><span className="font-bold text-red-600">{token.price_usd}</span></p>
                                    </div>  
                                    <div>
                                        <p className="font-bold font-mono text-xs">
                                            🔄️Total Supply
                                        </p>
                                        <p>{token.tsupply} <span className="font-bold font-mono">{token.symbol}</span></p>
                                    </div>
                                </div>
                                <button className="text-[#66b179] font-extrabold" 
                                onClick={() => toggleLikeToken(token.id, token.nameid, token.symbol, token.price_usd)}>
                                    ❤️
                                </button>
                            </div>
                      </li>                
                    )
            })}   
        </>
    );
}
