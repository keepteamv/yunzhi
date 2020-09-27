const isDevelopment = process.env.NODE_ENV === 'development';
export default {
    isDevelopment,
    apiAddress: isDevelopment ? 'http://localhost:5000' : '',
    // apiAddress: 'http://localhost:5000',
    cdnAddress: 'https://cdn.gzwjz.com/',
    platformKey: 'web'
}