#!/bin/bash
yum install -y httpd
systemctl start httpd
systemctl enable httpd
echo "<h1>서울 웹 서버</h1>" > /var/www/html/index.html
