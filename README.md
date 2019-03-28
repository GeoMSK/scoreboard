This is a very simple scoreboard app for a single challenge. It is developed using spring and angular. It keeps a list of people who solved a challenge in chronological order. To prove that you solved the challenge you submit the challenge's "flag". The flag in this case is a small string that you find after solving the challenge.

## Screenshots

The current theme of the app is for a crypto challenge

![screenshot1](/screenshots/ss1.jpg?raw=true "Flag input")
![screenshot2](/screenshots/ss2.png?raw=true "Hall of Fame")

## Configuration:

All configuration is done in the application.properties file  
Sample application.properties:
```
# hash of the string: "test"
challenge-flag-hash=$2a$10$/8RPt9RJsov3ahLCBlMyPOne8DQwS4sU7/FkX1dXjleIGPnNPkqFG

spring.datasource.url=jdbc:h2:./scoreboard_db;DB_CLOSE_ON_EXIT=FALSE;AUTO_RECONNECT=TRUE
spring.datasource.username=admin
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update

spring.resources.cache.cachecontrol.max-age=365d

# list of addresses that will not require authentication. Enter a single ip address per entry.
whitelist[0]=127.0.0.1
#whitelist[1]=127.0.0.2

# credentials required for everyone except the whitelisted ip addresses
ba-user=test
ba-pass=test
```
The flag should be hashed using bcrypt. For convenience you can do that using the scoreboard app like this:
```
java -jar <scoreboard.jar path> <flag>
```
Example:
```
java -jar ./scoreboard-server-1.0.0.jar test
$2a$12$5JYMKeaiTaXNsEjTn2Mro.jc3qbvYfjmHVDwoXHJ7tCV.f3qQQCgK
```

Currently it uses basic auth to restrict access (only one universal account).
It also supports ip whitelisting (ipv4) to bypass the basic auth from specific addresses. If you use this feature make sure to add 
```
-Djava.net.preferIPv4Stack=true
```

For example you may want to allow unrestricted access from one location (home/company/event network)  while requiring authentication for anyone else.

## How to run
Download the [latest release](https://github.com/GeoMSK/scoreboard/releases/download/v1.0.0/scoreboard-server-1.0.0.zip)  
Extract the contents of the archive, configure application.properties (see [configuration](https://github.com/GeoMSK/scoreboard#configuration)) and then run
```
java -Djava.net.preferIPv4Stack=true -jar ./scoreboard-server-1.0.0.jar
```


Note that in order to run this application Java 8 is required.
