import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import React, { Fragment, memo, useState } from 'react';
import styles from './styles';

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const InstrumentMultiselect = memo(function InstrumentMultiselect(props) {
  const { selectedItems, itemsList, onSelect, classes } = props;
  const [interests, setInterests] = useState(selectedItems ? selectedItems : []);

  const onSelectChanged = (event) => {
    setInterests(event.target.value);
    onSelect(event.target.value);
  }

  return (
    <Fragment>
      <Select
        multiple
        value={interests}
        onChange={onSelectChanged}
        input={<Input id="select-multiple-chip" />}
        className={classes.selectInput}
        renderValue={selected => (
          <div className={classes.listInterests}>
            {selected.map(value => (
              <span key={value} className={classes.listElement}>
              {value}
              </span>
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {itemsList.map(name => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={interests.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </Fragment>
  )
})

export default withStyles(styles, { withTheme: true })(InstrumentMultiselect);