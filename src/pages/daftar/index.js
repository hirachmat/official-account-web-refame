import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../assets/frontend/css/daftar/daftar.css'
import Select from 'react-select'
import * as typeActions from '../../actions/typeActions'
import * as locationActions from '../../actions/locationActions'
import axios from 'axios'
import API from '../../helper/api'
import DataSection from '../../components/daftar/DataSection'
import Perusahaan from '../../components/daftar/Perusahaan'
import Organisasi from '../../components/daftar/Organisasi'
import LembagaPemerintahan from '../../components/daftar/LembagaPemerintahan'
import Yayasan from "../../components/daftar/Yayasan"
import UIkit from "uikit"
import PinInput from "react-pin-input"
import moment from "moment"
import InputText from '../../components/form/inputText'
import InputNumber from '../../components/form/inputNumber'

class Daftar extends Component {
    picFullName = ""
    picEmail = ""
    state = {
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
            surat_keterangan_terdaftar: '',
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
        isRegisteredHi: false,
        counterResendOtp: 0,
        maxResendOtp: 5,
        validateOtpReq: false
    }

    componentDidMount() {
        this.props.GetTypeList().catch(() => {
            alert('Gagal mengambil data list type')
        })
    }

    handleTypeChange(e) {
        const newState = { ...this.state }

        newState.form.type = e.label
        newState.form.type_code = e.value

        this.setState(newState, () => {
            this.props.GetCountryList('indonesia').catch(() => {
                alert("Gagal mengambil data list negara")
            })
            this.renderTypeSection(e.label)
            this.clearValFileInput()
        })
    }

    renderTypeSection(value) {
        switch(value) {
            case 'Organisasi':
                return <Organisasi propsData={ this.state } handleChildPropsChange={ this.handleChildPropsChange } handleChildShowPreview={ this.handleChildShowPreview } handleInputComponent={ this.handleInputComponent } handleInputSelectComponent={ this.handleInputSelectComponent } handleInputFileComponent={ this.handleInputFileComponent }/>
            case 'Perusahaan':
                return <Perusahaan propsData={ this.state } handleChildPropsChange={ this.handleChildPropsChange } handleChildShowPreview={ this.handleChildShowPreview } handleInputComponent={ this.handleInputComponent } handleInputSelectComponent={ this.handleInputSelectComponent } handleInputFileComponent={ this.handleInputFileComponent }/>
            case 'Lembaga Pemerintahan':
                return <LembagaPemerintahan propsData={ this.state } handleChildPropsChange={ this.handleChildPropsChange } handleChildShowPreview={ this.handleChildShowPreview } handleInputComponent={ this.handleInputComponent } handleInputSelectComponent={ this.handleInputSelectComponent } handleInputFileComponent={ this.handleInputFileComponent }/>
            case 'Yayasan':
                return <Yayasan propsData={ this.state } handleChildPropsChange={ this.handleChildPropsChange } handleChildShowPreview={ this.handleChildShowPreview } handleInputComponent={ this.handleInputComponent } handleInputSelectComponent={ this.handleInputSelectComponent } handleInputFileComponent={ this.handleInputFileComponent }/>
            default:
              return null
        }
    }

    clearValFileInput() {
        const newState = { ...this.state }

        Object.keys(this.state.form.section.documents).forEach(item => {
            newState.form.section.documents[item] = ''
            newState.formErrors.section.documents[item] = ''
        })

        this.setState(newState)
    }

    handleChildPropsChange = (e, stateName, ruleValidate, required, typeInput, sectionName) => {
        if(typeInput === 'text')
            this.handleInput(e, stateName, ruleValidate, required, sectionName)
        else if(typeInput === 'select')
            this.handleSelectChange(e, stateName, ruleValidate, required, sectionName)
        else if(typeInput === 'number')
            this.handleInputNumber(e, stateName, ruleValidate, required, sectionName)
        else if(typeInput === 'file')
            this.handleInputFileChange(e, stateName, ruleValidate, required, sectionName)
    }

    handleDateChange = (nameState, value) => {
        const newState = { ...this.state }
        newState.form.section.organisasi[nameState] = value

        this.setState(newState)
    }

    handphoneParse(value) {
        return parseInt(value.substr(0, 1)) === 0 ? `${this.state.phone_code}${value.substr(1, value.length)}` : `${this.state.phone_code}${value}`
    }

