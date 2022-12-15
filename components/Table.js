const React = require('react');
const { useState, useEffect } = React;
const { Box, Text, Newline } = require('ink');
const axios = require('axios');

const url = 'https://api.gemini.com/v1/pubticker/btcusd'

const Table = () => {

  const [data, setData] = useState([]);

  useEffect(()=>{
    const interval = setInterval(()=>{
      axios.get(url)
      .then(response => setData(response.data))
      .catch(e => console.log(e))
    },250);
    return() => clearInterval(interval)
  },[]);

  return (
    <Box borderStyle='single' padding={2} flexDirection='column'>
            <Box>
                <Box width='25%'><Text>GEMINI</Text></Box>
            </Box>
            <Newline/>
            <Box>
                <Box width='25%'><Text color='#fd79a8'>{data.ask}</Text></Box>
            </Box>
            <Box>
                <Box width='25%'><Text>{'∆ ' + (data.ask - data.bid).toLocaleString()}</Text></Box>
            </Box>
            <Box>
                <Box width='25%'><Text color='#c3e88d'>{data.bid}</Text></Box>
            </Box>
    </Box>
  )
}

module.exports = Table;
