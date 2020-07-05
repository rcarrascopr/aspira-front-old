export const grade_ascending = (obj1, obj2) => {
  return obj1.name - obj2.name;
};

export const grade_descending = (obj1, obj2) => {
  return obj2.name - obj1.name;
};

export const name = (obj1, obj2) => {
  return obj1.first_name.localeCompare(obj2.first_name);
};

export const last_name = (obj1, obj2) => {
  return obj1.paternal_surname.localeCompare(obj2.paternal_surname);
};

export const filterPeople = (obj1, filter) => {
  return `${obj1.first_name} ${obj1.paternal_surname} ${obj1.maternal_surname}`
    .toLowerCase()
    .includes(filter.toLowerCase());
};
