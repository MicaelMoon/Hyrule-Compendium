import React from "react";

export type SearchResult = {
    id: number;
    name: string;
    image: string;
    category: string;
    drops?: string[];
    common_locations?: string[];
    description: string;
}

type SearchResultsPageProps = {
    searchResults: SearchResult[];
}

const SearchResultsPage : React.FC<SearchResultsPageProps> = ({searchResults}) => {
    return (
        <div>
            <div id="search-results">
                {searchResults.map(r => (
                    <div key={r.id}>
                        <h1>{r.name.charAt(0).toUpperCase()}{r?.name.slice(1)}</h1>
                        <img src={r?.image}/>
                        <h4>Common locations</h4>
                        <ul>
                            {r.common_locations?.map(location => (<li>{location}</li>))}
                        </ul>
                        <h4>Description</h4>
                        <p>{r.description}</p>
                        <hr/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchResultsPage;