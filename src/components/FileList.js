import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Button,
  Container,
  List,
  Header,
  Progress,
  Segment,
} from 'semantic-ui-react';
import * as ROUTES from '../constants/routes';
import { fetchFiles, generateExcel } from '../actions';

class FileList extends React.Component {
  componentDidMount() {
    this.props.fetchFiles();
  }

  progressBarGenerator(total, completed) {
    if (completed / total < 0.1) {
      return (
        <Progress
          autoSuccess
          percent={10}
          value={completed}
          total={total}
          progress='ratio'
          size='medium'
        />
      );
    } else {
      return (
        <Progress
          autoSuccess
          value={completed}
          total={total}
          progress='ratio'
          size='medium'
        />
      );
    }
  }

  totalProgressGenerator() {
    let total = 0;
    let completed = 0;
    if (this.props.files) {
      this.props.files.forEach((file) => {
        total += file.total;
        completed += file.completed;
      });
      if (completed / total < 0.1) {
        return (
          <Progress
            autoSuccess
            percent={10}
            value={completed}
            total={total}
            progress='ratio'
            size='medium'
          />
        );
      } else {
        return (
          <Progress
            autoSuccess
            value={completed}
            total={total}
            progress='ratio'
            size='medium'
          />
        );
      }
    } else {
      return <div> Loading </div>;
    }
  }

  generateButtons(fileName, completed) {
    if (completed) {
      return (
        <>
          <Button
            color='blue'
            size='large'
            onClick={() => {
              this.props.generateExcel(fileName);
            }}
          >
            Generate Excel
          </Button>
          <Button
            as={Link}
            to={`${ROUTES.FILEDISPLAYRAW}${fileName}`}
            color='teal'
            size='large'
          >
            Edit
          </Button>
        </>
      );
    } else {
      return (
        <Button
          as={Link}
          to={`${ROUTES.FILEDISPLAYRAW}${fileName}`}
          color='teal'
          size='large'
        >
          Edit
        </Button>
      );
    }
  }

  generateFileList() {
    if (this.props.files) {
      return this.props.files.map((file) => {
        const completed = file.total === file.completed ? true : false;
        return (
          <List.Item key={file.name}>
            <List.Content floated='right'>
              {this.generateButtons(file.file_name, completed)}
            </List.Content>
            <List.Content>
              <List.Header>{file.file_name}</List.Header>
              <br />
              <br />
              {this.progressBarGenerator(file.total, file.completed)}
            </List.Content>
          </List.Item>
        );
      });
    } else {
      return <div>LOADING</div>;
    }
  }

  render() {
    console.log(this.props.files);
    return (
      <Container>
        <br />
        <Header as='h2'>File List</Header>
        <br />
        <Segment>
          <Header as='h4'> Current progress</Header>
          {this.totalProgressGenerator()}
        </Segment>
        <br />
        <List celled relaxed>
          {this.generateFileList()}
        </List>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    files: Object.values(state.dataReducer.files),
  };
};

export default connect(mapStateToProps, { fetchFiles, generateExcel })(
  FileList
);
