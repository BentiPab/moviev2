
import { useEffect } from 'react';
import { Cookie } from 'utils/cookies';


const Homepage = () => {
    useEffect(() => {
    Cookie.set('test', 'Testing', 30)
    }, [])
    return <div>Homepage</div>
};

export default Homepage;
