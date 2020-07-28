import React from 'react';

import {
  Card,
  Container,
  Divider,
  Header,
  Input,
  Segment,
} from 'semantic-ui-react';

class ButtonArray extends React.Component {
  state = { questionId: null };

  componentDidMount = () => {
    if (this.props.answers) {
      const existing_state = this.state;
      let new_state = existing_state;
      for (let [key, value] of Object.entries(this.props.answers)) {
        new_state[key] = value;
      }
      console.log(new_state);
      this.setState(new_state);
    }
  };

  generateQuestions() {
    const questions = [
      {
        id: 'CMA',
        description: 'CMA',
        Present: 1,
        Absent: 0,
        Exterritorial: 2,
      },
      {
        id: 'Client',
        description: 'Client',
        'National Gov': 1,
        'Local Gov': 2,
        Opposition: 3,
        InternationalOrganization: 4,
        'Foreign Gov': 5,
        'Exterritorial Opposition': 6,
        Other: 7,
        'Not Applicable': 998,
        Unknown: 999,
      },
      {
        id: 'DClient',
        description: 'DClient',
        'Defense Ministry': 1,
        'Ministry of Foreign Affairs': 2,
        'Development Aid': 3,
        'Other Ministry': 4,
        NATO: 5,
        EU: 6,
        UN: 7,
        'AU (OAU)': 8,
        'Not applicable': 998,
        Unknown: 999,
      },
      {
        id: 'ForThird',
        description: 'For Third',
        Yes: 1,
        No: 0,
        Unknown: 999,
      },
      {
        id: 'Consumer',
        description: 'Consumer',
        'National Gov': 1,
        'Local Gov': 2,
        Opposition: 3,
        InternationalOrganization: 4,
        'Foreign Gov': 5,
        'Exterritorial Opposition': 6,
        Other: 7,
        'Not Applicable': 998,
        Unknown: 999,
      },
      {
        id: 'CoOrigin',
        description: 'CompanyOrigin',
        Europe: 1,
        'Middle East': 2,
        Asia: 3,
        Africa: 4,
        'North America': 5,
        'South America': 6,
        'Not applicable': 998,
        Unknown: 999,
      },
      {
        id: 'AgentId',
        description: 'Agent ID',
        'N/A': 998,
      },
      {
        id: 'OpOrigin',
        description: 'Operator Origin',
        Europe: 1,
        'Middle East': 2,
        Asia: 3,
        Africa: 4,
        'North America': 5,
        'South America': 6,
        Multiple: 7,
        Unknown: 999,
      },
      {
        id: 'Task',
        description: 'Task',
        'Combat operations': 1,
        'Military Consultancy': 2,
        'Military Training': 3,
        'Military Operational Support': 4,
        'Military Logistics': 5,
        Intelligence: 6,
        Security: 7,
        'Security Consultancy': 8,
        'Security Training': 9,
        'Security Logistics': 10,
        Reconstruction: 11,
        Unknown: 999,
      },
      {
        id: 'AgentSt',
        description: 'Agent Structure',
        'Individual/ Group': 1,
        'Local Company': 2,
        'International Company': 3,
        'Not applicable': 998,
        Unknown: 999,
      },
      {
        id: 'OwnSt',
        description: 'Own Structure',
        'Not-Traded Company': 1,
        'Publicly Traded Company': 2,
        'Not applicable': 998,
        Unknown: 999,
      },
    ];

    const relevantQuestions = questions[this.props.currentStep];
    // console.log(this.props.answers);
    // console.log(relevantQuestions['id']);
    if (this.state.questionId !== relevantQuestions['id']) {
      this.setState({ questionId: relevantQuestions['id'] });
    }

    // console.log(relevantQuestions);
    const questionButtons = Object.keys(relevantQuestions).map((key) => {
      let colour = 'grey';
      let is_selected = false;
      // console.log(key);
      if (this.props.answers) {
        if (this.props.answers[relevantQuestions['id']]) {
          if (this.props.answers[relevantQuestions['id']][0] === key) {
            colour = 'green';
            is_selected = true;
          }
        }
      }

      if (key !== 'id' && key !== 'description') {
        return (
          <Card
            as={Segment}
            inverted={is_selected}
            color={colour}
            onClick={() => {
              this.props.handleQuestionSelection(
                relevantQuestions['id'],
                key,
                relevantQuestions[key]
              );
            }}
          >
            <Card.Content>
              <Card.Header>{key}</Card.Header>
            </Card.Content>
          </Card>
        );
      } else {
        return <></>;
      }
    });
    return questionButtons;
  }

  renderOpCoTextinput() {
    const stepId = this.state.questionId;
    const idCode = `${stepId}Code`;
    const placeholderText = `Enter values for ${idCode}`;
    const headerText = `${idCode} entry required!`;
    let value = '';
    if (
      stepId === 'CoOrigin' ||
      stepId === 'OpOrigin' ||
      stepId === 'Client' ||
      stepId === 'Consumer' ||
      stepId === 'AgentId'
    ) {
      // console.log(this.state);
      // console.log(idCode);
      // console.log(this.props);
      // console.log(this.props.answers[idCode][0]);
      if (Array.isArray(this.props.answers[idCode])) {
        // console.log(this.state);
        value = this.props.answers[idCode][0];
        // console.log(this.props.answers[idCode]);
        // console.log(this.props.answers[idCode][0]);
      } else {
        value = this.props.answers[idCode];
      }
      return (
        <Segment key={idCode}>
          <Header as='h3'>{headerText}</Header>
          <Header.Subheader>
            Enter this before selecting the continent
          </Header.Subheader>
          <Divider />
          <Input
            name={idCode}
            fluid
            placeholder={placeholderText}
            value={value}
            onChange={(e, data) => {
              const sanitised_value = data.value
                .replace(/\n/g, '')
                .replace(/\t/g, '')
                .replace(/\r/g, '');
              this.props.handleInputField(idCode, sanitised_value);
              this.setState({ [idCode]: [sanitised_value] });
            }}
          />
        </Segment>
      );
    }
  }
  render() {
    return (
      <Container textAlign='center'>
        {this.renderOpCoTextinput()}
        <Card.Group centered>{this.generateQuestions()}</Card.Group>
      </Container>
    );
  }
}

export default ButtonArray;
