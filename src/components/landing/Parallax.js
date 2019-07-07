import React, { Component } from 'react'
import UIkit from 'uikit'
import '../../assets/frontend/css/landingpage/parallax.css'
import Logo from '../../assets/frontend/images/logo.svg'

class Parallax extends Component {
    state = {
        content: {
            left: [
                {
                    title: "",
                    image: require("../../assets/frontend/images/Beranda-01.png")
                },
                {
                    title: "",
                    image: require("../../assets/frontend/images/Beranda-02.png")
                },
                {
                    title: "",
                    image: require("../../assets/frontend/images/Beranda-03.png")
                },
                {
                    title: "",
                    image: require("../../assets/frontend/images/Beranda-04.png")
                }
            ],
            right: [
                {
                    title: "Tentang Calon klien Hi OA",
                    content: "Segala kebutuhan operasional organisasi, perusahaan, yayasan, komunitas, bahkan lembaga pemerintahan dapat Anda dikelola menggunakan Hi Official Account. Segera daftarkan perkumpulan Anda dan maksimalkan aktivitas operasional perkumpulan Anda bersama Hi Official Account."
                },
                {
                    title: "Tentang mengelola anggota",
                    content: "Jumlah anggota perkumpulan Anda 1000 orang? Atau 100.000 orang? Atau bahkan lebih? Tidak perlu khawatir. Ajak semua anggota Anda untuk bergabung ke dalam Official Account Anda. Kami membuat jumlah anggota dalam satu Official Account tidak terbatas."
                },
                {
                    title: "Tentang sharing file",
                    content: "Lihat foto-foto dokumentasi acara sosial komunitas Anda, request file proposal ke tim marketing, mengatur aksesibilitas file-file penting, dengan kapasitas yang besar, semua file yang Anda butuhkan dapat dikelola di satu tempat."
                },
                {
                    title: "Tentang struktur organisasi",
                    content: "Perubahan struktur organisasi, informasi pergantian ketua umum, kenaikan jabatan di perusahaan, semua aktivitas perkumpulan bisa Anda bagikan kepada seluruh anggota / karyawan / pengurus perkumpulan Anda."
                }
            ]
        }
    }

    handleAutoPlaySlideshow() {
        const sliderLeft = document.getElementById('sliderLeft')
        UIkit.slideshow(sliderLeft).startAutoplay()
        const sliderRigth = document.getElementById('sliderRight')
        UIkit.slideshow(sliderRigth).startAutoplay()
    }

    renderLeftContent = () => {
        return this.state.content.left.map((item, index) => (
            <li key={index} onClick={ this.handleAutoPlaySlideshow } onDrag={ this.handleAutoPlaySlideshow }>
                <img src={ item.image } alt="img-slider" className="left-item__item-slider"/>
            </li>
        ))
    }

    renderRightContent = () => {
        return this.state.content.right.map((item, index) => (
            <li className="body-item__item" key={index} onClick={ this.handleAutoPlaySlideshow } onDrag={ this.handleAutoPlaySlideshow }>
                <p>{ item.content }</p>
            </li>
        ))
    }

    render() {
        return(
            <div className="uk-height-large uk-background-cover uk-light uk-flex uk-flex-top parallax parallax-bg" uk-parallax="true" uk-img="true">
                <div className="parallax__bg-shadow"></div>
                <div className="uk-container uk-margin-auto uk-text-center uk-margin-auto-vertical parallax__box-content" uk-grid="true">

                    <div id="sliderLeft" className="uk-width-1-1@s uk-width-3-5@m uk-width-3-5@l box-content__left-item uk-visible@m" 
                        uk-slideshow="autoplay: true; autoplay-interval: 5000; draggable: false; pause-on-hover: false; min-height: 500; max-height: 600; ratio: 7:3; finite: false; animation: uk-animation-slide-left-medium; velocity: 0.2; sets: true">
                        <ul className="uk-slideshow-items">
                            { this.renderLeftContent() }
                        </ul>
                    </div>

                    <div id="sliderLeft" className="uk-width-1-1@s uk-width-3-5@m uk-width-3-5@l box-content__left-item uk-hidden@m mt-custom" 
                        uk-slideshow="autoplay: true; autoplay-interval: 5000; draggable: false; pause-on-hover: false; min-height: 300; max-height: 300; ratio: 7:3; finite: false; animation: uk-animation-slide-left-medium; velocity: 0.2; sets: true">
                        <ul className="uk-slideshow-items">
                            { this.renderLeftContent() }
                        </ul>
                    </div>


                    <div className="uk-width-1-1@s uk-width-2-5@m uk-width-2-5@l box-content__right-item uk-visible@m">
                        <div className="right-item__header-item">
                            <img src={ Logo } alt="logo-hiapp"/><span className="header-item__title-item">OFFICIAL ACCOUNTS</span>
                        </div>
                        <div id="sliderRight" className="right-item__body-item"
                            uk-slideshow="autoplay: true; autoplay-interval: 5000; draggable: false; pause-on-hover: false; min-height: 150; max-height: 150; ratio: 7:3; finite: false; animation: uk-animation-slide-left-medium; velocity: 0.2; sets: true">
                            <ul className="uk-slideshow-items">
                                { this.renderRightContent() }
                            </ul>
                        </div>
                        <div className="right-item__footer-item">
                            <button className="uk-button footer-item__button-register">Daftar</button>
                        </div>
                    </div>

                    <div className="uk-width-1-1@s uk-width-2-5@m uk-width-2-5@l box-content__right-item uk-hidden@m mb-custom">
                        <div className="right-item__header-item">
                            <img src={ Logo } alt="logo-hiapp"/><span className="header-item__title-item">OFFICIAL ACCOUNTS</span>
                        </div>
                        <div id="sliderRight" className="right-item__body-item"
                            uk-slideshow="autoplay: true; autoplay-interval: 5000; draggable: false; pause-on-hover: false; min-height: 150; max-height: 150; ratio: 7:3; finite: false; animation: uk-animation-slide-left-medium; velocity: 0.2; sets: true">
                            <ul className="uk-slideshow-items">
                                { this.renderRightContent() }
                            </ul>
                        </div>
                        <div className="right-item__footer-item">
                            <button className="uk-button footer-item__button-register">Daftar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Parallax