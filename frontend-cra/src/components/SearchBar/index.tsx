import * as React from "react";
import { useRouter } from "../../hooks/useRouter";
import { InputGroup } from "@blueprintjs/core";

export const SearchBar: React.FunctionComponent<SearchBarProps> = props => {
    const [searchState, setSearchState] = React.useState({
        query: ""
      });
    
      const handleInputChange = (event: AnalyserNode) => {
        setSearchState({ query: event.target.value });
      };
      
      const onKeyPress={onKeyPress} => {
        if (event.keyCode === 13) {
            // go to searchresults page with reactRouter
          }
      }
      const onSubmit = event => {
          const router = useRouter();
          router.history.push("/searchresults/"+searchState.query);
      }
      
  return (
    <div className="HomePage__searchbar-container">
          <InputGroup
            type="search"
            leftIcon="search"
            placeholder="Search for a module or lecturer..."
            small
          />
        </div>
  )
};

export default SearchBar;
