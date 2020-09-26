import React from 'react'
import {VegaLite} from 'react-vega'

/*
note: I had to do a bunch of messing about to get this to work
react-vega-lite is deprecated and is now in react-vega so this is different
  from the book
also, i think the way <VegaLite /> takes data is different, and figuring
  that out is what solved the problem
note the data: {name: 'values'} here vs. the book's code

it takes data different b/c the code in the book works fine with the
  older react-vega-lite
i know this b/c i installed the package versions and used the commands in
  the book (i.e. using src/capstone ...)
*/
const DataChart = ({data}) => {
  if (! data) {
    return (<p>no data</p>)
  }

  let values = data
        .filter(r => r)
        .map(r => ({x: r.ave_hindfoot_length, y: r.ave_weight}))
  let spec = {
    //'$schema': 'https://vega.github.io/schema/vega-lite/v2.0.json',
    '$schema': 'https://vega.github.io/schema/vega-lite/v4.json',
    data: { name: 'values' },
    'description': 'Mean Weight vs Mean Hindfoot Length',
    'mark': 'point',
    'encoding': {
      'x': {'field': 'x', 'type': 'quantitative'},
      'y': {'field': 'y', 'type': 'quantitative'}
    }
  }
  let options = {
    'actions': {
      'export': false,
      'source': false,
      'editor': false
    }
  }
  let scatterData = {
    'values': values
  }
  return (<VegaLite spec={spec} data={scatterData} options={options}/>)
}

export default DataChart