import React from 'react';
import { connect } from 'react-redux';

import { Button, Card, Container, Divider, Header } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
import { fetchData, fetchListOfSteps, submitAnswers } from '../../actions';
import Steps from './Steps';
import RecordDisplay from './RecordDisplay';
import ButtonArray from './ButtonArray';

import history from './../../history';

class FileEntry extends React.Component {
  state = {
    currentExchangeId: null,
    currentStep: 0,
    maxStep: 0,
    endStep: 10,
    answers: {},
  };
  componentDidMount() {
    // console.log('calling fetch data');
    this.props.fetchData(this.props.match.params.fileName);
    // console.log('calling fetch list of steps');
    this.props.fetchListOfSteps(this.props.match.params.fileName, false);
  }

  headerGenerator() {
    let file_name = '';
    let exchangeID = '';
    if (this.props.data) {
      file_name = this.props.data.file_name;
    }
    if (this.props.steps) {
      if (this.props.steps.next_step) {
        exchangeID = this.props.steps.next_step[1];
      }
    }

    return (
      <Header as='h2'>
        Data
        <Header.Subheader>{file_name}</Header.Subheader>
        <Header.Subheader>{exchangeID}</Header.Subheader>
      </Header>
    );
  }

  fileDisplayGenerator() {
    // console.log('generator called');
    if (this.props.steps) {
      // console.log('step passed');
      // console.log(this.props.steps);
      if (this.props.data) {
        // console.log(this.props.data);
        return (
          <RecordDisplay
            file_name={this.props.data.file_name}
            step={this.props.steps.next_step}
            data={this.props.data}
          />
        );
      } else {
        return 'Loading';
      }
    } else {
      return 'Loading';
    }
  }
  handleStepChange = (newStep) => {
    // console.log(newStep);
    this.setState({ currentStep: newStep });
  };

  handleQuestionSelection = (question, answer_description, answer_id) => {
    let { maxStep, currentStep, answers } = this.state;

    answers[question] = [answer_description, answer_id];

    const newStep = currentStep + 1;
    if (newStep > maxStep) {
      maxStep = newStep;
    }
    this.setState({ currentStep: newStep, maxStep: maxStep, answers: answers });
  };

  handleInputField = (questionId, values) => {
    console.log({ questionId: values });
    console.log(this.state.answers);
    const updatedAnswers = Object.assign({}, this.state.answers);
    updatedAnswers[questionId] = [values, 999];
    this.setState({ answers: updatedAnswers });
  };

  generateButtons() {
    if (this.state.currentStep <= this.state.endStep)
      return (
        <ButtonArray
          currentStep={this.state.currentStep}
          answers={this.state.answers}
          handleQuestionSelection={this.handleQuestionSelection}
          handleInputField={this.handleInputField}
        />
      );
  }

  submitAnswers = () => {
    const file_name = this.props.data.file_name;
    const year = this.props.steps.next_step[0];
    const exchangeID = this.props.steps.next_step[1];
    const answers = JSON.stringify(this.state.answers);
    this.props.submitAnswers(file_name, year, exchangeID, answers);
    if (!this.props.steps.next_step) {
      history.push('/files/all');
    }
  };

  handleRecordChange = () => {
    if (this.props.steps) {
      // console.log(this.props.steps);
      if (this.props.steps.next_step) {
        // console.log(this.props.steps);
        let centralExchangeID;
        if (this.props.match.params.stepId) {
          centralExchangeID = this.props.match.params.stepId;
        } else {
          centralExchangeID = this.props.steps.next_step[1];
        }

        if (this.state.currentExchangeId === null) {
          this.setState({ currentExchangeId: centralExchangeID });
          // console.log('state doesnt match');
        } else if (this.state.currentExchangeId !== centralExchangeID) {
          // console.log('resetting state!');
          this.setState(
            {
              currentExchangeId: centralExchangeID,
              currentStep: 0,
              maxStep: 0,
              endStep: 10,
              answers: {},
            }
            // console.log(this.state)
          );
        }
      }
    }
  };

  generateSubmit() {
    if (this.state.currentStep === this.state.endStep + 1) {
      const isLoading = this.props.submitting;
      // console.log(isLoading);
      return (
        <Card.Group centered>
          <Card>
            <Card.Content>
              <Card.Header>Record completed</Card.Header>
              <Card.Description>
                Would you like to submit this record and proceed?{' '}
              </Card.Description>
              <Card.Description>
                <strong>
                  Click on a step to go back if you need to make changes. It
                  will be difficult to do this afterwards.
                </strong>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button
                  loading={isLoading}
                  fluid
                  color='green'
                  onClick={this.submitAnswers}
                >
                  Submit
                </Button>
              </div>
            </Card.Content>
          </Card>
        </Card.Group>
      );
    }
  }
  generateFlagForReview() {
    if ('file_data' in this.props.data) {
      if (this.props.steps) {
        const file_name = this.props.data.file_name;
        const year = this.props.steps.next_step[0];
        const exchangeID = this.props.steps.next_step[1];
        // const answers = this.state.answers;
        return (
          <Button
            color='red'
            onClick={() => {
              console.log('flagging for review!');
              this.props.submitAnswers(
                file_name,
                year,
                exchangeID,
                JSON.stringify({}),
                true
              );
            }}
          >
            Flag for review
          </Button>
        );
      }
    }
  }
  render() {
    this.handleRecordChange();
    return (
      <Container>
        {this.headerGenerator()}

        {this.fileDisplayGenerator()}
        <br />
        <Divider />
        <Steps
          currentStep={this.state.currentStep}
          maxStep={this.state.maxStep}
          handleStepChange={this.handleStepChange}
        />
        <br />
        {this.generateButtons()}
        {this.generateSubmit()}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {this.generateFlagForReview()}
        <br />
        <br />
        <br />
        <br />
        <br />
      </Container>
    );
  }
}

// data: Object.values(state.dataReducer.data),
const mapStateToProps = (state) => {
  return {
    data: state.dataReducer.data,
    steps: state.dataReducer.steps,
    submitting: state.dataReducer.submitting,
    submitted: state.dataReducer.submitted,
  };
};

export default connect(mapStateToProps, {
  fetchData,
  fetchListOfSteps,
  submitAnswers,
})(FileEntry);
