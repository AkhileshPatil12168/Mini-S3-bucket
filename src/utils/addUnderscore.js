const addUnderscore = (value)=>{
    let newStr = ""
    for(let char of value){
        if(char ==" ") newStr += "_"
        else newStr += char

    }
    return newStr
}

module.exports = addUnderscore