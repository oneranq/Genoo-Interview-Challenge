import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

import { getAvailableCategories } from './../utils/ChunkJoke';

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    buttonStyle:{
        marginTop: theme.spacing(4),
        height: '40px',
        marginLeft: theme.spacing(4),
    }
  }),
);



export default function CustomizedSelects(props: any) {
  
  const classes = useStyles();
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  
  /**
   * User event handlers
   * @param event 
   */
  const inputChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log('hey',event.target.value);
    setQuery(event.target.value as string);
  }
  
  const selectCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string);
  };

  /**
   * Initial loading available categories
   */
  const loadCategory = async () => {
    const response = await getAvailableCategories();
    setCategories(response.data);
  };

  const getJokes = () => {
    props.callback(category, query);
  }

  useEffect(()=>{
    loadCategory();
  }, []);

  const listCategories = categories.map((element, index) => 
    <option value={element} key={index}>{index+1}. {element}</option>
  )

  return (
    <div>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-textbox">Search Key</InputLabel>
        <BootstrapInput id="demo-customized-textbox" onChange={inputChange}/>
      </FormControl>      
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-textbox">Category</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={category}
          onChange={selectCategory}
          input={<BootstrapInput />}
        >
        <option value="">none</option>
        { listCategories }
        </NativeSelect>
      </FormControl>
        <Button variant="contained" color="primary" className={classes.buttonStyle} onClick={getJokes}>
            Get Joke
        </Button>
    </div>
  );
}