import semesters from "../data/semesters";

export const semesterFormData = {
  name: {
    type: "select",
    required: true,
    label: "Semestre",
    items: semesters,
  },
  start_date: {
    type: "date",
    required: true,
    label: "Fecha Inicio",
  },
  end_date: {
    type: "date",
    required: true,
    label: "Fecha Final",
  },
};
