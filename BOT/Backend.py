from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('/BOT/index.html')

@app.route('/BOT/api/send_message', methods=['POST'])
def send_message():
    user_message = request.json['message']
    ai_response = get_ai_response(user_message)
    # Di sinilah Anda akan mengirim pesan ke WhatsApp menggunakan Twilio
    # Anda juga dapat menambahkan logika pengiriman pesan ke WhatsApp di sini
    # Contoh: send_whatsapp_message(user_number, ai_response)
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

if __name__ == '__main__':
    app.run(debug=True)
