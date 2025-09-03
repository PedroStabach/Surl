import styles from './styles.module.css';
type menuItemProps = {
    children: React.ReactNode;
}
export function MenuItem ({children}: menuItemProps) {
    return (
        <div className={styles.MenuItem}>{children}</div>
    )
}