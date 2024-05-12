import React, { useEffect, useState } from 'react';
import { url } from '../../../url';

function Test() {
    const [state, setState] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url.getData);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                console.log(jsonData); // Verify fetched data
                setState(jsonData);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Hello world, Message is {state ? state.message : 'Loading...'}</h1>
        </div>
    );
}

export default Test;
