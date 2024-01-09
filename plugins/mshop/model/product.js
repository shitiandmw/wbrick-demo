const { Schema } = require("mongoose")
module.exports = factory => {
    const TaskSchema = new Schema({
        mer_id: { type: String }, // 商户id
        name: { type: String, required: true }, // 商品名称
        info: { type: String }, // 商品描述
        keyword: { type: String }, // 关键字
        image: { type: [String] }, // 商品图片
        bar_code: { type: String }, // 商品条码
        cate_id : { type: [String] }, // 商品分类id
        price: { type: Number }, // 商品价格
        postage: { type: Number }, // 邮费
        sort: { type: Number }, // 排序
        add_time: { type: Date }, // 添加时间
        ficti: { type: Number }, // 虚拟销量
        is_postage:{ type: Boolean }, // 是否包邮
        is_show: { type: Boolean }, // 是否上架
        is_benefit :{ type: Boolean }, // 是否优惠
        is_hot :{ type: Boolean }, // 是否热门
        is_new :{ type: Boolean }, // 是否新品
        is_virtual: { type: Boolean }, // 是否虚拟商品
        is_del:{ type: Boolean }, // 是否删除
    });
    let schema = factory.createModel('product', TaskSchema);
    return schema;
};
