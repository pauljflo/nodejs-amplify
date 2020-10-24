/* src/App.js */
import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { getQuote } from './graphql/queries'

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const App = () => {
  const [Quote, setQuote] = useState([])
  var [ID, setID] = useState([])

  useEffect(() => {
    fetchQuote()
  }, [])


  async function fetchQuote() {
    try {
      var ID = Math.floor(Math.random() * 6) + 1  
      const QuoteData = await API.graphql(graphqlOperation(getQuote, { id: ID }));
      const Quote = QuoteData.data.getQuote.quote
      setQuote(Quote)
      setID(ID)
    } catch (err) { console.log('error fetching Quote') }
  }

  return (
    <div style={styles.container}>
      {
            <p>{ID}: {Quote}</p>
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  Quote: { fontSize: 20, fontWeight: 'bold' },
}

export default App