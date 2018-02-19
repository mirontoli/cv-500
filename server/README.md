# Backend for dictionary, a [Sails](http://sailsjs.org) application.

### Install sails globally
```
npm i -g sails
```

### Install dependencies
```
npm i
```

### Run develoment server
```
sails lift
```

## Local database
Make sure you use the latest [MongoDB 3.6](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) 

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl unmask mongodb
sudo systemctl enable mongodb
sudo systemctl start mongodb
```


## Import database
unpack as
dump/files

then :
```
mongorestore --db cv500
``` 