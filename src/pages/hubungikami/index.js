import React, { Component } from 'react'
import '../../assets/frontend/css/hubungikami/hubungikami.css'
import UIkit from 'uikit'
import InputText from '../../components/form/inputText'
import InputTextArea from '../../components/form/inputTextArea'

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

    handleInput = (data) => {
        const { formValid, validate, name, value, section } = data
        const newState = { ...this.state }
        newState.formErrors = validate.formErrors
        newState.formValid = formValid
        newState.form.section[section][name] = value

        this.setState(newState)
    }

    submitForm() {
        let validateInputText = []
        let newState = Object.assign({}, this.state)

        Object.keys(this.state.form.section.general).map(item => {
            if(this.state.form.section.general[item] === '')
                newState.formErrors.section.general[item] = ` harus diisi`
            else
                newState.formErrors.section.general[item] = this.state.formErrors.section.general[item]
            
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
            Object.keys(this.state.form.section.general).forEach(item => newState.form.section.general[item] = "")
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
                                <InputText name="nama" id="nama" type="text" label="Nama" section="general" required={ true } typeOA="" placeholder="" validation={ [
                                    {
                                        typeValidate: 'regex',
                                        rule: /(^[a-zA-Z0-9.,-.'\s]*)$/gi
                                    },
                                    {
                                        typeValidate: 'text',
                                        min: 0,
                                        max: 100
                                    }
                                ] } form={ this.state.form } errors={ this.state.formErrors } formValid={ this.state.formValid } handleInput={ this.handleInput }/>
                                <InputText name="email" id="email" type="email" label="Email" section="general" required={ true } typeOA="" placeholder="" validation={ [
                                    {
                                        typeValidate: 'regex',
                                        rule: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/gi
                                    },
                                    {
                                        typeValidate: 'text',
                                        min: 0,
                                        max: 50
                                    }
                                ] } form={ this.state.form } errors={ this.state.formErrors } formValid={ this.state.formValid } handleInput={ this.handleInput }/>
                                <InputText name="judul" id="judul" type="text" label="Judul" section="general" required={ true } typeOA="" placeholder="" validation={ [
                                    {
                                        typeValidate: 'regex',
                                        rule: /(^[a-zA-Z0-9.,-.'\s]*)$/gi
                                    },
                                    {
                                        typeValidate: 'text',
                                        min: 0,
                                        max: 50
                                    }
                                ] } form={ this.state.form } errors={ this.state.formErrors } formValid={ this.state.formValid } handleInput={ this.handleInput }/>
                                <InputTextArea name="pesan" id="pesan" type="text" label="Pesan" section="general" required={ true } typeOA="" placeholder="" validation={ [
                                    {
                                        typeValidate: 'text',
                                        min: 10,
                                        max: 9999
                                    }
                                ] } form={ this.state.form } errors={ this.state.formErrors } formValid={ this.state.formValid } handleInput={ this.handleInput }/>
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