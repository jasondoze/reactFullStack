# Deployment

## App dependencies 
node

## Deployment
how to deploy
<br>
copy the files
<br>
install node
<br>
cd to the app
<br>
run npm install
<br>
build the app
<br>
start the app from production mode: build
<br>
use the ssh key to scp the site up to the crown users directory
<br>
write a script that does all the deployment steps
<br>
install node
<br>
npm install
<br> 
npm start

<br>


# Start Here

# Crown User
Deploy crownuser to a server

<br>

# Create a crown user with ssh keys

## Enable ssh access to multipass vms

You want to ssh into the VM, because you cannot or don't want to use the standard shell command multipass shell <name-of-vm>.

The naive approach fails with permission denied:
```
ssh 192.168.205.7
The authenticity of host '192.168.205.7 (192.168.205.7)' can't be established.
ED25519 key fingerprint is SHA256:lWKUbxxxx.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '192.168.205.7' (ED25519) to the list of known hosts.
gernotstarke@192.168.205.7: Permission denied (publickey).

Permission denied, although there is a route to this virtual machine available...
```

<br>

## Create new ssh-key for your multipass VMs
---
Create a reusable launch configuration for multipass VMs with cloud-init
<br>
Launch new multipass VMs with this configuration
<br>
Find out IP-address of new multipass VM
<br>
ssh into the new VM with this IP-address

<br>

## Create ssh-key
---
On your host machine (the one with multipass installed), change to the directory from where you will be launching multipass vms. It can be your home directory, but any other will do.


`ssh-keygen -C vmuser -f multipass-ssh-key`

```
Your identification has been saved in multipass-ssh-key
Your public key has been saved in multipass-ssh-key.pub
The key fingerprint is:
SHA256:xdx4QprjBc7xV3ycIt5sl9m2gMgORrsPgYcizELdKXg vmuser
The key's randomart image is:
+---[RSA 3072]----+
|  o . . o .  ....|
| o E o + X + o..o|
|+ . . + O @ O ..+|
|.+ . o B * * = +o|
|. . . o S   . o..|
|       o .     . |
|        o        |
|         .       |
|                 |
+----[SHA256]-----+
```

<br>

vmuser can be any (dummy) username, it will later be used to log into the VM.
The parameter to -f is the filename for the generated key. You can choose a name of your liking, but there must not be an existing key with the same name in the same directory.
You will be asked to enter a passphrase, leave that empty! I know, it's not as secure as it should be, but multipass VMs are used for development and test only...

Empty passphrases are NOT suited for production environments.

<br>

## Create cloud-init configuration
---
Cloud-init is the standardized approach for cross-platform cloud and VM configuration of instance initialization.
Multipass can handle such configuration, we use it to pass the ssh key into the vm.

<br>

## In the directory where you generated the ssh-key, execute the following:

`touch cloud-init.yaml`

`nano cloud-init.yaml`


Put the following content into this file:
```
users:
  - default
  - name: vmuser
    sudo: ALL=(ALL) NOPASSWD:ALL
    ssh_authorized_keys:
    - <content of YOUR public key> 
```

<br>

The <content of YOUR public key> starts with the letters ssh-rsa and ends with the username you supplied in step 1. Both have to be included!

<br>

Remember, it's yaml: Sensitive to spaces and dashes.
In case you generated an ed25519 type of key, it starts with ssh-ed25519. If you don't know what I'm talking about, ignore this last line.

<br>

## Launch multipass VM with ssh configuration
You will use a slightly different launch command for your VM, by adding the cloud-init parameter:

`multipass launch -n testvm --cloud-init cloud-init.yaml`

Launched: testvm  

testvm is the name of your new vm, you can choose any name or even leave it blank. In the latter case, multipass will create a random name for you.

cloud-init.yaml is the name of the configuration file we created in step 2.

<br>

## Find IP address of new VM

`multipass info testvm`
```
Name:           testvm
State:          Running
IPv4:           192.168.64.8
Release:        Ubuntu 20.04.4 LTS
Image hash:     77f2f05e39e5 (Ubuntu 20.04 LTS)
Load:           0.86 0.40 0.15
Disk usage:     1.4G out of 4.7G
Memory usage:   147.2M out of 976.9M
Mounts:         --
```

testvm is the name of the VM you were using in step 3 (launch VM).
The output of the info command contains the IPv4 address of this VM, you need that in the next step.

<br>

## ssh into new VM

`ssh vmuser@192.168.64.8 -i multipass-ssh-key -o StrictHostKeyChecking=no`

<br>

