const { contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            let validChannels = ['windowControl'];
            if (validChannels.includes(channel)) {
              ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ['windowControlResposne'];
            if (validChannels.includes(channel)) {
                ipcRenderer.once(channel, (event,args) =>{ func(args)});
            }
        }
    }
);
