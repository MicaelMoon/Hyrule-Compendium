import React, {useState} from 'react';
import "../styles/MainPage.css"
import SearchResultsPage from './SeaerchResultsPage';

const MainPage: React.FC = () =>{
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<{id: number; name: string; image: string; category: string; drops: string[]; common_locations: string[]; description: string}[]>([]);

    return (
        <div>
            <div id="header">
                <div id="column">
                    <form onSubmit={(e) => {e.preventDefault();getSearchResults(searchTerm);}}>
                        <input id='search-input'
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={() => getSearchResults(searchTerm)}>
                            Search
                        </button>

                        <select id='connom-locations-selection'>
                            <option value="">All</option>
                        </select>
                    </form>
                </div>
            </div>

            <SearchResultsPage searchResults={searchResults}/>
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