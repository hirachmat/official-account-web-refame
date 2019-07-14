import React, { Component } from 'react'
import AsyncSelect from 'react-select/async'

class InputAsyncSelect extends Component {
    state = {}

    handleInput(e, validation) {
        const { label, value } = e
        const validate = {
            name: this.props.name,
            value: value,
            type: this.props.type,
            title: "",
            formErrors: this.props.errors,
            formValid: this.props.formValid,
            form: this.props.form
        }
        
        let data = {
            name: this.props.name,
            value: value,
            label: label,
            section: this.props.section,
            validate: validate,
            formValid: this.props.formValid
        }

        this.props.handleInput(data)
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
                <label className="uk-form-label form__label-item" htmlFor={ this.props.id }>{ this.props.label }{ this.props.required ? "*" : "" }</label>
                <div className="uk-form-controls">
                    <AsyncSelect
                        placeholder={ `Pilih ${ this.props.label.toLowerCase() }` }
                        cacheOptions
                        loadOptions={this.props.options}
                        defaultOptions
                        id={ this.props.id }
                        name={ this.props.name }
                        onChange={ (e) => this.handleInput(e, this.props.validation) }
                    />
                </div>
                { this.renderErrorMessage(this.props.errors.section[this.props.section].location[this.props.name], this.props.label.toLowerCase(), this.props.typeOA.toLowerCase()) }
            </div>
        )
    }
}

export default InputAsyncSelect