all: dependencies prettier build

dependencies: package.json yarn.lock
	yarn install --frozen-lockfile --silent

.PHONY: prettier
prettier: 
ifdef CI
	yarn prettier --list-different
else
	yarn prettier
endif

.PHONY: build
build:
	yarn build

.PHONY: clean
clean:
	rm -rf build
	rm -rf node_modules