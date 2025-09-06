import styles from './styles.module.css'

export function Body() {
    return (
        <>
            <div className={styles.Body}>
                <div className={styles.container}>
                    <h1>Simplificar, Compartilhar, Superar</h1>
                    <h2>Transforme longos links para poderosos links acessiveis</h2>
                    <input type="text" placeholder='Copie seu longo URL aqui'/> <button>Diminua</button>
                </div>
                <div className={styles.container}>
                    <img src="" alt="" />
                    <h1>,</h1>
                </div>
            </div>
        </>
    )

}