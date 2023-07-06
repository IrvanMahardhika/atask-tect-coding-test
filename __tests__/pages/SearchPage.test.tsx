import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  createReducer,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';

import { userState } from '../../src/redux/reducers/user';
import { repoState } from '../../src/redux/reducers/repo';
import { loaderState } from '../../src/redux/reducers/loader';
import {
  getResultSearchUser,
  setResultSearchUser,
  setSearchUserHistory
} from '../../src/redux/actions/user';
import { setRepos, getRepos } from '../../src/redux/actions/repo';
import { setLoader } from '../../src/redux/actions/loader';

import SearchPage from '../../src/pages/Search/index';

const MOCK_RESULT_SEARCH_USER = {
  status: 200,
  data: {
    total_count: 2,
    incomplete_results: false,
    items: [
      {
        login: 'IrvanMahardhika',
        id: 53810147,
        repos_url: 'https://api.github.com/users/IrvanMahardhika/repos'
      },
      {
        login: 'irvanmahendra',
        id: 43864031,
        repos_url: 'https://api.github.com/users/irvanmahendra/repos'
      }
    ]
  }
};

const MOCK_RESULT_GET_REPO = [
  {
    status: 200,
    data: [
      {
        id: 224989735,
        name: 'AcademindReactNative',
        description: null,
        stargazers_count: 20
      },
      {
        id: 228457182,
        name: 'codedamnNavigation',
        description: 'some description',
        stargazers_count: 10
      }
    ]
  },
  {
    status: 200,
    data: []
  }
];

const mockReducers = () => {
  const userReducer = createReducer(userState, (builder) => {
    builder.addCase(getResultSearchUser, (state) => {
      return { ...state, resultSearchUserState: MOCK_RESULT_SEARCH_USER };
    });
    builder.addCase(setResultSearchUser, (state, { payload }) => {
      return { ...state, resultSearchUserState: payload };
    });
    builder.addCase(setSearchUserHistory, (state, { payload }) => {
      return { ...state, searchUserHistory: payload };
    });
  });

  const repoReducer = createReducer(repoState, (builder) => {
    builder.addCase(getRepos, (state) => {
      return { ...state, resultGetRepo: MOCK_RESULT_GET_REPO };
    });
    builder.addCase(setRepos, (state, { payload }) => {
      return { ...state, resultGetRepo: payload };
    });
  });

  const loaderReducer = createReducer(loaderState, (builder) => {
    builder.addCase(getResultSearchUser, (state) => {
      return { ...state, loader: true };
    });
    builder.addCase(setLoader, (state, { payload }) => {
      return { ...state, loader: payload };
    });
  });

  const rootReducer = combineReducers({
    userReducer,
    repoReducer,
    loaderReducer
  });

  return configureStore({
    reducer: rootReducer
  });
};

const component = (
  <Provider store={mockReducers()}>
    <SearchPage />
  </Provider>
);

describe('Search page', () => {
  it('Renders correctly', () => {
    render(component);

    const usernameInput = screen.getByRole('combobox');
    expect(usernameInput).toBeTruthy();

    const searchButton = screen.queryByLabelText('search-button');
    expect(searchButton).toBeTruthy();

    const searchButtonText = screen.queryByLabelText('search-button-text');
    expect(searchButtonText).toBeTruthy();
    expect(searchButtonText?.innerHTML).toEqual('Search');
  });

  it('On searching username', () => {
    render(component);

    let circularProgress = screen.queryByLabelText('circular-progress');
    expect(circularProgress).toBeFalsy();

    const usernameInput = screen.getByRole('combobox');
    fireEvent.change(usernameInput, { target: { value: 'a' } });

    const searchButton = screen.getByLabelText('search-button');
    fireEvent.click(searchButton);

    const searchButtonText = screen.queryByLabelText('search-button-text');
    expect(searchButtonText).toBeFalsy();

    circularProgress = screen.queryByLabelText('circular-progress');
    expect(circularProgress).toBeTruthy();

    const firstAccordionSummaryText = screen.getByLabelText(
      `accordion-summary-text-for-user-${MOCK_RESULT_SEARCH_USER.data.items[0].id}`
    );
    expect(firstAccordionSummaryText.innerHTML).toEqual(
      MOCK_RESULT_SEARCH_USER.data.items[0].login
    );

    const secondAccordionSummaryText = screen.getByLabelText(
      `accordion-summary-text-for-user-${MOCK_RESULT_SEARCH_USER.data.items[1].id}`
    );
    expect(secondAccordionSummaryText.innerHTML).toEqual(
      MOCK_RESULT_SEARCH_USER.data.items[1].login
    );
  });
});