    handleInputComponent = (data) => {
        const { formValid, validate, name, value, section } = data
        const newState = { ...this.state }
        newState.formErrors = validate.formErrors
        newState.formValid = formValid
        newState.form.section[section][name] = value

        const otpModal = document.getElementById("otpModal")

        if(name === "handphone") {
            if(data.message === "success"){
                // console.log("buka modal")
                UIkit.modal(otpModal).show()
                this.picFullName = data.picFullName
                this.picEmail = data.picEmail
                newState.isRegisteredHi = data.isRegisteredHi
                newState.timeout = data.timeout
                newState.now = Date.now()
                Object.keys(newState.form.section.pic).forEach(item => {
                    if(item !== "handphone")
                        newState.form.section.pic[item] = ""
                })
                this.interval = setInterval(() => {
                    this.setState({ now: Date.now() })
                }, 500)
            }else{
                // console.log("tutup modal")
                UIkit.modal(otpModal).hide()
                this.picFullName = data.picFullName
                this.picEmail = data.picEmail
                newState.isRegisteredHi = data.isRegisteredHi
                newState.timeout = data.timeout
                newState.now = Date.now()
                newState.formErrors.section.pic.handphone = data.errorMessage
                newState.validateOtpReq = data.validateOtpReq
                Object.keys(newState.form.section.pic).forEach((item) => {
                    if(item !== "handphone") {
                        newState.form.section.pic[item] = ""
                        newState.formErrors.section.pic[item] = ""
                    }
                })
                clearInterval(this.interval)
            }
        }

        this.setState(newState)
    }

    handleInputSelectComponent = async(data) => {
        const { name, value, label, section } = data
        const newState = { ...this.state }

        if(name === "country" || name === "province" || name === "city"){
            newState.form.section[section].location[name] = value

            if(this.state.form.section.organisasi.location.country !== '')
                try {
                    await this.props.GetProvinceList(this.state.form.section.organisasi.location.country)
                }catch(err) {
                    alert("Gagal mengambil data list provinsi")
                }
            if(this.state.form.section.organisasi.location.province !== '')
                try{
                    await this.props.GetCityList(this.state.form.section.organisasi.location.province)
                }catch(err) {
                    alert("Gagal mengambil data list kota")
                }
        }else{
            if(name === "category") {
                newState.form.section[section][name] = label
                newState.form.section[section][`${name}_code`] = value
            }else{
                newState.form.section[section][name] = value
            }
        }

        if(name === 'jenis'){
            if(value === 'Tidak Berbadan Hukum'){
                newState.form.section.documents.surat_pengesahan_badan_hukum = ''
                newState.nameFile.surat_pengesahan_badan_hukum = ''
            }else{
                newState.form.section.documents.surat_keterangan_terdaftar = ''
                newState.nameFile.surat_keterangan_terdaftar = ''
            }
        }

        this.setState(newState)
    }

    handleInputFileComponent = (data) => {
        const { formValid, validate, name, value, section, nameFile } = data
        const newState = { ...this.state }
        newState.formErrors = validate.formErrors
        newState.formValid = formValid
        newState.form.section[section][name] = value
        newState.nameFile[name] = nameFile

        this.setState(newState)
    }

    handleChildShowPreview = (value) => {
        const previewModal = document.getElementById("previewModal")
        this.setState({ imagePreview: value }, () => {
            UIkit.modal(previewModal).show()
        })
    }

