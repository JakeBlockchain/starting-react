import "./App.css";
import React from "react";
import pokemon from "./pokemon.json";
import PropTypes from "prop-types";

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <button onClick={() => onSelect(pokemon)}>Select</button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string,
    }),
    type: PropTypes.arrayOf(PropTypes.string),
  }),
  onSelect: PropTypes.func,
};

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
  </div>
);

function App() {
  const [filter, setFilter] = React.useState("");
  const [selectedItem, selectedItemSet] = React.useState(null);
  return (
    <div
      className="main"
      style={{
        margin: "auto",
        width: 800,
        paddingTop: "1rem",
      }}
    >
      <h1 className="title">Pokemon Search</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "70% 30%",
          gridColumnGap: "5rem",
        }}
      >
        <div>
          <input
            value={filter}
            onChange={(evt) => setFilter(evt.target.value)}
          />
          <table width="100%">
            <thead>
              <tr>
                <th onClick={(evt) => setFilter(evt.target.innerText)}>Name</th>
                <th onClick={(evt) => setFilter("")}>Type</th>
              </tr>
            </thead>
            <tbody>
              {pokemon
                .filter((pokemon) =>
                  pokemon.name.english
                    .toLowerCase()
                    .includes(filter.toLowerCase())
                )
                .slice(0, 150)
                .map((pokemon) => (
                  <PokemonRow
                    key={pokemon.id}
                    pokemon={pokemon}
                    onSelect={(pokemon) => selectedItemSet(pokemon)}
                  />
                ))}
            </tbody>
          </table>
        </div>
        {selectedItem && <PokemonInfo {...selectedItem} />}
      </div>
    </div>
  );
}

export default App;
