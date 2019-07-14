import React, { Component } from 'react'
import InputNumber from '../form/inputNumber'
import InputFile from '../form/inputFile'
import InputSelect from '../form/inputSelect'

class Organisasi extends Component {
    state = {}

    handleShowPreview(value) {
        this.props.handleChildShowPreview(value)
    }

    handleInputComponent = (data) => {
        this.props.handleInputComponent(data)
    }

    handleInputFileComponent = (data) => {
        this.props.handleInputFileComponent(data)
    }

    handleInputSelectComponent = (data) => {
        this.props.handleInputSelectComponent(data)
    }

    renderErrorMessage(error, name, type) {
        if(type === "")
            return <p className="uk-has-error">{ error !== "" ? `${name} ${error}` : "" }</p>
        else
            return <p className="uk-has-error">{ error !== "" ? `${name} ${type} ${error}` : "" }</p>
    }

    render() {
        const listJenisOrganisasi = [
            { label: "Berbadan Hukum", value: 'Berbadan Hukum' },
            { label: "Tidak Berbadan Hukum", value: 'Tidak Berbadan Hukum' },
        ]

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
                <InputSelect name="jenis" id="jenis" type="select" label="Jenis Organisasi" section="documents" required={ false } typeOA="" placeholder="" validation={ [] } 
                    options={ listJenisOrganisasi } defaultOptions={ listJenisOrganisasi[1] } form={ this.props.propsData.form } errors={ this.props.propsData.formErrors } formValid={ this.props.propsData.formValid } handleInput={ this.handleInputSelectComponent }/>
                <InputFile name={ this.props.propsData.form.section.documents.jenis === 'Tidak Berbadan Hukum' || this.props.propsData.form.section.documents.jenis === '' ? 'surat_keterangan_terdaftar' : 'surat_pengesahan_badan_hukum' } 
                id={ this.props.propsData.form.section.documents.jenis === 'Tidak Berbadan Hukum' || this.props.propsData.form.section.documents.jenis === '' ? 'surat_keterangan_terdaftar' : 'surat_pengesahan_badan_hukum' }
                type="file" label={ this.props.propsData.form.section.documents.jenis === 'Tidak Berbadan Hukum' || this.props.propsData.form.section.documents.jenis === '' ? 'Surat Keterangan Terdaftar' : 'Surat Pengesahan Badan Hukum' } 
                buttonLabel={ this.props.propsData.form.section.documents.jenis === 'Tidak Berbadan Hukum' || this.props.propsData.form.section.documents.jenis === '' ? 'Surat Keterangan Terdaftar' : 'Surat Pengesahan Badan Hukum' } 
                section="documents" required={ false } typeOA="" placeholder="" validation={ [
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

export default Organisasi