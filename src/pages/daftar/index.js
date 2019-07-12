import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../assets/frontend/css/daftar/daftar.css'
import Select from 'react-select'
import * as typeActions from '../../actions/typeActions'
import * as locationActions from '../../actions/locationActions'
import ValidateForm from '../../helper/ValidateForm'
import DataSection from '../../components/daftar/DataSection'
import API from '../../helper/api'
import axios from 'axios'
import Perusahaan from '../../components/daftar/Perusahaan'
import Organisasi from '../../components/daftar/Organisasi'
import LembagaPemerintahan from '../../components/daftar/LembagaPemerintahan'
import Yayasan from "../../components/daftar/Yayasan"
import debounce from "lodash/debounce"
import Loader from '../../helper/loader'
import UIkit from "uikit"
import PinInput from "react-pin-input"
import moment from "moment"

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
                return <Organisasi propsData={ this.state } handleChildPropsChange={ this.handleChildPropsChange } handleChildShowPreview={ this.handleChildShowPreview }/>
            case 'Perusahaan':
                return <Perusahaan propsData={ this.state } handleChildPropsChange={ this.handleChildPropsChange } handleChildShowPreview={ this.handleChildShowPreview }/>
            case 'Lembaga Pemerintahan':
                return <LembagaPemerintahan propsData={ this.state } handleChildPropsChange={ this.handleChildPropsChange } handleChildShowPreview={ this.handleChildShowPreview }/>
            case 'Yayasan':
                return <Yayasan propsData={ this.state } handleChildPropsChange={ this.handleChildPropsChange } handleChildShowPreview={ this.handleChildShowPreview }/>
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

    handleDateChange(nameState, value) {
        const newState = { ...this.state }
        newState.form.section.organisasi[nameState] = value

        this.setState(newState)
    }

    handleInput(e, stateName, ruleValidate, required, sectionName) {
        let { name, value } = e.target
        const newState = { ...this.state }
        newState.isLoading = false

        const rule = ValidateForm.setRule(e, ruleValidate, required, sectionName, newState.formErrors, newState.formValid)
        const validate = ValidateForm.validateField(rule)
        const error = ValidateForm.setErrorValidate(validate.formErrors)
        newState.form.section[sectionName][e.target.name] = e.target.value
        newState.formValid = error

        if(validate.name === 'email' && validate.formValid){
            if(sectionName !== "pic") {
                this.checkExistingEmail(value).then((response) => {
                    if(response.status === 302){
                        newState.formErrors.section[sectionName][name] = 'sudah terdaftar'
                        newState.formValid = false
                    }else{
                        newState.formErrors.section[sectionName][name] = ''
                        newState.formValid = true
                    }
                }).catch(() => {
                    alert("Gagal mengirim email")
                })
            }
        }

        this.setState(newState)
    }

    checkExistingEmail(value) {
        return API.get(`oa/validation/email/${value}`, {
            headers: {}
            }).then(({ data }) => {
                return data
            })
    }

    async handleSelectChange(e, stateName, ruleValidate, required, sectionName) {
        const newState = { ...this.state }
        
        if(stateName === 'country'){
            newState.phone_code = e.phone_code
        }

        if(stateName === 'country' || stateName === 'province' || stateName === 'city'){
            newState.form.section[sectionName].location[stateName] = e.value

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
            if(stateName === 'category'){
                newState.form.section[sectionName][stateName] = e.label
                newState.form.section[sectionName][`${stateName}_code`] = e.value
            }else{
                newState.form.section[sectionName][stateName] = e.value
            }
        }

        if(stateName === 'jenis'){
            if(e.value === 'Tidak Berbadan Hukum'){
                newState.form.section.documents.surat_pengesahan_badan_hukum = ''
                newState.nameFile.surat_pengesahan_badan_hukum = ''
            }else{
                newState.form.section.documents.surat_keterangan_terdaftar = ''
                newState.nameFile.surat_keterangan_terdaftar = ''
            }
        }

        this.setState(newState, () => {
            const rule = {
                name: stateName,
                value: e.value,
                type: 'text',
                title: stateName,
                sectionName: sectionName,
                ruleValidate: ruleValidate,
                required: required,
                formErrors: this.state.formErrors,
                formValid: this.state.formValid
            }
            const validate = ValidateForm.validateField(rule)
            const error = ValidateForm.setErrorValidate(validate.formErrors)
            newState.formValid = error

            this.setState(newState)
        })
    }

    handleInputNumber(e, stateName, ruleValidate, required, sectionName) {
        const newState = { ...this.state }
        const value = e.target.value
        const name = e.target.name

        const rule = ValidateForm.setRule(e, ruleValidate, required, sectionName, newState.formErrors, newState.formValid)
        const validate = ValidateForm.validateField(rule)
        const error = ValidateForm.setErrorValidate(validate.formErrors)
        newState.form.section[sectionName][e.target.name] = e.target.value
        newState.formValid = error

        if(value.length > ruleValidate[0].max){
            return false
        }else{
            newState.form.section[sectionName][e.target.name] = value

            if(validate.formErrors.section[sectionName][name] !== ` tidak valid`){
                if(name === "handphone"){
                    newState.validateOtpReq = false
                    newState.formErrors.section.pic.handphone = ""
                    value.length === 0 ? newState.isLoading = false : this.validateHandphone(value)
                }
                this.setState(newState)
            }
        }
    }

    validateHandphone = debounce((value) => {
        this.setState({ isLoading: true })
        const newState = { ...this.state }
        const otpModal = document.getElementById("otpModal")
        const handphone = this.handphoneParse(value)

        API.get(`landing/official/phone/${handphone}/validate`, {
            headers: {}
            }).then(({ data }) => {
                console.log(data)
                newState.isLoading = false
                newState.isRegisteredHi = true
                newState.timeout = moment(data.data.expery).valueOf()
                Object.keys(newState.form.section.pic).forEach(item => {
                    if(item !== "handphone")
                        newState.form.section.pic[item] = ""
                })
                this.picFullName = data.data.name
                this.picEmail = data.data.email

                UIkit.modal(otpModal).show()

                this.interval = setInterval(() => {
                    this.setState({ now: Date.now() })
                }, 500)
            }).catch((error => {
                console.log(error.response)
                if(!error.response.data.status){
                    newState.isLoading = false
                    if(error.response.data.data.hasOwnProperty("req") && error.response.data.data.hasOwnProperty('expery')) {
                        if(error.response.data.data.req > newState.maxResendOtp){
                            newState.validateOtpReq = true
                            newState.formErrors.section.pic.handphone = `Anda dapat melakukan verifikasi kembali dalam waktu 5 menit.`
                        }
                    }else{
                        newState.validateOtpReq = false
                        newState.formErrors.section.pic.handphone = "Anda belum terdaftar di Hiapp"
                    }
                    newState.timeout = Date.now()
                    Object.keys(newState.form.section.pic).forEach((item) => {
                        if(item !== "handphone") {
                            newState.form.section.pic[item] = ""
                            newState.formErrors.section.pic[item] = ""
                        }
                    })
                    this.picFullName = ""
                    this.picEmail = ""
    
                    clearInterval(this.interval)
    
                    UIkit.modal(otpModal).hide()

                    this.setState(newState)
                }
            }))
    }, 1000)

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
        })
        .then(({ data }) => {
            console.log(data)
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
            console.log(error.response)
            newState.form.section.pic.full_name = ""
            newState.form.section.pic.email = ""
            newState.validOtp = false
            this.setState(newState)
        })
    }

    async handleInputFileChange(e, stateName, ruleValidate, required, sectionName) {
        const value = e.target.files
        const { name, type, title } = e.target
        
        const newState = { ...this.state }
        newState.nameFile[name] = value[0].name

        const rule = {
            name: name,
            value: value,
            type: type,
            title: title,
            sectionName: sectionName,
            ruleValidate: ruleValidate,
            required: required,
            formErrors: this.state.formErrors,
            formValid: this.state.formValid
        }
        const validate = ValidateForm.validateField(rule)
        const error = ValidateForm.setErrorValidate(validate.formErrors)
        newState.formValid = error

        if(validate.formErrors.section[sectionName][name] === "") {
            try{
                const uploadFile = await this.uploadFile(value)
                newState.form.section[sectionName][name] = uploadFile
            }catch(err) {
                newState.formErrors.section.documents[name] = 'file gagal diupload'
            }
        }

        this.setState(newState)
    }

    uploadFile(value) {
        var body = new FormData();
        body.append('uploadfile', value[0])

        return axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/v1/upload/file`,
                data: body,
                headers: {
                    'x-api-key': `${process.env.REACT_APP_X_API_KEY}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(({ data }) => {
                return data
            })
    }

    handleChildShowPreview(value) {
        // this.setState({ imagePreview: value }, () => {
        //     this.setState({ showModal: true })
        // })
    }

    handphoneParse(value) {
        return parseInt(value.substr(0, 1)) === 0 ? `${this.state.phone_code}${value.substr(1, value.length)}` : `${this.state.phone_code}${value}`
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
                                        <DataSection propsData={ this.state } handleChildPropsChange={ this.handleChildPropsChange } handleDateChange={ this.handleDateChange } />
                                        <div className="uk-margin form__section">
                                            <label className="uk-form-label section__label-item">Kelengkapan { this.state.form.type }</label>
                                        </div>
                                        { this.renderTypeSection(this.state.form.type) }
                                        <div className="uk-margin form__section">
                                            <label className="uk-form-label section__label-item">Akun Penanggung Jawab Penggunaan Official Account Manager Dalam { this.state.form.type }</label>
                                        </div>
                                        <div className="uk-margin" id="field-pic-handphone">
                                            <label className="uk-form-label form__label-item" htmlFor="handphone">No Handphone*</label>
                                            <div className="uk-form-controls uk-inline form__with-icon">
                                                <span className="uk-form-icon form__with-icon__label-item">62</span>
                                                <input className="uk-input form__input-custom" id="handphone" name="handphone" type="text" placeholder="" autoComplete="off" value={ this.state.form.section.pic.handphone } 
                                                onChange={ 
                                                    (e) => this.handleInputNumber(e, 'handphone', [
                                                        {
                                                            typeValidate: 'regex',
                                                            rule: /^\d+$|^$/,
                                                            min: 9,
                                                            max: 12
                                                            // rule: /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/g //regex untuk nomer telpon dan handphone
                                                        }
                                                    ], true, 'pic') }/>
                                                { this.state.isLoading && (
                                                    <div className="spinner-loading">
                                                        <Loader/>
                                                    </div>
                                                ) }
                                            </div>
                                            <p className="uk-has-error">{ this.state.formErrors.section.pic.handphone !== "" ? `${this.state.validateOtpReq ? '' : 'no handphone'} ${ this.state.formErrors.section.pic.handphone }` : "" }</p>
                                        </div>
                                        { this.state.isRegisteredHi && (
                                            <div>
                                                <div className="uk-margin" id="field-pic-full_name">
                                                    <label className="uk-form-label form__label-item" htmlFor="nama">Nama Lengkap*</label>
                                                    <div className="uk-form-controls">
                                                        <input className="uk-input form__input-custom" id="field-nama-lengkap" name="full_name" type="text" placeholder="" autoComplete="off" value={ this.state.form.section.pic.full_name } 
                                                        onChange={ (e) => this.handleInput(e, [
                                                            {
                                                                typeValidate: 'regex',
                                                                rule: /(^[a-zA-Z0-9.,-.'\s]*)$/gi
                                                            },
                                                            {
                                                                typeValidate: 'text',
                                                                min: 0,
                                                                max: 100
                                                            }
                                                        ], true, 'pic') }/>
                                                    </div>
                                                    <p className="uk-has-error">{ this.state.formErrors.section.pic.full_name !== "" ? `nama lengkap ${ this.state.formErrors.section.pic.full_name }` : "" }</p>
                                                </div>
                                                <div className="uk-margin" id="field-pic-email">
                                                    <label className="uk-form-label form__label-item" htmlFor="nama">Email*</label>
                                                    <div className="uk-form-controls">
                                                        <input className="uk-input form__input-custom" id="field-email" name="email" type="text" placeholder="" autoComplete="off" value={ this.state.form.section.pic.email } 
                                                        onChange={ (e) => this.handleInput(e, [
                                                            {
                                                                typeValidate: 'regex',
                                                                rule: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
                                                            },
                                                            {
                                                                typeValidate: 'text',
                                                                min: 0,
                                                                max: 50
                                                            }
                                                        ], true, 'pic') }/>
                                                    </div>
                                                    <p className="uk-has-error">{ this.state.formErrors.section.pic.email !== "" ? `email ${ this.state.formErrors.section.pic.email }` : "" }</p>
                                                </div>
                                                <div className="uk-margin" id="field-pic-role">
                                                    <label className="uk-form-label form__label-item" htmlFor="nama">Peran atau Jabatan Dalam { this.state.form.type }*</label>
                                                    <div className="uk-form-controls">
                                                        <input className="uk-input form__input-custom" id="field-role" name="role" type="text" placeholder="" autoComplete="off" value={ this.state.form.section.pic.role } 
                                                        onChange={ (e) => this.handleInput(e, [
                                                            {
                                                                typeValidate: 'regex',
                                                                rule: /(^[a-zA-Z0-9.,-.'\s]*)$/gi
                                                            },
                                                            {
                                                                typeValidate: 'text',
                                                                min: 0,
                                                                max: 25
                                                            }
                                                        ], true, 'pic') }/>
                                                    </div>
                                                    <p className="uk-has-error">{ this.state.formErrors.section.pic.role !== "" ? `jabatan dalam ${ this.state.form.type.toLowerCase() } ${ this.state.formErrors.section.pic.role }` : "" }</p>
                                                </div>
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
                                    </div>
                                ) }
                            </form>
                        </div>
                    </div>
                </div>


                <div id="otpModal" className="uk-flex-top" uk-modal="true" bg-close="false" esc-close="false">
                    <div className="uk-modal-dialog uk-margin-auto-vertical">
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
                            <button className="button-link" onClick={() => this.resendOTP()} disabled={!canResend}>
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