import React from 'react';
import { connect } from 'react-redux';

import {
  Button,
  Container,
  Divider,
  Header,
  Popup,
  Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchData, fetchListOfSteps } from '../actions';
import ProgressBar from './ProgressBar';
import * as ROUTES from '../constants/routes';

class FileDisplay extends React.Component {
  componentDidMount() {
    this.props.fetchData(this.props.match.params.fileName);
    this.props.fetchListOfSteps(this.props.match.params.fileName, false);
  }

  generateNextRecord() {
    let nextRecord = null;
    let data = null;

    if (this.props.steps) {
      nextRecord = this.props.steps.next_step;
    }
    if (this.props.data) {
      data = this.props.data;
    }

    // console.log(this.props.data);
    // console.log(this.props.data);
    if (data) {
      if (nextRecord) {
        // console.log('nextRecord loaded!');
        let year = nextRecord[0];
        let conflictID = nextRecord[1];
        if (!year) {
          year = 'Year not found';
        }
        if (!conflictID) {
          conflictID = 'Conflict ID not found';
        }
        return (
          <Segment stacked>
            <Header as='h2'>Next record to be processed</Header>
            <Header as='h6'>Year</Header>
            <Header.Subheader>{year}</Header.Subheader>
            <Header as='h6'>Conflict ID</Header>
            <Header.Subheader>{conflictID}</Header.Subheader>

            <Segment basic>
              <Divider />
              <Header as='h6' textAlign='center'>
                Progress
              </Header>
              <ProgressBar
                total={this.props.data.total}
                completed={this.props.data.completed}
              />
            </Segment>
            <Segment textAlign='right' color='red'>
              <Header as='h6' textAlign='center'>
                Enter Editor for this record
              </Header>
              <Popup
                content='Not implemented yet'
                on='click'
                pinned
                trigger={<Button content='Restart' />}
              />
              <Button
                as={Link}
                to={`${ROUTES.FILEENTRYRAW}${this.props.match.params.fileName}`}
                color='teal'
                size='large'
              >
                Begin
              </Button>
            </Segment>
          </Segment>
        );
      }
    }
  }

  render() {
    return (
      <Container>
        <Header as='h2'>Data</Header>
        {/* <List celled relaxed></List> */}
        {this.generateNextRecord()}
      </Container>
    );
  }
}

// data: Object.values(state.dataReducer.data),
const mapStateToProps = (state) => {
  return {
    data: state.dataReducer.data,
    steps: state.dataReducer.steps,
  };
};

export default connect(mapStateToProps, { fetchData, fetchListOfSteps })(
  FileDisplay
);
