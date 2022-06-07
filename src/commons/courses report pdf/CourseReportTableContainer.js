import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import CourseReportDimensionTable from "./CourseReportDimensionTable";
import CourseReportSkillsTable from "./CourseReportSkillsTable";

export default function CourseReportTableContainer(props) {
  return (
    <View style={{ padding: "10" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          boxSizing: "border-box",
          padding: "10",
        }}
      >
        <CourseReportDimensionTable
          skill_name="SER"
          skill_data={props.course.skills["SER"]}
        />
        <CourseReportDimensionTable
          skill_name="HACER"
          skill_data={props.course.skills["HACER"]}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          boxSizing: "border-box",
          padding: "10",
        }}
      >
        <CourseReportDimensionTable
          skill_name="CONVIVIR"
          skill_data={props.course.skills["CONVIVIR"]}
        />
        <CourseReportDimensionTable
          skill_name="CONOCER"
          skill_data={props.course.skills["CONOCER"]}
        />
      </View>
      <CourseReportSkillsTable skills={props.course.skills} />
      <Image
        style={{ marginTop: 10 }}
        src="/assets/tablas_escala_nivel_y_evaluacion.png"
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "flex-end",
          boxSizing: "border-box",
          paddingTop: "10",
        }}
      >
        <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              boxSizing: "border-box",
              // marginLeft: "50"
            }}
          >
          <Text
            style={{
              fontFamily: "Helvetica-Oblique",
              // marginTop: "40",
              display: "flex",
              alignSelf: "center",
              fontSize: "8"
            }}
          >
            Acreditados por la Comisión Acreditadora de Instituciones Educativas CADIE
          </Text>
          <Text
            style={{
              fontFamily: "Helvetica-Oblique",
              // marginTop: "40",
              display: "flex",
              alignSelf: "center",
              fontSize: "8"
            }}
          >
            Certificación de Registro de Educación Básica del Departamento de Estado de Puerto Rico Núm. A 75-56
          </Text>
        </View>
        <Image
          style={{height: "30"}}
          src="/assets/logo_cadie.png"
        />
      </View>
    </View>
  );
}
