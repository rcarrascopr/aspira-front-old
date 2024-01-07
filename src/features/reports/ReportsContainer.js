import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./reports.css";
import { ArrowDownload16Regular } from "@fluentui/react-icons";
import ReportsFilter from "./ReportsFilter";
import ReactECharts from "echarts-for-react"; // or var ReactECharts = require('echarts-for-react');
import centers from "../../commons/data/centers";
import categories from "../../commons/data/categories.js";
import { fetchAdminReports } from "../../actions/adminReports";
import { options as baseOptions } from "./baseOptions";

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

  const getData = () => {
    let centers = [...props.adminReport.centers];

    if (!buttonStates.aguada) {
      let i = centers.findIndex((c) => c.name == "Aguada");
      centers.splice(i, 1);
    }
    if (!buttonStates.carolina) {
      let i = centers.findIndex((c) => c.name == "Carolina");
      centers.splice(i, 1);
    }
    if (!buttonStates.mayagüez) {
      let i = centers.findIndex((c) => c.name == "Mayagüez");
      centers.splice(i, 1);
    }
    if (!buttonStates.moca) {
      let i = centers.findIndex((c) => c.name == "Moca");
      centers.splice(i, 1);
    }

    return [...centers];
  };

  const generateHeaderCards = () => {
    // Check if admin report info has been fetched
    if (props.adminReport && props.adminReport.centers) {
      // Get data
      let centers = getData();

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
      let dataCenters = getData();

      // Initialize counters
      let serCount = 0;
      let hacerCount = 0;
      let convivirCount = 0;
      let conocerCount = 0;

      dataCenters.forEach((c) => {
        // Aggregate counts from each course
        c.courses.forEach((course) => {
          serCount += course.serCount;
        });
        c.courses.forEach((course) => {
          hacerCount += course.hacerCount;
        });
        c.courses.forEach((course) => {
          convivirCount += course.convivirCount;
        });
        c.courses.forEach((course) => {
          conocerCount += course.conocerCount;
        });
        c.serCount = serCount;
        serCount = 0;
        c.hacerCount = hacerCount;
        hacerCount = 0;
        c.convivirCount = convivirCount;
        convivirCount = 0;
        c.conocerCount = conocerCount;
        conocerCount = 0;
      });

      let options = { ...baseOptions };

      options.title = {
        text: "Productos por Centro por Habilidad",
      };
      // options.legend = {
      //   data: ["SER", "HACER", "CONVIVIR", "CONOCER"],
      // };
      options.xAxis =  [
        {
          type: "category",
          axisTick: { show: false },
          data: [...dataCenters.map((c) => c.name)],
        },
      ]
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
            option={{...options}}
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
      let dataCenters = getData();

      // Initialize counters
      let socioCount = {
        serCount: 0,
        hacerCount: 0,
        convivirCount: 0,
        conocerCount: 0,
      };
      let cientificoCount = {
        serCount: 0,
        hacerCount: 0,
        convivirCount: 0,
        conocerCount: 0,
      };
      let ocupacionalCount = {
        serCount: 0,
        hacerCount: 0,
        convivirCount: 0,
        conocerCount: 0,
      };
      let culturalCount = {
        serCount: 0,
        hacerCount: 0,
        convivirCount: 0,
        conocerCount: 0,
      };
      let comunitariaCount = {
        serCount: 0,
        hacerCount: 0,
        convivirCount: 0,
        conocerCount: 0,
      };
      let electivoCount = {
        serCount: 0,
        hacerCount: 0,
        convivirCount: 0,
        conocerCount: 0,
      };

      dataCenters.forEach((c) => {
        // Aggregate counts from each course
        c.courses.forEach((course) => {
          switch (course.category) {
            case "Socio-Humanístico":
              socioCount.serCount += course.serCount;
              socioCount.hacerCount += course.hacerCount;
              socioCount.convivirCount += course.convivirCount;
              socioCount.conocerCount += course.conocerCount;
              break;
            case "Científico-Técnico":
              cientificoCount.serCount += course.serCount;
              cientificoCount.hacerCount += course.hacerCount;
              cientificoCount.convivirCount += course.convivirCount;
              cientificoCount.conocerCount += course.conocerCount;
              break;
            case "Ocupacional":
              ocupacionalCount.serCount += course.serCount;
              ocupacionalCount.hacerCount += course.hacerCount;
              ocupacionalCount.convivirCount += course.convivirCount;
              ocupacionalCount.conocerCount += course.conocerCount;
              break;
            case "Cultural":
              culturalCount.serCount += course.serCount;
              culturalCount.hacerCount += course.hacerCount;
              culturalCount.convivirCount += course.convivirCount;
              culturalCount.conocerCount += course.conocerCount;
              break;
            case "Comunitaria":
              comunitariaCount.serCount += course.serCount;
              comunitariaCount.hacerCount += course.hacerCount;
              comunitariaCount.convivirCount += course.convivirCount;
              comunitariaCount.conocerCount += course.conocerCount;
              break;
            case "Electivo":
              electivoCount.serCount += course.serCount;
              electivoCount.hacerCount += course.hacerCount;
              electivoCount.convivirCount += course.convivirCount;
              electivoCount.conocerCount += course.conocerCount;
              break;
          }
        });
      });

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
      ]
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
            socioCount.serCount,
            cientificoCount.serCount,
            ocupacionalCount.serCount,
            culturalCount.serCount,
            comunitariaCount.serCount,
            electivoCount.serCount,
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
            socioCount.hacerCount,
            cientificoCount.hacerCount,
            ocupacionalCount.hacerCount,
            culturalCount.hacerCount,
            comunitariaCount.hacerCount,
            electivoCount.hacerCount,
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
            socioCount.convivirCount,
            cientificoCount.convivirCount,
            ocupacionalCount.convivirCount,
            culturalCount.convivirCount,
            comunitariaCount.convivirCount,
            electivoCount.convivirCount,
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
            socioCount.conocerCount,
            cientificoCount.conocerCount,
            ocupacionalCount.conocerCount,
            culturalCount.conocerCount,
            comunitariaCount.conocerCount,
            electivoCount.conocerCount,
          ],
        },
      ];

      return (
        <div
          className="school-ability-bar-graph-section"
          style={{ width: "100%" }}
        >
          <ReactECharts
            option={{...options}}
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
            <button className="primary-btn" onClick={() => {}}>
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
