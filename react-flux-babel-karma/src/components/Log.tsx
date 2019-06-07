import React from 'react';
import FBEmitter from "fbemitter";
import { LogState, Line, Level } from '../types/LogState';

class Log extends React.Component<{}, LogState> {
  eventSubscription: FBEmitter.EventSubscription;

  constructor(props: {}) {
    super(props);
    this.state = { showSilent: false, logs: [] };
    this._onChange = this._onChange.bind(this);
  }

  async componentDidMount() {
    const logs = await getLogs();
    this.setState({ logs: logs, showSilent: this.state.showSilent });
  }

  public componentWillMount() {
  }

  public componentWillUnmount() {
  }

  render() {
    const logs = this.state.logs;
    const showSilent = this.state.showSilent;

    return (
      <div>
        <ShowAllLogs isChecked={showSilent} onChange={this._onChange} />
        {logs.map((log, index) =>
          <div key={index} className={Level[log.level].toString()}>{log.message}</div>
        )}
        <ShowAllLogs isChecked={showSilent} onChange={this._onChange} />
      </div>
    );
  }

  private _onChange(event: React.FormEvent<HTMLInputElement>) {
    const checked = event.currentTarget.checked;
    this.setState({showSilent:checked, logs: this.state.logs});
  }

}

class ShowAllLogs extends React.Component<ShowAllLogsProps, {}> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <div>
        <input type="checkbox" checked={this.props.isChecked} onChange={this.props.onChange} />
        <label>Show all logs</label>
      </div>
    );
  }
}

interface ShowAllLogsProps {
  isChecked: boolean
  onChange: (event: React.MouseEvent<HTMLInputElement>) => void
}

async function getLogs(): Promise<Line[]> {
  return new Promise((resolve) => {
    const logs: Line[] = [];
    logs.push({ level: Level.normal, message: "normal message" });
    logs.push({ level: Level.silent, message: "silent message" });
    logs.push({ level: Level.success, message: "success message" });
    logs.push({ level: Level.warning, message: "warning message" });
    resolve(logs);
  });
}




export default Log;
