export function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function fullName(user) {
  let fullName = user.first_name;
  if (user.second_name) {
    fullName += ` ${user.second_name}`;
  }

  if (user.paternal_surname) {
    fullName += ` ${user.paternal_surname}`;
  }

  if (user.maternal_surname) {
    fullName += ` ${user.maternal_surname}`;
  }

  return fullName;
}

export const calculatePercentage = (products_passed, amount_of_products) => {
  let division = products_passed / amount_of_products;
  return Math.round((division + Number.EPSILON) * 100);
};

export const round2 = (num) => {
  return Math.round((num + Number.EPSILON) * 100);
};
