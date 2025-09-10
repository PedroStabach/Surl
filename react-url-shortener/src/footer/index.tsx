import styles from  './styles.module.css';

export function Footer () {
    return (
        <>
            <div className={styles.footer}>            
                <nav>
                    <ul>
                        <li>Desenvolvido por Pedro Stabach</li>
                        <li><a href="">Termos</a></li>
                        <li><a href="">Privacidade</a></li>
                        <li><a href="">Politica de cookies</a></li>
                    </ul>
                </nav>
            </div>   
        </>
    )
}