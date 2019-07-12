import React, { Component } from 'react'
import Select from 'react-select'

class Organisasi extends Component {
    state = {}

    handleInput(e, state, ruleValidate, required, type, section) {
        this.props.handleChildPropsChange(e, state, ruleValidate, required, type, section)
    }

    handleShowPreview(value) {
        this.props.handleChildShowPreview(value)
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
                <div className="uk-margin" id="field-documents-npwp">
                    <label className="uk-form-label form__label-item" htmlFor="npwp">NPWP { this.props.propsData.form.type }</label>
                    <div className="uk-form-controls">
                        <input className="uk-input form__input-custom" 
                        id="field-npwp" type="text" title={ `NPWP ${ this.props.propsData.form.type }` } name="npwp" value={ this.props.propsData.form.section.documents.npwp || "" }
                        autoComplete="off" placeholder=""
                        onChange={ 
                            (e) => this.handleInput(e, 'npwp', [
                                {
                                    typeValidate: 'regex',
                                    // rule: /^[0-9]{15,15}$/i
                                    rule: /^\d+$|^$/,
                                    min: 0,
                                    max: 15
                                }
                        ], false, 'number', 'documents') }/>
                    </div>
                    { this.renderErrorMessage(this.props.propsData.formErrors.section.documents.npwp, 'npwp', this.props.propsData.form.type.toLowerCase()) }
                </div>
                <div className="uk-margin" id="field-documents-akta_pendirian">
                    <label className="uk-form-label form__label-item" htmlFor="akta_pendirian">Akta Pendirian { this.props.propsData.form.type }*</label>
                    <label className="uk-form-label form__label-item-small">(ukuran maksimal: 5Mb)</label>
                    <div uk-form-custom="true">
                        <input type="file" title="Akta Pendirian Organisasi" 
                        id="field-akta-pendirian-perusahaan" name="akta_pendirian"
                        onChange={ 
                            (e) => this.handleInput(e, "akta_pendirian", [
                                {
                                    typeValidate: 'file',
                                    maxSize: 5000000,
                                    fileType: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
                                }
                            ], true, 'file', 'documents') }/>
                        <button className="uk-button form__button-upload" type="button" tabIndex="-1">Upload Foto Akta</button>
                    </div>
                    <div className="uk-margin-small">
                        { this.props.propsData.formErrors.section.documents.akta_pendirian === "" && (
                            <label className="uk-form-label form__label-item-small" onClick={ (e) => this.handleShowPreview(this.props.propsData.nameFile.akta_pendirian) }>{ this.props.propsData.nameFile.akta_pendirian }</label>
                        ) }
                        { this.renderErrorMessage(this.props.propsData.formErrors.section.documents.akta_pendirian, 'akta pendirian', this.props.propsData.form.type.toLowerCase()) }
                    </div>
                </div>
                <div className="uk-margin" id="field-documents-jenis">
                    <label className="uk-form-label form__label-item" htmlFor="tipe">Jenis Organisasi</label>
                    <div className="uk-form-controls">
                        <Select
                            placeholder="Pilih Tipe yang Sesuai"
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable={false}
                            name="jenis"
                            options={listJenisOrganisasi}
                            defaultValue={ listJenisOrganisasi[1] }
                            onChange={ (e) => this.handleInput(e, 'jenis', [], false, 'select', 'documents') }
                        />
                    </div>
                    { this.renderErrorMessage(this.props.propsData.formErrors.section.documents.jenis, 'jenis', "") }
                </div>
                <div className="uk-margin" id={ this.props.propsData.form.section.documents.jenis === 'Tidak Berbadan Hukum' || this.props.propsData.form.section.documents.jenis === '' ? 'field-documents-keterangan-terdaftar' : 'field-documents-pengesahan-badan-hukum' }>
                    <label className="uk-form-label form__label-item" htmlFor="akta_pendirian">{ this.props.propsData.form.section.documents.jenis === 'Tidak Berbadan Hukum' || this.props.propsData.form.section.documents.jenis === '' ? 'Surat Keterangan Terdaftar' : 'Surat Pengesahan Badan Hukum' }</label>
                    <label className="uk-form-label form__label-item-small">(ukuran maksimal: 5Mb)</label>
                    <div uk-form-custom="true">
                        <input type="file" 
                        title={ this.props.propsData.form.section.documents.jenis === 'Tidak Berbadan Hukum' || this.props.propsData.form.section.documents.jenis === '' ? 'Keterangan Terdaftar' : 'Pengesahan Badan Hukum' }
                        id={ this.props.propsData.form.section.documents.jenis === 'Tidak Berbadan Hukum' || this.props.propsData.form.section.documents.jenis === '' ? 'field-keterangan-terdaftar' : 'field-pengesahan-badan-hukum' } 
                        name={ this.props.propsData.form.section.documents.jenis === 'Tidak Berbadan Hukum' || this.props.propsData.form.section.documents.jenis === '' ? 'surat_keterangan_terdaftar' : 'surat_pengesahan_badan_hukum' }
                        onChange={ 
                            (e) => this.handleInput(e, "akta_pendirian", [
                                {
                                    typeValidate: `${ this.props.propsData.form.section.documents.jenis === 'Tidak Berbadan Hukum' || this.props.propsData.form.section.documents.jenis === '' ? 'surat_keterangan_terdaftar' : 'surat_pengesahan_badan_hukum' }`,
                                    maxSize: 5000000,
                                    fileType: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
                                }
                            ], true, 'file', 'documents') }/>
                        <button className="uk-button form__button-upload" type="button" tabIndex="-1">Upload Foto { this.props.propsData.form.section.documents.jenis === 'Tidak Berbadan Hukum' || this.props.propsData.form.section.documents.jenis === '' ? 'Surat Keterangan Terdaftar' : 'Surat Pengesahan Badan Hukum' }</button>
                    </div>
                    <div className="uk-margin-small">
                        { this.props.propsData.formErrors.section.documents[this.props.propsData.form.section.documents.jenis === 'Tidak Berbadan Hukum' || this.props.propsData.form.section.documents.jenis === '' ? 'surat_keterangan_terdaftar' : 'surat_pengesahan_badan_hukum'] === "" && (
                            <label className="uk-form-label form__label-item-small" onClick={ (e) => this.handleShowPreview(this.props.propsData.nameFile[this.props.propsData.form.section.documents.jenis === 'Tidak Berbadan Hukum' || this.props.propsData.form.section.documents.jenis === '' ? 'surat_keterangan_terdaftar' : 'surat_pengesahan_badan_hukum']) }>{ this.props.propsData.nameFile[this.props.propsData.form.section.documents.jenis === 'Tidak Berbadan Hukum' || this.props.propsData.form.section.documents.jenis === '' ? 'surat_keterangan_terdaftar' : 'surat_pengesahan_badan_hukum'] }</label>
                        ) }
                        { this.renderErrorMessage(this.props.propsData.formErrors.section.documents[this.props.propsData.form.section.documents.jenis === 'Tidak Berbadan Hukum' || this.props.propsData.form.section.documents.jenis === '' ? 'surat_keterangan_terdaftar' : 'surat_pengesahan_badan_hukum'], `${ this.props.propsData.form.section.documents.jenis === 'Tidak Berbadan Hukum' || this.props.propsData.form.section.documents.jenis === '' ? 'surat keterangan terdaftar' : 'surat pengesahan badan hukum' }`, "") }
                    </div>
                </div>
            </div>
        )
    }
}

export default Organisasi