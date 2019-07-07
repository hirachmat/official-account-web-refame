import React, { Component } from 'react'
import '../../assets/frontend/css/hubungikami/hubungikami.css'
import ValidateForm from '../../helper/ValidateForm'
import UIkit from 'uikit'

class HubungiKami extends Component {
    state = {
        form: {
            section: {
                general: {
                    nama: '',
                    email: '',
                    judul: '',
                    pesan: ''
                }
            }
        },
        formErrors: {
            section: {
                general: {
                    nama: '',
                    email: '',
                    judul: '',
                    pesan: ''
                }
            }
        },
        formValid: false
    }

    handleInput(e, ruleValidate, required) {
        const name = e.target.name
        const value = e.target.value
        const type = e.target.type
        const title = e.target.title

        let newState = Object.assign({}, this.state)
        newState.form.section.general[name] = value

        this.setState(newState, () => {
            console.log(newState)
            let rule = {
                name: name,
                value: value,
                type: type,
                title: title,
                sectionName: 'general',
                ruleValidate: ruleValidate,
                required: required,
                formErrors: this.state.formErrors,
                formValid: this.state.formValid
            }

            let validate = ValidateForm.validateField(rule)
            this.setState({ formErrors: validate.formErrors }, () => {
                let error = []
                Object.keys(this.state.formErrors.section.general).map((item, index) => error.push(this.state.formErrors.section.general[item] === ''))
                this.setState({ formValid: error.indexOf(false) === -1 })
            })
        })
    }

    submitForm() {
        let validateInputText = []
        let newState = Object.assign({}, this.state)

        Object.keys(this.state.form.section.general).map(item => {
            // let label = Utility.capitalizeString(item.replace(/_/g, " "))
            if(this.state.form.section.general[item] === ''){
                newState.formErrors.section.general[item] = ` harus diisi`
            }else{
                newState.formErrors.section.general[item] = this.state.formErrors.section.general[item]
            }
            
            validateInputText.push(this.state.form.section.general[item] !== '')

            return true
        })
        
        this.setState(newState, () => {
            if(validateInputText.indexOf(false) === -1 && this.state.formValid){
                this.sendEmail()
            }else{
                return false
            }
        })
    }

    sendEmail() {
        let modal = document.getElementById("hubungikami__modal")

        let formParse = {
            "form": this.state.form
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(formParse),
            headers: {
              'Content-Type': 'application/json',
            }
        };

        return fetch(`${process.env.REACT_APP_API_EMAIL_URL}/api/hubungiKami`, options)
        .then((response) => response.json())
        // .then((response) => response.json())
        .then((responseJson) => {
            // console.log(responseJson)
            UIkit.modal(modal).show()
            let newState = Object.assign({}, this.state)
            newState.form.section.general.name = ""
            newState.form.section.general.email = ""
            newState.form.section.general.judul = ""
            newState.form.section.general.pesan = ""
            this.setState( newState )
            return responseJson
        })
    }

    closeModal = () => {
        let modal = document.getElementById("hubungikami__modal")
        UIkit.modal(modal).hide()
    }

    render() {
        return(
            <div className="hubungikami" id="hubungikami">
                <div className="uk-height-large uk-background-cover uk-light uk-flex uk-flex-top parallax hubungikami__parallax-bg" uk-parallax="true" uk-img="true"></div>
                
                <div className="hubungikami__container uk-container">
                    <div className="container__card">
                        <div className="uk-card uk-card-default uk-card-body card__box">
                            <div className="card__box__title-item">Hubungi Kami</div>
                            <div className="card__box__line-dotted"></div>
                            <div className="card__box__content-item">
                                Jika Anda ingin bertanya mengenai Hi Official Account, memberikan saran atau masukan, silahkan gunakan formulir dibawah ini untuk berkirim pesan kepada Kami. Kami sangat senang mendengarkan aspirasi dari Anda.
                            </div>
                            <form className="uk-form-stacked card__box__form">
                                <div className="uk-margin">
                                    <label className="uk-form-label form__label-item" htmlFor="nama">Nama</label>
                                    <div className="uk-form-controls">
                                        <input className="uk-input form__input-custom" id="nama" name="nama" type="text" placeholder="" autoComplete="off" value={ this.state.form.section.general.nama } 
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
                                        ], true) }/>
                                    </div>
                                    <p className="uk-has-error">{ this.state.formErrors.section.general.nama !== "" ? `nama ${ this.state.formErrors.section.general.nama }` : "" }</p>
                                </div>
                                <div className="uk-margin">
                                    <label className="uk-form-label form__label-item" htmlFor="email">Email</label>
                                    <div className="uk-form-controls">
                                        <input className="uk-input form__input-custom" id="email" name="email" type="email" placeholder="" autoComplete="off" value={ this.state.form.section.general.email } 
                                        onChange={ 
                                            (e) => this.handleInput(e, [
                                                {
                                                    typeValidate: 'regex',
                                                    rule: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/gi
                                                },
                                                {
                                                    typeValidate: 'text',
                                                    min: 0,
                                                    max: 50
                                                }
                                            ], true) }/>
                                    </div>
                                    <p className="uk-has-error">{ this.state.formErrors.section.general.email !== "" ? `email ${ this.state.formErrors.section.general.email }` : "" }</p>
                                </div>
                                <div className="uk-margin">
                                    <label className="uk-form-label form__label-item" htmlFor="judul">Judul</label>
                                    <div className="uk-form-controls">
                                        <input className="uk-input form__input-custom" id="judul" name="judul" type="text" placeholder="" autoComplete="off" value={ this.state.form.section.general.judul }
                                        onChange={ (e) => this.handleInput(e, [
                                            {
                                                typeValidate: 'regex',
                                                rule: /(^[a-zA-Z0-9.,-.'\s]*)$/gi
                                            },
                                            {
                                                typeValidate: 'text',
                                                min: 0,
                                                max: 50
                                            }
                                        ], true) }/>
                                    </div>
                                    <p className="uk-has-error">{ this.state.formErrors.section.general.judul !== "" ? `judul ${ this.state.formErrors.section.general.judul }` : "" }</p>
                                </div>
                                <div className="uk-margin">
                                    <label className="uk-form-label form__label-item">Pesan</label>
                                    <div className="uk-form-controls">
                                        <textarea className="uk-textarea form__input-custom" id="pesan" name="pesan" rows={8} placeholder="" value={ this.state.form.section.general.pesan }
                                        onChange={ (e) => this.handleInput(e, [
                                            {
                                                typeValidate: 'text',
                                                min: 10,
                                                max: 9999
                                            }
                                        ], true) }/>
                                    </div>
                                    <p className="uk-has-error">{ this.state.formErrors.section.general.pesan !== "" ? `pesan ${ this.state.formErrors.section.general.pesan }` : "" }</p>
                                </div>
                                <div className="uk-margin form__footer">
                                    <button type="button" className="uk-button from__footer__button" onClick={ (e) => this.submitForm(e) }>Kirim Pesan</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


                <div className="hubungikami__modal" id="hubungikami__modal" uk-modal="true" bg-close="false" esc-close="false">
                    <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical hubungikami__modal__dialog">
                        <button className="uk-modal-close-default" type="button" uk-close="true"/>
                        <div className="hubungikami__modal__title-item">Pesan Terkirim</div>
                        <div className="hubungikami__modal__content-item">Pesan Anda telah berhasil dikirim. Terima kasih telah mengirim pesan kepada kami</div>
                        <div className="hubungikami__modal__footer-content">
                            <button type="button" className="uk-button from__footer__button" onClick={ () => this.closeModal() }>Keluar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HubungiKami