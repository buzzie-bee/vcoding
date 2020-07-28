import React from 'react';

import { Container, Responsive, Step } from 'semantic-ui-react';

class Steps extends React.Component {
  // state = { currentStep: this.props.currentStep };

  stepTileGenerator() {
    const steps_array = [
      'CMA',
      'Client',
      'DClient',
      'ForThird',
      'Consumer',
      'CoOrigin',
      'AgentID',
      'OpOrigin',
      'Task',
      'AgentSt',
      'OwnSt',
    ];

    const stepTiles = steps_array.map((step_description, index) => {
      // console.log(this.props);
      const is_active_step = this.props.currentStep === index;

      let is_disabled = this.props.maxStep < index;
      // if (index === 0) {
      //   is_disabled = true;
      // }
      const is_completed = this.props.maxStep > index;
      return (
        <Step
          active={is_active_step}
          disabled={is_disabled}
          completed={is_completed}
          onClick={() => {
            this.props.handleStepChange(index);
          }}
        >
          <Step.Content key={step_description + 'index'}>
            <Step.Title as='p'>{step_description}</Step.Title>
          </Step.Content>
        </Step>
      );
    });
    return stepTiles;
  }
  stepTilesLayout() {
    return (
      <Container textAlign='center'>
        <Step.Group size='mini'>{this.stepTileGenerator()}</Step.Group>
      </Container>
    );
  }

  stepCount() {
    return <div>Steps not displayed due to low screen width.</div>;
  }

  render() {
    return (
      <>
        <Responsive minWidth={990}>{this.stepTilesLayout()}</Responsive>
        <Responsive maxWidth={950}>{this.stepCount()}</Responsive>
      </>
    );
  }
}

export default Steps;
