import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  CircularProgress,
  Button,
  TextField,
  Typography
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import { getResultSearchUser } from '../../redux/actions/user';
import { RootState } from '../../redux/store';

import styles from './Search.module.scss';

const Search = () => {
  const dispatch = useDispatch();

  const { resultSearchUserState, searchUserHistory }: UserState = useSelector(
    (state: RootState) => state.userReducer
  );
  const { resultGetRepo }: RepoState = useSelector(
    (state: RootState) => state.repoReducer
  );
  const { loader } = useSelector((state: RootState) => state.loaderReducer);

  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const handleSelectUser = ({
    isThisUserSelected,
    userId
  }: {
    isThisUserSelected: boolean;
    userId: number;
  }) => {
    if (isThisUserSelected) {
      setSelectedUsers((prevState) => prevState.filter((u) => u !== userId));
    } else {
      setSelectedUsers((prevState) => [...prevState, userId]);
    }
  };

  const [usernameInput, setUsernameInput] = useState<string>('');

  const handleSearchUsername = () => {
    if (loader) {
      return;
    }
    if (!usernameInput) {
      return;
    }
    dispatch(getResultSearchUser({ username: usernameInput }));
  };

  return (
    <div className={styles.mainContainer}>
      <Autocomplete
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            handleSearchUsername();
          }
        }}
        className={styles.searchInput}
        freeSolo
        disableClearable
        options={searchUserHistory}
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
        aria-label="search-button"
        className={styles.searchButton}
        variant="contained"
        onClick={handleSearchUsername}
      >
        {loader ? (
          <CircularProgress
            aria-label="circular-progress"
            size={25}
            className={styles.loader}
          />
        ) : (
          <Typography aria-label="search-button-text">Search</Typography>
        )}
      </Button>
      {resultSearchUserState?.data?.items?.map((user, userIndex) => {
        const userId = user.id;
        const isThisUserSelected = selectedUsers.some((u) => u === userId);

        return (
          <Accordion
            key={userIndex.toString()}
            expanded={isThisUserSelected}
            onChange={() => handleSelectUser({ isThisUserSelected, userId })}
          >
            <AccordionSummary
              aria-label={`accordion-button-for-user-${userId}`}
              className={styles.userContainer}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography
                aria-label={`accordion-summary-text-for-user-${userId}`}
                variant="h6"
              >
                {user.login}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.repoContainer}>
              {resultGetRepo &&
              resultGetRepo?.length > 0 &&
              resultGetRepo[userIndex] &&
              resultGetRepo[userIndex]?.data &&
              resultGetRepo[userIndex]?.data?.length > 0 ? (
                resultGetRepo[userIndex]?.data?.map((repo, repoIndex) => {
                  const repoId = repo.id;

                  return (
                    <div key={repoIndex.toString()} className={styles.repoItem}>
                      <Typography
                        aria-label={`repo-title-for-repo-${repoId}-user-${userId}`}
                        fontWeight={'bold'}
                      >
                        {repo.name}
                      </Typography>
                      <Typography>{repo.description}</Typography>
                      <div className={styles.starredContainer}>
                        <Typography
                          aria-label={`repo-star-for-repo-${repoId}-user-${userId}`}
                        >
                          {repo.stargazers_count}
                        </Typography>
                        <StarIcon />
                      </div>
                    </div>
                  );
                })
              ) : (
                <Typography>User does not have any repo</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default Search;
