const React = require('react');
const { useState, useEffect } = React;
const { Box, Text, Newline } = require('ink');
const WebSocket = require('ws');

const Table = () => {

  const [data, setData] = useState({});
  const [bid, setBids] = useState({});
  const [ask, setAsks] = useState({})
  const [webSocketReady, setWebSocketReady] = useState(false);
    
  const [ws, setWS] = useState(new WebSocket('wss://api.gemini.com/v1/marketdata/BTCUSD?top_of_book=true&asks=false'));

  useEffect(()=>{

    ws.onopen = function (event) {
      setWebSocketReady(true);
      console.log('Connection established.');
    };

    ws.onclose = function (event) {
      setWebSocketReady(false);
      setTimeout(() => {
        setWS(new WebSocket('wss://api.gemini.com/v1/marketdata/BCTUSD?top_of_book=true&asks=false'))
      }, 1000);
    };

    ws.onerror = function (err) {
      console.log('Socket encountered error: ' + err.message, 'Closing socket.');
      ws.close();
    }

    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      setData(json.events[0]);
    };

    return () => {
      ws.close
    };

  },[ws]);

  if (!webSocketReady) {
    return (
      <Box borderStyle='single' padding={2} flexDirection='column'>
              <Box>
                  <Box width='25%'><Text>Socket not ready</Text></Box>
              </Box>
      </Box>
    )
  } else if (Object.keys(data).length == 0){
    return (
      <Box borderStyle='single' padding={2} flexDirection='column'>
              <Box>
                  <Box width='25%'><Text>Waiting for data from server...</Text></Box>
              </Box>
      </Box>
    )
  } else {
    return (
      <Box borderStyle='single' padding={2} flexDirection='column'>
              <Box>
                  <Box width='25%'><Text>{data.price}</Text></Box>
              </Box>
      </Box>
    )
  }

  /*useEffect(()=>{
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
                <Box width='25%'><Text color='#fd79a8'>ASK</Text></Box>
            </Box>
            <Box>
                <Box width='25%'><Text>Placeholder</Text></Box>
            </Box>
            <Box>
                <Box width='25%'><Text color='#c3e88d'>BID</Text></Box>
            </Box>
    </Box>
  )*/
}

module.exports = Table;
