### Deploying a website on an EC2 instance in AWS
##### By Sam Pastoriza on July 27, 2016

Today, I successfully deployed my first website on public domain, which happened to 
be my personal website. This is also my first blog post because I have also finally gotten around to 
making a blog documenting my experiences in the programming world. I hope you enjoy these articles as 
I enjoy experiencing them. Now, lets get to the important stuff.

I am going to discuss how to launch a NodeJS application, specifically written with the Angular 2 framework on the front end
and the Express framework on the backend. This post applies to anyone who wants to deploy a Node application on an Linux box
and redirect a chosen Domain name to that server.

1. Create a AWS Account if you have not already
2. Create a Key Pair.
  * This is a very straightforward process well documented by Amazon Web Services. This key-pair will be used to ssh into the linux box, so it is important that you keep the key in a secure place.
  * Documentation on process can be found [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html)
  * Make sure to run *chmod 400 <your-key>.pem*
3. Go to the [AWS Managment Console](https://console.aws.amazon.com/console/home?region=us-east-1)
4. Choose to run a EC2 instance
5. Click *Launch Instance*
6. Once you click *Launch Instance*, choose *Amazon Linux*.
  * This is a general purpose empty Linux box that AWS supports.
7. Once you select the Ubuntu box, choose the t2.micro option, which is 8Gb, plenty for deploying general purpose Node applications
8. Click next until you reach the *Configure Security Group* tab. 
9. On the *Configure Security Group* tab, make sure to add a rule and change the rule from *Custom TCP Rule* to *HTTP*. This should default the Port number to 80.
10. Before launching the instance, make sure you associate the Key Pair you created with the 
11. Once the instance has been launched, go ahead and ssh into the instance using your generated key pair.
12. Run the following commands to update your Linux box and install NodeJS and Git
  ```
  sudo yum update
  sudo yum install git
  wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash
  source ~/.bash_profile
  . ~/.nvm/nvm.sh
  nvm install 5.11.0
  sudo modprobe ip_tables
  sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to 3000
  echo "source ~/.bashrc" >> ~/.bash_profile
  echo 'export NVM_DIR="$HOME/.nvm' >> ~/.bashrc
  echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh' >> ~/.bashrc
  ```
  At this point, you should have the following installed
    * Git
    * NodeJS
    * NVM (Node Version Manager)
    * NPM
  The first two lines update and install pacakages on the server. Lines 2-6 install Node using nvm. Lines 7-8 are *very* important because they redirect
  any http requests to port 3000. Port 80 is the default port, but Express applications cannot listen to port 80. Feel free to change this number as your application
  sees fit. 

13. Once the essential items are installed for running a node application, you can either
  1. Clone an existing project and start running it
  2. Using *express-generator*, create an simple express application
    * Run this set of commands to create an express application
      ```
      npm install -g express-generator
      express your-application
      cd your-application
      npm install
      npm start
      ```
    * Hopefully, you will see that the application is listening to a port, most likely 3000
14. If you navigate to your *Public DNS* in your browser, you should see your application displayed.

### Connecting your application to a Public URL using Amazon's Route 53 service
Amazon has made it very easy to test and create public url's for $12 a year. You are welcome to get a url on another site, but make sure that you associate that url
with the Elastic IP address created in Step 5

1. To register a new url, follow these [instructions](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-register.html) on the aws documents
2. Associate the url with your website. See these [instructions](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/rrsets-working-with.html)
  * Note: Once your domain name is registered, you will receive an email from most likely *noreply@registrar.amazon.com*
  * This piece of [documentation](https://docs.aws.amazon.com/gettingstarted/latest/swh/getting-started-configure-route53.html) is also very helpful for setting up record sets
3. Once you have a hosted zone with your personal url, click on the record set and note the *Type* of the record. Click on the *A* record and note the *Value* field
4. Navigate back to the EC2 management console
5. Click on the *Elastic IP* link at the bottom left of the screen.
6. Click on *Allocate New Address*
7. Make sure the IP is selected, and then click on the *Actions* button, and click *Associate Address*.
8. In the *Instance* field, type in the Public DNS that identifies your EC2 instance.
  * The Public DNS id is of the form: *ec2-[ip-address]-.compute-1.amazonaws.com*
9. Once you have associated the Elastic IP address to your instance, copy that IP address into the *Value* field you found in step 3
10. Finally, navigate to your url, and hopefully, you will see the output of the website.

### Cited Sources
[AWS Documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html)
[Code for Geek](https://codeforgeek.com/2015/05/setup-node-development-environment-amazon-ec2/)
[Ben Nadal](http://www.bennadel.com/blog/2321-how-i-got-node-js-running-on-a-linux-micro-instance-using-amazon-ec2.htm)
[AWS Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/getting-started.html)