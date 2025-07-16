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
                        <h2>Common locations</h2>
                        {r.common_locations && r.common_locations.length > 0 ? (
                            <ul>
                                {r.common_locations?.map(location => (<li>{location}</li>))}
                            </ul>
                        ): (
                            <h4>None</h4>
                        )}
                        <h2>Description</h2>
                        <p>{r.description}</p>
                        <hr/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchResultsPage;