import bigqueryEndpoints from './(bigquery)'
import dataFetchingEndpoints from './(dataFetching)'
// you can import other groups here, e.g. analyticsEndpoints

const endpoints = [
  ...bigqueryEndpoints,
  ...dataFetchingEndpoints,
  // ...analyticsEndpoints
]

export default endpoints
