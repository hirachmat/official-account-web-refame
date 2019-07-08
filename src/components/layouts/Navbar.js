import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import '../../assets/frontend/css/navbar/navbar.css'
import LogoWhite from '../../assets/frontend/images/logo_hiapp_white.png'
import LogoGreen from '../../assets/frontend/images/logo_hiapp_green.png'

class Navbar extends Component {
    state = {
        scrollTo: '#beranda',
        offsetTo: 0,
        isSticky: false
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillMount(){
        window.removeEventListener('scroll', this.handleScroll)
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.location.pathname !== prevProps.location.pathname){
            setTimeout(() => {
                this.setState({ scrollTo: localStorage.getItem('scrollTo'), offsetTo: localStorage.getItem('offsetTo') }, () => {
                    let scrollTo = document.getElementById('scrollTo')
                    scrollTo.click()

                    localStorage.removeItem('scrollTo')
                    localStorage.removeItem('offsetTo')
                })
            }, 100)
        }
    }

    handleScroll = () => {
        if(window.scrollY > 70)
            this.setState({ isSticky: true })
        else
            this.setState({ isSticky: false })    
    }

    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'uk-active' : '';
    }

    handleChangePage = (path, scrollTo, offsetTo) => {
        localStorage.setItem('scrollTo', scrollTo)
        localStorage.setItem('offsetTo', offsetTo)

        this.props.history.push(path)
    }

    goToWebsite = (e) => {
        e.preventDefault()
        window.location.href = process.env.REACT_APP_HOST_OAM
    }

    render() {
        return(
            <div className="navbar" id="beranda">
                <nav className={`uk-navbar-container container__wrapper ${ this.state.isSticky ? 'uk-light padding-custom' : 'uk-navbar-transparent padding-custom' }`} uk-navbar="true" uk-sticky="true">
                    <div className="uk-container navbar__container">
                        <div className="uk-navbar-left wrapper__left-item">
                            <ul className="uk-navbar-nav">
                                <li>
                                    { this.state.isSticky ? (
                                        <a href="#beranda" uk-scroll="true">
                                            <img src={ LogoGreen } width="200px" height="200px" alt="hiapp-logo"/>
                                        </a>
                                    ) : (
                                        <img src={ LogoWhite } width="200px" height="200px" alt="hiapp-logo"/>
                                    ) }
                                    
                                </li>
                            </ul>
                        </div>
                        <div className="uk-navbar-center wrapper__center-item"></div>
                        <div className="uk-navbar-right wrapper__right-item">

                            { this.props.location.pathname === '/' ? (
                                <ul className="uk-navbar-nav uk-visible@l" uk-scrollspy-nav="closest: li; scroll: true; offset: 100">
                                    <li><a href="#beranda" className={`${ this.state.isSticky ? 'right-item__item-title-green' : 'right-item__item-title' }`} uk-scroll="true">Beranda</a></li>
                                    <li><a href="#manfaat" className={`${ this.state.isSticky ? 'right-item__item-title-green' : 'right-item__item-title' }`} uk-scroll="true" offset="90">Manfaat</a></li>
                                    <li><a href="#fitur" className={`${ this.state.isSticky ? 'right-item__item-title-green' : 'right-item__item-title' }`} uk-scroll="true" offset="60">Fitur</a></li>
                                    <li className={ this.getNavLinkClass("/hubungi-kami") }><a href="#hubungikami" className={`${ this.state.isSticky ? 'right-item__item-title-green' : 'right-item__item-title' }`} onClick={ () => this.handleChangePage('/hubungi-kami', '#hubungikami', 0) }>Hubungi Kami</a></li>
                                    <li className={ this.getNavLinkClass("/bantuan") }><a href="#bantuan" className={`${ this.state.isSticky ? 'right-item__item-title-green' : 'right-item__item-title' }`} onClick={ () => this.handleChangePage('/bantuan', '#bantuan', 0) }>Bantuan</a></li>
                                    <li className={ this.getNavLinkClass("/daftar") }><a href="#daftar" className={`${ this.state.isSticky ? 'right-item__item-title-green' : 'right-item__item-title' }`} onClick={ () => this.handleChangePage('/daftar', '#daftar', 0) }>Daftar</a></li>
                                    <li><a href="#" className={`${ this.state.isSticky ? 'right-item__item-title-green' : 'right-item__item-title' }`} onClick={(e) => this.goToWebsite(e)}>Masuk</a></li>
                                </ul>
                            ) : (
                                <ul className="uk-navbar-nav uk-visible@l" uk-scrollspy-nav="closest: li; scroll: true; offset: 100">
                                    <div className="li-navbar-custom"><a href="#beranda" className={`${ this.state.isSticky ? 'right-item__item-title-green' : 'right-item__item-title' } no-underline`} onClick={ () => this.handleChangePage('/', '#beranda', 0) }>Beranda</a></div>
                                    <div className="li-navbar-custom"><a href="#manfaat" className={`${ this.state.isSticky ? 'right-item__item-title-green' : 'right-item__item-title' } no-underline`} onClick={ () => this.handleChangePage('/', '#manfaat', 90) }>Manfaat</a></div>
                                    <div className="li-navbar-custom"><a href="#fitur" className={`${ this.state.isSticky ? 'right-item__item-title-green' : 'right-item__item-title' } no-underline`} onClick={ () => this.handleChangePage('/', '#fitur', 60) }>Fitur</a></div>
                                    <li className={ this.getNavLinkClass("/hubungi-kami") }><a href="#hubungikami" className={`${ this.state.isSticky ? 'right-item__item-title-green' : 'right-item__item-title' }`} onClick={ () => this.handleChangePage('/hubungi-kami', '#hubungikami', 0) }>Hubungi Kami</a></li>
                                    <li className={ this.getNavLinkClass("/bantuan") }><a href="#bantuan" className={`${ this.state.isSticky ? 'right-item__item-title-green' : 'right-item__item-title' }`} onClick={ () => this.handleChangePage('/bantuan', '#bantuan', 0) }>Bantuan</a></li>
                                    <li className={ this.getNavLinkClass("/daftar") }><a href="#daftar" className={`${ this.state.isSticky ? 'right-item__item-title-green' : 'right-item__item-title' }`} onClick={ () => this.handleChangePage('/daftar', '#daftar', 0) }>Daftar</a></li>
                                    <li><a href="#" className={`${ this.state.isSticky ? 'right-item__item-title-green' : 'right-item__item-title' }`} onClick={(e) => this.goToWebsite(e)}>Masuk</a></li>
                                </ul>
                            ) }

                            <div className="uk-hidden@l">
                                <a href="#" uk-toggle="target: #offcanvas-flip">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 224 224" width="30px" height="30px"><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ 'mixBlendMode': 'normal' }}>
                                        <path d="M0,224v-224h224v224z" fill="none"/>
                                            <g fill={ this.state.isSticky ? '#12b505' : '#fff' }>
                                                <g id="surface1">
                                                    <path d="M0,33.6v22.4h224v-22.4zM0,100.8v22.4h224v-22.4zM0,168v22.4h224v-22.4z"/>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>

                <div id="offcanvas-flip" uk-offcanvas="flip: true; overlay: true">
                    <div className="uk-offcanvas-bar">
                        {/* <button className="uk-offcanvas-close" type="button" uk-close /> */}
                        <ul className="uk-nav uk-nav-default">
                            <li className="uk-active"><a href="#beranda" uk-scroll="true">Beranda</a></li>
                            <li className="uk-active divider"><a href="#manfaat" uk-scroll="true" offset="90">Manfaat</a></li>
                            <li className="uk-active divider"><a href="#fitur" uk-scroll="true" offset="60">Fitur</a></li>
                            <li className="uk-active divider"><a href="/hubungi-kami">Hubungi Kami</a></li>
                            <li className="uk-active divider"><a href="/bantuan">Bantuan</a></li>
                            <li className="uk-active divider"><a href="/daftar">Daftar</a></li>
                            <li className="uk-active divider"><a href="/masuk" onClick={(e) => this.goToWebsite(e)}>Masuk</a></li>
                        </ul>
                    </div>
                </div>

                <a href={ this.state.scrollTo } id="scrollTo" uk-scroll="true" offset={ this.state.offsetTo }> </a>
            </div>
        )
    }
}

export default withRouter(Navbar)