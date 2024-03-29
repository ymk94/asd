#!/bin/bash
sudo yum install -y httpd
sudo systemctl start httpd
sudo systemctl enable httpd
sudo echo "<h1>상파울로 웹 서버</h1>" > /var/www/html/index.html