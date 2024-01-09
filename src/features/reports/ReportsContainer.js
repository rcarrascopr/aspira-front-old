import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./reports.css";
import { ArrowDownload16Regular } from "@fluentui/react-icons";
import ReportsFilter from "./ReportsFilter";
import ReactECharts from "echarts-for-react"; // or var ReactECharts = require('echarts-for-react');
import categories from "../../commons/data/categories.js";
import { fetchAdminReports } from "../../actions/adminReports";
import {
  options as baseOptions,
  handleGenerateExcel,
  getData,
  addSkillCountsToCenters,
  addCategorySkillCountsToCenters,
} from "./helpers";

export const ReportsContainer = (props) => {
  const [buttonStates, setButtonStates] = useState({
    aguada: true,
    carolina: true,
    mayagüez: true,
    moca: true,
  });

  const handleClick = (event) => {
    setButtonStates({
      ...buttonStates,
      [event.target.name]: !buttonStates[event.target.name],
    });
  };

  const generateHeaderCards = () => {
    // Check if admin report info has been fetched
    if (props.adminReport && props.adminReport.centers) {
      // Get data
      let centers = getData(props.adminReport.centers, buttonStates);

      // Calculate total centers data
      let productsCount = centers.reduce((total, center) => {
        return (
          total +
          center.courses.reduce(
            (result, course) => result + course.products_count,
            0
          )
        );
      }, 0);
      let activitiesCount = centers.reduce((total, center) => {
        return (
          total +
          center.courses.reduce(
            (result, course) => result + course.activities_count,
            0
          )
        );
      }, 0);
      let plansCount = centers.reduce((total, center) => {
        return (
          total +
          center.courses.reduce(
            (result, course) => result + course.plans_count,
            0
          )
        );
      }, 0);
      let teachersCount = centers.reduce((total, center) => {
        return total + center.gph_count;
      }, 0);
      let studentsCount = centers.reduce((total, center) => {
        return total + center.students_count;
      }, 0);

      return (
        <div className="tablero-stats-cards-group">
          <div className="tablero-stats-card card">
            Productos asignados
            <h2>{productsCount}</h2>
          </div>
          <div className="tablero-stats-card card">
            Total de actividades
            <h2>{activitiesCount}</h2>
          </div>
          <div className="tablero-stats-card card">
            Total de UTIS
            <h2>{plansCount}</h2>
          </div>
          <div className="tablero-stats-card card">
            Total de GPH
            <h2>{teachersCount}</h2>
          </div>
          <div className="tablero-stats-card card">
            Total de estudiantes
            <h2>{studentsCount}</h2>
          </div>
        </div>
      );
    }
  };

  const generateCenterGraphs = () => {
    // Check if admin report info has been fetched
    if (props.adminReport && props.adminReport.centers) {
      // Get data
      let dataCenters = getData(props.adminReport.centers, buttonStates);

      dataCenters = addSkillCountsToCenters(dataCenters);

      let options = { ...baseOptions };

      options.title = {
        text: "Productos por Centro por Habilidad",
      };
      // options.legend = {
      //   data: ["SER", "HACER", "CONVIVIR", "CONOCER"],
      // };
      options.xAxis = [
        {
          type: "category",
          axisTick: { show: false },
          data: [...dataCenters.map((c) => c.name)],
        },
      ];
      options.series = [
        {
          name: "SER",
          type: "bar",
          barGap: 0,
          //label: labelOption,
          emphasis: {
            focus: "series",
          },
          data: dataCenters.map((dc) => dc.serCount),
        },
        {
          name: "HACER",
          type: "bar",
          barGap: 0,
          //label: labelOption,
          emphasis: {
            focus: "series",
          },
          data: dataCenters.map((dc) => dc.hacerCount),
        },
        {
          name: "CONVIVIR",
          type: "bar",
          barGap: 0,
          //label: labelOption,
          emphasis: {
            focus: "series",
          },
          data: dataCenters.map((dc) => dc.convivirCount),
        },
        {
          name: "CONOCER",
          type: "bar",
          barGap: 0,
          //label: labelOption,
          emphasis: {
            focus: "series",
          },
          data: dataCenters.map((dc) => dc.conocerCount),
        },
      ];

      return (
        <div
          className="school-ability-bar-graph-section"
          style={{ width: "100%" }}
        >
          <ReactECharts
            option={{ ...options }}
            notMerge={true}
            lazyUpdate={true}
            // theme={"theme_name"}
            //onChartReady={this.onChartReadyCallback}
            //onEvents={EventsDict}
            //opts={}
          />
          {/* <div className="bar ser-ability-bar"></div> */}
        </div>
      );
    }
  };

  const generateCategoryGraphs = () => {
    // Check if admin report info has been fetched
    if (props.adminReport && props.adminReport.centers) {
      // Get data
      let dataCenters = getData(props.adminReport.centers, buttonStates);

      let categoryCounts = addCategorySkillCountsToCenters(dataCenters);

      let options = { ...baseOptions };

      options.title = {
        text: "Productos por Bloque por Habilidad",
      };
      // options.legend = {
      //   data: [...categories],
      // };
      options.xAxis = [
        {
          type: "category",
          axisTick: { show: false },
          data: [...categories],
        },
      ];
      options.series = [
        {
          name: "SER",
          type: "bar",
          barGap: 0,
          //label: labelOption,
          emphasis: {
            focus: "series",
          },
          data: [
            categoryCounts.socioCount.serCount,
            categoryCounts.cientificoCount.serCount,
            categoryCounts.ocupacionalCount.serCount,
            categoryCounts.culturalCount.serCount,
            categoryCounts.comunitariaCount.serCount,
            categoryCounts.electivoCount.serCount,
          ],
        },
        {
          name: "HACER",
          type: "bar",
          barGap: 0,
          //label: labelOption,
          emphasis: {
            focus: "series",
          },
          data: [
            categoryCounts.socioCount.hacerCount,
            categoryCounts.cientificoCount.hacerCount,
            categoryCounts.ocupacionalCount.hacerCount,
            categoryCounts.culturalCount.hacerCount,
            categoryCounts.comunitariaCount.hacerCount,
            categoryCounts.electivoCount.hacerCount,
          ],
        },
        {
          name: "CONVIVIR",
          type: "bar",
          barGap: 0,
          //label: labelOption,
          emphasis: {
            focus: "series",
          },
          data: [
            categoryCounts.socioCount.convivirCount,
            categoryCounts.cientificoCount.convivirCount,
            categoryCounts.ocupacionalCount.convivirCount,
            categoryCounts.culturalCount.convivirCount,
            categoryCounts.comunitariaCount.convivirCount,
            categoryCounts.electivoCount.convivirCount,
          ],
        },
        {
          name: "CONOCER",
          type: "bar",
          barGap: 0,
          //label: labelOption,
          emphasis: {
            focus: "series",
          },
          data: [
            categoryCounts.socioCount.conocerCount,
            categoryCounts.cientificoCount.conocerCount,
            categoryCounts.ocupacionalCount.conocerCount,
            categoryCounts.culturalCount.conocerCount,
            categoryCounts.comunitariaCount.conocerCount,
            categoryCounts.electivoCount.conocerCount,
          ],
        },
      ];

      return (
        <div
          className="school-ability-bar-graph-section"
          style={{ width: "100%" }}
        >
          <ReactECharts
            option={{ ...options }}
            notMerge={true}
            lazyUpdate={true}
            // theme={"theme_name"}
            //onChartReady={this.onChartReadyCallback}
            //onEvents={EventsDict}
            //opts={}
          />
          {/* <div className="bar ser-ability-bar"></div> */}
        </div>
      );
    }
  };

  useEffect(() => {
    if (props.currentSelectedSemester) {
      props.fetchAdminReports(props.currentSelectedSemester.id);
    }
  }, [props.currentSelectedSemester]);

  return (
    <section className="utis-container courses-purple">
      {!props.loading && (
        <section className="reports-container">
          <div className="reports-header" style={{ paddingBottom: "24px" }}>
            <h1 className="dark-purple-text text-align-center">Tablero</h1>
            <button
              className={`primary-btn ${
                props.adminReport && props.adminReport.centers ? "" : "disabled"
              }`}
              onClick={() => {
                handleGenerateExcel(
                  props.adminReport ? props.adminReport.centers : [],
                  buttonStates,
                  props.currentSelectedSemester
                );
              }}
            >
              <ArrowDownload16Regular /> Exportar
            </button>
          </div>
          <ReportsFilter
            buttonStates={buttonStates}
            handleClick={handleClick}
          />
          {generateHeaderCards()}
          {props.adminReport && props.adminReport.centers && (
            <div className="ability-bar-graph card">
              {generateCenterGraphs()}
            </div>
          )}
          {props.adminReport && props.adminReport.centers && (
            <div className="ability-bar-graph card">
              {generateCategoryGraphs()}
            </div>
          )}
        </section>
      )}
    </section>
  );
};

const mapStateToProps = (state) => ({
  currentSelectedSemester: state.semesters.currentSelectedSemester,
  adminReport: state.reports.adminReport,
  loading: state.reports.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAdminReports: (semesterId) => dispatch(fetchAdminReports(semesterId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportsContainer);
