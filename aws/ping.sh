#!/bin/bash
cat /nfs-shared/list.txt |  while read output
do
    ping -c 1 -W 1 "$output" > /dev/null
    if [ $? -eq 0 ]; then
    echo "$output is up"
    else
    echo "$output is down"
    fi
done