```
Welcome to Ubuntu 20.04.4 LTS (GNU/Linux 5.4.0-125-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Tue Sep 20 19:53:34 CDT 2022

  System load:             0.4
  Usage of /:              29.4% of 4.67GB
  Memory usage:            20%
  Swap usage:              0%
  Processes:               117
  Users logged in:         0
  IPv4 address for enp0s2: 192.168.64.8
  IPv6 address for enp0s2: fd77:5f2:3f30:c26f:874:61ff:fe3b:4400


0 updates can be applied immediately.


The list of available updates is more than a week old.
To check for new updates run: sudo apt update
New release '22.04.1 LTS' available.
Run 'do-release-upgrade' to upgrade to it.



The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.
 ```

<br>

vmuser is the username for which you created the ssh key
Please replace the IP address by the one you found out in step 4.
And voilá - you made it.
The command itself should be obvious... you pass the name of the ssh-key with the -i command (short for identity). 

<br>

In addition, you turn strict host checking off.

You might see additional messages, depending on your host machine ssh configuration - but you should be logged in your multipass VM by now.

<br>

# After stopping the instance, purging, and repeating the above process:

```
jasondoze@jd crown-apparel % ssh vmuser@192.168.64.8 -i multipass-ssh-key -o StrictHostKeyChecking=no
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ED25519 key sent by the remote host is
SHA256:L0dOsCXeNtkdfMeKIcoFz0X9RMv38z5RvaoPv1bba28.
Please contact your system administrator.
Add correct host key in /Users/jasondoze/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in /Users/jasondoze/.ssh/known_hosts:18
Password authentication is disabled to avoid man-in-the-middle attacks.
Keyboard-interactive authentication is disabled to avoid man-in-the-middle attacks.
UpdateHostkeys is disabled because the host key is not trusted.
Welcome to Ubuntu 20.04.4 LTS (GNU/Linux 5.4.0-125-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Wed Sep 21 12:42:39 CDT 2022

  System load:             0.24
  Usage of /:              29.4% of 4.67GB
  Memory usage:            20%
  Swap usage:              0%
  Processes:               117
  Users logged in:         0
  IPv4 address for enp0s2: 192.168.64.8
  IPv6 address for enp0s2: fd77:5f2:3f30:c26f:874:61ff:fe3b:4400


0 updates can be applied immediately.


The list of available updates is more than a week old.
To check for new updates run: sudo apt update
New release '22.04.1 LTS' available.
Run 'do-release-upgrade' to upgrade to it.



The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.

$ 
```

<br>

---

`sudo apt update`

```
Reading package lists... Done
Building dependency tree       
Reading state information... Done
22 packages can be upgraded. Run 'apt list --upgradable' to see them.
```
<br>


---
# Finish
## Other Notes Below

<br>
<br>
<br>
<br>

