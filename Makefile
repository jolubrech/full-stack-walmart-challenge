
create-stack:
	make build-stack
build-stack:
	cd wallmart-challenge-backend && docker build -t wallmart-challenge-backend .
	cd wallmart-challenge-frontend && docker build -t wallmart-challenge-frontend .

run-stack:
	docker-compose up

stop-stack:
	docker-compose down