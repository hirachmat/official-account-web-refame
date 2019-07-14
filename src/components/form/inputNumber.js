import React, { Component } from 'react'
import ValidateForm from '../../helper/ValidateForm'
import debounce from "lodash/debounce"
import API from '../../helper/api'
import moment from 'moment'
import Loader from '../../helper/loader'

class InputNumber extends Component {
    state = {
        isLoading: false
    }

    handleInput(e, validation) {
        let { name, value } = e.target
        const rule = ValidateForm.setRule(e, validation, this.props.required, this.props.section, this.props.errors, this.props.formValid)
        const validate = ValidateForm.validateField(rule)
        const error = ValidateForm.setErrorValidate(validate.formErrors)
        const formValid = error.indexOf(false) === -1

        if(value.length > validation[0].max){
            return false
        }else{
            if(validate.formErrors.section[this.props.section][name] !== ` tidak valid`){
                if(name === "handphone"){
                    validate.formErrors.section.pic.handphone = ""

                    let data = {
                        name: e.target.name,
                        value: e.target.value,
                        section: this.props.section,
                        validate: validate,
                        formValid: formValid,
                        errorMessage: ""
                    }
            
                    this.props.handleInput(data)

                    value.length === 0 ? this.setState({ isLoading: false }) : this.validateHandphone(value, validate, formValid)
                }else{
                    let data = {
                        name: e.target.name,
                        value: e.target.value,
                        section: this.props.section,
                        validate: validate,
                        formValid: formValid
                    }
            
                    this.props.handleInput(data)
                }
            }
        }
    }

    handphoneParse(value) {
        return parseInt(value.substr(0, 1)) === 0 ? `62${value.substr(1, value.length)}` : `62${value}`
    }
    
    validateHandphone = debounce((value, validate, formValid) => {
        const handphone = this.handphoneParse(value)
        this.setState({ isLoading: true })
        const newState = { ...this.state }
        let isRegisteredHi = ""
        let timeout = Date.now()
        let picFullName = ""
        let picEmail = ""
        let validateOtpReq = false
        let errorMessage = ""
    
        API.get(`landing/official/phone/${handphone}/validate`, {
            headers: {}
            }).then(({ data }) => {
                console.log(data)
                let message = "success"
                newState.isLoading = false
                isRegisteredHi = true
                timeout = moment(data.data.expery).valueOf()
                picFullName = data.data.name
                picEmail = data.data.email
                this.setState(newState)

                let dataParam = {
                    name: "handphone",
                    value: value,
                    section: this.props.section,
                    validate: validate,
                    formValid: formValid,
                    message: message,
                    isRegisteredHi: isRegisteredHi,
                    timeout: timeout,
                    picFullName: picFullName,
                    picEmail: picEmail
                }
        
                this.props.handleInput(dataParam)
            }).catch(error => {
                console.log("error")
                let message = "failed"
                if(error.response.data.data.hasOwnProperty("req") && error.response.data.data.hasOwnProperty('expery')) {
                    if(error.response.data.data.req > 5){
                        validateOtpReq = true
                        errorMessage = `Anda dapat melakukan verifikasi kembali dalam waktu 5 menit.`
                    }
                }else{
                    validateOtpReq = false
                    errorMessage = "Anda belum terdaftar di Hiapp"
                }
                newState.isLoading = false
                isRegisteredHi = false
                timeout = Date.now()
                picFullName = ""
                picEmail = ""
                this.setState(newState)

                let dataParam = {
                    name: "handphone",
                    value: value,
                    section: this.props.section,
                    validate: validate,
                    formValid: formValid,
                    message: message,
                    isRegisteredHi: isRegisteredHi,
                    timeout: timeout,
                    picFullName: picFullName,
                    picEmail: picEmail,
                    validateOtpReq: validateOtpReq,
                    errorMessage: errorMessage
                }
        
                this.props.handleInput(dataParam)
            })
    }, 1000)

    renderErrorMessage(error, name, type) {
        if(type === "")
            return <p className="uk-has-error">{ error !== "" ? `${name} ${error}` : "" }</p>
        else
            return <p className="uk-has-error">{ error !== "" ? `${name} ${type} ${error}` : "" }</p>
    }

    render() {
        return(
            <div className="uk-margin" iid={ `field-${this.props.section}-${this.props.name}` }>
                <label className="uk-form-label form__label-item" htmlFor={ this.props.id }>{ this.props.label }{ this.props.typeOA === "" ? "" : ` ${ this.props.typeOA }` }{ this.props.required ? "*" : "" }</label>
                <div className="uk-form-controls uk-inline form__with-icon">
                    { this.props.typeInput === "phone" && (
                        <span className="uk-form-icon form__with-icon__label-item">62</span>
                    ) }
                    <input className="uk-input form__input-custom" id={ this.props.id } name={ this.props.name } type={ this.props.type }
                    placeholder={ this.props.placeholder } autoComplete="off" value={ this.props.form.section[this.props.section][this.props.name] || "" }
                    onChange={ (e) => this.handleInput(e, this.props.validation) }/>
                    
                    { this.props.debounce === "on" && (this.state.isLoading && (
                        <div className="spinner-loading">
                            <Loader/>
                        </div>
                    )) }
                </div>
                { this.renderErrorMessage(this.props.errors.section[this.props.section][this.props.name], this.props.label.toLowerCase(), this.props.typeOA.toLowerCase()) }
            </div>
        )
    }
}

export default InputNumber