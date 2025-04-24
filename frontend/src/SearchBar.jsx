import React from "react";
import { Input } from "semantic-ui-react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleSearchChange = (e, { value }) => {
    setSearchQuery(value);
  };

  return (
    <div style={{ margin: "1em 0" }}>
      <Input
        icon="search"
        placeholder="Buscar salas..."
        value={searchQuery}
        onChange={handleSearchChange}
        fluid
      />
    </div>
  );
};

export default SearchBar;