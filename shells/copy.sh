if [ -d ".env" ]; then
  rm -rf .env
fi

cp -r .env.example .env

# cp -r src/assets/styles bundle/styles