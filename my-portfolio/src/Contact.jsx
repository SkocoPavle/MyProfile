export function Contact() {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "6864f694-8a3a-4694-bb34-80bd5ef1764a");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
    }
  };

  return (
      <form onSubmit={onSubmit} className="contacts">
            <h2 className="naslov2">── Contact me ──</h2>
            <h3 className="naslov-desc">Have a Question? Send me a message.</h3>

            <input type="hidden" name="access_key" value="6864f694-8a3a-4694-bb34-80bd5ef1764a"></input>
            <div className="first-part">
                <input className="name-input" placeholder="Your name" required name="name"></input>
                <input className="email-input" placeholder="Email" required name="email"></input>
            </div>

            <input className="subject-input" placeholder="Subject" required name="subject"></input>
            <input className="message-input" placeholder="Message" required name="message"></input>
            <button className="send-me" type="submit">Send message</button>
      </form>
  );
}
