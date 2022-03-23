const mongoose=require(`mongoose`)
const Schema=mongoose.Schema

const PasscodeSchema=new Schema({
    pass_code: { type: String, required: true, maxLength: 100 },
  
  }
)




module.exports=mongoose.model(`Passcode`,PasscodeSchema);

