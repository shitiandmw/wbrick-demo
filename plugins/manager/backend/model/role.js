const { Schema } = require("mongoose")
module.exports = factory => {
    const TaskSchema = new Schema({
        name: { type: String, required: true }, // 角色名称
        code: { type: String, required: true }, // 角色编码
        description: { type: String },          // 角色描述
        permissions: [{ type: [ Object ] }],         // 角色权限
        createdAt: { type: Date, default: Date.now },// 创建时间
        updatedAt: { type: Date, default: Date.now },// 更新时间
    });
    let schema = factory.createModel('role', TaskSchema);
    return schema;
};
