import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'
import '../../assets/frontend/css/daftar/datepickerStyle.css'
import moment from 'moment'
import * as categoryActions from '../../actions/categoryActions'
import * as locationActions from '../../actions/locationActions'
import InputText from '../../components/form/inputText'
import InputTextArea from '../../components/form/inputTextArea'
import InputNumber from '../../components/form/inputNumber'
import InputSelect from '../../components/form/inputSelect'
import InputAsyncSelect from '../../components/form/inputAsyncSelect'

class DataSection extends Component {
    state = {}

    componentDidMount() {
        this.props.GetCategoryList().catch(() => {
            alert('Gagal mengambil data list category')
        })
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

    handleInputComponent = (data) => {
        this.props.handleInputComponent(data)
    }

    handleInputSelectComponent = (data) => {
        this.props.handleInputSelectComponent(data)
    }

    render() {
        return(
            <div>
                <InputText name="name" id="name" type="text" label="Nama" section="organisasi" required={ true } typeOA={ this.props.propsData.form.type } placeholder="" validation={ [
                    {
                        typeValidate: 'regex',
                        rule: /(^[a-zA-Z0-9.,-.'\s]*)$/gi
                    },
                    {
                        typeValidate: 'text',
                        min: 0,
                        max: 100
                    }
                ] } form={ this.props.propsData.form } errors={ this.props.propsData.formErrors } formValid={ this.props.propsData.formValid } handleInput={ this.handleInputComponent }/>
                <InputSelect name="category" id="category" type="select" label="Kategori" section="organisasi" required={ true } typeOA="" placeholder="" validation={ [] } 
                    options={ this.props.category.list } defaultOptions={ null } form={ this.props.propsData.form } errors={ this.props.propsData.formErrors } formValid={ this.props.propsData.formValid } handleInput={ this.handleInputSelectComponent }/>
                <InputTextArea name="description" id="description" type="text" label="Deskripsi" section="organisasi" required={ true } typeOA={ this.props.propsData.form.type } placeholder="" validation={ [
                    {
                        typeValidate: 'text',
                        min: 10,
                        max: 1000000
                    }
                ] } form={ this.props.propsData.form } errors={ this.props.propsData.formErrors } formValid={ this.props.propsData.formValid } handleInput={ this.handleInputComponent }/>
                <InputTextArea name="address" id="address" type="text" label="Alamat" section="organisasi" required={ true } typeOA={ this.props.propsData.form.type } placeholder="" validation={ [
                    {
                        typeValidate: 'text',
                        min: 10,
                        max: 1000000
                    }
                ] } form={ this.props.propsData.form } errors={ this.props.propsData.formErrors } formValid={ this.props.propsData.formValid } handleInput={ this.handleInputComponent }/>
                <InputAsyncSelect name="country" id="country" type="select" label="Lokasi" section="organisasi" required={ true } typeOA="" placeholder="" validation={ [] } 
                    options={ this.getCountry } form={ this.props.propsData.form } errors={ this.props.propsData.formErrors } formValid={ this.props.propsData.formValid } handleInput={ this.handleInputSelectComponent }/>
                <InputSelect name="province" id="province" type="select" label="Provinsi" section="organisasi" required={ true } typeOA="" placeholder="" validation={ [] } 
                    options={ this.props.location.province.list } defaultOptions={ null } form={ this.props.propsData.form } errors={ this.props.propsData.formErrors } formValid={ this.props.propsData.formValid } handleInput={ this.handleInputSelectComponent }/>
                <InputSelect name="city" id="city" type="select" label="Kota" section="organisasi" required={ true } typeOA="" placeholder="" validation={ [] } 
                    options={ this.props.location.city.list } defaultOptions={ null } form={ this.props.propsData.form } errors={ this.props.propsData.formErrors } formValid={ this.props.propsData.formValid } handleInput={ this.handleInputSelectComponent }/>
                <InputNumber name="phone" id="phone" type="text" typeInput="phone" label="No Telpon" section="organisasi" required={ true } typeOA="" placeholder="" validation={ [
                    {
                        typeValidate: 'regex',
                        rule: /^\d+$|^$/,
                        min: 5,
                        max: 10
                        // rule: /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/g //regex untuk nomer telpon dan handphone
                    }
                ] } form={ this.props.propsData.form } errors={ this.props.propsData.formErrors } formValid={ this.props.propsData.formValid } handleInput={ this.handleInputComponent }/>
                <InputText name="email" id="email" type="email" label="Email" section="organisasi" required={ true } typeOA={ this.props.propsData.form.type } placeholder="" validation={ [
                    {
                        typeValidate: 'regex',
                        rule: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
                    },
                    {
                        typeValidate: 'text',
                        min: 0,
                        max: 50
                    }
                ] } form={ this.props.propsData.form } errors={ this.props.propsData.formErrors } formValid={ this.props.propsData.formValid } handleInput={ this.handleInputComponent }/>
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