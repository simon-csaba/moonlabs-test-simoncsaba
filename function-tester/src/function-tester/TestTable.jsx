import { Test } from "./Test";
import { useState } from 'react';

export function TestTable({testsToDisplay, fn}){
    const [allHasRun, setAllHasRun] = useState(false);
    const [runCount, setRunCount] = useState(0);

    function runAll(){
        setAllHasRun(true);
        setRunCount(testsToDisplay.length);
    }

    function increaseRunCount(){
        setRunCount(runCount+1);
    }

    return (
    <table className="w-8/12 text-sm text-center text-gray-500 dark:text-gray-400">
        <thead>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th>Name</th>
                <th>Result</th>
                <th>Action</th>
                <th>Points</th>
            </tr>
        </thead>
        <tbody>
            {testsToDisplay.map((test) => <Test t={test} fn={fn} allHasRun = {allHasRun} increaseRunCount = {increaseRunCount} key={test.name}/>)}
        </tbody>
        <tfoot>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td></td>
                <td></td>
                <td><button onClick={runAll}>Run All</button></td>
                {/* {runCount === testsToDisplay.length && <td>{testsToDisplay.filter((e) => e.testFn(fn) === true).reduce((a,b) => {
                        return a + b.points;
                    
                }, 0)}</td>} */}

                {(runCount === testsToDisplay.length) ? <td>{testsToDisplay.filter((e) => e.testFn(fn) === true).reduce((a,b) => {
                        return a + b.points;
                    
                }, 0)}</td> : <td>--</td>

                }
            </tr>
        </tfoot>
    </table>
    );
}