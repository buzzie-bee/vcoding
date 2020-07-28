import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

import history from '../history';
import FileList from './FileList';
import FileDisplay from './FileDisplay';
import FileEntry from './FileEntry';
import HomePage from './HomePage';
import Settings from './Settings';
import HeaderMenu from './HeaderMenu';
// import unsplash from "../api/unsplash";
// import SearchBar from "./SearchBar";
// import ImageList from "./ImageList";

class App extends React.Component {
  state = { images: [] };

  //   onSearchSubmit = async term => {
  //     const response = await unsplash.get("/search/photos", {
  //       params: { query: term, per_page: 100 }
  //     });
  //     this.setState({ images: response.data.results });
  //   };

  render() {
    return (
      <Router history={history}>
        <HeaderMenu currentPath={history.location.pathname} />
        <Switch>
          <Route path={ROUTES.HOMEPAGE} exact component={HomePage} />
          {/* <Fragment> */}
          <Route path={ROUTES.FILEDISPLAY} exact component={FileDisplay} />
          <Route path={ROUTES.FILEENTRY} component={FileEntry} />
          <Route path={ROUTES.SETTINGS} component={Settings} />
          <Route path={ROUTES.FILELIST} exact component={FileList} />
          {/* <Route path={ROUTES.} component={} /> */}
          {/* </Fragment> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
