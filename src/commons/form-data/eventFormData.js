import eventCategories from "../data/eventCategories";

export const eventFormData = {
  date: {
    type: "date",
    required: true,
    label: "Fecha",
  },
  name: {
    type: "text",
    required: true,
    label: "Nombre de evento",
  },
  description: {
    type: "textarea",
    required: false,
    label: "Descripción",
  },
  category: {
    type: "select",
    required: true,
    items: eventCategories,
    label: "Categoría",
  },
};
