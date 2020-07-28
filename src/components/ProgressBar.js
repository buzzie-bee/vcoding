import React from 'react';

import { Progress } from 'semantic-ui-react';

class ProgressBar extends React.Component {
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

  render() {
    // console.log(this.props);
    return (
      <>{this.progressBarGenerator(this.props.total, this.props.completed)}</>
    );
  }
}

export default ProgressBar;
