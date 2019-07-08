import React, { Component } from 'react'
import '../../assets/frontend/css/daftar/daftar.css'
import Select from 'react-select'

class Daftar extends Component {
    state = {
        listCategory: [
            { label: "A", value: 'A' },
            { label: "B", value: 'B' },
            { label: "C", value: 'C' },
            { label: "D", value: 'D' },
        ],
        phone_code: '62',
        form: {
            type: '',
            type_code: '',
            section: {
                organisasi: {
                    name: '',
                    category: '',
                    category_code: '',
                    description: '',
                    address: '',
                    location: {
                        country: '',
                        province: '',
                        city: '',
                        district: '',
                        village: '',
                        postal_code: ''
                    },
                    phone: '',
                    email: '',
                    tanggal_berdiri: new Date()
                },
                documents: {
                    npwp: '',
                    akta_pendirian: '',
                    surat_izin_usaha_perdagangan: '',
                    tanda_daftar: '',
                    jenis: 'Tidak Berbadan Hukum',
                    surat_pengesahan_badan_hukum: '',
                    surat_keterangan_terdaftar: '',
                    surat_keterangan_pejabat_lembaga: ''
                },
                pic: {
                    full_name: '',
                    email: '',
                    handphone: '',
                    role: ''
                }
            }
        },
        formErrors: {
            type: '',
            section: {
                organisasi: {
                    name: '',
                    category: '',
                    description: '',
                    address: '',
                    location: {
                        country: '',
                        province: '',
                        city: '',
                        district: '',
                        village: '',
                        postal_code: ''
                    },
                    phone: '',
                    email: '',
                    tanggal_berdiri: ''
                },
                documents: {
                    npwp: '',
                    akta_pendirian: '',
                    surat_izin_usaha_perdagangan: '',
                    tanda_daftar: '',
                    jenis: '',
                    surat_pengesahan_badan_hukum: '',
                    surat_keterangan_terdaftar: '',
                    surat_keterangan_pejabat_lembaga: '',
                    surat_izin_operasional: ''
                },
                pic: {
                    full_name: '',
                    email: '',
                    handphone: '',
                    role: ''
                }
            }
        },
        nameFile: {
            akta_pendirian: '',
            surat_izin_usaha_perdagangan: '',
            tanda_daftar: '',
            surat_pengesahan_badan_hukum: '',
            surat_keterangan_pejabat_lembaga: '',
            surat_izin_operasional: ''
        },
        formValid: false,
        maxFileSize: 5,
        errorFocusTo: "#daftar",
        imagePreview: "",
        showModal: false,
        isLoading: false,
        now: Date.now(),
        timeout: Date.now(),
        validOtp: true,
        isRegisteredHi: false
    }

    render() {
        return(
            <div className="daftar" id="daftar">
                <div className="uk-height-large uk-background-cover uk-light uk-flex uk-flex-top parallax daftar__parallax-bg" uk-parallax="true" uk-img="true"></div>
            
                <div className="daftar__container uk-container">
                    <div className="container__card">
                        <div className="uk-card uk-card-default uk-card-body card__box">
                            <div className="card__box__title-item">Pendaftaran</div>
                            <div className="card__box__line-dotted"></div>
                            <div className="card__box__content-item">
                                Kami ingin memastikan bahwa perkumpulan yang terdaftar di Hi Official Account adalah perkumpulan yang valid dan mempunyai bukti eksistensi. Silahkan isi formulir ini dengan data yang valid. Setiap data perkumpulan yang masuk akan kami review.
                            </div>
                            <form className="uk-form-stacked card__box__form">
                                <div className="uk-margin">
                                    <label className="uk-form-label form__label-item" htmlFor="tipe">Tipe</label>
                                    <div className="uk-form-controls">
                                        <Select
                                            placeholder="Pilih Tipe yang Sesuai"
                                            className="basic-single"
                                            classNamePrefix="select"
                                            isSearchable={false}
                                            name="type"
                                            options={this.props.listType}
                                            onChange={ (e) => this.handleTypeChange(e) }
                                        />
                                    </div>
                                    <p className="uk-has-error">{ this.state.formErrors.type !== "" ? `type ${ this.state.formErrors.type }` : "" }</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Daftar