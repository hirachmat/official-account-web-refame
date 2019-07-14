import React, { Component } from 'react'
import ValidateForm from '../../helper/ValidateForm'

class InputFile extends Component {
    state = {}

    handleInput(e, validation) {
        const value = e.target.files
        const { name, type } = e.target

        const rule = {
            name: name,
            value: value,
            type: type,
            title: "",
            sectionName: this.props.section,
            ruleValidate: validation,
            required: this.props.required,
            formErrors: this.props.errors,
            formValid: this.props.formValid
        }

        const validate = ValidateForm.validateField(rule)
        const error = ValidateForm.setErrorValidate(validate.formErrors)
        const formValid = error.indexOf(false) === -1
        validate.form = this.props.form

        if(validate.formErrors.section[this.props.section][name] === "") {
            ValidateForm.uploadFile(value).then((response) => {
                validate.form.section[this.props.section][name] = response

                let data = {
                    name: name,
                    value: response,
                    section: this.props.section,
                    validate: validate,
                    formValid: formValid,
                    nameFile: value[0].name
                }
                
                this.props.handleInput(data)
            }).catch(() => {
                validate.formErrors.section[this.props.section][name] = 'file gagal diupload'
                let data = {
                    name: name,
                    value: "",
                    section: this.props.section,
                    validate: validate,
                    formValid: formValid,
                    nameFile: value[0].name
                }
                
                this.props.handleInput(data)
            })
        }else{
            let data = {
                name: name,
                value: "",
                section: this.props.section,
                validate: validate,
                formValid: formValid,
                nameFile: value[0].name
            }
            
            this.props.handleInput(data)
        }
    }

    handleShowPreview(value) {
        this.props.handleShowPreview(value)
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
                <label className="uk-form-label form__label-item-small">(ukuran maksimal: 5Mb)</label>
                <div uk-form-custom="true">
                    <input type={ this.props.type } 
                    id={ this.props.id } name={ this.props.name }
                    onChange={ (e) => this.handleInput(e, this.props.validation) }/>
                    <button className="uk-button form__button-upload" type="button" tabIndex="-1">Upload Foto { this.props.buttonLabel }</button>
                </div>
                <div className="uk-margin-small">
                    { this.props.errors.section[this.props.section][this.props.name] === "" && (
                        <label className="uk-form-label form__label-item-small" onClick={ (e) => this.handleShowPreview(this.props.form.section[this.props.section][this.props.name]) }>{ this.props.nameFile[this.props.name] }</label>
                    ) }
                    { this.renderErrorMessage(this.props.errors.section[this.props.section][this.props.name], this.props.label.toLowerCase(), this.props.typeOA.toLowerCase()) }
                </div>
            </div>
        )
    }
}

export default InputFile