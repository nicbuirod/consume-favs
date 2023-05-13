import axios from "axios";

export const createList = async (id, inputValue) => {
  const startUrl = "https://favs-api-production.up.railway.app";
  const idUser = +id;

  try {
    const token = JSON.parse(localStorage.getItem("user"));

    await axios.post(
      `${startUrl}/list`,
      {
        name: `${inputValue}`,
        iduser: idUser,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {}
};

export const deleteList = async (id) => {
  const startUrl = "https://favs-api-production.up.railway.app";
  const idList = id;

  try {
    const token = JSON.parse(localStorage.getItem("user"));

    await axios.delete(`${startUrl}/list/${idList}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {}
};

export const updateFavs = async (
  id,
  listId,
  newTitle,
  newDescription,
  newLink
) => {
  const startUrl = "https://favs-api-production.up.railway.app";

  const idList = +listId;

  try {
    const token = JSON.parse(localStorage.getItem("user"));

    await axios.put(
      `${startUrl}/favs/${id}`,
      {
        title: `${newTitle}`,
        description: `${newDescription}`,
        link: `${newLink}`,
        idlist: idList,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {}
};
