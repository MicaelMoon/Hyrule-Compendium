import React, {useState, useEffect} from 'react';
import "../styles/MainPage.css"
import SearchResultsPage from './SeaerchResultsPage';

const MainPage: React.FC = () =>{
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<{id: number; name: string; image: string; category: string; drops: string[]; common_locations: string[]; description: string}[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [locations, setLocations] = useState<string[]>([]);
    
    useEffect(() => { // This still confuses me :/
        const loadLocations = async () => {
            const allLocations = await fetchAllLocations();
            setLocations(allLocations);
        };
        loadLocations();
    }, []);

    return (
        <div>
            <div id="header">
                <div id="column">
                    <form onSubmit={(e) => {e.preventDefault();getSearchResults();}}>
                        <input id='search-input'
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={() => getSearchResults()}>
                            Search
                        </button>

                        <select id='common-locations-selection' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="">All</option>
                            {locations.map((location: string) =>(
                                <option key={location} value={location}>{location}</option>
                            ))}
                        </select>
                    </form>
                </div>
            </div>

            <SearchResultsPage searchResults={searchResults}/>
        </div>
    )

    async function fetchAllLocations(): Promise<string[]>{
        try{
            const url : string = "https://botw-compendium.herokuapp.com/api/v3/compendium";
            const response : any = await fetch(url);

            if(!response.ok){
                throw new Error(`Http error! status: ${response.status}`);
            }

            const allData = await response.json();

            const entries = allData.data;

            const locationSet = new Set<string>();

            entries.forEach((entry: any) => {
                if (Array.isArray(entry.common_locations)) {
                    entry.common_locations.forEach((location: string) => {
                        locationSet.add(location);
                    });
                }
            });

            return Array.from(locationSet).sort();
        }catch{
            return [];
        }
    }

    async function getSearchResults(){
        try{
            const url : string = "https://botw-compendium.herokuapp.com/api/v3/compendium";
            const response : any = await fetch(url);

            if(!response.ok){
                throw new Error(`Http error! status: ${response.status}`);
            }

            const allData = await response.json();
            let results = allData.data.filter((entry: any) =>
                entry.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if(selectedCategory !== ''){
                results = results.filter((entry: any) =>
                    Array.isArray(entry.common_locations) && entry.common_locations.includes(selectedCategory)
                );
            }

            setSearchResults(results);
        }catch(error){
            console.error("Error fetching:", error);
        }
    }
}


export default MainPage;