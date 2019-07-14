import React, { Component } from 'react'
import ValidateForm from '../../helper/ValidateForm'

class InputText extends Component {
    state = {}

    handleInput(e, validation) {
        const { name, value } = e.target
        const rule = ValidateForm.setRule(e, validation, this.props.required, this.props.section, this.props.errors, this.props.formValid)
        const validate = ValidateForm.validateField(rule)
        const error = ValidateForm.setErrorValidate(validate.formErrors)
        const formValid = error.indexOf(false) === -1

        if(validate.name === 'email' && validate.formValid){
            if(this.props.section === "organisasi") {
                ValidateForm.checkExistingEmail(value).then((response) => {
                    if(response.status === 302){
                        validate.formErrors.section[this.props.section][name] = 'sudah terdaftar'
                        validate.formValid = false
                    }else{
                        validate.formErrors.section[this.props.section][name] = ''
                        validate.formValid = true
                    }

                    let data = {
                        name: name,
                        value: value,
                        section: this.props.section,
                        validate: validate,
                        formValid: formValid
                    }
            
                    this.props.handleInput(data)
                }).catch(() => {
                    alert("Gagal mengecek email")
                })
            }
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

    renderErrorMessage(error, name, type) {
        if(type === "")
            return <p className="uk-has-error">{ error !== "" ? `${name} ${error}` : "" }</p>
        else
            return <p className="uk-has-error">{ error !== "" ? `${name} ${type} ${error}` : "" }</p>
    }

    render() {
        return(
            <div className="uk-margin" id={ `field-${this.props.section}-${this.props.name}` }>
                <label className="uk-form-label form__label-item" htmlFor={ this.props.id }>{ this.props.label }{ this.props.typeOA === "" ? "" : ` ${ this.props.typeOA }` }{ this.props.required ? "*" : "" }</label>
                <div className="uk-form-controls">
                    <input className="uk-input form__input-custom" id={ this.props.id } name={ this.props.name } type={ this.props.type } disabled={ this.props.disabled ? 'disabled' : '' }
                    placeholder={ this.props.placeholder } autoComplete="off" value={ this.props.form.section[this.props.section][this.props.name] || "" }
                    onChange={ (e) => this.handleInput(e, this.props.validation) }
                    />
                </div>
                { this.renderErrorMessage(this.props.errors.section[this.props.section][this.props.name], this.props.label.toLowerCase(), this.props.typeOA.toLowerCase()) }
            </div>
        )
    }
}

export default InputText