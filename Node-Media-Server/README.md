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