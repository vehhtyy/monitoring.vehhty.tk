import React, { useEffect, useState } from 'react'
import './ChartsList.css'
import Chart from './Chart'
import { Link } from 'react-router-dom'
import NotFound from './NotFound'
import Loading from './Loading'
import { useParams } from "react-router-dom";


function ChartsList(props) {
  const [streams, setStreams] = useState([])
  const [requestStatus, setRequestStatus] = useState('loading')
  let params = useParams();


  const fetchStreams = async (query) => {
    if (query === undefined || query === ' ') {
      query = 'streams'
    }
    else {
      query = 'streams/user/' + query
    }
    try {
      setRequestStatus('loading')
      const res = await fetch('https://pansprezynka-server.fly.dev/' + query, { method: 'GET' })
      if (res.ok) {
        const parsedRes = await res.json()
        parsedRes.length === 0 ? setRequestStatus('dataNotFound') : setRequestStatus('finished')
        setStreams(parsedRes)
      }
      else {
        setRequestStatus('dataNotFound')
        setStreams([])
      }
    }
    catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchStreams(params.channelName)
  }, [params.channelName])


  const chartsView = () => {
    if (requestStatus === 'finished') {
      return <><h5><Link to={''}>Ostatnie streamy</Link></h5>{streams.map((stream) => {
        return <Chart key={stream._id} stats={stream.stats} name={stream.channelName} avatar={stream.channelImg} createdAt={stream.createdAt} updatedAt={stream.updatedAt} />
      })}</>
    }
    if (requestStatus === 'loading') {
      return <Loading />
    }
    else {
      return <NotFound />
    }
  }

  return (
    <div className="charts-container">
      {chartsView()}
    </div>
  )
}

export default ChartsList