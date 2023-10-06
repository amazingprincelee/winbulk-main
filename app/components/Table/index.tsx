import Image from "next/image";

interface table {
    index: number;
    wallet: string;
    balance: number;
    status: string;
    
  
}

const tableData: table[] = [
    {
        index: 1,
        wallet: "0x42FAdf761ded5374DfB77d...",
        balance: 43350000.0,
        status: "Wallet earning BNB",
       
    },
    {
        index: 2,
        wallet: "0xf4d005595e85C5aE4E219DB",
        balance: 39131525,
        status: "Wallet earning BNB",
       
    },
    {
        index: 3,
        wallet: "0x9d333c817Fc164c5aB77d",
        balance: 39100000.0,
        status: "Wallet earning BNB",
        
    },
    {
        index: 4,
        wallet: "0xa9CEd5ecAB2fDdF45be8",
        balance: 39100000.0,
        status: "Wallet earning BNB",
        
    },
    {
        index: 5,
        wallet: "0xa9CEd5ecAB2fDdF45be8",
        balance: 39100000.0,
        status: "Wallet earning BNB",
        
    },
]

const Table = () => {
    return (
        <>
            <div className='mx-auto max-w-7xl pt-40 px-6' id="exbalance-section">
                <div className="table-b bg-navyblue p-8 overflow-x-auto">
                    <h3 className="text-offwhite text-2xl">$WBUK TopHolders</h3>
                    <table className="table-auto w-full mt-10">
                        <thead>
                            <tr className="text-white bg-darkblue rounded-lg">
                                <th className="px-4 py-4 font-normal">#</th>
                                <th className="px-4 py-4 font-normal">wallet</th>
                                <th className="px-4 py-4 font-normal">balance</th>
                                <th className="px-4 py-4 font-normal">Status</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((items, i) => (
                                <tr key={i} className="border-b border-b-darkblue">
                                    <td className="px-4 py-6 text-center text-white">{items.index}</td>
                                    <td className="px-4 py-6 text-center text-white">{items.wallet.toString()}</td>
                                    <td className={`px-4 py-6 text-center ${items.balance < 0 ? 'text-red' : 'text-green'} `}>{items.balance}</td>
                                    <td className="px-4 py-6 text-center text-white">{items.status.toString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Image src={'/images/Table/Untitled.svg'} alt="ellipse" width={2460} height={102} className="md:mb-40 md:-mt-6" />
        </>
    )
}

export default Table;
