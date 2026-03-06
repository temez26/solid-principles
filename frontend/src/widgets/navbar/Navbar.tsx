import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  IoGridOutline,
  IoCheckboxOutline,
  IoSettingsOutline,
  IoLogOutOutline,
} from 'react-icons/io5';
import { useAuthState } from '../../entities/user';
import { useLogout } from '../../features/logout';
import styles from './Navbar.module.css';

const links = [
  { to: '/', label: 'Dashboard', icon: <IoGridOutline size={20} /> },
  { to: '/todos', label: 'Todos', icon: <IoCheckboxOutline size={20} /> },
  { to: '/settings', label: 'Settings', icon: <IoSettingsOutline size={20} /> },
];

export const Navbar: React.FC = () => {
  const { user } = useAuthState();
  const logout = useLogout();

  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>Todos</div>
      <div className={styles.links}>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            {l.icon}
            <span>{l.label}</span>
          </NavLink>
        ))}
      </div>
      <div className={styles.actions}>
        {user && <span className={styles.username}>{user.username}</span>}
        <button className={styles.logoutBtn} onClick={logout} aria-label="Logout">
          <IoLogOutOutline size={20} />
        </button>
      </div>
    </nav>
  );
};