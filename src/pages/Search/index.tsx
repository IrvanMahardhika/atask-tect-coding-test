import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  TextField,
  Typography
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import { getResultSearchUser } from 'redux/actions/user';
import { RootState } from 'redux/store';

import styles from './Search.module.scss';

const Search = () => {
  const dispatch = useDispatch();

  const { resultSearchUserState }: UserState = useSelector(
    (state: RootState) => state.userReducer
  );

  const [selectedUser, setSelectedUser] = useState<string | false>(false);

  const [usernameInput, setUsernameInput] = useState<string>('');

  const handleSearchUsername = () => {
    dispatch(getResultSearchUser({ username: usernameInput }));
  };

  return (
    <div className={styles.mainContainer}>
      <Autocomplete
        className={styles.searchInput}
        freeSolo
        disableClearable
        options={['Denny', 'Irvan']}
        inputValue={usernameInput}
        onInputChange={(_, newValue) => setUsernameInput(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter username"
            InputProps={{
              ...params.InputProps,
              type: 'search'
            }}
          />
        )}
      />
      <Button
        className={styles.searchButton}
        variant="contained"
        onClick={handleSearchUsername}
      >
        Search
      </Button>
      {resultSearchUserState?.data?.items?.map((u, i) => {
        return (
          <Accordion
            key={i.toString()}
            expanded={selectedUser === u.login}
            onChange={() => {
              if (selectedUser !== u.login) {
                setSelectedUser(u.login);
              } else {
                setSelectedUser(false);
              }
            }}
          >
            <AccordionSummary
              className={styles.userContainer}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>{u.login}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={styles.repoContainer}>
                <Typography>Repository title</Typography>
                <Typography>Repository description</Typography>
                <div className={styles.starredContainer}>
                  <Typography>12</Typography>
                  <StarIcon />
                </div>
              </div>
              <div className={styles.repoContainer}>
                <Typography>Repository title</Typography>
                <Typography>Repository description</Typography>
                <div className={styles.starredContainer}>
                  <Typography>12</Typography>
                  <StarIcon />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default Search;
