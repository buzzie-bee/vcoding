import React from 'react';

import { Container, Table } from 'semantic-ui-react';

class RecordDisplay extends React.Component {
  renderRecordDisplay() {
    let recordData = null;

    if ('file_data' in this.props.data) {
      // console.log('there is data');
      if (this.props.step) {
        recordData = this.props.data.file_data[this.props.step[0]].records[
          this.props.step[1]
        ];
        // console.log(recordData);
        return (
          <Table definition compact='very' size='small' striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>Information</Table.HeaderCell>
                {/* <Table.HeaderCell>Code</Table.HeaderCell>
              <Table.HeaderCell width='1'>Source</Table.HeaderCell> */}
              </Table.Row>
            </Table.Header>
            <Table.Body>{this.generateTableRows(recordData)}</Table.Body>
          </Table>
        );
        //   for (const dataPoint in recordData) {
        //     console.log(dataPoint);
        //   }
      }
    }
  }

  check_not_empty(data_array) {
    let not_empty = false;
    data_array.forEach((datapoint) => {
      if (datapoint) {
        if (datapoint.length > 0) {
          if (datapoint[0] !== '/') {
            not_empty = true;
          }
        }
      }
    });
    return not_empty;
  }

  generateTableRows(recordData) {
    const record_keys = Object.keys(recordData);
    const table_rows = record_keys.map((key) => {
      const information = recordData[key]['Information'];
      const code = recordData[key]['Code'];
      const source = recordData[key]['Source'];
      if (this.check_not_empty([information, code, source])) {
        return (
          <Table.Row key={key}>
            <Table.Cell>{key}</Table.Cell>
            <Table.Cell>{information}</Table.Cell>
            {/* <Table.Cell>{code}</Table.Cell>
            <Table.Cell width='1'>{source}</Table.Cell> */}
          </Table.Row>
        );
      } else {
        return <></>;
      }
    });
    return table_rows;
  }

  render() {
    return (
      <Container textAlign='center'>{this.renderRecordDisplay()}</Container>
    );
  }
}

export default RecordDisplay;
