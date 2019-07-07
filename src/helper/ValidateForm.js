function validateField(data) {
    let { name, value, type, title, sectionName, ruleValidate, required, formErrors, formValid } = data
    let validateRule = false

    switch(type) {
        case 'email':
            validateRule = validateRuleFunc(ruleValidate, value)
            if(required){
                if(value !== '')
                    formErrors.section[sectionName][name] = validateRule ? '' : ` tidak valid`
                else
                    formErrors.section[sectionName][name] = ` harus diisi`
            }else{
                formErrors.section[sectionName][name] = validateRule ? '' : ` tidak valid`
            }
            break;
        case 'text':
            validateRule = validateRuleFunc(ruleValidate, value)
            if(required){
                if(value !== '') 
                    if(name === 'country' || name === 'province' || name === 'city')
                        formErrors.section[sectionName].location[name] = validateRule ? '' : ` tidak valid`
                    else
                        formErrors.section[sectionName][name] = validateRule ? '' : ` tidak valid`
                else
                    if(name === 'country' || name === 'province' || name === 'city')
                        formErrors.section[sectionName].location[name] = ` harus diisi`
                    else
                        formErrors.section[sectionName][name] = ` harus diisi`
            }else{
                if(name === 'country' || name === 'province' || name === 'city')
                    formErrors.section[sectionName].location[name] = validateRule ? '' : ` tidak valid`
                else
                    formErrors.section[sectionName][name] = validateRule ? '' : ` tidak valid`
            }
            break;
        case 'number':
            validateRule = validateRuleFunc(ruleValidate, value)
            if(required){
                if(value !== '')
                    formErrors.section[sectionName][name] = validateRule ? '' : ` tidak valid`
                else
                    formErrors.section[sectionName][name] = ` harus diisi`
            }else{
                formErrors.section[sectionName][name] = validateRule ? '' : ` tidak valid`
            }
            break;
        case 'textarea':
            validateRule = validateRuleFunc(ruleValidate, value)
            if(required){
                if(value !== '')
                    formErrors.section[sectionName][name] = validateRule ? '' : ` tidak valid`
                else
                    formErrors.section[sectionName][name] = ` harus diisi`
            }else{
                formErrors.section[sectionName][name] = validateRule ? '' : ` tidak valid`
            }
            break;
        case 'file':
            // validateRule = validateRuleFunc(ruleValidate, value)
            // formErrors[name] = validateRule ? '' : `tidak valid`
            if(ruleValidate[0].fileType.indexOf(value[0].type) === -1) {
                formErrors.section[sectionName][name] = `format file tidak valid`
            }else if(value[0].size > ruleValidate[0].maxSize) {
                formErrors.section[sectionName][name] = 'ukuran file terlalu besar'
            }else{
                formErrors.section[sectionName][name] = ''
            }
            break;
        default:
            break;
    }

    formValid = validateRule

    let result = {
        name: name,
        value: value,
        type: type,
        title: title,
        formErrors: formErrors,
        formValid: formValid
    }

    return result
}

function validateRuleFunc(ruleValidate, value) {
    let error = []
    ruleValidate.forEach((item, index) => {
        switch(item.typeValidate) {
            case 'regex':
                error.push(value.match(item.rule) !== null)
                break;
            case 'text':
                error.push(value.length > item.min && value.length <= item.max)
                break;
            case 'number':
                error.push(value.length > item.min && value.length <= item.max)
                break;
            case 'file':
                error.push(value[0].size <= item.maxSize && (item.fileType.indexOf(value[0].type) > -1))
                break;
            default:
                break;
        }
    })
    
    return error.indexOf(false) === -1
}

export default {
    validateField
}

// function validateField(name, value, type) {
//     let formErrors = this.state.formErrors
//     let inputValid = this.state.inputValid

//     switch(type) {
//         case 'email':
//             inputValid[name] = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
//             if(this.state[name] !== '')
//                 formErrors[name] = inputValid[name] ? '' : ` ${name} is invalid`
//             else
//                 formErrors[name] = ` ${name} is required`
//             break;
//         case 'text':
//             formErrors[name] = this.state[name] !== '' ? '' : ` ${name} is required`
//         default:
//             break;
//     }

//     this.setState({ formErrors: formErrors, inputValid: inputValid }, () => {
//         this.validateForm()
//     })
// }

// function validateForm() {
//     let error = []
//     Object.keys(this.state.inputValid).forEach((item, index) => {
//         error.push(this.state.inputValid[item] !== null)
//     })
//     this.setState({ formValid: error.indexOf(false) == -1 })
// }