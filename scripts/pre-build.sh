if [ "$NODE_ENV" != "" ]; then
	mkdir -p ./external
	curl https://assets.ashur.cab/v2/sizes.json > ./external/assets-sizes.json
fi
