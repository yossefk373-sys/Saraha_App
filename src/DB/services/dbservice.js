
export const create=async({model,data,option={}}={})=>{
    return await model.create([data],option)
}
export const findbyid=async({model,id,option={}}={})=>{
    return await model.findById(id,option)
}
export const find=async({model,filter,option={}}={})=>{
    const data=  model.find(filter)
    if(option?.limit) data.limit(option?.limit)
    if(option?.skip) data.skip(option?.skip)
    if(option?.sort) data.sort(option?.sort)
    if(option?.populate) data.populate(option?.populate)
        return await data.exec()

} 
export const findone=async({model,filter,option={}}={})=>{
    return await model.findOne(filter,option)
}
export const findbyidandupdate=async({model,id,update,option={}}={})=>{
    return await model.findByIdAndUpdate(id,update,option)
}
export const findoneandupdate=async({model,filter,update,option={  new: true , runValidators:true}}={})=>{
    return await model.findOneAndUpdate(filter,update,option)
}
export const deletebyid=async({model,id,option={}}={})=>{
    return await model.findByIdAndDelete(id,option)
}
export const deleteone=async({model,filter,option={}}={})=>{
    return await model.findOneAndDelete(filter,option)
}
