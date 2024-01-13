import React, { useContext, useEffect, useRef, useState } from 'react'
import { DataContext } from '../../context/DataContext'

const Toggle = ({disabled}) => {
    
    const data = useContext(DataContext)

    
    return (
        <div className="toggle">
            <label className="switchBtn">
                <input disabled={disabled} checked={data.input_checked} onChange={()=>{data.set_input_checked((prev)=>!prev)}}  type="checkbox" />
                <div className="slide"></div>
            </label>
            <div>Sólo eventos destacados</div>
        </div>
    )
}

export default Toggle 