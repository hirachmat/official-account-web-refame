import React, { Component } from 'react'

class LembagaPemerintahan extends Component {
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
                <div className="uk-margin" id="field-documents-surat_keterangan_pejabat_lembaga">
                    <label className="uk-form-label form__label-item" htmlFor="surat_keterangan_pejabat_lembaga">Surat Keterangan dari Pejabat Lembaga Pemerintah Terkait*</label>
                    <label className="uk-form-label form__label-item-small">(ukuran maksimal: 5Mb)</label>
                    <div uk-form-custom="true">
                        <input type="file" title="Akta Pendirian Organisasi" 
                        id="field-akta-pendirian-perusahaan" name="surat_keterangan_pejabat_lembaga"
                        onChange={ 
                            (e) => this.handleInput(e, "surat_keterangan_pejabat_lembaga", [
                                {
                                    typeValidate: 'file',
                                    maxSize: 5000000,
                                    fileType: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
                                }
                            ], true, 'file', 'documents') }/>
                        <button className="uk-button form__button-upload" type="button" tabIndex="-1">Upload Foto Surat</button>
                    </div>
                    <div className="uk-margin-small">
                        { this.props.propsData.formErrors.section.documents.surat_keterangan_pejabat_lembaga === "" && (
                            <label className="uk-form-label form__label-item-small" onClick={ (e) => this.handleShowPreview(this.props.propsData.nameFile.surat_keterangan_pejabat_lembaga) }>{ this.props.propsData.nameFile.surat_keterangan_pejabat_lembaga }</label>
                        ) }
                        { this.renderErrorMessage(this.props.propsData.formErrors.section.documents.surat_keterangan_pejabat_lembaga, 'surat keterangan pejabat lembaga', "") }
                    </div>
                </div>
            </div>
        )
    }
}

export default LembagaPemerintahan