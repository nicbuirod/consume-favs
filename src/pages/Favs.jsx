import React, { useState } from "react";
import axios from "axios";
import { deleteList, updateFavs } from "../services/favsAPI";
import { Button } from "../components/button";
import { Modal } from "../components/modal";
import styles from "../styles/styles.module.scss";

const Favs = () => {
  const [list, setList] = useState([]);
  const [viewList, setViewList] = useState(false);
  const [selectedListIndex, setSelectedListIndex] = useState(-1);
  const [userId, setUserId] = useState(0);
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newLink, setNewLink] = useState("");
  const [selectedFavsIndex, setSelectedFavsIndex] = useState(-1);

  const url = "https://favs-api-production.up.railway.app";
  const handleClickAll = async () => {
    console.log("en funcion ");
    const token = JSON.parse(localStorage.getItem("user"));
    setModal(false);
    await axios
      .get(`${url}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setList(data.data);
        console.log(data.data);
      });
  };

  const listDelete = async (id) => {
    await deleteList(id);
    handleClickAll();
  };

  const handleFavs = async (idfavs, idlist) => {
    await updateFavs(idfavs, idlist, newTitle, newDescription, newLink);
    handleClickAll();
    setUpdate(false);
  };

  return (
    <div className={styles.header}>
      <h1>Usuarios y listas</h1>
      {modal && (
        <div>
          <Modal handleClickAll={handleClickAll} id={userId} />
        </div>
      )}

      <div>
        <Button nameButton="Ver todos" handleCLick={handleClickAll} />
      </div>
      <div className={styles.container}>
        <div>
          {list.map(({ email, list, iduser }, index) => (
            <ul key={index} className={styles.principal_list}>
              <li>
                <div className={styles.li_principal}>
                  {email}{" "}
                  <button
                    onClick={() => {
                      setUserId(iduser);
                      setModal(true);
                    }}
                  >
                    Crear lista
                  </button>
                  <button
                    onClick={() => {
                      setViewList(true);
                      setSelectedListIndex(index);
                    }}
                  >
                    Ver listas
                  </button>
                </div>
                {selectedListIndex === index &&
                  viewList &&
                  list.map(({ name, idlist, favs }, index) => (
                    <ol key={index} className={styles.list_container}>
                      <ul>
                        <div className={styles.list_title}>
                          {name}{" "}
                          <button
                            onClick={() => {
                              listDelete(idlist);
                            }}
                          >
                            Eliminar lista
                          </button>
                        </div>
                        <h2>Favoritos</h2>
                        <ul>
                          {favs.map(
                            ({ title, description, link, idfavs }, index) => (
                              <li key={index}>
                                <div>
                                  <span>Titulo:</span>
                                  {title}
                                </div>

                                <div>
                                  <span>Descripción:</span> {description}
                                </div>
                                <div>
                                  <span>Link:</span>
                                  {link}
                                </div>
                                <button
                                  onClick={() => {
                                    setUpdate(true);
                                    setSelectedFavsIndex(index);
                                  }}
                                >
                                  Actualizar
                                </button>
                                {selectedFavsIndex === index && update && (
                                  <div>
                                    <div>
                                      <label htmlFor="title">Titulo: </label>
                                      <input
                                        type="text"
                                        name="title"
                                        value={newTitle}
                                        onChange={(e) =>
                                          setNewTitle(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <label htmlFor="description">
                                        Descripción:{" "}
                                      </label>
                                      <input
                                        type="text"
                                        name="description"
                                        value={newDescription}
                                        onChange={(e) =>
                                          setNewDescription(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <label htmlFor="link">Link: </label>
                                      <input
                                        type="text"
                                        name="link"
                                        value={newLink}
                                        onChange={(e) =>
                                          setNewLink(e.target.value)
                                        }
                                      />
                                    </div>
                                    <button
                                      onClick={() => {
                                        handleFavs(idfavs, idlist);
                                      }}
                                    >
                                      Guardar
                                    </button>
                                  </div>
                                )}
                              </li>
                            )
                          )}
                        </ul>
                      </ul>
                    </ol>
                  ))}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favs;
