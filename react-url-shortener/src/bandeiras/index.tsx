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
                    <option value="BR">Português</option>
                    <option value="US">English</option>
                    <option value="JP">日本語</option>
                    <option value="DE">Deutsch</option>
                    <option value="FR">Français</option>
                    <option value="ES">Español</option>
                    <option value="IT">Italiano</option>
                    <option value="CN">中文</option>
                    <option value="RU">Русский</option>
                    <option value="IN">हिन्दी </option>
                </select>
            </div>
        </>
    )
}