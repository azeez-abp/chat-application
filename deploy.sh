#! /usr/bin/bash
# NAME=AZEEX # no space allow
# echo "Enter your name"
# read INP 
# echo $NAME $1 $2 $INP #positional augument i/o piping  //> insert//  // >> append//

# function hell(aug){
#     echo "Hello $aug"
# }
docker build -t chat-api-server . 
