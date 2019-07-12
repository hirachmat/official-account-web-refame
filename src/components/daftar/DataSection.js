import React, { Component } from 'react'
import { connect } from 'react-redux'
import AsyncSelect from 'react-select/async'
import Select from 'react-select'
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'
import '../../assets/frontend/css/daftar/datepickerStyle.css'
import moment from 'moment'
import * as categoryActions from '../../actions/categoryActions'
import * as locationActions from '../../actions/locationActions'

class DataSection extends Component {
    state = {}

    componentDidMount() {
        this.props.GetCategoryList().catch(() => {
            alert('Gagal mengambil data list category')
        })
    }

    handleInput(e, state, ruleValidate, required, type, section) {
        this.props.handleChildPropsChange(e, state, ruleValidate, required, type, section)
    }

    renderErrorMessage(error, name, type) {
        if(type === "")
            return <p className="uk-has-error">{ error !== "" ? `${name} ${error}` : "" }</p>
        else
            return <p className="uk-has-error">{ error !== "" ? `${name} ${type} ${error}` : "" }</p>
    }

    getCountry = (country, callback) => {
        setTimeout(() => {
            callback(this.props.location.country.list)
        }, 1000)
    }

    handleDateChange(nameState, value) {
        this.props.handleDateChange(nameState, value)
    }

    openDatePicker = () => {
        this.datePickerRef.show()
    }

