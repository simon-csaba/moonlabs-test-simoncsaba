import { TestTable } from "./TestTable";

export function FunctionTester({ fn, input, output, tests, onFinish }) {
  /*console.log(fn);
  console.log(input);
  console.log(output);
  console.log(tests);*/
  return (
    <>
      <h1 className="text-3xl">FunctionTester</h1>
      <h2 className="text-2xl">Function</h2>
      <h2>{fn.toString()}</h2>
      <h2 className="text-2xl">Tests</h2>
      <TestTable testsToDisplay={tests} fn={fn}/>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() =>
          onFinish({
            givenTests: tests,
            testResult: { achieved: tests.filter((e) => e.testFn(fn) === true).reduce((a,b) => {
              return a + b.points;
          
      }, 0), all: 100 },
            customTests: [],
          })
        }
      >
        OK
      </button>
      
    </>
  );
}
