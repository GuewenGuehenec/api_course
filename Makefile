
angular:
    docker container run -it --rm --name node-js -v $PWD:/app --network rss angular bash

composer:
	docker container run -it --rm --name composer -v $PWD:/app --network rss php-composer bash

