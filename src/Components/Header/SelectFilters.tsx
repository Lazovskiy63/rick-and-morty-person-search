import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { STANDART_SELECT_VALUE } from '../types/types';
interface SelectFiltersArgs {
  nameSelect: string;
  value: string | null;
  onChange: Function;
  options: string[];
}
const SelectFilters = ({
  nameSelect,
  value,
  onChange,
  options,
}: SelectFiltersArgs) => {
  return (
    <FormControl variant="standard" sx={{ m: 1, margin: '5px' }}>
      <InputLabel id="demo-simple-select-standard-label">
        {nameSelect}
      </InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label="Status"
        sx={{ minWidth: '100px', maxWidth: '100px', overflow: 'hidden' }}
        defaultValue="nevermind"
      >
        <MenuItem key={'nevermind'} value={STANDART_SELECT_VALUE}>
          {'nevermind'}
        </MenuItem>
        {options.map((option: string) => {
          return (
            <MenuItem key={option} value={option.toLowerCase()}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
export default SelectFilters;
