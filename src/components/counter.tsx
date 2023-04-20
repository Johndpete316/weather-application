import react, { useState, useEffect } from 'react'
import '../styles/App.css'


function Counter() {
    const [count, setCount] = useState<number>(() => {
        const savedCount = localStorage.getItem('count');
        return savedCount !== null ? Number(savedCount) : 0;
    });
    
      useEffect(() => {
        localStorage.setItem('count', count.toString());
      }, [count]);

    return (
        <div className="Counter">
            <div>
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
            </div>
        </div>
    )
}


export default Counter