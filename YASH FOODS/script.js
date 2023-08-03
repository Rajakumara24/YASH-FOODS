document.getElementById('orderForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    // Collect form data
    const formData = new FormData(event.target);
    const orderData = {};
    formData.forEach((value, key) => {
      orderData[key] = value;
    });
  
    // Send the data to the server using fetch API
    fetch('/submit-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message); // Show success message
        event.target.reset(); // Reset the form
      })
      .catch((error) => {
        alert('Failed to submit the order. Please try again later.');
        console.error('Error submitting order:', error);
      });
  });
  