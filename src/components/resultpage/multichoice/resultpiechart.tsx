import React from "react";
import ReactApexChart from "react-apexcharts";

type ChartType = "pie" | "line" | "area" | "bar" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "radar" | "polarArea" | "rangeBar" | "rangeArea" | "treemap";


interface ResultPieChartProps {
  series : number[];
  labels : string[];
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
          width: 500,
          type: 'pie' as ChartType, 
        },
        labels: props.labels,
        colors: ['#97D2F6','#FDACAC','#FDFAAC','#BCACFD','#FFB8A2','#F2ACFD','#020F59','#A2F4FF'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            }
          }
        }]
      }
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart 
            options={this.state.options} 
            series={this.props.series} 
            type="pie" 
            width={this.state.options.chart.width} 
          />
        </div>
      </div>
    );
  }
}

export default ResultPieChart;