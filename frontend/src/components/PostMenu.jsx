import { Menu } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { AiOutlineEllipsis } from "react-icons/ai";
import styles from "../styles/components/postMenu.module.css";
import { useContext, useState } from "react";
import { PostsContext } from "../context/PostsContext";
import DeleteDialog from "./DeleteDialog";

export default function ({ id }) {
  let [isOpen, setIsOpen] = useState(false);

  const { deletePost, getPosts } = useContext(PostsContext);

  const deleteBtnClick = async () => {
    setIsOpen(false);
    await deletePost(id);
    getPosts();
  };

  return (
    <div className={styles.postMenuEnd}>
      <Menu>
        <Menu.Button>
          <AiOutlineEllipsis size={21} />
        </Menu.Button>
        <Menu.Items className={styles.items}>
          <Menu.Item>
            {({ active }) => (
              <NavLink
                className={`${active ? styles.active : ""} ${styles.item}`}
                to={`/edit/${id}`}
              >
                Edit
              </NavLink>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${active ? styles.active : ""} ${styles.item}`}
                onClick={() => setIsOpen(true)}
                href="/account-settings"
              >
                Delete
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
      <DeleteDialog
        onDelete={deleteBtnClick}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
