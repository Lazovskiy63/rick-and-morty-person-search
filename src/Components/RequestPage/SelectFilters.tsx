import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TYPE_INPUT } from '../TYPES/INPUT_FORM';
interface SelectFiltersArgs {
  nameSelect: string;
  value: any;
  onChange: Function;
  options: any;
}
const SelectFilters = ({
  nameSelect,
  value,
  onChange,
  options,
}: SelectFiltersArgs) => {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">
        {nameSelect}
      </InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label="Status"
        sx={{ width: '110px', overflow: 'hidden' }}
      >
        <MenuItem key={'nevermind'} value={'none'}>
          {'nevermind'}
        </MenuItem>
        {options.map((option: any) => {
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
