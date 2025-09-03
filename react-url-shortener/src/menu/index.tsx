import styles from './styles.module.css';

type HeadingProps = {
    children: React.ReactNode;
}
export function Menu ({children} : HeadingProps) {
    return (
        <>
            <div className={styles.Menu}>{children}</div>
        </>
    );
}