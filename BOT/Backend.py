from flask import Flask, render_template, request, jsonify
import requests
from twilio.rest import Client

app = Flask(__name__)

# Konfigurasi Twilio
TWILIO_ACCOUNT_SID = 'YOUR_TWILIO_ACCOUNT_SID'
TWILIO_AUTH_TOKEN = 'YOUR_TWILIO_AUTH_TOKEN'
TWILIO_NUMBER = 'YOUR_TWILIO_PHONE_NUMBER'

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

@app.route('/')
def index():
    return render_template('/BOT/index.html')

@app.route('/api/send_message', methods=['POST'])
def send_message():
    user_message = request.json['message']
    ai_response = get_ai_response(user_message)
    send_whatsapp_message(request.json['user_number'], ai_response)
    return jsonify({'response': ai_response})

def get_ai_response(query):
    # Panggil API OpenAI di sini untuk mendapatkan respons
    openai_api_key = 'YOUR_OPENAI_API_KEY'
    response = requests.post(
        "https://api.openai.com/v1/engines/davinci/completions",
        headers={
            "Content-Type": "application/json",
            "Authorization": "Bearer " + openai_api_key
        },
        json={
            "prompt": query,
            "max_tokens": 50
        }
    )
    ai_response = response.json()["choices"][0]["text"]
    return ai_response

def send_whatsapp_message(to_number, message):
    message = client.messages.create(
        from_='whatsapp:' + TWILIO_NUMBER,
        body=message,
        to='whatsapp:' + to_number
    )
    print("Message sent:", message.sid)

if __name__ == '__main__':
    app.run(debug=True)
    
