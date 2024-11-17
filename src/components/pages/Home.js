import Header from '../Header';
import { useEffect } from 'react';
import { getTestJson } from '../../services/spotifyService';

const Home = () => {

    useEffect(() => {
        const fetchData = async () => {
            const test = await getTestJson();
            console.log(test);
        };
        fetchData();
    }, []);

    return (
        <div>
            <Header/>
        </div>

    );
}

export default Home;