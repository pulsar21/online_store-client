import React from 'react'
import '../../assets/scss/loader/DataLoader.scss';

const DataLoader = () => {
    return <>
        <div className="data-loader">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </>
}

export default DataLoader
