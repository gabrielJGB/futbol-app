import React from 'react'

const Penalties = ({info}) => {
    return (
        <>
            {
                "shootout" in info &&
                <div className='penalties'>
                    <div className="title">
                        <h3>Penales</h3>
                    </div>

                    <div className="teams">
                        <div className='team'>

                            {info.shootout[0].team}
                        </div>
                        <div className='team'>
                            {info.shootout[1].team}
                        </div>
                    </div>

                    <div className="shootout-container">

                        <div className="home">
                            {
                                info.shootout[0].shots.map((shot, i) => (
                                    <div key={i} className="shoot">
                                        <div >{shot.shotNumber}</div>
                                        <div className="circle" style={{ backgroundColor: (shot.didScore ? "lime" : "red") }}></div>
                                        <div className="name">{shot.player}</div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="away">
                            {
                                info.shootout[1].shots.map((shot, i) => (
                                    <div key={i} className="shoot" style={{ justifyContent: "right" }}>
                                        <div className="name">{shot.player}</div>
                                        <div className="circle" style={{ backgroundColor: (shot.didScore ? "lime" : "red") }}></div>
                                        <div className="shot-number">{shot.shotNumber}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            }</>
    )
}

export default Penalties