// import _ from 'lodash';

import {
  FETCH_DATA,
  FETCH_FILES,
  FETCH_STEPS,
  SUBMITTING_ANSWERS,
  SUBMITTED_ANSWERS,
  SERVER_STATUS,
  GETTING_CONFIG,
  GOT_CONFIG,
  UPDATING_CONFIG,
  UPDATED_CONFIG,
  GENERATING_EXCEL,
  GENERATED_EXCEL,
} from '../actions/types';

export default (
  state = {
    files: {},
    steps: {},
    data: {},
    // submitting: false,
    // submitted: true,
    //
  },
  action
) => {
  switch (action.type) {
    case GETTING_CONFIG:
      return { ...state, gettingConfig: true, gotConfig: false, config: {} };

    case GOT_CONFIG:
      return {
        ...state,
        gettingConfig: false,
        gotConfig: true,
        config: action.payload,
      };

    case UPDATING_CONFIG:
      return { ...state, settingConfig: true, setConfig: false };

    case UPDATED_CONFIG:
      return { ...state, settingConfig: false, setConfig: true };

    case SERVER_STATUS:
      return { ...state, serverResponse: action.payload };

    case FETCH_DATA:
      return { ...state, data: action.payload };

    case FETCH_FILES:
      // console.log('fetch files reducer called!');
      // console.log(action.payload);
      return { ...state, files: action.payload };

    case FETCH_STEPS:
      // console.log('fetch files reducer called!');
      // console.log(action.payload);
      return { ...state, steps: action.payload };

    case SUBMITTING_ANSWERS:
      // console.log('fetch files reducer called!');
      // console.log(action.payload);
      return { ...state, submitting: true, submitted: false };

    case GENERATING_EXCEL:
      return { ...state, generatingExcel: true, generatingExcelError: false };
    case GENERATED_EXCEL:
      return {
        ...state,
        generatingExcel: false,
        generatingExcelStatus: action.payload,
      };

    case SUBMITTED_ANSWERS:
      // console.log('fetch files reducer called!');
      // console.log(action.payload);
      return {
        ...state,
        submitting: false,
        submitted: true,
        submitStatus: action.payload,
      };

    default:
      return state;
  }
};
