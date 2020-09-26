const isDevelopment = process.env.NODE_ENV === 'development';
let config = {
  accessKey: 'p8llZMkcproDlxQzTw39QM3DegZ7jXH_QO_cPTSu',
  secretKey: '7B-YDVawAkynItEvItzDtZcjFIz1iIejaoCxawD8',
  bucket: 'console-web', // 七牛的文件目录名
  successPath: isDevelopment ? 'http://dev.console.gzwjz.com/' : 'https://console.gzwjz.com/', // 成功后的路径 
  childPath: isDevelopment ? 'console_dev_react/' : 'console_react/'
}
module.exports = config;