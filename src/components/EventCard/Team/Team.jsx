import React from 'react'
import { escudo } from '../../../assets'

const Team = (props) => {
    const IMG_SIZE_1 = 32;

    const get_escudo = (elem) => {

        if ("logo" in elem && elem.logo != "") {
            return <img src={elem.logo} alt="Escudo" width={IMG_SIZE_1} height={IMG_SIZE_1} />
        }
        return <img src={escudo} alt="Escudo" width={IMG_SIZE_1} height={IMG_SIZE_1} />

    }

    return (
        <div className='team'>

            <div className="team-info">
                {get_escudo(props.team)}
                <div className="team-name">{props.team.name}</div>
            </div>

        </div>
    )
}

export default Team