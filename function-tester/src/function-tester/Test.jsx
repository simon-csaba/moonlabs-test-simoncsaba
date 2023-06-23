import { ResultBadge } from "./ResultBadge";
import { useState } from 'react';

export function Test({t, fn, allHasRun, increaseRunCount}){
    const [hasRun, setHasRun] = useState(false);

    function runTest(){
        if(!hasRun) increaseRunCount();
        setHasRun(true);
    }

    return (
    <tr key={t.name} className="bg-white odd:bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700">
        <td className="px-4 py-2 ">{t.name}</td>
        <ResultBadge  correct={t.testFn(fn) === true} hasRun={hasRun || allHasRun}/>
        <td className="px-4 py-2 "><button onClick={runTest}>Run</button></td>
        {/* {(hasRun || allHasRun) && <td className="px-6 py-4 ">{
            ((t.testFn(fn) === true) ? t.points : 0)
        }</td>} */}
        {
            (hasRun || allHasRun) ? <td className="px-4 py-2 w-1/12">{
                ((t.testFn(fn) === true) ? t.points : 0)
            }</td> : <td className="px-4 py-2 w-1/12">--</td>
        }
    </tr>
    );
}