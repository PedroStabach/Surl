import styles from './styles.module.css';
import { EyeIcon, PencilIcon, Zap } from "lucide-react";
export function Works () {
    return (
        <div className={styles.works}>
            <h1>Caracteristicas</h1>
            <div className={styles.containerArea}>
                <div className={styles.container}>
                    <Zap className={styles.containerItens} width={40} />
                    <h2 className={styles.containerItens}>Instant shortening</h2>
                    <p className={styles.containerItens}>copie, cole e receba seu URL curto em segundos</p>
                </div>
                <div className={styles.container}>
                    <PencilIcon className={styles.containerItens} width={40} />
                    <h2 className={styles.containerItens}>CustomLinks</h2>
                    <p className={styles.containerItens}>personalize com slogans e tags proprios</p>
                </div>
                <div className={styles.container}>
                    <EyeIcon className={styles.containerItens} width={40}/>
                    <h2 className={styles.containerItens}>Veja tudo</h2>
                    <p className={styles.containerItens}>Cliques de monitor, localizacoes e muito mais</p>
                </div>
            </div>
        </div>
    )
}