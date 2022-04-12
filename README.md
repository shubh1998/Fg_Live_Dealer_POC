# For React App Client Side

## Cloning the application
```
git clone https://github.com/shubh1998/Fg_Live_Dealer_POC.git
```

```
cd Fg_Live_Dealer_POC
```

## Installing Dependencies and Starting dev server
### Install packages
```
npm install --include=dev
```

### Start App
```
npm start

Open your application at http://localhost:3000
```
## Development System specifications
* OS - `Ubuntu 20.04`
* yarn version - `v1.22.11`
* npm version - `v8.1.2`
* node version - `v16.13.1`
* react: `v17.0.2`
* react-dom: `v17.0.2`



## Server URL for API
```
https://demo-be-fg.herokuapp.com/api/v1
```

## Postman Collection of APIs
```
https://www.getpostman.com/collections/4d810083e62752f8b60a
```

## Note
```
If Postman collection link not works, I have also given the JSON format of postman collection you can import by using that also.
```

## =====================================================================================================



# Node Media Server Setup Need To Achieve Live Streaming Using OBS

## Cloning the application
```
git clone https://github.com/illuspas/Node-Media-Server
```

```
cd Node-Media-Server
```

## Installing Dependencies and Starting dev server
### Install packages
```
npm install
```

### Start App
```
npm start

Open your application at http://localhost:8000/admin

username - admin
password - admin
```


## Steps to do live streaming

```
Step-1 : Download OBS Software to do broadcasting.
Step-2 : Open OBS Settings, In Output option set video bitrate to 1000 Kbps and Audio Bitrate to 160.
Step-3 : Open OBS Settings and In Stream Option and select custom service and In server just enter rtmp://localhost/live and In Stream key Enter your stream name. 
Step-4 : From sources section, Add Media source by selecting any video and check the loop option to run video continuously and then Start Streaming.
Step-5 : That's it your streaming starts, if you want to stop streaming. There you will get an option to start streaming.
```

## Note :
```
*Note - Please Enter these stream keys to achieve live streaming in our react app project*
1. 'RL' for Roulette Game.
2. 'DT' fro Dragon Tiger Game.
3. 'SB' for Sicbo Game. 
```




