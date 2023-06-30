

export const DateSelect = ({currentSelectedDate, setCurrentSelectedDate, now}) => {
    const dateChangeHandler = (e) => {
        setCurrentSelectedDate({...currentSelectedDate, date:e.target.value});

    }

    const hourChangeHandler = (e) => {
        setCurrentSelectedDate({...currentSelectedDate, hour:e.target.value});
    }

    const minuteChangeHandler = (e) => {
        setCurrentSelectedDate({...currentSelectedDate, minute:e.target.value});
    }

    const padNumber = (number) => {
        return number < 10 ? "0" + number.toString() : number.toString();
    }

    const start = new Date(2023,5,1)
    const end = new Date(2023,7,31)
    const promotionLength = end > now ? (now.getTime()-start.getTime())/1000/60/60/24 : (end.getTime()-start.getTime())/1000/60/60/24 + 1;

    const nums = []
    for(let i = 0;i<60;i++){
        nums[i] = i;
    }

    const dates = []
    let next = start
    for(let i = 0;i<promotionLength;i++){
        dates.push(new Date(next))
        next.setDate(next.getDate()+1)
    }

    return (
    <>
        <label className="mb-1" htmlFor="date">Nap</label>
            <select className="border-solid border-2 border-gray-400 p-1" onChange={dateChangeHandler} name="date" defaultValue={now.getFullYear() + "-0" + (now.getMonth()+1) + "-" + now.getDate()} required>
                {
                    dates.map((e, index) => 
                    <option key={index} value={e.getFullYear() + "-" + padNumber((e.getMonth()+1)) + "-" + padNumber(e.getDate())} >
                        {e.toLocaleString("hu-HU", {month: 'long'}) + " " + e.getDate()+"."}
                    </option>
                    )
                }
            </select>
            <label className="mb-1" htmlFor="hour">Óra</label>
            <select className="border-solid border-2 border-gray-400 p-1" onChange={hourChangeHandler} name="hour" defaultValue='' required>
                <option disabled hidden value='' key=''>--</option>
                {
                    nums.filter((e) => e<24).map((e) =>  <option key={e} value={padNumber(e)}>{e}</option>)
                }
            </select>
            <label htmlFor="minute" className="mb-1">Perc</label>
            <select className="border-solid border-2 border-gray-400 p-1" onChange={minuteChangeHandler} name="minute" defaultValue='' required>
                <option disabled hidden value='' key=''>--</option>
                {
                    nums.map((e) =>  <option key={e} value={padNumber(e)}>{e}</option>)
                }
            </select>
        </>
        )
}