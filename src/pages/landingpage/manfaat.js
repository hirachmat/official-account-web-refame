import React, { Component } from 'react'
import '../../assets/frontend/css/landingpage/manfaat.css'

class Manfaat extends Component {
    state = {
        content: [
            {
                title: "Koordinasi Tim Lebih Baik",
                content: "Setiap divisi pada perkumpulan Anda dapat memiliki grup nya sendiri. Memberikan tugas kepada anggota dan meminta mereka mengunggah hasil kerjanya ke pengelolaan file perkumpulan Anda. Semua pekerjaan dapat dimonitor dan dikelola dengan baik.",
                icon: require("../../assets/frontend/images/innovate_icon.png")
            },
            {
                title: "Ketahui Tingkat Keaktifan Anggota Anda",
                content: "Hi Official Account akan menampilkan data aktivitas-aktivitas anggota selama menggunakan Official Account. Anda dapat menggunakan data ini untuk menilai keaktifan perkumpulan Anda dan memberikan reward kepada anggota yang paling aktif dan paling banyak berkontribusi terhadap perkumpulan Anda.",
                icon: require("../../assets/frontend/images/growth_icon.png")
            },
            {
                title: "Semakin Dekat Dengan Anggota",
                content: "Mendata seluruh anggota dengan data yang valid, membuat grup dengan jumlah anggota tak terbatas, mengetahui penyebaran anggota di seluruh dunia, dan berkomunikasi sesama anggota sekarang lebih mudah. Tinggalkan proses manual yang menyita waktu.",
                icon: require("../../assets/frontend/images/impact_icon.png")
            }
        ]
    }

    renderContent() {
        return this.state.content.map((item, index) => (
            <div className="uk-width-1-1@s uk-width-1-3@m uk-width-1-3@l" key={ index }>
                <div className="uk-card body-item__box">
                    <img src={ item.icon } className="box__icon-item" alt="logo"/>
                    <div className="uk-card-body box__body-item">
                        <p className="body-item__title-item">{ item.title }</p>
                        <div className="body-item__content-item">{ item.content }</div>
                    </div>
                </div>
            </div>
        ))
    }

    render() {
        return(
            <div className="uk-container manfaat" id="manfaat">
                <p className="manfaat__title-item">Manfaat</p>

                <div className="uk-grid-match uk-grid-small manfaat__body-item" uk-grid="true">
                    { this.renderContent() }
                </div>
            </div>
        )
    }
}

export default Manfaat