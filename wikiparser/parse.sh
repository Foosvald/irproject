#!/bin/bash

if [ $# -lt 2 ]; then
	echo Correct usage: ./parse.sh inputFile.xml outputFile.json
	exit 
fi

echo Grepping for Fil:
grep 'Fil:' $1 > tmp.xml

echo Compiling java
javac -encoding UTF-8 src/org/irgrupp/Main.java
cp src/org/irgrupp/Main.class .

echo Running java
touch $2
java Main tmp.xml $2

echo Posting to database
curl 'http://localhost:8983/solr/update/json?commit=true' --data-binary @$2 -H 'Content-type:application/json'

echo Done. Thank you. Have a very special day for a very special little man!