    proccessOtp(value) {
        const otpModal = document.getElementById("otpModal")
        const newState = { ...this.state }
        
        const handphone = this.handphoneParse(this.state.form.section.pic.handphone)

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/v1/landing/official/phone/${handphone}/set`,
            data: JSON.stringify({ "code": value }),
            headers: {
                'x-api-key': `${process.env.REACT_APP_X_API_KEY}`
            }
        }).then(({ data }) => {
            // console.log(data)
            this.picFullName === "" ? document.getElementById("field-nama-lengkap").removeAttribute("disabled") : document.getElementById("field-nama-lengkap").setAttribute("disabled", "disabled")
            this.picEmail === "" ? document.getElementById("field-email").removeAttribute("disabled") : document.getElementById("field-email").setAttribute("disabled", "disabled")
            newState.form.section.pic.full_name = this.picFullName
            newState.form.section.pic.email = this.picEmail
            Object.keys(newState.form.section.pic).forEach(item => {
                if(item !== "handphone")
                    newState.formErrors.section.pic.full_name = ""
            })
            newState.validOtp = true
            newState.isLoading = false
            this.setState(newState)
            setTimeout(() => {
                // this.pin.clear()
                clearInterval(this.interval)
                UIkit.modal(otpModal).hide()
            }, 1000)
        }).catch(error => {
            // console.log(error.response)
            newState.form.section.pic.full_name = ""
            newState.form.section.pic.email = ""
            newState.validOtp = false
            this.setState(newState)
        })
    }

    resendOTP() {
        const otpModal = document.getElementById("otpModal")
        const newState = { ...this.state }

        if(newState.counterResendOtp > newState.maxResendOtp){
            newState.isRegisteredHi = false
            newState.timeout = Date.now()
            newState.counterResendOtp = 0
            newState.formErrors.section.pic.handphone = 'Anda sudah gagal melakukan verifikasi sebanyak 5 kali. Anda dapat melakukan verifikasi kembali 1 x 24 jam.'
            newState.validateOtpReq = true
            UIkit.modal(otpModal).hide()
            this.setState(newState)
            return
        }

        const handphone = this.handphoneParse(newState.form.section.pic.handphone)

        API.get(`landing/official/phone/${handphone}/request`, {
            headers: {}
        }).then(({ data }) => {
            newState.isLoading = false
            newState.isRegisteredHi = true
            newState.timeout = moment(data.data.expery).valueOf()
            newState.counterResendOtp = data.data.req

            this.interval = setInterval(() => {
                this.setState({ now: Date.now() })
            }, 500)
            this.setState(newState)
        }).catch(() => {
            newState.isRegisteredHi = false
            newState.timeout = Date.now()
            newState.counterResendOtp = 0

            clearInterval(this.interval)
            UIkit.modal(otpModal).hide()
            this.setState(newState)
        })
    }

    handleCloseOtpModal() {
        this.setState({ isRegisteredHi: false })
    }

    render() {
        const { timeout, now } = this.state

        const duration = moment.duration(timeout - now, 'milliseconds')
        const canResend = timeout <= now

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
                                            options={this.props.types.list}
                                            onChange={ (e) => this.handleTypeChange(e) }
                                        />
                                    </div>
                                    <p className="uk-has-error">{ this.state.formErrors.type !== "" ? `type ${ this.state.formErrors.type }` : "" }</p>
                                </div>
                                { this.state.form.type !== '' && (
                                    <div>
                                        <div className="uk-margin form__section">
                                            <label className="uk-form-label section__label-item">Data { this.state.form.type }</label>
                                        </div>
                                        <DataSection propsData={ this.state } handleChildPropsChange={ this.handleChildPropsChange } handleDateChange={ this.handleDateChange } handleInputComponent={ this.handleInputComponent } handleInputSelectComponent={ this.handleInputSelectComponent }/>
                                        <div className="uk-margin form__section">
                                            <label className="uk-form-label section__label-item">Kelengkapan { this.state.form.type }</label>
                                        </div>
                                        { this.renderTypeSection(this.state.form.type) }
                                        <div className="uk-margin form__section">
                                            <label className="uk-form-label section__label-item">Akun Penanggung Jawab Penggunaan Official Account Manager Dalam { this.state.form.type }</label>
                                        </div>
                                        <InputNumber name="handphone" id="handphone" type="text" typeInput="phone" label="No Handphone" section="pic" required={ true } typeOA="" placeholder="" 
                                        debounce="on" validation={ [
                                            {
                                                typeValidate: 'regex',
                                                rule: /^\d+$|^$/,
                                                min: 9,
                                                max: 12
                                                // rule: /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/g //regex untuk nomer telpon dan handphone
                                            }
                                        ] } form={ this.state.form } errors={ this.state.formErrors } formValid={ this.state.formValid } handleInput={ this.handleInputComponent }/>
                                        { this.state.isRegisteredHi && (
                                            <div>
                                                <InputText name="full_name" id="field-nama-lengkap" type="text" label="Nama Lengkap" section="pic" required={ true } disabled={ true } typeOA="" placeholder="" validation={ [
                                                    {
                                                        typeValidate: 'regex',
                                                        rule: /(^[a-zA-Z0-9.,-.'\s]*)$/gi
                                                    }, 
                                                    {
                                                        typeValidate: 'text',
                                                        min: 0,
                                                        max: 100
                                                    }
                                                ] } form={ this.state.form } errors={ this.state.formErrors } formValid={ this.state.formValid } handleInput={ this.handleInputComponent }/>
                                                <InputText name="email" id="field-email" type="email" label="Email" section="pic" required={ true } disabled={ true } typeOA="" placeholder="" validation={ [
                                                    {
                                                        typeValidate: 'regex',
                                                        rule: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
                                                    },
                                                    {
                                                        typeValidate: 'text',
                                                        min: 0,
                                                        max: 50
                                                    }
                                                ] } form={ this.state.form } errors={ this.state.formErrors } formValid={ this.state.formValid } handleInput={ this.handleInputComponent }/>
                                                <InputText name="role" id="role" type="text" label="Peran atau Jabatan Dalam" section="pic" required={ true } typeOA={ this.state.form.type } placeholder="" validation={ [
                                                    {
                                                        typeValidate: 'regex',
                                                        rule: /(^[a-zA-Z0-9.,-.'\s]*)$/gi
                                                    },
                                                    {
                                                        typeValidate: 'text',
                                                        min: 0,
                                                        max: 25
                                                    }
                                                ] } form={ this.state.form } errors={ this.state.formErrors } formValid={ this.state.formValid } handleInput={ this.handleInputComponent }/>
                                            </div>
                                        ) }

                                        { !this.state.isRegisteredHi && (
                                            <div className="uk-margin">
                                                <label className="uk-form-label form__notify-is-registered">
                                                    Nomor handphone yang didaftarkan sebagai akun penanggung jawab harus terdaftar sebagai pengguna aplikasi Hi App. 
                                                    Jika Anda belum memiliki aplikasi Hi App, silahkan download aplikasinya melalui&nbsp;
                                                    <a href="#downloadLink" className="form__notify-is-registered-link" uk-scroll="true" offset="100">Google Play</a> dan <a href="#downloadLink" className="form__notify-is-registered-link" uk-scroll="true" offset="100">App Store.</a>
                                                </label>
                                            </div>
                                        ) }
                                        <div className="uk-margin form__footer">
                                            <button type="button" className="uk-button from__footer__button" onClick={ (e) => console.log(e) }>Kirim Formulir Pendaftaran</button>
                                        </div>
                                    </div>
                                ) }
                            </form>
                        </div>
                    </div>
                </div>

                <div id="previewModal" className="uk-flex-top" uk-modal="true" bg-close="false" esc-close="false">
                    <div className="uk-modal-dialog uk-width-auto uk-margin-auto-vertical">
                        <button className="uk-modal-close-default" type="button" uk-close="true" />
                        {/* <img src={ this.state.imagePreview } alt="preview" /> */}
                        { this.state.imagePreview.match(/.pdf$/i) ? (
                            <embed src={ this.state.imagePreview } type="application/pdf" style={{ width: "100%", height: "500px" }}/>
                        ) : (
                            <img src={ this.state.imagePreview } alt="preview" />
                        ) }
                    </div>
                </div>


                <div id="otpModal" className="uk-flex-top" uk-modal="true" bg-close="false" esc-close="false">
                    <div className="uk-modal-dialog uk-margin-auto-vertical">
                        <button className="uk-modal-close-default" type="button" uk-close="true" onClick={ () => this.handleCloseOtpModal() }/>
                        <div className="uk-modal-header uk-flex-column modal no-border-bottom modal__header-container">
                            <label className="uk-full-width uk-text-center uk-text-large uk-text-bold">Verifikasi Nomor Handphone</label>
                            <label className="uk-full-width uk-text-center uk-text-small">Kode verifikasi telah dikirimkan ke nomor handphone Anda melalui SMS</label>
                            <label className="uk-full-width uk-text-center uk-text-small">+{ this.handphoneParse(this.state.form.section.pic.handphone) }</label>
                        </div>
                        <div className="uk-modal-body content-center">
                            <PinInput 
                                length={6} 
                                initialValue=""
                                onChange={(value, index) => this.setState({ validOtp: true })}
                                type="numeric" 
                                ref={p => (this.pin = p)}
                                focus={true}
                                style={{padding: '10px'}}
                                inputStyle={{borderColor: 'rgb(0, 160, 70)', borderRight: "none", borderTop: "none", borderLeft: "none", fontSize: "28px"}}
                                inputFocusStyle={{borderColor: 'red'}}
                                onComplete={(value, index) => this.proccessOtp(value)}
                            />
                        </div>
                        <div className="uk-modal-footer uk-flex-column modal no-border-top">
                        { !this.state.validOtp && (
                            <label className="uk-flex-row content-center uk-full-width uk-text-center uk-text-small" style={{ color: "red" }}>
                                Kode tidak valid
                            </label>
                        ) }
                        <label className="uk-flex-row content-center uk-full-width uk-text-center uk-text-small">Tidak menerima SMS? &nbsp;&nbsp;
                            <button className={`button-link ${ !canResend ? "disabled" : "" }`} onClick={() => this.resendOTP()} disabled={!canResend}>
                                Kirim Ulang {!canResend && `${('0' + duration.minutes()).slice(-2)}:${('0' + duration.seconds()).slice(-2)}`}
                            </button>
                        </label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ daftar }) => ({
    types: daftar.types,
    location: daftar.location
})
  
const mapDispatchToProps = { ...typeActions, ...locationActions }
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Daftar)