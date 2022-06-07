import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import CourseReportTableContainer from "./CourseReportTableContainer";

import { fullName, calculatePercentage } from "../common_methods";

const styles = StyleSheet.create({
  page: {
    // flexDirection: "row",
    backgroundColor: "#FFF",
    padding: "20 40",
    boxSizing: "border-box",
    fontSize: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    fontSize: 14,
    color: "#1f497d",
    margin: "0 10",
  },
  flex: {
    display: "flex",
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
});

export default function CoursesReport(props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image
          style={{
            marginBottom: 10,
            width: "30%",
            display: "flex",
            alignSelf: "center",
          }}
          src="/assets/logo_aspira_PR.png"
        />
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Sistema para la Formación y Evaluación de Habilidades para la Vida
          </Text>
          <Text style={[styles.headerText, styles.bold, { marginBottom: 40 }]}>
            Informe de Evaluación
          </Text>
        </View>
        <View style={{ marginLeft: 10, marginBottom: 10 }}>
          <Text style={styles.bold}>
            Nombre del estudiante: {fullName(props.student)}
          </Text>
          <Text>
            <Text style={styles.bold}>Número de estudiante: </Text>
            {props.student.badge_id}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            padding: "10",
            boxSizing: "border-box",
            paddingRight: 50,
          }}
        >
          <View>
            <Text>
              <Text style={styles.bold}>Curso: </Text> {props.course.name}
            </Text>
            <Text>
              <Text style={styles.bold}>Total de trabajos en el curso: </Text>
              {props.course.amount_of_products}
            </Text>
            <Text>
              <Text style={styles.bold}>Porciento trabajos completados: </Text>
              {calculatePercentage(
                props.course.products_passed,
                props.course.amount_of_products
              ) || 0}
              %
            </Text>
          </View>
          <View>
            <Text style={styles.bold}>
              Semestre: {props.course.semester.name}
            </Text>
            <Text style={styles.bold}>
              Trabajos completados: {props.course.products_passed}
            </Text>
            <Text>
              <Text style={styles.bold}>Evaluación del curso: </Text>
              {props.course.status}
            </Text>
          </View>
        </View>
        <CourseReportTableContainer course={props.course} />
      </Page>
    </Document>
  );
}
