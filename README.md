# halo-score-board

A score card for daily game of Halo

Simple app to track halo scores

- Database (data/db.json)

  - npm i json-server -g
  - json-server -p 4000 data/db.json

- API

  - restful: http://localhost:4000/
  - graphql: http://localhost:5000/graphql

- React app at http://localhost:3000/

* Useful links
  - Elastic Beanstalk
    - python stuff https://www.andreagrandi.it/2018/12/19/installing-python-and-virtualenv-on-osx/
  - Zip up project (to upload to EB)
    - git archive -v -o myapp.zip --format=zip HEAD
