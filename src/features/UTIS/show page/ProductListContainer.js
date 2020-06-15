import React from "react";

import ProductList from "./ProductList";

// const products = [
//   {
//     name: "Ensayo descriptivo de la fauna en Ciales",
//     students_submitted: 8,
//     students_not_submitted: 1,
//   },
//   {
//     name: "Ensayo descriptivo de la fauna en Ciales",
//     students_submitted: 8,
//     students_not_submitted: 1,
//   },
//   {
//     name: "Ensayo descriptivo de la fauna en Ciales",
//     students_submitted: 8,
//     students_not_submitted: 1,
//   },
//   {
//     name: "Ensayo descriptivo de la fauna en Ciales",
//     students_submitted: 8,
//     students_not_submitted: 1,
//   },
// ];

export default function ProductListContainer({ products }) {
  return (
    <div className="product-list-container">
      <h1 className="dark-purple-text">
        Nombre del UTIS va Aqui - Materia o Detalles
      </h1>
      <p className="dark-purple-text">Categoria</p>
      <hr />

      <ProductList />
    </div>
  );
}
