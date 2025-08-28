import '../styles/EmailView.css'

function EmailView({ email, onClose }) {
  return (
    <div className="email-view">
      <button onClick={onClose}>Back</button>
      <h2>{email.title}</h2>
      <h4>From: {email.sender}</h4>
      <p>{email.description}</p>
    </div>
  )
}

export default EmailView