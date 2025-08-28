
import Email from './Email'

function Emails({ emails, toggleRead, toggleStar, openEmail }) {
  return (
    <ul>
      {emails.map((email) => (
        <Email
          key={email.id}
          email={email}
          toggleRead={toggleRead}
          toggleStar={toggleStar}
          openEmail={openEmail}
        />
      ))}
    </ul>
  )
}

export default Emails