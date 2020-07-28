import React from 'react';
import { connect } from 'react-redux';

import { Container, Header, Icon, Message, Segment } from 'semantic-ui-react';

import { checkServer } from '../actions';

class Homepage extends React.Component {
  state = { timeout: false };

  componentDidMount() {
    this.interval = setTimeout(() => {
      this.setState({ timeout: true });
    }, 5000);
  }

  serverStatus() {
    if (this.props.serverResponse) {
      return (
        <Message positive>
          <Message.Header>Connected to Server!</Message.Header>
          <p>
            The server is running healthily. Refresh this homepage to check
            again if you have any issues.
          </p>
        </Message>
      );
    } else if (this.state.timeout === false) {
      return (
        <Message icon>
          <Icon name='circle notched' loading />
          <Message.Content>
            <Message.Header>Connecting to Server</Message.Header>
            Attempting to connect to server
          </Message.Content>
        </Message>
      );
    } else {
      return (
        <Message size='large' negative>
          <Message.Header>
            <strong>ERROR! </strong> Attempt to connect to flask server failed.
          </Message.Header>
          <p>Try rebooting the server. If it fails contact Tom.</p>
        </Message>
      );
    }
  }
  render() {
    this.props.checkServer();
    // console.log(this.props.serverResponse);
    return (
      <Container text>
        {/* <br />
        <Header as='h2'>Hello!</Header>
        <br /> */}
        <Segment>
          <Container>
            <Header>Welcome to the data entry wizard!</Header>
            <Header as='h5'>How to start</Header>
            <br />
            <p>Ensure the server is active with the Server Status below.</p>
            <br />
            <p>
              Head to settings and make sure the 'Folder to monitor' path is
              correct. If it isn't then copy and paste the folder path from
              Windows Explorer into the text entrybox and submit it.
            </p>
            <br />
            <p>
              Once you have selected a folder, and populated it with the correct
              data entry text files, head to the 'Files' page of this wizard.
            </p>
            <br />
            <p>
              The files page will show all the files available to be processed,
              as well as how far into the file you are.
            </p>
            <br />
            <p>
              Select a file to get started. You can choose to 'Begin' editting
              the next uncompleted exchange record, or you can choose 'restart'
              to begin from scratch.
            </p>
            <br />
            <p>
              If you choose to restart, make a copy of the '.json' file you are
              about to overwrite and paste it somewhere else, just in case.
            </p>
            <br />
            <p>Good luck and have Fun!</p>
            <br />
            <p>Any issues contact Tom.</p>
          </Container>
          <Segment>
            <Header as='h4'>Server Status</Header>
            {this.serverStatus()}
          </Segment>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    serverResponse: state.dataReducer.serverResponse,
  };
};

export default connect(mapStateToProps, { checkServer })(Homepage);
