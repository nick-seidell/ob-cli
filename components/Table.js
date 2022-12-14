const React = require('react');

const { useState, useEffect } = React;

const { Box, Text, Newline } = require('ink');

const cryptoData = require('../data.json')

const Table = () => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    setData(cryptoData)
  });

  return (
    <Box borderStyle='single' padding={2} flexDirection='column'>
            <Box>
                <Box width='25%'><Text>COIN</Text></Box>
                <Box width='25%'><Text>PRICE (USD)</Text></Box>
                <Box width='25%'><Text>24 HOUR CHANGE</Text></Box>
                <Box width='25%'><Text>ALL TIME HIGH</Text></Box>
            </Box>
            <Newline/>
            {
                data.map(({id, name, current_price, price_change_percentage_24h, ath}) => (
                    <Box key={id}>
                        <Box width='25%'><Text>{name}</Text></Box>
                        <Box width='25%'><Text>{current_price}</Text></Box>
                        <Box width='25%'><Text>{price_change_percentage_24h}</Text></Box>
                        <Box width='25%'><Text>{ath}</Text></Box>
                    </Box>
                ))
            }
    </Box>
  )
}

module.exports = Table;
