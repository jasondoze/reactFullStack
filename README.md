# reactFullStack

# local development

Install multipass:
`brew install multipass`

Launch VM
`multipass launch --mount /Users/jasondoze/reactFullStack/crown-apparel:/home/ubuntu/crown-apparel --name reactFullStack jammy`

Login to VM
`multipass shell reactFullStack`

Install Dependencies

```
sudo apt update
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs
```

Build and run the app
```
npm install
npm build
npm start
```

Test the app
get the IP
`ip a`
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: enp0s2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether b2:51:71:2b:13:36 brd ff:ff:ff:ff:ff:ff
    inet 192.168.64.6/24 metric 100 brd 192.168.64.255 scope global dynamic enp0s2
