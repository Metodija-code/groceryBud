import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import { renderIntoDocument } from "react-dom/test-utils";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);

  /// id for element which we are going to edit
  const [editID, setEditID] = useState(null);

  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  //////

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({
      show,
      type,
      msg,
    });
  };

  //////

  const clearList = () => {
    setList([]);
    showAlert(true, "success", "list - cleared");
  };

  const handleSubmit = (e) => {
    if (!name) {
      // display alert
      // setAlert({ show: true, msg: "cannot add empty values", type: "danger" });
      showAlert(true, "danger", "please enter values");
    } else if (name && isEditing) {
      // deal with edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }

          return item;
        })
      );

      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value-changed");
    } else {
      // add item
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);

      // showAlert
      showAlert(true, "success", "item - added");

      setName("");
    }

    e.preventDefault();
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showAlert(true, "danger", "item-removed");
  };

  /// edit item

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  //////////// local storage

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  ////////////////// get Local storage

  function getLocalStorage() {
    let list = localStorage.getItem("list");
    if (list) {
      return JSON.parse(localStorage.getItem("list"));
    } else {
      return [];
    }
  }

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className="grocery-container">
          <List
            items={list}
            removeSingleItem={removeItem}
            editItem={editItem}
          />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
