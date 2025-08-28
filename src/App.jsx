import { useState } from 'react'
import initialEmails from './data/emails'
import './styles/App.css'
import Emails from './Components/Emails'
import EmailView from './Components/EmailView'
import Header from './Components/Header'

const getReadEmails = emails => emails.filter(email => !email.read)

const getStarredEmails = emails => emails.filter(email => email.starred)

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState('inbox')
  const [openedEmail, setOpenedEmail] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const unreadEmails = emails.filter(email => !email.read)
  const starredEmails = emails.filter(email => email.starred)

    const openEmail = (email) => {
    if (!email.read) {
      setEmails(emails =>
        emails.map(e =>
          e.id === email.id ? { ...e, read: true } : e
        )
      )
    }
    setOpenedEmail(email)
  }
  const toggleStar = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id
          ? { ...email, starred: !email.starred }
          : email
      )
    setEmails(updatedEmails)
  }

  const toggleRead = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id ? { ...email, read: !email.read } : email
      )
    setEmails(updatedEmails)
  }

  let filteredEmails = emails

  if (hideRead) filteredEmails = getReadEmails(filteredEmails)

  if (currentTab === 'starred')
    filteredEmails = getStarredEmails(filteredEmails)
  if (searchTerm) {
    filteredEmails = filteredEmails.filter(email =>
      email.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }
  return (
    <div className="app">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === 'inbox' ? 'active' : ''}`}
            onClick={() => setCurrentTab('inbox')}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadEmails.length}</span>
          </li>
          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={() => setCurrentTab('starred')}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={e => setHideRead(e.target.checked)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {openedEmail ? (
          <EmailView email={openedEmail} onClose={() => setOpenedEmail(null)} />
        ) : (
        <Emails
          emails={filteredEmails}
          toggleRead={toggleRead}
          toggleStar={toggleStar}
          openEmail={openEmail}
          />
        )}
      </main>
    </div>
  )
}

export default App
