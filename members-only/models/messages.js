const mongoose=require(`mongoose`)
const Schema=mongoose.Schema

const MessageSchema=new Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    username:{type:String,required:true},
  }
)

MessageSchema
.virtual('time_formatted')
.get(function () {
  return DateTime.fromJSDate(this.time).toLocaleString(DateTime.DATE_MED);
});

MessageSchema.virtual(`url`).get(()=>`catalog/games`+this._id)

module.exports=mongoose.model(`Messages`,MessageSchema);

