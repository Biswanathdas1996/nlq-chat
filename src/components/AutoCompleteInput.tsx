import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions<FilmOptionType>();

interface AutoCompleteInputProps {
  value: any;
  setValue: React.Dispatch<any>;
  collections: any;
}
const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  value,
  setValue,
  collections,
}) => {
  const convertCollections = (collections: any): FilmOptionType[] => {
    if (!Array.isArray(collections)) {
      return [];
    }
    return collections.map((collection) => {
      return {
        title: collection,
      };
    });
  };

  const result_data = convertCollections(collections);

  React.useEffect(() => {
    if (localStorage.getItem("selected_collection")) {
      setValue({
        title: localStorage.getItem("selected_collection"),
      });
    }
  }, []);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            title: newValue,
          });
          localStorage.setItem("selected_collection", JSON.stringify(newValue));
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
          localStorage.setItem(
            "selected_collection",
            JSON.stringify(newValue.inputValue)
          );
        } else {
          setValue(newValue);
          localStorage.setItem("selected_collection", newValue?.title);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some(
          (option) => inputValue === option.title
        );
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={result_data}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            {option.title}
          </li>
        );
      }}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Select or add a collection" />
      )}
    />
  );
};

interface FilmOptionType {
  inputValue?: string;
  title: string;
}

export default AutoCompleteInput;
