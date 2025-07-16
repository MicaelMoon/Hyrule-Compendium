import React, {useState} from 'react';
import "../styles/MainPage.css"

const MainPage: React.FC = () =>{
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [searchResult, setSearchResult] = useState<{id: number; name: string; image: string; category: string; drops: []; common_locations: []; description: string}>();
    const [data, setData] = useState();
    const [error, setError] = useState('');

    return (
        <div>
            <div id="container">
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
                <h1>{searchResult?.name.charAt(0).toUpperCase()}{searchResult?.name.slice(1)}</h1>
                <img src={searchResult?.image}/>
                <h4>Common locations</h4>
                <ul>
                    {searchResult?.common_locations.map(location => (<li>{location}</li>))}
                </ul>
                <h4>Description</h4>
                <p>{searchResult?.description}</p>
            </div>
        </div>
    )

    
    async function getSearchResults(searchEntry: string){
        try{
            const response : any = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${searchEntry.charAt(0).toLowerCase()}${searchEntry.slice(1)}`);

            if(!response.ok){
                throw new Error('Htttp error! status: ${response.status}');
            }

            const json = await response.json();
            setSearchResult(json.data);
        }catch(error){

        }
    }
}


export default MainPage;