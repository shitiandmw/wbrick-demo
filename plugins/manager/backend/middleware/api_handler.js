// 验证权限
async function verifyPermission(ctx, logger = null) {
  // logger?.info('session user:'+JSON.stringify(ctx.session.user));
  return true
}

module.exports = async (ctx, next, logger = null) => {
  let code = 200;
  try {
    let auth_res = await verifyPermission(ctx,logger);
    if (!auth_res) {
      code = 401;
      throw new Error('请先登录');
    }
    await next();
    if (ctx.status == 404) {
      code = 404;
      throw new Error('接口路径错误');
    }

    ctx.body = {
      status: 'Success',
      code: code,
      message: '',
      data: ctx.body ? ctx.body : '',
    };
  } catch (err) {
    logger?.error('api error');
    logger?.error(err);
    ctx.body = {
      status: 'Fail',
      code: err.code || code || ctx.status || 500,
      // code: 4001,
      message: err.message,
      data: null,
    };
    ctx.status = 200;
  }
};
