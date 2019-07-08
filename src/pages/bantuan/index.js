import React, { Component } from 'react'
import '../../assets/frontend/css/bantuan/bantuan.css'

class Bantuan extends Component {
    state = {
        content: [
            {
                section: "Perkumpulan yang dapat mendaftar adalah Organisasi, Lembaga Pemerintahan, Perusahaan, dan Yayasan. Seluruh perkumpulan wajib menunjukkan bukti eksistensinya berupa dokumen-dokumen yang harus disertakan saat mendaftar.",
                item: [
                    {
                        title: "Pendaftaran Untuk Organisasi",
                        title_item: "Untuk mendaftarkan organisasi Anda, dokumen yang perlu disiapkan adalah sebagai berikut :",
                        content_item: [
                            {
                                content: "NPWP Organisasi"
                            },
                            {
                                content: "Akta Pendirian Organisasi *"
                            },
                            {
                                content: "Jika organisasi berbadan hukum, maka lampirkan Surat Pengesahan Badan Hukum"
                            },
                            {
                                content: "Jika organisasi tidak berbadan hukum, maka lampirkan Surat Keterangan Terdaftar"
                            }
                        ] 
                    },
                    {
                        title: "Pendaftaran Untuk Perusahaan",
                        title_item: "Untuk mendaftarkan perusahaan Anda, dokumen yang perlu disiapkan adalah sebagai berikut :",
                        content_item: [
                            {
                                content: "NPWP Perusahaan"
                            },
                            {
                                content: "Akta Pendirian Perusahaan *"
                            },
                            {
                                content: "Surat Izin Usaha Perdagangan (SIUP)"
                            },
                            {
                                content: "Tanda Daftar Perusahaan (TDP)"
                            }
                        ] 
                    },
                    {
                        title: "Pendaftaran Untuk Yayasan",
                        title_item: "Untuk mendaftarkan yayasan Anda, dokumen yang perlu disiapkan adalah sebagai berikut :",
                        content_item: [
                            {
                                content: "NPWP Yayasan"
                            },
                            {
                                content: "Akta Pendirian Yayasan *"
                            },
                            {
                                content: "Surat Izin Operasional Yayasan"
                            },
                            {
                                content: "Tanda Daftar Yayasan (TDY)"
                            }
                        ] 
                    },
                    {
                        title: "Pendaftaran Untuk Lembaga Pemerintahan",
                        title_item: "Untuk mendaftarkan lembaga pemerintahan Anda, dokumen yang perlu disiapkan adalah sebagai berikut :",
                        content_item: [
                            {
                                content: "Surat Keterangan dari Pejabat Lembaga Pemerintahan Terkait"
                            }
                        ] 
                    }
                ]
            }
        ]
    }

    renderContent() {
        return this.state.content.map((item, index) => (
            <div key={ index }>
                <div className="card__box__content-item">
                    { item.section }
                </div>
                <div className="container__card__body-content">
                    <ul className="body-content__accordion" uk-accordion="collapsible: false">
                        { item.item.map((itemChild, indexChild) => (
                            <li className="accordion__item" key={ indexChild }>
                                <a className="uk-accordion-title accordion__item__title-item" href="#">{ itemChild.title }</a>
                                <div className="uk-accordion-content accordion__item__content-item">
                                    <p>{ itemChild.title_item }</p>
                                    <ol type="1" className="paragraf">
                                        { itemChild.content_item.map((itemContent, indexContent) => (
                                            <li className={ indexContent === 0 ? '' : 'mt10' } key={ indexContent }>{ itemContent.content }</li>
                                        )) }
                                    </ol>
                                </div>
                            </li>
                        )) }
                    </ul>
                </div>
            </div>
        ))
    }

    render() {
        return(
            <div className="bantuan" id="bantuan">
                <div className="uk-height-large uk-background-cover uk-light uk-flex uk-flex-top parallax bantuan__parallax-bg" uk-parallax="true" uk-img="true"></div>
                
                <div className="bantuan__container uk-container">
                    <div className="container__card">
                        <div className="uk-card uk-card-default uk-card-body card__box">
                            <div className="card__box__title-item">Bantuan</div>
                            <div className="card__box__line-dotted"></div>
                            
                            { this.renderContent() }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Bantuan