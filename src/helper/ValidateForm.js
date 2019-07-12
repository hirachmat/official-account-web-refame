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

function setRule(e, ruleValidate, required, sectionName, formErrors, formValid) {
    const name = e.target.name
    const value = e.target.value
    const type = e.target.type
    const title = e.target.title

    const rule = {
        name: name,
        value: value,
        type: type,
        title: title,
        sectionName: sectionName,
        ruleValidate: ruleValidate,
        required: required,
        formErrors: formErrors,
        formValid: formValid
    }

    return rule
}

function setErrorValidate(formErrors) {
    const error = []
    Object.keys(formErrors.section).forEach(item => {
        Object.keys(formErrors.section[item]).forEach(itemChild => {
            if(itemChild === 'location')
                Object.keys(formErrors.section[item][itemChild]).map(itemLocation => error.push(formErrors.section[item][itemChild][itemLocation] === ''))
            else
                error.push(formErrors.section[item][itemChild] === '')
        })
    })

    return error
}

export default {
    validateField,
    setRule,
    setErrorValidate
}