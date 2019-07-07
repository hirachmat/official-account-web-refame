import React, { Component } from 'react'
import '../../assets/frontend/css/landingpage/fitur.css'

class Fitur extends Component {
    state = {
        content: [
            {
                title: "Dashboard",
                content: "Anda dapat mengetahui informasi berdasarkan aktivitas yang terjadi pada Official Account Anda. Saat ini kita menyediakan data total anggota yang terdaftar dan jumlah grup yang tersedia pada Official Account Anda. Terlihat lima anggota yang paling aktif dan lima anggota yang baru bergabung.",
                icon: require("../../assets/frontend/images/dashboard.svg")
            },
            {
                title: "Profiling Anggota",
                content: "Anda dapat mengetahui penyebaran anggota berdasarkan lokasi, jenis kelamin, umur, agama, dan lain-lain. Anda juga dapat menambahkan data kustom yang dibutuhkan oleh perkumpulan Anda. Semua data ditampilkan dengan statistik dengan tampilan yang menarik.",
                icon: require("../../assets/frontend/images/profilling_anggota.svg")
            },
            {
                title: "Struktur Organisasi",
                content: "Struktur organisasi merupakan komponen yang sangat penting dalam suatu perkumpulan. Berdasarkan struktur organisasi, anggota mengetahui peran / jabatan dari anggota lain. Anda dapat menyusun struktur organisasi melalui Hi Official Account. Anda juga dapat mengatur leveling dari suatu posisi / jabatan.",
                icon: require("../../assets/frontend/images/struktur_organisasi.svg")
            },
            {
                title: "Kelola Pengelompokkan Anggota",
                content: "Jika perkumpulan Anda memiliki pengelompokkan keanggotaan (misalnya Bronze Member, Silver Member, dan Gold Member), maka Hi Official Account menyediakan tool yang tempat untuk Anda. Di Hi Official Account, Anda dapat membuat beberapa tipe anggota sesuai dengan kebutuhan Anda. Anda cukup mengelompokkan anggota-anggota Anda sesuai dengan tipe keanggotaan mereka.",
                icon: require("../../assets/frontend/images/kelola_anggota.svg")
            },
            {
                title: "Group Management",
                content: "Anda dapat membuat grup sebanyak apapun sesuai dengan kebutuhan perkumpulan Anda dengan jumlah anggota yang lebih banyak dari grup biasa. Anda juga dapat mengatur aksesibilitas dari grup Anda, apakah bisa diakses oleh seluruh anggota atau hanya untuk anggota-anggota tertentu saja.",
                icon: require("../../assets/frontend/images/group_management.svg")
            },
            {
                title: "File Management",
                content: "Unggah file-file yang berkaitan dengan kegiatan perkumpulan Anda. Anda juga dapat merequest anggota Anda untuk mengunggah file-file yang diperlukan perkumpulan Anda. Anda dapat mengatur ukuran file maksimal yang dapat diunggah oleh anggota, tipe file yang diperbolehkan, dan jumlah file yang dibutuhkan.",
                icon: require("../../assets/frontend/images/file_management.svg")
            },
            {
                title: "Broadcast message",
                content: "Tidak hanya sekedar mengirim pesan ke banyak anggota, Anda juga dapat menentukan sasaran pengiriman berdasarkan jenis kelamin, lokasi, agama, umur, dan lain-lain. Hal ini sangat mempermudah Anda dalam mengirim pesan broadcast.",
                icon: require("../../assets/frontend/images/broadcast_message.svg")
            },
            {
                title: "Role Management",
                content: "Anda dapat mengatur siapa saja dari anggota perkumpulan Anda untuk memiliki hak untuk mengakses Official Account Manager.",
                icon: require("../../assets/frontend/images/role_management.svg")
            },

        ]
    }

    renderContent() {
        return this.state.content.map((item, index) => (
            <div className="uk-width-1-1@s uk-width-1-2@m uk-width-1-2@l uk-grid-small body-item__box-content" uk-grid="true" key={ index }>
                <div className="uk-width-1-5 box-content__left-item">
                    <div className="left-item__svg-item">
                        <div className="left-item__icon-item">
                            <img src={ item.icon } alt="icon-fitur" className="icon-item__size"/>
                        </div>
                        <svg width="110px" height="124px" viewBox="0 0 130 144" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <title>Artboard</title>
                            <desc>Created with Sketch.</desc>
                            <g id="Artboard" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <g id="Group" fill="#00A046">
                                <rect id="Rectangle" x={5} y={32} width={120} height={80} rx={15} />
                                <rect id="Rectangle" transform="translate(65.000000, 72.000000) rotate(-60.000000) translate(-65.000000, -72.000000) " x={5} y={32} width={120} height={80} rx={15} />
                                <rect id="Rectangle" transform="translate(65.000000, 72.000000) rotate(60.000000) translate(-65.000000, -72.000000) " x={5} y={32} width={120} height={80} rx={15} />
                            </g>
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="uk-width-4-5 box-content__right-item">
                    <div className="right-item__title-content">
                        <p className="title-content__style">{ item.title }</p>
                    </div>
                    <div className="right-item__item-content">
                        <p className="item-content__style">{ item.content }</p>
                    </div>
                </div>
            </div>
        ))
    }

    render() {
        return(
            <div className="fitur" id="fitur">
                <div className="uk-height-large uk-background-cover uk-light uk-flex uk-flex-top parallax fitur__parallax-bg" uk-parallax="true" uk-img="true">
                    <div className="uk-container fitur__parallax__container">
                        <p className="fitur__parallax__title-item">Fitur</p>

                        <div className="uk-grid-small fitur__body-item" uk-grid="true">
                            { this.renderContent() }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Fitur