import React, { useContext, useEffect } from 'react'


const Table = (props) => {

    const img_size = 20;


    const get_row_color = (color) => {
        switch (color) {
            case "#81D6AC":          // Champions
                return "#266526"

            case  "#B5E7CE":         //"Champions League qualifying
                return "#3c833c"

            case "#B2BFD0":         // Europa league
                return "#99722a"

            case "#c6d1e0":          // Europa League League qualifying"
                return "#634b20"

            case "#FEB4B5":          // Relegation playOff
                return "#c52a0f"

            case "#FF7F84":
                return "#ab0505"        // Relegation
        }

    }


    return (


        <div className='table'>
            <div className='title'> {props.table.name}</div>
            <table>
                <tbody>
                    <tr>
                        <th >#</th>
                        <th>Equipo</th>
                        <th >Pts.</th>
                        <th>PJ</th>
                        <th>PG</th>
                        <th>PE</th>
                        <th>PP</th>
                        <th>GF</th>
                        <th>GC</th>
                        <th>Dif</th>

                    </tr>


                    {
                        props.table.standings.entries.map((elem, i) => (
                            <tr key={i} style={{ backgroundColor: ("note" in elem && get_row_color(elem.note.color)) }}>

                                <td>{elem.stats[10].value}</td>
                                <td>
                                    <img src={elem.team.logos ? elem.team.logos[0]?.href : ""} alt={elem.team.abbreviation} width={img_size} height={img_size} />
                                    <span>{elem.team.shortDisplayName.trim()} </span>
                                </td>
                                <td style={{ fontWeight: "bold" }}> {elem.stats[3].value} </td>
                                <td >{elem.stats[0].value}</td>
                                <td >{elem.stats[7].value}</td>
                                <td >{elem.stats[6].value}</td>
                                <td >{elem.stats[1].value}</td>
                                <td >{elem.stats[4].value}</td>
                                <td >{elem.stats[5].value}</td>
                                <td >{elem.stats[2].value}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>

        </div>

    )
}

export default Table