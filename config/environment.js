const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});



const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'NodejsAuth',
    smtp: {
        service: 'OutLook',
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: 'ramanrana88940@outlook.com',
            pass: process.env.password
        }
    },
    google_client_id: "274522859884-fuf3beh6eju3r8101fvrsgqtgfs7sov9.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'NodeJsAuth',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}





module.exports = development