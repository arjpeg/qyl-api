import os
import requests

body = {
    'username': 257638,
    'password': os.getenv("PASSWORD") 
}

response = requests.get(
    "http://localhost:3000",
    json = body
)

print(response.text)

