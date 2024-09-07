
function Boardtable({onClickHandler, symbol, board}){

    return (
        <div className="border m-4 grid grid-cols-3 gap-0">
            {board.map(item=>{
                return (
                    <h1 
                        key={item.key}
                        className="border w-20 h-20 flex items-center justify-center cursor-pointer text-2xl" // Adjust size and styles here
                        onClick={(e)=>onClickHandler(e, item.id)}
                    >
                        {item.symbol}
                    </h1>
                )
            })}
          
        </div>
    )
}

export default Boardtable;