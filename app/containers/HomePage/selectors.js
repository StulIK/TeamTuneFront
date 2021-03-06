/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectLogin = (state) => state.get('login');

const makeSelectUsername = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('username')
);
const makeSelectPassword = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('password')
);

const makeSelectError = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('error')
);

export {
  selectLogin,
  makeSelectUsername,
  makeSelectPassword,
  makeSelectError
};
