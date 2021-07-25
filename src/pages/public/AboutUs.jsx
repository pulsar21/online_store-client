import { Image, Skeleton } from 'antd';
import React from 'react'
import '../../assets/scss/main/AboutUs.scss';
import TeamMemberImg from '../../assets/img/auth/avatar.jpg';

const AboutUs = ({loading}) => {
    return <>
        <section className="about">
            <Skeleton loading={loading}>
                <div className="about__us">
                    <div className="about__slider">
                        <h2 className="title">
                            О нас
                        </h2>
                        <p className="desc">
                            Компания GoodPlaces.kz основана в мае 2020 года.
                            Наша цель сделать процесс бронирования и аренды помещений максимально удобным, быстрым и безопасным.
                        </p>
                    </div>
                </div>
            </Skeleton>
            <Skeleton loading={loading}>
                <div className="about__map">
                    <h2 className="title">
                        Где мы находимся
                    </h2>
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2501.2027809469455!2d51.30478651596311!3d51.178485342519124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4171bc801f7e6723%3A0x83e00399d62643fb!2z0JfQsNC_0LDQtNC90L4t0JrQsNC30LDRhdGB0YLQsNC90YHQutC40Lkg0LDQs9GA0LDRgNC90L4t0YLQtdGF0L3QuNGH0LXRgdC60LjQuSDRg9C90LjQstC10YDRgdC40YLQtdGC!5e0!3m2!1sru!2skz!4v1620338061312!5m2!1sru!2skz" 
                        loading="lazy"
                    >
                    </iframe>
                </div>
            </Skeleton>
            <Skeleton loading={loading}>
                <div className="about__desc">
                    <p>
                        Наша команда разработала для этих целей Веб-сервис и мобильное приложение, которые позволяют быстро бесконтактно арендовать жилье в любое время суток при помощи умных замков.
                    </p>
                    <p>
                        Для тех, кому привычней старый способ поиска жилья, действует круглосуточный колл-центр.
                    </p>
                    <p>
                        Более 6000 тысяч людей пользуются нашим сервисом и приложением. Являясь IT-стартапом, в феврале 2021 года мы привлекли свыше $170 000 инвестиций в развитие.
                    </p>
                    <p>
                        Новые надежные технологии, сильные учредители и команда, уставной капитал компании 42 млн. тенге позволяют нам гарантировать надежную и безопасную аренду.
                    </p>
                </div>
            </Skeleton>
            <Skeleton loading={loading}>
                <div className="about__team">
                    <h2 className="title">Наша команда</h2>
                    <div className="cards about__team__cards">
                        <div className="card about__team__card about__team__card-right">
                            <div className="about__team__info">
                                <h3 className="about__team__name">Каныш Тулеушин</h3>
                                <p className="about__team__skill">Основатель</p>
                                <a href="#" className="about__team__email">zkaragoyshin1@gmail.com</a>
                            </div>
                            <div className="about__team__img">
                                <Image src={TeamMemberImg}/>
                            </div>
                        </div>
                        <div className="card about__team__card">
                            <div className="about__team__info about__team__info-order">
                                <h3 className="about__team__name">Каныш Тулеушин</h3>
                                <p className="about__team__skill">Основатель</p>
                                <a href="#" className="about__team__email">zkaragoyshin1@gmail.com</a>
                            </div>
                            <div className="about__team__img about__team__img-order">
                                <Image src={TeamMemberImg}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Skeleton>
        </section>
    </>
}

export default AboutUs
