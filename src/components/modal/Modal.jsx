import React, { useState } from "react";
import { createList } from "../../services/favsAPI";
import styles from "./modal.module.scss";

const Modal = ({ handleClickAll, id }) => {
  const [inputValue, setInputValue] = useState("");

  const handleCreateList = async () => {
    await createList(id, inputValue);
    handleClickAll();
  };
  console.log("en modal");
  return (
    <div className={styles.modal}>
      <div className={styles.window}>
        <input
          placeholder="Nombre de la lista"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="button" onClick={handleCreateList}>
          Crear lista
        </button>
      </div>
    </div>
  );
};

export default Modal;
