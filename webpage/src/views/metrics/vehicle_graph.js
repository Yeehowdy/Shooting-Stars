import { useEffect, useState } from "react"
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Legend, Tooltip} from 'chart.js'
import {Bar, Chart} from 'react-chartjs-2';

ChartJS.register(
  BarElement, CategoryScale, LinearScale, Legend, Tooltip
)

function VehicleGraph(props) {
  // console.log('props: ', props)
  const [barData, setBarData] = useState()

  useEffect(() => {
    let vehicleList = []
    //should make vehicleList be an array of objects
    //with each object having a name and count
    // [{name: "Delta IV Heavy", count: 7}...]
    props.launches.forEach((launch) => {
      var index = vehicleList.map(e => e.name).indexOf(launch.launch_vehicle)
      // console.log(index)
      if(index === -1){
        let newVehicle = {name: launch.launch_vehicle, count: 1}
        vehicleList.push(newVehicle)
      }
      else{
        vehicleList[index].count ++;
      }

    })
    vehicleList.sort((a,b) => b.count - a.count)
    // console.log('vehicleList: ', vehicleList)
    // console.log('vehicles state: ', vehicles)



    setBarData({
      labels: [vehicleList[0].name,vehicleList[1].name,vehicleList[2].name,vehicleList[3].name,vehicleList[4].name],
      datasets: [
        {
          label: 'Launches',
          data: [vehicleList[0].count,vehicleList[1].count,vehicleList[2].count,vehicleList[3].count,vehicleList[4].count],
          backgroundColor: ['navy', 'black'],
          borderColor: 'black',
          borderWidth: 1
        }
      ]
    })
  }, [props])



  let options = {
    responsive: true,
    maintainAspectRatio: false
  }

  return (
    <>
      {barData ? (
        <div style={{ height: "25vh", position: "relative", marginBottom: "1%", padding: "1%" }}>
          <Bar data={barData} options={options} />
        </div>
      ): (<></>)}

    </>
  )
}

export default VehicleGraph