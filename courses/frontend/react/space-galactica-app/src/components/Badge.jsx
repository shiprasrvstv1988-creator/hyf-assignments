import styles from './Badge.module.css';

// This component is a good candidate to be used from a component library.
// You can look at the MUI Badge component and consider using it:
// https://mui.com/material-ui/react-badge/

export const Badge = ({ count, children }) => {
  return (
    <div className={styles.badge}>
      {children}
        <span className={styles.badgeCount}>
          {count > 99 ? '99+' : count}
        </span>
    </div>
  );
};