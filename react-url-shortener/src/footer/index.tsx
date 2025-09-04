import styles from  './styles.module.css';

export function Footer () {
    return (
        <>
            <div className={styles.footer}>
                <div className={styles.area}></div>
            </div>
            <div className={styles.footerDown}>
                <nav>
                    <ul>
                        <li>Copyright © 2025 Surl Todos os direitos reservados.</li>
                        <li><a href="">Termos</a></li>
                        <li><a href="">Privacidade</a></li>
                        <li><a href="">Politica de cookies</a></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}