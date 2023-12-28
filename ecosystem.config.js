module.exports = {
  apps : [{
    name   : "wbrick-demo",
    script : "./app.js",
    instances: 'max',   // 启动最大实例数量
    exec_mode: 'cluster',  // 启动模式，集群模式
    error_file: './logs/err.log',  // 错误日志文件路径
    out_file: './logs/out.log',    // 输出日志文件路径
    merge_logs:true,   // 是否合并所有实例的日志
    log_date_format: 'YYYY-MM-DD HH:mm:ss',  // 日志时间格式
    max_memory_restart: "2G"  // 最大内存限制数，超出自动重启
  }]
}
