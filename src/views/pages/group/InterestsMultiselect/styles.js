const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  selectInput: {
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit / 4,
    height: '19px'
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  listElement: {
    marginRight: 30,
    width: 'fit-content',
    fontSize: 'small',
    border: '1px solid',
    padding: '2px',
    borderRadius: '5px'
  },
  listInterests: {
  }
});

export default styles;