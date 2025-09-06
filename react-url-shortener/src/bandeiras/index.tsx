import Flag from 'react-world-flags';
import styles from './styles.module.css';
import { useState } from 'react';

export function Bandeiras () {
    const [language, setLanguage] = useState('BR');
    const handleLanguage = (event) => {
        setLanguage(event.target.value.toUpperCase());
    }
    return (
        <>
            <div className={styles.bandeira}>
                <Flag code={language} style={{ height: 20 }} />
                <select name="Language" id="" defaultValue={language} onChange={handleLanguage}>
                    <option value="BR">Português - Brasil</option>
                    <option value="US">English - USA</option>
                    <option value="JP">日本語 - Japão</option>
                    <option value="DE">Deutsch - Alemanha</option>
                    <option value="FR">Français - França</option>
                    <option value="ES">Español - Espanha</option>
                    <option value="IT">Italiano - Itália</option>
                    <option value="CN">中文 - China</option>
                    <option value="RU">Русский - Rússia</option>
                    <option value="IN">हिन्दी - Índia</option>
                </select>
            </div>
        </>
    )
}