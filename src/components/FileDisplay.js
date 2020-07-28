import React from 'react';
import { connect } from 'react-redux';

import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Item,
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
    let year = null;
    let conflictID = null;
    let buttonText = 'Begin';
    let buttonDisabled = false;

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
        year = nextRecord[0];
        conflictID = nextRecord[1];
        if (!year) {
          year = 'Year not found';
        }
        if (!conflictID) {
          conflictID = 'Conflict ID not found';
        }
      }
      if (data.completed > 0 && data.completed < data.total) {
        buttonText = 'Continue';
      } else if (data.completed === data.total) {
        year = 'All records completed - no next record';
        conflictID = 'All records completed - no next record';
        buttonDisabled = true;
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
              disabled={buttonDisabled}
            >
              {buttonText}
            </Button>
          </Segment>
        </Segment>
      );
    }
  }
  generateStatusIcon(status) {
    if (status === 'completed') {
      return (
        <>
          <Icon color='green' name='check' /> Completed!
        </>
      );
    } else if (status === 'review') {
      return (
        <>
          <Icon color='red' name='exclamation' /> Flagged for Review!
        </>
      );
    } else if (status === 'not processed yet') {
      return (
        <>
          <Icon name='info circle' /> Not processed yet
        </>
      );
    }
    return '';
  }

  generateListOfExchanges() {
    if (this.props.steps.all_steps_list) {
      return this.props.steps.all_steps_list.map((exchangeId) => {
        const step = this.props.steps.all_steps_info[exchangeId];
        let status;
        if (step.reviewFlag) {
          status = 'review';
        } else if (step.processed) {
          status = 'completed';
        } else {
          status = 'not processed yet';
        }
        return (
          <Item key={exchangeId}>
            <Item.Content>
              <Item.Header>{step.conflictId}</Item.Header>
              {/* <Item.Description>
                Completed: {step.reviewFlag}
                Needs reviewing: {step.reviewFlag}
              </Item.Description> */}
              <Item.Extra>
                {this.generateStatusIcon(status)}
                <Button
                  as={Link}
                  to={`${ROUTES.FILEENTRYRAW}${this.props.match.params.fileName}/${exchangeId}`}
                  color='teal'
                  size='large'
                  floated='right'
                >
                  Edit
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        );
      });
    } else {
      return <></>;
    }
  }

  render() {
    return (
      <Container>
        <Header as='h2'>Data</Header>
        {/* <List celled relaxed></List> */}
        {this.generateNextRecord()}
        <Item.Group divided>{this.generateListOfExchanges()}</Item.Group>
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
