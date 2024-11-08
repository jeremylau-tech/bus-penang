import React, { useState } from 'react';
import './App.css'; // Assuming you have some CSS to style the modal
const botToken = '7594084296:AAEgO7zcuE9DY1ja_jWMUPqtqoIkXovqn28'; // Replace with your bot token
async function getChatId() {
    try {
      const response = await fetch('https://api.telegram.org/bot${botToken}/getUpdates');
      const data = await response.json();
  
      if (data.ok && data.result.length > 0) {
        // Extracting the chat ID from the latest message
        const chatId = data.result[0].message.chat.id;
        console.log("Chat ID:", chatId);
        return chatId;
      } else {
        console.log("No messages found. Send a message to the bot to get updates.");
      }
    } catch (error) {
      console.error("Error fetching chat ID:", error);
    }
  }
  
function Notify() {
  const [showForm, setShowForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const toggleForm = () => setShowForm(!showForm);

  const sendNotificationToTelegram = async () => {
    
    const chatId = getChatId();; // Replace with your Telegram chat ID

    const message = `New Phone Number: ${phoneNumber}`;
    
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    try {
      await fetch(url);
      alert('Notification sent to Telegram!');
      setShowForm(false);
      setPhoneNumber("");
    } catch (error) {
      console.error("Error sending message to Telegram", error);
      alert('Failed to send notification.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber) {
      sendNotificationToTelegram();
    } else {
      alert("Please enter a phone number.");
    }
  };

  return (
    <div className="App">
      <button onClick={toggleForm} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Open Form
      </button>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Enter Phone Number</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="phone-input"
              />
              <button type="submit" className="submit-button">
                Send to Telegram
              </button>
            </form>
            <button onClick={toggleForm} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notify;
