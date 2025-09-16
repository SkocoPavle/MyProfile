import React from "react";
import "./Contact.css"
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";

export default function Contact() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");

    const formData = new FormData(event.target);
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

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
      <h3 className="naslov2">── Contact me ──</h3>
      <h2 className="naslov-desc">Have a question? Send me a message</h2>
      <input type="hidden" name="access_key" value="6864f694-8a3a-4694-bb34-80bd5ef1764a"/>
      <div className="first-part">
        <input type="text" name="name" placeholder="Your name" required className="name-input"/>
        <input type="email" name="email" placeholder="Your email" required className="email-input"/>
      </div>
      <input type="text" name="subject" placeholder="Subject" required className="subject-input" />
      <textarea name="message" placeholder="Your message" required className="message-input"/>
      <button type="submit" className="send-me">Submit Form</button>
    </form>
      <span>{result}</span>
    </div>
  );
}

