import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { options, WEATHER_API_KEY, geo } from "./API";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${geo}direct?q=${inputValue}&limit=5&appid=${WEATHER_API_KEY}`,
        options
      );
      const response_1 = await response.json();

      const cityOptions = response_1 ? response_1.map((city) => ({
        value: `${city.lat} ${city.lon}`,
        label: `${city.name}, ${city.state}`,
      })) : [];

      return { options: cityOptions };

    } catch (err) {
      console.error(err);
      return { options: [] };
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxShadow: state.isFocused ? '0 0 0 2px #3699FF' : null,
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#3699FF' : null,
        color: state.isFocused ? 'white' : null,
    }),
}

  return (
    <AsyncPaginate className="paginateContainer"
      placeholder="Search City"
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      styles={customStyles}
    />
  );
};

export default Search;
