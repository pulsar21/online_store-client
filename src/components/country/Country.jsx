import { Select } from 'antd';
import React from 'react'
import '../../assets/scss/country/Country.scss';
import ImageUK from '../../assets/img/countries/flag-uk.png';
import ImageRussia from '../../assets/img/countries/flag-rus.png';
import ImageKazakhstan from '../../assets/img/countries/flag-kz.png';

const { Option } = Select;

const Country = () => {
   const language = 'en';
   const handleChange = () => {

   };
    return <>
       <div className="country">
            <Select
                labelInValue
                defaultValue={language === 'en' && {value: <span role="img" aria-label="en" className={`country__thumb`}>
                    <img src={ImageUK} alt="EN"/>
                </span> } || language === 'ru' && {value: <span role="img" aria-label="ru" className={`country__thumb`}>
                    <img src={ImageRussia} alt="EN"/>
                </span> } || language === 'kz' && {value: <span role="img" aria-label="kz" className={`country__thumb`}>
                    <img src={ImageKazakhstan} alt="EN"/>
                </span> }}
                style={{width: 120}}
                onChange={handleChange}
                className="country__select"
                >
                <Option value="en">
                    <div className={`demo-option-label-item`}>
                        <span role="img" aria-label="en" className="country__thumb">
                            <img src={`${ImageUK}`} alt="EN"/>
                        </span>
                    </div>
                </Option>
                <Option value="ru">
                    <div className="demo-option-label-item">
                        <span role="img" aria-label="ru" className="country__thumb">
                            <img src={ImageRussia} alt="RU"/>
                        </span>
                    </div>
                </Option>
                <Option value="kz">
                    <div className="demo-option-label-item">
                        <span role="img" aria-label="kz" className="country__thumb">
                            <img src={ImageKazakhstan} alt="KZ"/>
                        </span>
                    </div>
                </Option>
            </Select>
        </div>
    </>;
};

export default Country;
