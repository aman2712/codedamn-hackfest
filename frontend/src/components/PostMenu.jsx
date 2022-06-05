import { Menu } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { AiOutlineEllipsis } from "react-icons/ai";
import styles from "../styles/components/postMenu.module.css";

export default function ({ id }) {
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
                href="/account-settings"
              >
                Delete
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}
