### Deploying a website on an EC2 instance in AWS
By Sam Pastoriza on July 27, 2016

Today, I successfully deployed my first website on public domain, which happened to 
be my personal website. This is also my first blog post because I have also finally gotten around to 
making a blog documenting my experiences in the programming world. I hope you enjoy these articles as 
I enjoy experiencing them. Now, lets get to the important stuff.

Today, I am going to discuss how to launch a NodeJS application, specifically written with the Angular 2 framework on the front end
and the Express framework on the backend. This post applies to anyone who wants to deploy a Node application on an Linux box
and redirect a chosen Domain name to that server.

1. Create a AWS Account if you have not already
2. Create a Key Pair
3. Go to the [AWS Managment Console](https://console.aws.amazon.com/console/home?region=us-east-1)
4. Choose to run a EC2 instance
5. Click `Launch Instance`
6. Once you click `Launch Instance`, choose `Amazon Linux`.
  * This is a general purpose empty Linux box that AWS supports.
7. Once you select the Ubuntu box, choose the t2.micro option, which is 8Gb, plenty for deploying general purpose Node applications
8. Click next until you reach the `Configure Security Group` tab. 
9. On the `Configure Security Group` tab, make sure to add a rule and change the rule from `Custom TCP Rule` to `HTTP`. This should default the Port number to 80.
10. Before launching the instance, make sure you associate the Key Pair you created with the 
11. Once the instance has been launched, go ahead and ssh into the instance using your generated key pair.

More to come...