import React from "react";
import RadarChart from "react-chartjs-2";

interface Props {
  type: "radar";
  // TODO: Strong type data
  data: any;
}
class Radar extends React.Component<Props> {
  public render() {
    const { type, data } = this.props;
    return <RadarChart type={type} data={data} />;
  }
}

export { Radar };
