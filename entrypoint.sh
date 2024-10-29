#!/bin/sh

export BASE_PATH="${BASE_PATH:=/bo/remotes/template}"
export APP_TEMPLATE=basename=$(basename "$BASE_PATH")
export APP_TEMPLATE_KEY=$(echo "$(basename "$BASE_PATH")" | awk '{print toupper(substr($0, 1, 1)) tolower(substr($0, 2))}')

echo "APP_TEMPLATE_KEY: $APP_TEMPLATE_KEY"
if [ -n "$APP_ENV" ]; then
    echo "APP_ENV: $APP_ENV"
    sed -i "s/REPLACE_APP_ENV/"$APP_ENV"/g" /usr/share/nginx/html/index.html
fi

# Insertamos la última parte del path en ngnx config y a guardamos como default dentro de la imagen.
envsubst "\$BASE_PATH" < "./nginx.template.conf" > /etc/nginx/conf.d/default.conf
# Crear una carpeta temporal
temp_dir=$(mktemp -d)

# Ejecutar el comando envsubst con las variables encontradas
for file in ./usr/share/nginx/html/*.js; do
    temp_file="$temp_dir/$(basename "$file")"
    # envsubst "\$BASE_PATH" < "$file" > "/usr/share/nginx/html/$(basename "$file")"
    envsubst "\$BASE_PATH\$APP_TEMPLATE\$APP_TEMPLATE_KEY" < "$file" > "$temp_file"
    mv "$temp_file" "/usr/share/nginx/html/$(basename "$file")"
done

for file in ./usr/share/nginx/html/*.js.map; do
    temp_file="$temp_dir/$(basename "$file")"
    envsubst "\$BASE_PATH\$APP_TEMPLATE\$APP_TEMPLATE_KEY" < "$file" > "$temp_file"
    # envsubst "\$BASE_PATH" < "$file" > "/usr/share/nginx/html/$(basename "$file")"
    mv "$temp_file" "/usr/share/nginx/html/$(basename "$file")"
done

# Reemplazo el valor de la variable BASE_PATH en el index.html
envsubst "\$BASE_PATH" < "/usr/share/nginx/html/index.html" > "$temp_dir/index.html"
mv "$temp_dir/index.html" "/usr/share/nginx/html/index.html"

echo "TEMP DIR: $temp_dir"
rm -r "$temp_dir"

nginx -g 'daemon off;'
