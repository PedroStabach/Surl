import Flag from 'react-world-flags';

let bandeira = "BR"; //MUDAR
export function Bandeiras () {
    return (<Flag code={bandeira} style={{ height: 20 }} />)
}