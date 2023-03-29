import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function CountryGraph(props) {
    const [stats, setStats] = useState([12, 19, 3, 5, 2])
    useEffect(() => {
        // console.log(props.launches)
        let newStats = [0,0,0,0,0];
        if(props.launches){
            props.launches.forEach((e) => {
                // console.log(e)
                let countryIndex = props.sites.map(e => e.id).indexOf(e.site_id)
                switch (countryIndex) {
                    case 0 || 1:
                        newStats[0]++;
                        break;
                    case 2:
                        newStats[1]++;
                        break;
                    case 3:
                        newStats[2]++
                        break;
                    case 4:
                        newStats[3]++
                        break;
                    case 5:
                        newStats[4]++
                        break;
                }
            })
            setStats(newStats)
        }
    }, [props])
    
    let data = {
        labels: ['USA', 'China', 'Russia', 'India', 'French Guiana'],
        datasets: [
            {
            label: '# of Launches',
            data: stats,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            },
        ],
    };

    let options = {
        responsive: true,
        maintainAspectRatio: false
    }

    return(
        <div style={{ height: "25vh", position: "relative", marginBottom: "1%", padding: "1%" }}>
            <Pie data={data} options={options}/>
        </div>
    )
}

export default CountryGraph;