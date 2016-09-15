# efzunionsystem

## Requirements

### Node.js

#### Installing Node.js

For Mac OS: 

```
brew install node
```

For Linux:

```
git clone https://github.com/joyent/node
./configure
make
make install
```

#### Installing node-modules:
```
npm install
```

### Mongodb

#### Installing Mongodb

For Mac OS: 

```
brew install mongodb
```

For Red-Hat Based Linux :
```
sudo yum install -y mongodb-org
```

For Debian Based Linux :
```
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

For Other Linux Based OS:

```
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.0.12.tgz
tar -zxvf mongodb-linux-x86_64-3.0.12.tgz
mkdir -p mongodb
cp -R -n mongodb-linux-x86_64-3.0.12/ mongodb
export PATH=<mongodb-install-directory>/bin:$PATH
```

#### Database & Session Configuration
```
mongod --bind_ip 127.0.0.1 --dbpath ./database --smallfiles
```

Will Upload installation scripts.

## Database Configuration

### Via mongo shell

```
mongo 127.0.0.1
use union
```

### Via mongoose

```
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/union');
```