    render() {
        return(
            <div>
                <div className="uk-margin" id="field-organisasi-name">
                    <label className="uk-form-label form__label-item" htmlFor="nama">Nama { this.props.propsData.form.type }*</label>
                    <div className="uk-form-controls">
                        <input className="uk-input form__input-custom" 
                        id="field-nama" type="text" title={ `Nama ${ this.props.propsData.form.type }` } name="name" value={ this.props.propsData.form.section.organisasi.name }
                        autoComplete="off" placeholder=""
                        onChange={ 
                            (e) => this.handleInput(e, 'name', [
                                {
                                    typeValidate: 'regex',
                                    rule: /(^[a-zA-Z0-9.,-.'\s]*)$/gi
                                },
                                {
                                    typeValidate: 'text',
                                    min: 0,
                                    max: 100
                                }
                        ], true, 'text', 'organisasi') }/>
                    </div>
                    { this.renderErrorMessage(this.props.propsData.formErrors.section.organisasi.name, 'nama', this.props.propsData.form.type.toLowerCase()) }
                </div>
                <div className="uk-margin" id="field-organisasi-category">
                    <label className="uk-form-label form__label-item" htmlFor="kategori">Kategori*</label>
                    <div className="uk-form-controls">
                        <Select
                            placeholder="Pilih Tipe yang Sesuai"
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable={false}
                            name="category"
                            options={this.props.category.list}
                            onChange={ (e) => this.handleInput(e, 'category', [], true, 'select', 'organisasi') }
                        />
                    </div>
                    { this.renderErrorMessage(this.props.propsData.formErrors.section.organisasi.category, 'kategori', "") }
                </div>
                <div className="uk-margin" id="field-organisasi-description">
                    <label className="uk-form-label form__label-item">Deskripsi { this.props.propsData.form.type }*</label>
                    <div className="uk-form-controls">
                        <textarea className="uk-textarea form__input-custom" id="description" name="description" rows={8} placeholder="" value={ this.props.propsData.form.section.organisasi.description }
                        onChange={ (e) => this.handleInput(e, 'description', [
                            {
                                typeValidate: 'text',
                                min: 10,
                                max: 1000000
                            }
                        ], true, 'text', 'organisasi') }/>
                    </div>
                    { this.renderErrorMessage(this.props.propsData.formErrors.section.organisasi.description, 'deskripsi', this.props.propsData.form.type.toLowerCase()) }
                </div>
                <div className="uk-margin" id="field-organisasi-address">
                    <label className="uk-form-label form__label-item">Alamat { this.props.propsData.form.type }*</label>
                    <div className="uk-form-controls">
                        <textarea className="uk-textarea form__input-custom" id="address" name="address" rows={8} placeholder="" value={ this.props.propsData.form.section.organisasi.address }
                        onChange={ (e) => this.handleInput(e, 'address', [
                            {
                                typeValidate: 'text',
                                min: 10,
                                max: 1000000
                            }
                        ], true, 'text', 'organisasi') }/>
                    </div>
                    { this.renderErrorMessage(this.props.propsData.formErrors.section.organisasi.address, 'alamat', this.props.propsData.form.type.toLowerCase()) }
                </div>
                <div className="uk-margin" id="field-organisasi-country">
                    <label className="uk-form-label form__label-item" htmlFor="country">Lokasi*</label>
                    <div className="uk-form-controls">
                        <AsyncSelect
                            placeholder="Pilih negara"
                            cacheOptions
                            loadOptions={this.getCountry}
                            defaultOptions
                            name="country"
                            onChange={ (e) => this.handleInput(e, 'country', [], true, 'select', 'organisasi') }
                        />
                    </div>
                    { this.renderErrorMessage(this.props.propsData.formErrors.section.organisasi.location.country, 'negara', "") }
                </div>
                <div className="uk-margin" id="field-organisasi-province">
                    <label className="uk-form-label form__label-item" htmlFor="kategori">Provinsi*</label>
                    <div className="uk-form-controls">
                        <Select
                            placeholder="Pilih provinsi"
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable={false}
                            name="province"
                            options={this.props.location.province.list}
                            onChange={ (e) => this.handleInput(e, 'province', [], true, 'select', 'organisasi') }
                        />
                    </div>
                    { this.renderErrorMessage(this.props.propsData.formErrors.section.organisasi.location.province, 'provinsi', "") }
                </div>
                <div className="uk-margin" id="field-organisasi-city">
                    <label className="uk-form-label form__label-item" htmlFor="kota">Kota*</label>
                    <div className="uk-form-controls">
                        <Select
                            placeholder="Pilih kota"
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable={false}
                            name="city"
                            options={this.props.location.city.list}
                            onChange={ (e) => this.handleInput(e, 'city', [], true, 'select', 'organisasi') }
                        />
                    </div>
                    { this.renderErrorMessage(this.props.propsData.formErrors.section.organisasi.location.province, 'provinsi', "") }
                </div>
                <div className="uk-margin" id="field-organisasi-phone">
                    <label className="uk-form-label form__label-item" htmlFor="phone">No Telpon*</label>
                    <div className="uk-form-controls uk-inline form__with-icon">
                        <span className="uk-form-icon form__with-icon__label-item">62</span>
                        <input className="uk-input form__input-custom" id="phone" name="phone" type="text" placeholder="" autoComplete="off" value={ this.props.propsData.form.section.organisasi.phone } 
                        onChange={ 
                            (e) => this.handleInput(e, 'phone', [
                                {
                                    typeValidate: 'regex',
                                    rule: /^\d+$|^$/,
                                    min: 5,
                                    max: 10
                                    // rule: /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/g //regex untuk nomer telpon dan handphone
                                }
                            ], true, 'number', 'organisasi') }/>
                    </div>
                    { this.renderErrorMessage(this.props.propsData.formErrors.section.organisasi.phone, 'no telpon', "") }
                </div>
                <div className="uk-margin" id="field-organisasi-email">
                    <label className="uk-form-label form__label-item" htmlFor="email">Email { this.props.propsData.form.type }*</label>
                    <div className="uk-form-controls">
                        <input className="uk-input form__input-custom" id="email" name="email" type="email" placeholder="" autoComplete="off" value={ this.props.propsData.form.section.organisasi.email } 
                        onChange={ (e) => this.handleInput(e, "email", [
                            {
                                typeValidate: 'regex',
                                rule: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
                            },
                            {
                                typeValidate: 'text',
                                min: 0,
                                max: 50
                            }
                        ], true, "text", "organisasi") }/>
                    </div>
                    { this.renderErrorMessage(this.props.propsData.formErrors.section.organisasi.email, 'email', "") }
                </div>
                <div className="uk-margin" id="field-organisasi-tanggal_berdiri">
                    <label className="uk-form-label form__label-item" htmlFor="tanggal_berdiri">Tanggal berdiri</label>
                    <div className="uk-form-controls">
                    <DatePickerComponent id="datepicker" 
                        ref={ calender => this.datePickerRef = calender } 
                        focus={ () => this.openDatePicker() } allowEdit={ true } 
                        start="Decade" depth="Month" format="dd MMMM yyyy" 
                        showTodayButton={false} 
                        change={ (e) => this.handleDateChange('tanggal_berdiri', moment(e.value).format('YYYY-MM-DD')) }/>
                    </div>
                    { this.renderErrorMessage(this.props.propsData.formErrors.section.organisasi.tanggal_berdiri, 'tanggal berdiri', "") }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ daftar }) => ({
    category: daftar.category,
    location: daftar.location
})
  
const mapDispatchToProps = { ...categoryActions, ...locationActions }
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataSection)