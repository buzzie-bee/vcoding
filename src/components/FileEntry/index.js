import React from 'react';
import { connect } from 'react-redux';

import { Button, Card, Container, Divider, Header } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
import { fetchData, fetchListOfSteps, submitAnswers } from '../../actions';
import Steps from './Steps';
import RecordDisplay from './RecordDisplay';
import ButtonArray from './ButtonArray';

import * as ROUTES from './../../constants/routes';
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
    if (this.props.match.params.stepId) {
      exchangeID = this.props.match.params.stepId;
    } else if (this.props.steps) {
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

    try {
      if (this.props.steps) {
        // console.log('step passed');
        // console.log(this.props.steps);
        if (this.props.data) {
          // console.log(this.props.data);
          if (this.state.currentExchangeId) {
            const file_name = this.props.data.file_name;
            const step = [
              this.props.steps.all_steps_info[this.state.currentExchangeId]
                .year,
              this.state.currentExchangeId,
            ];
            const data = this.props.data;
            return (
              <RecordDisplay file_name={file_name} step={step} data={data} />
            );
          } else {
            return 'Loading - no current exchange';
          }
        } else {
          return 'Loading - no data';
        }
      } else {
        return 'Loading - no steps';
      }
    } catch (error) {
      return 'loading - error in file display generator';
    }
  }
  handleStepChange = (newStep) => {
    // console.log(newStep);
    this.setState({ currentStep: newStep });
  };

  handleQuestionSelection = (question, answer_description, answer_id) => {
    let { maxStep, currentStep, answers } = this.state;

    console.log(this.state);
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
    const year = this.state.exchangeYear;
    const exchangeID = this.state.currentExchangeId;
    const answers = JSON.stringify(this.state.answers);
    this.props.submitAnswers(file_name, year, exchangeID, answers);
    const stepsList = this.props.steps.all_steps_list;
    const currentExchangePosition = stepsList.findIndex(
      (element) => element === exchangeID
    );
    if (currentExchangePosition === stepsList.length) {
      history.push(`${ROUTES.FILEENTRYRAW}${file_name}`);
    } else {
      const nextStepId = stepsList[currentExchangePosition + 1];
      history.push(`${ROUTES.FILEENTRYRAW}${file_name}/${nextStepId}`);
    }

    // if (!this.props.steps.next_step) {
    //   history.push('/files/all');
    // }
  };

  handleRecordChange = () => {
    try {
      if (this.props.steps) {
        // console.log(this.props.steps);
        // if (this.props.steps.next_step) {
        if (this.props.data) {
          console.log(this.props.steps);
          let centralExchangeID;
          let answers;
          let exchangeYear;
          if (this.props.match.params.stepId) {
            centralExchangeID = this.props.match.params.stepId;
            exchangeYear = this.props.steps.all_steps_info[centralExchangeID]
              .year;
          } else {
            centralExchangeID = this.props.steps.next_step[1];
            exchangeYear = this.props.steps.next_step[0];
          }
          let currentStepInfo;
          try {
            currentStepInfo = [
              this.props.steps.all_steps_info[this.state.currentExchangeId]
                .year,
              this.state.currentExchangeId,
            ];
          } catch (e) {
            currentStepInfo = ['', ''];
          }
          try {
            answers = this.props.data.file_data[
              this.props.steps.all_steps_info[centralExchangeID].year
            ].records[centralExchangeID].answers;
          } catch (e) {
            answers = {};
          }
          let newState = {};
          console.log(this.state);
          if (this.state.currentExchangeId === null) {
            this.setState({
              currentExchangeId: centralExchangeID,
              exchangeYear: exchangeYear,
            });
            // console.log('state doesnt match');
          } else if (this.state.currentExchangeId !== centralExchangeID) {
            // console.log('resetting state!');
            console.log(centralExchangeID.length);
            let answers;
            if (centralExchangeID) {
              let recordAnswers = (answers = this.props.data.file_data[
                this.props.steps.all_steps_info[centralExchangeID].year
              ].records[centralExchangeID].answers);
              if (recordAnswers) {
                answers = recordAnswers;
              } else {
                answers = {};
              }

              console.log(answers);
            } else {
              answers = {};
            }

            newState = {
              currentExchangeId: centralExchangeID,
              currentStepInfo: currentStepInfo,
              currentStep: 0,
              maxStep: 0,
              endStep: 10,
              answers: answers,
            };
            this.setState(newState);
            console.log(this.state);
          } else if (this.state.answers !== answers) {
            if (Object.keys(answers).length > 1) {
              if (this.state.maxStep === 0) {
                console.log(this.state.answers);
                console.log(answers);
                console.log(this.state.answers !== answers);
                this.setState({ answers, maxStep: 10 });
              }
            }
          }
        }
      }
    } catch (error) {
      return 'error';
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
        // Wrap this all in an if statement checking if we have the current step in state (also set that there), render loading otherwise
        let file_name;
        let year;
        let exchangeID;

        if (this.props.steps.next_step) {
          file_name = this.props.data.file_name;
          year = this.state.exchangeYear;
          exchangeID = this.state.currentExchangeId;
        } else {
          file_name = '';
          year = '';
          exchangeID = '';
        }

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
    console.log(this.state);
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
