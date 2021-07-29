// import React, { useEffect,useState } from 'react'
// import { Line } from "react-chartjs-2";

// function LineGraph() {
// const [data, setData] = useState({});
// //https://disease.sh/v3/covid-19/historical/all?lastdays=120


// const bulidChartData = (data,casesType="cases") =>{
//     const chartData = [];
//     let lastDataPoint;
//     for(let date in data.cases){
//         if (lastDataPoint){
//             const newDataPoint = {
//                 x: date,
//                 y: data[casesType][date]-lastDataPoint,
//             }
//             chartData.push(newDataPoint);
//         }
//         lastDataPoint = data[casesType][date];
//     }
// }

// useEffect(()=>{
//     const fetchData =async()=>{
//      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
//     .then(response=>response.json())
//     .then(data=>{
//         //handling the data to plot graph
//         const chartData = bulidChartData(data,casesType);
//         setData(chartData);
//     });
//     }
//     fetchData();
// },[])




//     return (
//         <div>
//             {data?.length > 0 && (
//                 <Line
//                 data={{
//                     datasets: [{
                        
//                         backgroundColor: "rgba(204,16,52,0.5)",
//                         borderColor: "#cc1034",
//                         data:data,
//                     }]
//                 }}
//                 />
//             )}
            
//         </div>
//     )
// }

// export default LineGraph
