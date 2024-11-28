import { toggleLikeToken } from "../storage/localStorage";

export default function WebTableView(tableData: any) {
    return (
            <>
                {
                    tableData.tableData.map((token:any, index:number) => {
              
                        return (
                    
                            <li key={token.nameid + ' web'} className={`hidden sm:flex  flex-col bg-slate-100 px-4 py-2 ${index % 2 == 0 ? 'bg-slate-200' : 'bg-white'}`}>  
                
                                <div className="flex flex-row justify-between text-sm">
                                    <p className="hidden sm:block basis-1/6">
                                        {token.rank}
                                    </p>
                                    <div className="basis-2/5">
                                        <p>
                                            {token.name}
                                        </p>
                                    </div>
                                    <div className="basis-1/6">
                                        <p>
                                            <span className="font-bold font-mono">
                                                {token.symbol}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="basis-1/4">
                                        <p>
                                            <span className="font-bold">
                                                $
                                            </span>
                                            <span className="font-bold text-red-600">
                                                {token.price_usd}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="basis-3/6">
                                        <p>
                                            {token.tsupply} <span className="font-bold font-mono">{token.symbol}</span>
                                        </p>
                                    </div>
                                    <div className="relative pr-4">
                                        <button className="absolute hover:top-[-5px] text-[#66b179] font-extrabold hover:text-xl" 
                                        onClick={() => toggleLikeToken(token.id, token.nameid, token.symbol, token.price_usd)}>
                                            ❤️
                                        </button>
                                    </div>
                                </div>
                            </li>
                        )
                })}   
            </>
    );
}
