

export function ResultBadge({correct, hasRun}){
    if(hasRun){
        if(correct){
            return (
                <td className="px-4 py-2 flex flex-col items-center justify-center"><div className="w-12 h-12 bg-green-400 rounded-full"></div> </td>
            );
        }
        else{
            return (
                <td className="px-4 py-2 flex flex-col items-center justify-center"><div className="w-12 h-12 bg-red-400 rounded-full"></div></td>
            );
        }
    }
    else{
        return (
            <td className="px-4 py-2 flex flex-col items-center justify-center"><div className="w-12 h-12 bg-gray-400 rounded-full"></div></td>
        );
    }
}