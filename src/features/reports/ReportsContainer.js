import React, { useState } from "react";
import { connect } from "react-redux";
import "./reports.css";
import { ArrowDownload16Regular } from "@fluentui/react-icons";
import ReportsFilter from "./ReportsFilter";
import ReactECharts from "echarts-for-react"; // or var ReactECharts = require('echarts-for-react');
import centers from "../../commons/data/centers";

// var app = {};

// const posList = [
//   'left',
//   'right',
//   'top',
//   'bottom',
//   'inside',
//   'insideTop',
//   'insideLeft',
//   'insideRight',
//   'insideBottom',
//   'insideTopLeft',
//   'insideTopRight',
//   'insideBottomLeft',
//   'insideBottomRight'
// ];
// app.configParameters = {
//   rotate: {
//     min: -90,
//     max: 90
//   },
//   align: {
//     options: {
//       left: 'left',
//       center: 'center',
//       right: 'right'
//     }
//   },
//   verticalAlign: {
//     options: {
//       top: 'top',
//       middle: 'middle',
//       bottom: 'bottom'
//     }
//   },
//   position: {
//     options: posList.reduce(function (map, pos) {
//       map[pos] = pos;
//       return map;
//     }, {})
//   },
//   distance: {
//     min: 0,
//     max: 100
//   }
// };
// app.config = {
//   rotate: 90,
//   align: 'left',
//   verticalAlign: 'middle',
//   position: 'insideBottom',
//   distance: 15,
//   onChange: function () {
//     const labelOption = {
//       rotate: app.config.rotate,
//       align: app.config.align,
//       verticalAlign: app.config.verticalAlign,
//       position: app.config.position,
//       distance: app.config.distance
//     };
//     myChart.setOption({
//       series: [
//         {
//           label: labelOption
//         },
//         {
//           label: labelOption
//         },
//         {
//           label: labelOption
//         },
//         {
//           label: labelOption
//         }
//       ]
//     });
//   }
// };
// const labelOption = {
//   show: true,
//   position: app.config.position,
//   distance: app.config.distance,
//   align: app.config.align,
//   verticalAlign: app.config.verticalAlign,
//   rotate: app.config.rotate,
//   formatter: '{c}  {name|{a}}',
//   fontSize: 16,
//   rich: {
//     name: {}
//   }
// };
// option = {
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       type: 'shadow'
//     }
//   },
//   legend: {
//     data: ['Forest', 'Steppe', 'Desert', 'Wetland']
//   },
//   toolbox: {
//     show: true,
//     orient: 'vertical',
//     left: 'right',
//     top: 'center',
//     feature: {
//       mark: { show: true },
//       dataView: { show: true, readOnly: false },
//       magicType: { show: true, type: ['line', 'bar', 'stack'] },
//       restore: { show: true },
//       saveAsImage: { show: true }
//     }
//   },
//   xAxis: [
//     {
//       type: 'category',
//       axisTick: { show: false },
//       data: ['2012', '2013', '2014', '2015', '2016']
//     }
//   ],
//   yAxis: [
//     {
//       type: 'value'
//     }
//   ],
//   series: [
//     {
//       name: 'Forest',
//       type: 'bar',
//       barGap: 0,
//       label: labelOption,
//       emphasis: {
//         focus: 'series'
//       },
//       data: [320, 332, 301, 334, 390]
//     },
//     {
//       name: 'Steppe',
//       type: 'bar',
//       label: labelOption,
//       emphasis: {
//         focus: 'series'
//       },
//       data: [220, 182, 191, 234, 290]
//     },
//     {
//       name: 'Desert',
//       type: 'bar',
//       label: labelOption,
//       emphasis: {
//         focus: 'series'
//       },
//       data: [150, 232, 201, 154, 190]
//     },
//     {
//       name: 'Wetland',
//       type: 'bar',
//       label: labelOption,
//       emphasis: {
//         focus: 'series'
//       },
//       data: [98, 77, 101, 99, 40]
//     }
//   ]
// };

export const ReportsContainer = (props) => {
  const [buttonStates, setButtonStates] = useState({
    aguada: true,
    carolina: true,
    mayagüez: true,
    moca: true,
  });

  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: [
        "SER", "HACER", "CONVIVIR", "CONOCER"
      ],
    },
    toolbox: {
      show: true,
      orient: "vertical",
      left: "right",
      top: "center",
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar", "stack"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: [...centers.map(c => c.name)],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "SER",
        type: "bar",
        barGap: 0,
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: [320, 332, 301, 334, 390],
      },
      {
        name: "HACER",
        type: "bar",
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: [220, 182, 191, 234, 290],
      },
      {
        name: "CONVIVIR",
        type: "bar",
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: [150, 232, 201, 154, 190],
      },
      {
        name: "CONOCER",
        type: "bar",
        //label: labelOption,
        emphasis: {
          focus: "series",
        },
        data: [98, 77, 101, 99, 40],
      },
    ],
    color: ['#4ad23b', '#dc66a1', '#bf2bc9', '#ffd966', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
  };

  const handleClick = (event) => {
    setButtonStates({
      ...buttonStates,
      [event.target.name]: !buttonStates[event.target.name],
    });
  };

  return (
    <section className="utis-container courses-purple">
      <section className="reports-container">
        <div className="reports-header" style={{ paddingBottom: "24px" }}>
          <h1 className="dark-purple-text text-align-center">Tablero</h1>
          <button className="primary-btn" onClick={() => {}}>
            <ArrowDownload16Regular /> Exportar
          </button>
        </div>
        <ReportsFilter buttonStates={buttonStates} handleClick={handleClick} />
        <div className="tablero-stats-cards-group">
          <div className="tablero-stats-card card">
            Productos asignados
            <h2>2,070</h2>
          </div>
          <div className="tablero-stats-card card">
            Productos asignados
            <h2>2,070</h2>
          </div>
          <div className="tablero-stats-card card">
            Productos asignados
            <h2>2,070</h2>
          </div>
          <div className="tablero-stats-card card">
            Productos asignados
            <h2>2,070</h2>
          </div>
          <div className="tablero-stats-card card">
            Productos asignados
            <h2>2,070</h2>
          </div>
        </div>
        <div className="ability-bar-graph card">
          <div className="school-ability-bar-graph-section" style={{width: "100%"}}>
            <ReactECharts
              option={options}
              notMerge={true}
              lazyUpdate={true}
              // theme={"theme_name"}
              //onChartReady={this.onChartReadyCallback}
              //onEvents={EventsDict}
              //opts={}
            />
          </div>
          <div className="bar ser-ability-bar"></div>
        </div>
      </section>
    </section>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsContainer);
