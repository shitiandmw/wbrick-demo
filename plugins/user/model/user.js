const { Schema } = require("mongoose")
module.exports = factory => {
  const TaskSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    password: {type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  let schema = factory.createModel('user', TaskSchema);
  return schema;
};
