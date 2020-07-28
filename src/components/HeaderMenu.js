import React from 'react';
import { Link } from 'react-router-dom';

import { Menu, Segment } from 'semantic-ui-react';

import * as ROUTES from '../constants/routes';
import history from '../history';

class HeaderMenu extends React.Component {
  state = { active: '', currentPage: '/' };

  componentDidMount() {
    const currentPath = history.location.pathname;
    if (!this.state.active) {
      this.setState({ active: currentPath });
    }
  }
  handleClick = (e, { name }) => {
    this.setState({ active: name });
  };

  checkActiveMatchesPath() {
    const currentPath = history.location.pathname;
    if (this.state.active) {
      if (
        currentPath === '/' &&
        currentPath.length === 1 &&
        this.state.active !== '/homepage'
      ) {
        this.setState({ active: '/homepage' });
      } else if (currentPath !== this.state.active && currentPath !== '/') {
        this.setState({ active: currentPath });
      } else {
        return;
      }
    }
  }

  render() {
    const { active } = this.state;
    this.checkActiveMatchesPath();

    return (
      <Segment color='red' basic>
        <Menu secondary pointing>
          <Menu.Item
            as={Link}
            to={ROUTES.HOMEPAGE}
            active={active === '/homepage'}
            content='Home'
            name='/homepage'
            onClick={this.handleClick}
          />
          <Menu.Item
            as={Link}
            to={ROUTES.FILELIST}
            active={active === '/files/all'}
            content='Files'
            name='/files/all'
            onClick={this.handleClick}
          />
          <Menu.Item
            as={Link}
            to={ROUTES.SETTINGS}
            active={active === '/settings'}
            content='Settings'
            name='/settings'
            onClick={this.handleClick}
          />
        </Menu>
      </Segment>
    );
  }
}

export default HeaderMenu;
