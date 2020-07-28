import data_api from '../api';
import {
  FETCH_FILES,
  FETCH_DATA,
  FETCH_STEPS,
  SUBMITTING_ANSWERS,
  SUBMITTED_ANSWERS,
  SERVER_STATUS,
  GETTING_CONFIG,
  GOT_CONFIG,
  GENERATING_EXCEL,
  GENERATED_EXCEL,
} from './types';
// import history from '../history';

//Can add more actions etc in this folder if required
// this exports all the auth action creators and thunks

// export * from './auth';
// export * from './firestoreActions';

export const checkServer = () => async (dispatch) => {
  const response = await data_api.get('/api/check');
  console.log(response);

  dispatch({ type: SERVER_STATUS, payload: response.data });
};

export const requestConfig = () => {
  return {
    type: GETTING_CONFIG,
  };
};
export const getConfig = () => async (dispatch) => {
  dispatch(requestConfig());
  const response = await data_api.get('/api/get_config');
  console.log(response);
  dispatch({ type: GOT_CONFIG, payload: response.data });
};

export const setConfig = (new_config) => async (dispatch) => {
  const response = await data_api.post(
    `/api/change_config/?config=${new_config}`
  );
  console.log(response);
  dispatch({ type: GOT_CONFIG, payload: response.data });
  dispatch(getConfig());
};

export const fetchFiles = () => async (dispatch) => {
  //   console.log('fetch files called!');
  const response = await data_api.get('/api/files');
  //   console.log(response);

  dispatch({ type: FETCH_FILES, payload: response.data });
};

export const fetchData = (file_name) => async (dispatch) => {
  const response = await data_api.get(
    `/api/select_file/?file_name=${file_name}`
  );

  dispatch({ type: FETCH_DATA, payload: response.data });
};

export const fetchListOfSteps = (file_name, restart) => async (dispatch) => {
  console.log('getting files');
  const response = await data_api.get(
    `/api/file_steps/?file_name=${file_name}&restart=${restart}`
  );
  console.log(response);
  dispatch({ type: FETCH_STEPS, payload: response.data });
};

export const requestSubmitAnswers = () => {
  return {
    type: SUBMITTING_ANSWERS,
  };
};

export const generateExcel = (file_name) => async (dispatch) => {
  console.log('generating excel!');
  dispatch({ type: GENERATING_EXCEL });
  const response = await data_api.get(
    `/api/generate_excel/?file_name=${file_name}`
  );
  if ((response.data = 'Success')) {
    dispatch({ type: GENERATED_EXCEL, payload: 'Success!' });
  } else {
    dispatch({ type: GENERATED_EXCEL, payload: 'Something went wrong!' });
  }
};

export const submitAnswers = (
  file_name,
  year,
  exchangeID,
  answers,
  reviewFlag = false
) => async (dispatch) => {
  // console.log(file_name);
  // console.log(exchangeID);
  // console.log(answers);
  // console.log(reviewFlag);
  // console.log(typeof reviewFlag);
  // console.log('Review flag = ' + toString(reviewFlag));
  dispatch(requestSubmitAnswers());
  const response = await data_api.post(
    `/api/update_record/?file_name=${file_name}&year=${year}&exchangeID=${exchangeID}&answers=${answers}&reviewFlag=${reviewFlag}`
  );
  dispatch({ type: SUBMITTED_ANSWERS, payload: response.data });
  if (response.data === 'Success') {
    console.log('success!');
    dispatch(fetchListOfSteps(file_name, false));
  }
};
