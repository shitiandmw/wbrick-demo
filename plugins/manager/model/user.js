const { Schema } = require("mongoose")
module.exports = factory => {
  const TaskSchema = new Schema({
    name: { type: String, required: true }, // 管理员姓名
    email: { type: String },  // 管理员邮箱
    account: { type: String, required: true }, // 管理员账号
    password: {type: String, required: true},  // 密码
    createdAt: { type: Date, default: Date.now }, // 创建时间
    updatedAt: { type: Date, default: Date.now }, // 更新时间
    lastLoginDate: { type: Date }, // 最后登录时间
    lastLoginIp: { type: String },  // 最后登陆ip
    isEnabled: { type: Boolean, default: true }, // 是否启用
    roles: {
      type: [{ type: Schema.Types.ObjectId, ref: 'role' }],
      default: []
    } // 用户角色
  });

  let schema = factory.createModel('user', TaskSchema);
  return schema;
};
