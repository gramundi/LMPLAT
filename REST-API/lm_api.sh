#!/bin/bash
export FLASK_APP=lmachine.py
export FLASK_DEBUG=1
PID=`ps -ef | grep "flask" | awk '{print $2}'`
sudo kill -9 $PID
nohup 2>&1 flask run --host=0.0.0.0 &
