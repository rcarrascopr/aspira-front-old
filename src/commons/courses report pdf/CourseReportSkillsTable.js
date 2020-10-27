import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
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
    marginTop: "15",
    border: "1 solid black",
    width: "220",
    marginLeft: "10",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  cell: {
    paddingTop: "5",
    paddingBottom: "3",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    border: "1 solid black",
    width: "33.333333%",

    height: "100%",
    fontSize: "9",
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

export default function CourseReportSkillsTable(props) {
  const generateRows = () => {
    return Object.keys(props.skills).map((skill_name) => {
      let skill = props.skills[skill_name];

      return (
        <View style={styles.tableRow}>
          <Text
            style={[styles.cell, styles.bold, styles[skill_name.toLowerCase()]]}
          >
            {skill_name}
          </Text>
          <Text style={styles.cell}>
            {skill.biggest_level == 0 ? "NT" : skill.average_level}
          </Text>
          <Text style={styles.cell}>
            {skill.biggest_level == 0 ? "NT" : skill.biggest_level}
          </Text>
        </View>
      );
    });
  };

  const generateTable = () => {
    return (
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.cell, styles.bold]}>HABILIDAD</Text>

          <Text style={[styles.cell, styles.bold]}>Nivel Promedio</Text>
          <Text style={[styles.cell, styles.bold]}>NIVEL</Text>
        </View>

        {generateRows()}

        {/* <View style={styles.tableRow}>
          <Text
            style={[styles.cell, styles.bold, { backgroundColor: "#4ad23b" }]}
          >
            SER
          </Text>
          <Text style={styles.cell}>1.83</Text>
          <Text style={styles.cell}>2</Text>
        </View>

        <View style={styles.tableRow}>
          <Text
            style={[styles.cell, styles.bold, { backgroundColor: "#dc66a1" }]}
          >
            HACER
          </Text>
          <Text style={styles.cell}>1.66</Text>
          <Text style={styles.cell}>2</Text>
        </View>

        <View style={styles.tableRow}>
          <Text
            style={[styles.cell, styles.bold, { backgroundColor: "#bf2bc9" }]}
          >
            CONVIVIR
          </Text>
          <Text style={styles.cell}>2.00</Text>
          <Text style={styles.cell}>2</Text>
        </View>

        <View style={styles.tableRow}>
          <Text
            style={[styles.cell, styles.bold, { backgroundColor: "#ffd966" }]}
          >
            CONOCER
          </Text>
          <Text style={styles.cell}>2.00</Text>
          <Text style={styles.cell}>2</Text>
        </View> */}
      </View>
    );
  };

  return <View>{generateTable()}</View>;
}
