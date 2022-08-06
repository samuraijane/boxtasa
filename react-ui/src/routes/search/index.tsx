import { useState } from 'react';
import data1 from '../../mocks/axos.json';
import data2 from '../../mocks/cocc.json';
import data3 from '../../mocks/coch.json';
import data4 from '../../mocks/usba.json';

interface Results {
  institutionName: string;
  accountNumber: number;
  accountType: string;
  postedDateYear: number;
  postedDateMonth: number;
  postedDateDay: number;
  description: string;
  type: string;
  amount: string | number;
}

const Search = (): JSX.Element => {

  const [searchValue, setSearchValue] = useState('');
  const [matches, setMatches] = useState<any[]>([]);

  const data = [...data1, ...data2, ...data3, ...data4];

  

  // TODO confirm type is correct, https://stackoverflow.com/questions/42081549/typescript-react-event-types
  const handleChange = (e: React.SyntheticEvent<EventTarget>) => {
    setSearchValue((e.target as HTMLInputElement).value)
  };

  // TODO remove all `any` types
  const handleClick = (e: any): void => {
    const results = data.filter(x => {
      const y = Math.abs((x.amount as any) * 1);
      return y == ((searchValue as any) * 1)
    });
    setMatches(results);
  }

  const searchResults = () => {
    return matches.map((match, index) => {
      return(
        <li key={index}>
          <div>{match.institutionName}</div>
          <div>{match.postedDateYear}-{match.postedDateMonth}-{match.postedDateDay}</div>
          <div>{match.description}</div>
          <div>{match.amount}</div>
        </li>
      )
    })
  }

  return (
    <>
      <h1>Search</h1>
      <div className="search">
        <div className="search__input">
          <button onClick={handleClick}>Search</button>
          <input onChange={handleChange} type="text" value={searchValue} />
        </div>
        {matches.length > 0 && (
          <ul className="search__results">
            {searchResults()};
          </ul>
        )}
      </div>
    </>
  )
};

export default Search;