
FROM olalond3/node6-jekyll-docker

ADD . /src

WORKDIR /src

RUN bundle config --global silence_root_warning 1
RUN npm install -g gulp bower --silent
RUN npm install --silent
RUN bower install --allow-root
RUN bundle install
