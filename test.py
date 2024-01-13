import os
import requests

body = {
    'username': os.getenv("USERNAME"),
    'password': os.getenv("PASSWORD") 
}

response = requests.get(
    "http://localhost:3000",
    json = body
)

print(response.text)

