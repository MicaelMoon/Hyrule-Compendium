import React, {useState} from 'react';
import "../styles/MainPage.css"

const MainPage: React.FC = () =>{
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<{id: number; name: string; image: string; category: string; drops: string[]; common_locations: string[]; description: string}[]>([]);
    const [searchResult, setSearchResult] = useState<{id: number; name: string; image: string; category: string; drops: []; common_locations: []; description: string}>();
    const [data, setData] = useState();
    const [error, setError] = useState('');

    return (
        <div>
            <div id="container header">
                <div id="column">
                    <input id='search-input'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={() => getSearchResults(searchTerm)}>
                        Search
                    </button>
                    <h3>{searchTerm}</h3>
                </div>
            </div>

            <div id="search-results">
                {searchResults.map(r => (
                    <div key={r.id}>
                        <h1>{r?.name.charAt(0).toUpperCase()}{r?.name.slice(1)}</h1>
                        <img src={r?.image}/>
                        <h4>Common locations</h4>
                        <ul>
                            {r?.common_locations.map(location => (<li>{location}</li>))}
                        </ul>
                        <h4>Description</h4>
                        <p>{r?.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )

    
async function getSearchResults(searchEntry: string){
    try{
        const url : string = "https://botw-compendium.herokuapp.com/api/v3/compendium";
        const response : any = await fetch(url);

        if(!response.ok){
            throw new Error(`Http error! status: ${response.status}`);
        }

        const allData = await response.json();
        const results = allData.data.filter((entry: any) =>
            entry.name.toLowerCase().includes(searchEntry.toLowerCase())
        );

        setSearchResults(results);
    }catch(error){
        console.error("Error fetching:", error);
    }
}
}


export default MainPage;