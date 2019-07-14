import React, { Component } from 'react'
import InputNumber from '../../components/form/inputNumber'
import InputFile from '../../components/form/inputFile'

class Perusahaan extends Component {
    state = {}

    handleShowPreview = (value) => {
        this.props.handleChildShowPreview(value)
    }

    handleInputComponent = (data) => {
        this.props.handleInputComponent(data)
    }

    handleInputFileComponent = (data) => {
        this.props.handleInputFileComponent(data)
    }

    renderErrorMessage(error, name, type) {
        if(type === "")
            return <p className="uk-has-error">{ error !== "" ? `${name} ${error}` : "" }</p>
        else
            return <p className="uk-has-error">{ error !== "" ? `${name} ${type} ${error}` : "" }</p>
    }

    render() {
        return(
            <div>
                <InputNumber name="npwp" id="npwp" type="text" typeInput="number" label="NPWP" section="documents" required={ false } typeOA={ this.props.propsData.form.type } placeholder="" validation={ [
                    {
                        typeValidate: 'regex',
                        // rule: /^[0-9]{15,15}$/i
                        rule: /^\d+$|^$/,
                        min: 0,
                        max: 15
                    }
                ] } form={ this.props.propsData.form } errors={ this.props.propsData.formErrors } formValid={ this.props.propsData.formValid } handleInput={ this.handleInputComponent }/>
                <InputFile name="akta_pendirian" id="akta_pendirian" type="file" label="Akta Pendirian" buttonLabel="Akta" section="documents" required={ true } typeOA={ this.props.propsData.form.type } placeholder="" validation={ [
                    {
                        typeValidate: 'file',
                        maxSize: 5000000,
                        fileType: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
                    }
                ] } form={ this.props.propsData.form } nameFile={ this.props.propsData.nameFile } errors={ this.props.propsData.formErrors } formValid={ this.props.propsData.formValid } handleInput={ this.handleInputFileComponent } handleShowPreview={ this.handleShowPreview }/>
                <InputFile name="surat_izin_usaha_perdagangan" id="surat_izin_usaha_perdagangan" type="file" label="Surat Izin Usaha Perdagangan (SIUP)" buttonLabel="SIUP" section="documents" required={ false } typeOA="" placeholder="" validation={ [
                    {
                        typeValidate: 'file',
                        maxSize: 5000000,
                        fileType: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
                    }
                ] } form={ this.props.propsData.form } nameFile={ this.props.propsData.nameFile } errors={ this.props.propsData.formErrors } formValid={ this.props.propsData.formValid } handleInput={ this.handleInputFileComponent } handleShowPreview={ this.handleShowPreview }/>
                <InputFile name="tanda_daftar" id="tanda_daftar" type="file" label="Tanda Daftar" buttonLabel="TDP" section="documents" required={ false } typeOA={ this.props.propsData.form.type } placeholder="" validation={ [
                    {
                        typeValidate: 'file',
                        maxSize: 5000000,
                        fileType: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
                    }
                ] } form={ this.props.propsData.form } nameFile={ this.props.propsData.nameFile } errors={ this.props.propsData.formErrors } formValid={ this.props.propsData.formValid } handleInput={ this.handleInputFileComponent } handleShowPreview={ this.handleShowPreview }/>
            </div>
        )
    }
}

export default Perusahaan