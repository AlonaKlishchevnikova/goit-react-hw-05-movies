import styles from './layout.module.css';
import { NavLink } from 'react-router-dom';
import items from "./items";


const Layout = () => {
    const elements = items.map(({id, text, link}) => <li key={id}>
        <NavLink className={styles.link} to={link}>{text}</NavLink>
    </li>);

    return (
        <ul className={styles.nav}>
            {elements}
        </ul>
    )
};

export default Layout;

