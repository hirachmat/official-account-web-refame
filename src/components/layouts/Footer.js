import React, { Component } from 'react'
import '../../assets/frontend/css/footer/footer.css'
import AppStore from '../../assets/frontend/images/btn_appstore.png'
import PlayStore from '../../assets/frontend/images/btn_playstore.png'
import IG from '../../assets/frontend/images/instagram.png'
import Twitter from '../../assets/frontend/images/twitter.png'
import FB from '../../assets/frontend/images/facebook.png'

class Footer extends Component {
    state = {}

    render() {
        return(
            <div className="footer">
                <div className="footer__download-container uk-container">
                    <p className="download-container__title-item">It's Free <span>Download Hi App now</span></p>
                    <div className="download-container__download-link">
                        <a href="https://itunes.apple.com/id/app/hi-app/id1443988108?l=id&mt=8" target="_blank" rel="noopener noreferrer" className="download-link__link">
                            <img src={ AppStore } className="download-link__appstore-btn" alt="appstore-icon"/>
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=id.hiapp.hiapp" target="_blank" rel="noopener noreferrer" className="download-link__link">
                            <img src={ PlayStore } className="download-link__playstore-btn" alt="playstore-icon"/>
                        </a>
                    </div>
                </div>
                <div className="footer__information-hiapp uk-container">
                    <div className="uk-grid-small information-hiapp__body-item" uk-grid="true">
                        <div className="uk-width-1-1@s uk-width-1-3@m uk-width-1-3@l information-hiapp__container">
                            <div className="information-hiapp__container__title-content">
                                <p className="information-hiapp__container__title-item">Follow Us on</p>
                            </div>
                            
                            <div className="information-hiapp__container__content-item">
                                <a href="#beranda" className="content-item__sosmed-container">
                                    <img src={ IG } alt="icon-ig" className="content-item__sosmed-icon"/>
                                </a>
                                <a href="#beranda" className="content-item__sosmed-container">
                                    <img src={ Twitter } alt="icon-twitter" className="content-item__sosmed-icon"/>
                                </a>
                                <a href="#beranda" className="content-item__sosmed-container">
                                    <img src={ FB } alt="icon-fb" className="content-item__sosmed-icon"/>
                                </a>
                            </div>
                        </div>
                        <div className="uk-width-1-1@s uk-width-1-3@m uk-width-1-3@l information-hiapp__container">
                            {/* <div className="information-hiapp__container__title-item">Headquarter Office</div> */}
                            <div className="information-hiapp__container__title-content">
                                <p className="information-hiapp__container__title-item">Headquarter Office</p>
                            </div>
                            <div className="information-hiapp__container__content-item">The East Tower. 33th Floor Unit 1-5 Jalan Dr. Ide Anak Agung Gede Agung Kav E3.2 No.1. Kuningan Timur Setiabudi.</div>
                        </div>
                        <div className="uk-width-1-1@s uk-width-1-3@m uk-width-1-3@l information-hiapp__container">
                            {/* <div className="information-hiapp__container__title-item">Research And Development</div> */}
                            <div className="information-hiapp__container__title-content">
                                <p className="information-hiapp__container__title-item">Research And Development</p>
                            </div>
                            <div className="information-hiapp__container__content-item">Jalan Lempong Sari No 3F Sariharjo, Ngaglik, Kabupaten Sleman.</div>
                        </div>
                    </div>
                </div>
                <div className="uk-container footer__line"></div>
                <div className="uk-container footer__term-condition">
                    <div className="uk-grid-small term-condition__container uk-visible@m" uk-grid="true">
                        <div className="uk-width-1-2@s uk-width-1-2@m uk-width-1-2@l left-item__content-item">© Hak Cipta 2019 - PT. Hello Kreasi Indonesia</div>
                        <div className="uk-width-1-2@s uk-width-1-2@m uk-width-1-2@l container__right-item">
                            <div className="right-item__content-item mr15">Privacy Policy</div>
                            <div className="right-item__content-item">Terms of Use</div>
                        </div>
                    </div>

                    <div className="uk-grid-small term-condition__container uk-hidden@m" uk-grid="true">
                        <div className="uk-width-1-2@s uk-width-1-2@m uk-width-1-2@l left-item__content-item-custom">© Hak Cipta 2019 - PT. Hello Kreasi Indonesia</div>
                        <div className="uk-width-1-2@s uk-width-1-2@m uk-width-1-2@l container__right-item-custom">
                            <div className="right-item__content-item mr15">Privacy Policy</div>
                            <div className="right-item__content-item">Terms of Use</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer