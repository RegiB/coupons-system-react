import { Button, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SearchBar.css";

const categories = [
  { value: 1, label: "ACCESSORIES" },
  { value: 2, label: "BABY" },
  { value: 3, label: "BEAUTY" },
  { value: 4, label: "CINEMA" },
  { value: 5, label: "CLOTHING" },
  { value: 6, label: "FLOWERS" },
  { value: 7, label: "FOOD" },
  { value: 8, label: "GIFTS" },
  { value: 9, label: "HOLIDAYS" },
  { value: 10, label: "PETS" },
  { value: 11, label: "SPORTS" },
  { value: 12, label: "TRAVEL" },
];

function SearchBar(): JSX.Element {
  const [value, setValue] = useState<string | null>("");
  const [inputValue, setInputValue] = useState("");
  const history = useHistory();

  const handleClick = (_event: React.MouseEvent<HTMLButtonElement>) => {
    if (
      (value !== "" && categories.find((e) => e.label === value)) ||
      (inputValue !== "" && categories.find((e) => e.label === inputValue))
    ) {
      history.push("/categories/" + value || inputValue);
    }
  };

  return (
    <div className="Search">
      <Button
        onClick={handleClick}
        className="SearchIcon"
        disabled={value === "" || inputValue === ""}
      >
        <SearchIcon />
      </Button>
      <Autocomplete
        onChange={(_event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        className="SearchBar"
        freeSolo
        disableClearable
        options={categories.map((category) => category.label)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search for Category..."
            variant="standard"
            InputProps={{
              ...params.InputProps,
              type: "search",
              disableUnderline: true,
            }}
          />
        )}
      />
    </div>
  );
}

export default SearchBar;
