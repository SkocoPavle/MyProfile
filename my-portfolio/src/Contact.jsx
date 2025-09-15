import React from "react";

export default function Contact() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");

    const formData = new FormData(event.target);
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); // zameni sa pravim key-em

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        setResult("Form Submitted Successfully ✅");
        event.target.reset();
      } else {
        setResult("❌ " + data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
      setResult("Network error, please try again later.");
    }
  };

  return (
    <div>
    <form
      action="https://api.web3forms.com/submit"
      method="POST"
      className="contacts"
    >
      <input type="hidden" name="access_key" value="6864f694-8a3a-4694-bb34-80bd5ef1764a" />
      <input type="text" name="name" placeholder="Your name" required />
      <input type="email" name="email" placeholder="Your email" required />
      <textarea name="message" placeholder="Your message" required />
      <button type="submit">Submit Form</button>
    </form>
      <span>{result}</span>
    </div>
  );
}

