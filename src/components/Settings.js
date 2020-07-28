import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Input,
  Message,
  Segment,
} from 'semantic-ui-react';

import { getConfig, setConfig } from '../actions';
// import FileList from './FileList';
// import unsplash from "../api/unsplash";
// import SearchBar from "./SearchBar";
// import ImageList from "./ImageList";

class Settings extends React.Component {
  state = {
    timeout: false,
    excel_path: '',
    destination_path: '',
    emptyError: false,
  };

  componentDidMount() {
    this.props.getConfig().then(() => {
      this.setState({
        excel_path: this.props.config.excel_path,
        destination_path: this.props.config.destination_path,
        emptyError: false,
      });
    });
    this.interval = setTimeout(() => {
      this.setState({ timeout: true });
    }, 5000);
  }

  submitNewConfig(parameter) {
    const config = this.props.config;
    const epath = this.state.excel_path;
    const dpath = this.state.destination_path;

    try {
      if (epath.length < 3) {
        throw new Error('No excel path');
      }
      if (dpath.length < 3) {
        throw new Error('No destination path');
      }
      config['excel_path'] = epath.endsWith('\\') ? epath : epath + '\\';
      config['destination_path'] = dpath.endsWith('\\') ? dpath : dpath + '\\';
      this.props.setConfig(JSON.stringify(config));
      setTimeout(() => {
        this.props.getConfig().then(() => {
          this.setState({
            excel_path: this.props.config.excel_path,
            destination_path: this.props.config.destination_path,
            emptyError: false,
          });
        });
      }, 1000);
    } catch (error) {
      this.setState({ emptyError: true });
    }
  }

  displayError = () => {
    console.log(this.state);
    if (this.state.emptyError) {
      return (
        <Message size='large' negative>
          <Message.Header>
            <strong>ERROR! </strong> Missing fields!
          </Message.Header>
          <p>
            A config <strong>must</strong> include both an excel_path and a
            destination_path before being saved!
          </p>
        </Message>
      );
    } else {
      return <></>;
    }
  };

  configDisplay() {
    if (this.props.config) {
      return (
        <Container basic>
          <Container>
            <Header as='h4'>Folder to monitor:</Header>
            <Input
              name='excel_path'
              fluid
              placeholder='Folder path needed'
              value={this.state.excel_path}
              onChange={(e, data) => {
                this.setState({ excel_path: data.value });
              }}
            />
            <br />
          </Container>
          <Divider />
          <Container>
            <Header as='h4'>Folder to save generated CMA files:</Header>
            <Input
              name='destination_path'
              fluid
              placeholder='Destination folder path needed'
              value={this.state.destination_path}
              onChange={(e, data) => {
                this.setState({ destination_path: data.value });
              }}
            />
            <br />

            <Button.Group>
              <Button
                onClick={() => {
                  this.setState({
                    destination_path: this.props.config.excel_path,
                  });
                }}
              >
                Cancel
              </Button>
              <Button.Or />
              <Button
                positive
                onClick={() => {
                  this.submitNewConfig('destination_path');
                }}
              >
                Save Changes
              </Button>
            </Button.Group>
          </Container>
        </Container>
      );
    } else if (this.state.timeout === false) {
      return (
        <Message icon>
          <Icon name='circle notched' loading />
          <Message.Content>
            <Message.Header>Loading config file</Message.Header>
            Attempting to connect to server and download config file
          </Message.Content>
        </Message>
      );
    } else {
      return (
        <Message size='large' negative>
          <Message.Header>
            <strong>ERROR! </strong> Could not load config. Attempt to connect
            to flask server failed.
          </Message.Header>
          <p>Try rebooting the server. If it fails contact Tom.</p>
        </Message>
      );
    }
  }

  render() {
    console.log(this.props);
    return (
      <Container>
        <br />
        <Header as='h2'>Settings</Header>
        <br />
        {this.displayError()}
        <Segment>{this.configDisplay()}</Segment>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gettingConfig: state.dataReducer.gettingConfig,
    gotConfig: state.dataReducer.gotConfig,
    config: state.dataReducer.config,
    settingConfig: state.dataReducer.settingConfig,
    setConfig: state.dataReducer.setConfig,
  };
};

export default connect(mapStateToProps, { getConfig, setConfig })(Settings);
