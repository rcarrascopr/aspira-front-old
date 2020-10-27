import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

import { round2 } from "../common_methods";

// --ser: #4ad23b;
//   --conocer: #ffd966;
//   --hacer: #dc66a1;
//   --convivir: #bf2bc9;

//COLOR ON OFFICIAL DOCUMENT
// --ser: #92D050;
//   --conocer: #FFFF00;
//   --hacer: #FF66CC;
//   --convivir: B2A1C7;

const styles = StyleSheet.create({
  table: {
    border: "2 solid black",
    width: "220",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderBottom: "2 solid black",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  cell: {
    padding: "0 5",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderBottom: "1 solid gray",
    borderRight: "1 solid gray",
    width: "70%",
    height: "100%",
  },
  smallCell: {
    padding: "0 5",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderBottom: "1 solid gray",
    borderRight: "1 solid gray",
    width: "30%",
    height: "100%",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  ser: {
    backgroundColor: "#92D050",
  },
  conocer: {
    backgroundColor: "#FFFF00",
  },
  hacer: {
    backgroundColor: "#FF66CC",
  },
  convivir: {
    backgroundColor: "#B2A1C7",
  },
});

export default function CourseReportTable(props) {
  const generateRows = () => {
    return Object.keys(props.skill_data.dimensions).map((dimension_name) => {
      let dimension = props.skill_data.dimensions[dimension_name];

      return (
        <View style={styles.tableRow}>
          <Text style={styles.cell}>{dimension_name}</Text>
          <Text style={styles.smallCell}>
            {dimension.level_count === 0
              ? "NT"
              : round2(dimension.level_sum / dimension.level_count)}
          </Text>
        </View>
      );
    });
  };

  const generateTable = () => {
    return (
      <View style={styles.table}>
        <View style={[styles.tableHeader, styles.bold, styles[props.skill_name.toLowerCase()]]}>
          <Text>{props.skill_name}</Text>
          <View style={styles.tableRow}>
            <Text
              style={{ textAlign: "center", width: "70%", paddingTop: "8" }}
            >
              Dimensión
            </Text>
            <Text
              style={{ textAlign: "center", width: "30%", paddingTop: "8" }}
            >
              Nivel promedio
            </Text>
          </View>
        </View>

        {generateRows()}

        {/* <View style={styles.tableRow}>
          <Text style={styles.cell}>Expresión creativa</Text>
          <Text style={styles.smallCell}>1.50</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.cell}>Estilos de vida saludables</Text>
          <Text style={styles.smallCell}>2.00</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.cell}>Manejo de la adversidad</Text>
          <Text style={styles.smallCell}>NT</Text>
        </View> */}
      </View>
    );
  };

  return <View>{generateTable()}</View>;
}
