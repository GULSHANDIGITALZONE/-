// <!-- //About ko click karne par modal open ho jayega. script........................................... -->

function showAbout() {
    document.getElementById('aboutModal').style.display = "block";
}
function closeAbout() {
    document.getElementById('aboutModal').style.display = "none";
}
// <!-- //suscriber input............................................................................... -->
  document.getElementById('customForm').addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent default form submission

      // Get input value
      const inputValue = document.getElementById('Subscribe.Id').value;

      // Google Form action URL and field name (entry ID)
      const googleFormURL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdqVwXLPzFj1Tl2ZQVxpJN8TLWTtkX0XMFOtZBZgeCxfGJDug/formResponse"; // Replace with your form's action URL
      const formFieldName = "entry.1325797992"; // Replace with your form's input field name (entry ID)

      // Create a form submission URL
      const submissionURL = `${googleFormURL}?${formFieldName}=${encodeURIComponent(inputValue)}`;

      // Submit data to Google Form
      fetch(submissionURL, { method: "POST", mode: "no-cors" })
          .then(() => {
              alert("Thank you for subscribing.");
          })
          .catch(() => {
              alert("please enter valid email.");
          });
          
  });


//   <!-- //Any suggestion or comment or feedback............................................................................... -->
  
   document.getElementById('feedbackForm').addEventListener('submit', function (e) {
       e.preventDefault(); // Prevent default form submission

       // Get input value
       const inputValue = document.getElementById('inputField').value;

       // Google Form action URL and field name (entry ID)
       const googleFormURL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLScZtNsBkcLQHIQ5u8yz6qsL82kRJ0RXhlaozfyReXz3xs8Uog/formResponse"; // Replace with your form's action URL
       const formFieldName = "entry.1489761833"; // Replace with your form's input field name (entry ID)

       // Create a form submission URL
       const submissionURL = `${googleFormURL}?${formFieldName}=${encodeURIComponent(inputValue)}`;

       // Submit data to Google Form
       fetch(submissionURL, { method: "POST", mode: "no-cors" })
           .then(() => {
               alert("Thank you for feedback.");
           })
           .catch(() => {
               alert("error submiting");
           });
           
   });
