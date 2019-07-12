import React, { Component } from 'react'

class Perusahaan extends Component {
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
                <div className="uk-margin" id="field-documents-surat_izin_usaha_perdagangan">
                    <label className="uk-form-label form__label-item" htmlFor="surat_izin_usaha_perdagangan">Surat Izin Usaha Perdagangan (SIUP)</label>
                    <label className="uk-form-label form__label-item-small">(ukuran maksimal: 5Mb)</label>
                    <div uk-form-custom="true">
                        <input type="file" title="Surat Izin Usaha Perdagangan (SIUP)" 
                        id="field-surat-izin-usaha-perdagangaan-perusahaan" name="surat_izin_usaha_perdagangan"
                        onChange={ 
                            (e) => this.handleInput(e, "surat_izin_usaha_perdagangan", [
                                {
                                    typeValidate: 'file',
                                    maxSize: 5000000,
                                    fileType: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
                                }
                            ], false, 'file', 'documents') }/>
                        <button className="uk-button form__button-upload" type="button" tabIndex="-1">Upload Foto SIUP</button>
                    </div>
                    <div className="uk-margin-small">
                        { this.props.propsData.formErrors.section.documents.surat_izin_usaha_perdagangan === "" && (
                            <label className="uk-form-label form__label-item-small" onClick={ (e) => this.handleShowPreview(this.props.propsData.nameFile.surat_izin_usaha_perdagangan) }>{ this.props.propsData.nameFile.surat_izin_usaha_perdagangan }</label>
                        ) }
                        { this.renderErrorMessage(this.props.propsData.formErrors.section.documents.surat_izin_usaha_perdagangan, 'surat izin usaha perdagangan', "") }
                    </div>
                </div>
                <div className="uk-margin" id="field-documents-tanda_daftar">
                    <label className="uk-form-label form__label-item" htmlFor="tanda_daftar">Tanda Daftar { this.props.propsData.form.type } (TDP)</label>
                    <label className="uk-form-label form__label-item-small">(ukuran maksimal: 5Mb)</label>
                    <div uk-form-custom="true">
                        <input type="file" title="Surat Izin Usaha Perdagangan (SIUP)" 
                        id="field-surat-izin-usaha-perdagangaan-perusahaan" name="tanda_daftar"
                        onChange={ 
                            (e) => this.handleInput(e, "tanda_daftar", [
                                {
                                    typeValidate: 'file',
                                    maxSize: 5000000,
                                    fileType: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
                                }
                            ], false, 'file', 'documents') }/>
                        <button className="uk-button form__button-upload" type="button" tabIndex="-1">Upload Foto TDP</button>
                    </div>
                    <div className="uk-margin-small">
                        { this.props.propsData.formErrors.section.documents.tanda_daftar === "" && (
                            <label className="uk-form-label form__label-item-small" onClick={ (e) => this.handleShowPreview(this.props.propsData.nameFile.tanda_daftar) }>{ this.props.propsData.nameFile.tanda_daftar }</label>
                        ) }
                        { this.renderErrorMessage(this.props.propsData.formErrors.section.documents.tanda_daftar, 'tanda daftar', this.props.propsData.form.type.toLowerCase()) }
                    </div>
                </div>
            </div>
        )
    }
}

export default Perusahaan