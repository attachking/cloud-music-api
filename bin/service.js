let Service = require('node-windows').Service
let path = require('path')

// Create a new service object
let svc = new Service({
    name:'Cloud Music',
    description: 'Cloud Music',
    script: path.join(__dirname, 'index.js'),
    env: {
        name: 'PORT',
        value: 3000
    }
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
    svc.start()
})

svc.install()