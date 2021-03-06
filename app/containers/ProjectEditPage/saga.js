/**
 * Gets the repositories of the user from Github
 */

import { put, takeLatest, call, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from 'utils/request';
import {loadProject, signupSuccess, requestError} from "./actions";
import {SESSIONID, USERID, HOST} from "../App/constants";
import {GET_PROJECT, SAVE_PROJECT, ADD_USER} from "./constants";
import {makeSelectDescription, makeSelectName, makeSelectUser} from './selectors';
import {loadProjects} from "../ProjectsList/actions";

export function* getProject(action) {
  const requestURL = HOST+`1338`;
  const sessionID = localStorage.getItem(SESSIONID);
  const userID = localStorage.getItem(USERID);
  const pID = action.id;
  const requestData = {
    session: {
      id: sessionID,
      user: userID
    },
    project:{
    	id: pID
    }
  };
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, "POST", requestData);
    if (response.code == 0) {
        yield put(loadProject(response.data));
    }
  } catch (err) {
    console.log(err)
  }

  return null;
}

export function* saveProjectSaga(action) {
  const requestURL = HOST+`1338`;
  const sessionID = localStorage.getItem(SESSIONID);
  const userID = localStorage.getItem(USERID);
  const pID = action.id;
  const requestData = {
    session: {
      id: sessionID,
      user: userID
    },
    project:{
      id: pID,
      name: yield select(makeSelectName()),
      description: yield select(makeSelectDescription())
    }
  };
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, "PATCH", requestData);
    if (response.code == 0) {
      yield getProjects();
    }
  } catch (err) {
        console.log(err)
  }
  return null;
}

export function* getProjects() {
  const requestURL = HOST+`1338`;
  const sessionID = localStorage.getItem(SESSIONID);
  const userID = localStorage.getItem(USERID);
  const requestData = {
    session: {
      id: sessionID,
      user: userID
    }
  };
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, "POST", requestData);
    if (response.code == 0) {
      yield put(loadProjects(response.data));
    }
  } catch (err) {
      console.log(err)
  }
  return null;
}

export function* addUserSaga(action) {
  const requestURL = HOST+`1338`;
  const sessionID = localStorage.getItem(SESSIONID);
  const userID = localStorage.getItem(USERID);
  const email = yield select(makeSelectUser());
  console.log(email);
  const pID = action.id;
  const requestData = {
    session: {
      id: sessionID,
      user: userID,
    },
    project:{
      id:pID,
      users:[
      email
      ]
    }

  };
  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, "PATCH", requestData);
    if (response.code == 0) {
        yield put(signupSuccess(response));
    }
    else
    {
      var error = REQUEST_RESPONSES[response.code];
       console.log(error);
       yield put(requestError(error));
    }
  } catch (err) {
      console.log(err)
  }
  return null;
}

//Watcheris
export default function* checkLoginState() {
  const sessionID = localStorage.getItem(SESSIONID);
  if(sessionID == null)
  {
       yield put(push('/'));
  }
  yield takeLatest(GET_PROJECT, getProject);
  yield takeLatest(SAVE_PROJECT, saveProjectSaga);
  yield takeLatest(ADD_USER, addUserSaga);
}
