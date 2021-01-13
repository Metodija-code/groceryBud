import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, removeSingleItem, editItem }) => {
  return (
    <>
      <div className="grocery-list">
        {items.map((item, index) => {
          const { id, title } = item;
          /// return from map

          return (
            <article key={id} className="grocery-item">
              <p className="title">{title}</p>
              <div className="btn-container">
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => editItem(id)}
                >
                  <FaEdit />
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => removeSingleItem(id)}
                >
                  <FaTrash />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};

export default List;
