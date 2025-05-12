from flask import Flask, jsonify, request
import requests
from collections import deque
import time
import random

app = Flask(__name__)

# Configuration
WINDOW_SIZE = 10
THIRD_PARTY_API = "http://20.244.56.144/evaluation-service/"  # Example test server
TIMEOUT = 0.5  # 500ms timeout

# Storage for numbers by type
number_windows = {
    'p': deque(maxlen=WINDOW_SIZE),  # primes
    'f': deque(maxlen=WINDOW_SIZE),  # fibonacci
    'e': deque(maxlen=WINDOW_SIZE),  # even
    'r': deque(maxlen=WINDOW_SIZE)   # random
}

def fetch_numbers(number_type):
    """Fetch numbers from the third-party server"""
    try:
        start_time = time.time()
        response = requests.get(f"{THIRD_PARTY_API}{number_type}", timeout=TIMEOUT)
        elapsed = time.time() - start_time
        
        if response.status_code == 200 and elapsed < TIMEOUT:
            return response.json().get('numbers', [])
    except (requests.exceptions.RequestException, requests.exceptions.Timeout):
        pass
    return []

def calculate_average(numbers):
    """Calculate average of numbers, return 0 if empty"""
    if not numbers:
        return 0.0
    return sum(numbers) / len(numbers)

@app.route('/numbers/<string:numberid>', methods=['GET'])
def handle_numbers(numberid):
    if numberid not in number_windows:
        return jsonify({"error": "Invalid number ID"}), 400
    
    # Get previous state
    prev_state = list(number_windows[numberid])
    
    # Fetch new numbers
    new_numbers = fetch_numbers(numberid)
    
    # Process new numbers (ensure uniqueness within window)
    current_window = number_windows[numberid]
    for num in new_numbers:
        if num not in current_window:
            current_window.append(num)
    
    # Prepare response
    response = {
        "windowPrevState": prev_state,
        "windowCurrState": list(current_window),
        "numbers": new_numbers,
        "avg": round(calculate_average(current_window), 2)
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9876)