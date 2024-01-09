import * as XLSX from "xlsx";
import categories from "../../commons/data/categories.js";

export const options = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  // legend: {
  //   data: ["SER", "HACER", "CONVIVIR", "CONOCER"],
  // },
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
      // data: [...centers.map((c) => c.name)],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  color: [
    "#4ad23b",
    "#dc66a1",
    "#bf2bc9",
    "#ffd966",
    "#73c0de",
    "#3ba272",
    "#fc8452",
    "#9a60b4",
    "#ea7ccc",
  ],
};

export const getData = (dataCenters, buttonStates) => {
  let centers = [...dataCenters];

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

export const addSkillCountsToCenters = (dataCenters) => {
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
  return [...dataCenters];
};

export const addCategorySkillCountsToCenters = (dataCenters) => {
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

  return {
    socioCount,
    cientificoCount,
    ocupacionalCount,
    culturalCount,
    comunitariaCount,
    electivoCount,
  };
};

export const handleGenerateExcel = (centers, buttonStates, semester) => {
  if (centers && centers.length > 0) {
    let dataCenters = getData(centers, buttonStates);

    dataCenters = addSkillCountsToCenters(dataCenters);
    let categoryCounts = addCategorySkillCountsToCenters(dataCenters);

    // Create a workbook
    const wb = XLSX.utils.book_new();

    // Create the first sheet
    const firstSheetData = [
      ["", ...dataCenters.map((c) => c.name)],
      ["SER", ...dataCenters.map((dc) => dc.serCount)],
      ["HACER", ...dataCenters.map((dc) => dc.hacerCount)],
      ["CONVIVIR", ...dataCenters.map((dc) => dc.convivirCount)],
      ["CONOCER", ...dataCenters.map((dc) => dc.conocerCount)],
    ];
    const firstSheet = XLSX.utils.aoa_to_sheet(firstSheetData);
    XLSX.utils.book_append_sheet(wb, firstSheet, "Habilidades por Centro");

    // Create the second sheet
    const secondSheetData = [
      ["", ...categories],
      [
        "SER",
        categoryCounts.socioCount.serCount,
        categoryCounts.cientificoCount.serCount,
        categoryCounts.ocupacionalCount.serCount,
        categoryCounts.culturalCount.serCount,
        categoryCounts.comunitariaCount.serCount,
        categoryCounts.electivoCount.serCount,
      ],
      [
        "HACER",
        categoryCounts.socioCount.hacerCount,
        categoryCounts.cientificoCount.hacerCount,
        categoryCounts.ocupacionalCount.hacerCount,
        categoryCounts.culturalCount.hacerCount,
        categoryCounts.comunitariaCount.hacerCount,
        categoryCounts.electivoCount.hacerCount,
      ],
      [
        "CONVIVIR",
        categoryCounts.socioCount.convivirCount,
        categoryCounts.cientificoCount.convivirCount,
        categoryCounts.ocupacionalCount.convivirCount,
        categoryCounts.culturalCount.convivirCount,
        categoryCounts.comunitariaCount.convivirCount,
        categoryCounts.electivoCount.convivirCount,
      ],
      [
        "CONOCER",
        categoryCounts.socioCount.conocerCount,
        categoryCounts.cientificoCount.conocerCount,
        categoryCounts.ocupacionalCount.conocerCount,
        categoryCounts.culturalCount.conocerCount,
        categoryCounts.comunitariaCount.conocerCount,
        categoryCounts.electivoCount.conocerCount,
      ],
    ];
    const secondSheet = XLSX.utils.aoa_to_sheet(secondSheetData);
    XLSX.utils.book_append_sheet(wb, secondSheet, "Habilidades por Bloque");

    // Save the workbook as a file
    XLSX.writeFile(wb, `Reporte ${semester.name}.xlsx`);
  }
};
