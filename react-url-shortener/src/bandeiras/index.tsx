import Flag from 'react-world-flags';
import styles from './styles.module.css';
import { useState } from 'react';

export function Bandeiras () {
    const [language, setLanguage] = useState('');
    const handleLanguage = (event) => {
        setLanguage(event.target.value);
        console.log(event.target.value);
    }
    return (
        <>
            <div className={styles.bandeira}>
                <Flag code={language} style={{ height: 20 }} />
                <select name="Language" id="" defaultValue={language} onChange={handleLanguage}>
                    <option value='BR'><h2>Portugues-BR</h2></option>
                    <option value="US"><h2>USA</h2></option>
                    <option value="br"><h2>JAPAN</h2></option>
                </select>
            </div>
        </>
    )
}