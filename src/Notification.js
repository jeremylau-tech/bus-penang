import React, { useState } from 'react';
import './App.css'; // Assuming you have some CSS to style the modal
import bellIcon from './icons8-notification-30.png'; // Replace this with the path to your icon image
  
function Notify( arrivalLocation, departureTime, departureLocation ) {
  console.log('Received props:', { arrivalLocation, departureTime, departureLocation });
  const [showForm, setShowForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const toggleForm = () => setShowForm(!showForm);

  const sendNotificationToTelegram = async () => {
    //const message = { arrivalLocation, departureTime, departureLocation };
    const message = `Your bus to ${arrivalLocation} will depart soon from ${departureLocation} at ${departureTime}`;
    console.log('message',{message});

    try {
      await fetch(`https://api.telegram.org/bot7594084296:AAEgO7zcuE9DY1ja_jWMUPqtqoIkXovqn28/sendMessage?chat_id=937541979&text=${message}`);
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
      console.log('Received props in handle submit:', { arrivalLocation, departureTime, departureLocation });
      sendNotificationToTelegram();
    } else {
      alert("Please enter a phone number.");
    }
  };

  return (
    <div className="App">
      <img 
        src={bellIcon} 
        alt="Notification Icon" 
        onClick={toggleForm} 
        className="icon-button" 
      />

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Notify Me!</h2>
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
