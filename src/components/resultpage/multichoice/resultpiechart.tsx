import React from "react";
import ReactApexChart from "react-apexcharts";

type ChartType = "pie" | "line" | "area" | "bar" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "radar" | "polarArea" | "rangeBar" | "rangeArea" | "treemap";

interface ResultPieChartProps {
  series: number[];
  labels: string[];
}

interface ResponsiveOption {
  breakpoint: number;
  options: {
    chart: {
      width: number;
    };
    legend: {
      position: string;
    };
  };
}

interface ResultPieChartState {
  series: number[];
  options: {
    chart: {
      width: number;
      type: ChartType;
    };
    labels: string[];
    colors?: string[];
    responsive: ResponsiveOption[];
  };
}

class ResultPieChart extends React.Component<ResultPieChartProps, ResultPieChartState> {
  constructor(props: ResultPieChartProps) {
    super(props);

    this.state = {
      series: props.series,
      options: {
        chart: {
          width: 400,
          type: 'pie' as ChartType,
        },
        labels: this.generateLabels(props.series.length),
        colors: this.getRandomColors(props.series.length),
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 150,
            },
            legend: {
              position: 'bottom',
            }
          }
        }]
      }
    };
  }

  componentDidUpdate(prevProps: ResultPieChartProps) {
    if (prevProps.series !== this.props.series || prevProps.labels !== this.props.labels) {
      this.setState({
        series: this.props.series,
        options: {
          ...this.state.options,
          labels: this.props.labels, 
          colors: this.getRandomColors(this.props.series.length), 
        }
      });
    }
  }

  generateLabels(count: number): string[] {
    return Array.from({ length: count }, (_, i) => `${i + 1}번`);
  }

  getRandomColors(count: number): string[] {
    const colors = ['#97D2F6', '#FDACAC', '#FFEBA2', '#BCACFD', '#FFB8A2', '#F2ACFD', '#A2F4FF', '#C6FFA2'];
    const availableColors = [...colors]; 
    const randomColors: string[] = [];

    for (let i = 0; i < count; i++) {
      if (availableColors.length === 0) break;
      const randomIndex = Math.floor(Math.random() * availableColors.length);
      randomColors.push(availableColors[randomIndex]);
      availableColors.splice(randomIndex, 1);
    }
    return randomColors;
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="pie"
            width={this.state.options.chart.width}
          />
        </div>
      </div>
    );
  }
}

export default ResultPieChart;