`
# How to add a users ssh key for login
Create an ssh key pair for the user 
## Run this command on local

`ssh-keygen -t rsa -b 4096`

<br>

```
Enter file in which to save the key (/Users/jasondoze/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 

Enter return for both the default file and no passphrase
```

<br>

## cd into .ssh

`cd ~/.ssh`

<br>

## List ssh files

`ls -la`

```
drwx------   8 jasondoze  staff   256 Sep 20 18:01 .
drwxr-xr-x+ 55 jasondoze  staff  1760 Sep 20 17:25 ..
-rw-------   1 jasondoze  staff   411 Jul 15 19:26 id_ed25519
-rw-r--r--   1 jasondoze  staff   102 Jul 15 19:26 id_ed25519.pub
-rw-------   1 jasondoze  staff  3389 Sep 20 18:01 id_rsa
-rw-r--r--   1 jasondoze  staff   751 Sep 20 18:01 id_rsa.pub
-rw-------   1 jasondoze  staff  1808 Sep 20 17:52 known_hosts
-rw-------   1 jasondoze  staff   754 Jul 18 19:39 known_hosts
```

<br>

## id_rsa is private key/ .pub is public key
---

<br>

## The ssh key in Multipass VM is at:

`/home/ubuntu/.ssh`

<br>

## The ssh key in local machine is at:

`~/.ssh_id_rsa.pub`

<br>

## In crown apparel
```
jasondoze@jd crown-apparel % npm run build

> crown-apparel@0.1.0 build
> react-scripts build

Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  173.45 kB  build/static/js/main.2014b5c6.js
  1.79 kB    build/static/js/787.d87cce31.chunk.js
  290 B      build/static/css/main.05176563.css

The project was built assuming it is hosted at /.
You can control this with the homepage field in your package.json.

The build folder is ready to be deployed.
You may serve it with a static server:

  npm install -g serve
  serve -s build

Find out more about deployment here:

  https://cra.link/deployment
```

## In local, scp (secure copy) the site up to the crown users 




ubuntu@192.168.64.7: Permission denied (publickey).

<br>

## In VM 
`sudo nano authorized_keys`
add id_rsa.pub to authorized keys

<br>
 
## Repeat 
## In local, scp (secure copy) the created rsa public key into the .ssh directory in authorized keys

`scp /Users/jasondoze/.ssh/id_rsa.pub ubuntu@192.168.64.7:/home/ubuntu/.ssh/uploaded_key.pub`

```
id_rsa.pub                                                     100%  751   533.8KB/s   00:00  
```

<br>

## In VM: I could only scp over this file after adding id_rsa.pub in with authorized_keys in VM
'''
ubuntu@crownUser:~/.ssh$ ls
authorized_keys  uploaded_key.pub
'''

<br>

## Login to the server 

## Add users public key to the file 
```
~/.ssh/authorized_keys 
nano .ssh/authorized_keys 
cat .ssh/authorized_keys
```

## SSH using private key ssh

`-i ~/.ssh/id_ed25519 vagrant@localhost -p 2222`


## Use the ssh key to scp the site up to the crown users directory
How to use SCP (secure copy) with ssh key authentication



You will be asked to name the file (use the default) and give the keypair a passphrase













### Install php and mysql
`sudo apt install -y mysql-client mysql-server php-mysql`

<br>

```
sudo mysql -u root

mysql> CREATE DATABASE wordpressdb;
CREATE USER 'wordpress'@'localhost' IDENTIFIED BY 'wppassword';

mysql> GRANT ALL PRIVILEGES ON wordpressdb.* TO "wordpress"@"localhost";

mysql> FLUSH PRIVILEGES;

mysql> EXIT
```

`sudo apt install -y php`


<br>

### Download and install wordpress

`wget https://wordpress.org/latest.tar.gz`

<br>

  
Explode the tar file

`tar -xzvf latest.tar.gz`

<br>

# Create the wp-config

`cp wordpress/config-sample.php wordpress/wp-config.php`

<br>


# Configure wordpress

## Create the wordpress apache config

`sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/wordpress.conf`

`sudo nano /etc/apache2/sites-available/wordpress.conf` 

<br>

# Change document root to wordpress using nano to edit apache config 

`/etc/apache2/sites-available/wordpress.conf`
`sudo nano /etc/apache2/sites-available/wordpress.conf`
`DocumentRoot /var/www/wordpress`

<br>

# Copy wordpress to apache site root

`sudo cp -r wordpress /var/www/`

<br>

# Enable wordpress site and disable default site

`sudo a2ensite wordpress.conf `
`sudo a2dissite 000-default.conf`

<br>

# Edit  /var/www/wordpress/wp-config.php

`sudo nano /var/www/wordpress/wp-config.php`

```
// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpressdb' );

/** Database username */
define( 'DB_USER', 'wordpress' );

/** Database password */
define( 'DB_PASSWORD', 'wppassword' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );
```

<br>

# Reload Apache
`sudo systemctl reload apache2.service`



`systemctl status mysql.service`

1.  which mysql
2.  mysql
3.  sudo mysql -u root
4.  history
5.  sudo apt install -y php
6.  mysql -u root
7.  sudo mysql -u root
8.  php --version
9.  wget https://wordpress.org/latest.tar.gz
10. tar -xzvf latest.tar.gz
11. nano wordpress/wp-config-sample.php
12. ip a

<br>

To access mysql monitor:

`sudo mysql` 
<br>

First login to the database server as follows:
`sudo mysql -u root -p`

<br>

mysql> `SHOW DATABASES;`
      
      | Database |
      +--------------------+
      | information_schema |
      | mysql |
      | performance_schema |
      | sys |
      | wordpressdb |
      +--------------------+
      5 rows in set (0.01 sec)

<br>

## Check ip address of vm

`ip a`
// 192.168.64.2

<br>


mysql> `select current_user();`
    
      | current_user() |
      +----------------+
      | root@localhost |

<br>

# Start a multipass instance

`multipass start`

<br>

# Delete a mulitpass instance
The multipass delete command will remove instances from use. 
This will not destroy the instance and can be used again with 
the multipass recover command.

`multipass delete --all`

<br>

# Confirm this new instance has the specs we’re looking for by running 

`multipass info ltsInstance`

`multipass help`


# List all instances of multipass

`multipass list`

<br>

# Delete instances

`multipass delete`

<br>

# Remove instances

`multipass purge`

<br>

# Stop an instance

`multipass stop wordpress`

```
$ multipass networks --format yaml
bridge0:
  - type: bridge
    description: Network bridge with en1, en2
bridge2:
  - type: bridge
    description: Empty network bridge
en0:
  - type: wifi
    description: Wi-Fi (Wireless)
en1:
  - type: thunderbolt
    description: Thunderbolt 1
en2:
  - type: thunderbolt
    description: Thunderbolt 2
```