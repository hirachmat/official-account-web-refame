import React, { Component } from 'react'
import InputFile from '../../components/form/inputFile'

class LembagaPemerintahan extends Component {
    state = {}

    handleShowPreview(value) {
        this.props.handleChildShowPreview(value)
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
                <InputFile name="surat_keterangan_pejabat_lembaga" id="surat_keterangan_pejabat_lembaga" type="file" label="Surat Keterangan dari Pejabat Lembaga Pemerintah Terkait" buttonLabel="Surat" section="documents" required={ true } typeOA="" placeholder="" validation={ [
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

export default LembagaPemerintahan