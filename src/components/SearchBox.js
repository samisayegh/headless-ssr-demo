import React, {useEffect, useState, useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  buildSearchBox,
} from '@coveo/headless';
import {EngineContext} from '../context/engine';

export const SearchBoxRenderer = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);

  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );

  return (
    <Autocomplete
      inputValue={state.value}
      onInputChange={(_, newInputValue) => {
        controller.updateText(newInputValue);
      }}
      onChange={() => {
        controller.submit();
      }}
      options={state.suggestions.map((suggestion) => suggestion.rawValue)}
      freeSolo
      style={{width: 'auto'}}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search"
          variant="outlined"
          size="small"
        />
      )}
    />
  );
};

export const SearchBox = () => {
  const options = {numberOfSuggestions: 8};
  const engine = useContext(EngineContext);
  const controller = buildSearchBox(engine, {options});
  return <SearchBoxRenderer controller={controller} />;
};
