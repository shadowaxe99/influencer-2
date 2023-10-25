import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ aiCost }) => {
    const data = {
        labels: ['Traditional Cost', 'Cost with AI'],
        datasets: [
            {
                data: [60000, aiCost],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',  // color for Traditional Cost
                    'rgba(54, 162, 235, 0.2)'   // color for Cost with AI
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
