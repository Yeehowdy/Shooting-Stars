import { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function AnnualGraph(props) {
  const [years, setYears] = useState([])

  let year_list = []
  props.launches.forEach(launch => {
    let launchYear = new Date(launch.date_time).getFullYear()
    var index = year_list.map(e => e.year).indexOf(launchYear)
    if (index === -1) {
      let newYear = { year: launchYear, count: 1 }
      year_list.push(newYear)
    }
    else {
      year_list[index].count++
    }
  })
  year_list.sort((a, b) => a.year - b.year)
  // console.log('year_list: ', year_list)

  let bar_labels = []
  let bar_data = []
  for (let year of year_list) {
    bar_labels.push(year.year)
    bar_data.push(year.count)
  }

  const data = {
    labels: bar_labels,
    datasets: [
      {
        label: 'Launches',
        data: bar_data,
        backgroundColor: ['navy', 'black'],
        borderColor: 'black',
        borderWidth: 1
      }
    ]
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Annual Launches',
      },
    },
  }

  return (
    <>
      <div style={{ height: "25vh", position: "relative", marginBottom: "1%", padding: "1%" }}>
        <Line data={data} options={options} />
      </div>
    </>
  )
}

export default AnnualGraph
