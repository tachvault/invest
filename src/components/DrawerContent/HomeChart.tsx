import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const containerStyle = {
    width: '200px', 
    height: '100px',
    marginTop: '50px'
};

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: 'Stock Portfolio Performance',
        },
        filler: {
            propagate: false,
        },
    },
    scales: {
        x: {
            display: false, // Hide x-axis
        },
        y: {
            display: false, // Hide y-axis
        },
    },
    annotation: {
        annotations: [
            {
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y',
                value: 550, 
                borderColor: 'black',
                borderWidth: 1,
                label: {
                    content: 'Threshold',
                    enabled: true,
                    position: 'end',
                },
            },
        ],
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const gradient = (context) => {
    const chart = context.chart;
    const { ctx, chartArea } = chart;
    if (!chartArea) return null;

    const gradient = ctx.createLinearGradient(
        chartArea.left,
        chartArea.top,
        chartArea.left,
        chartArea.bottom
    );
    gradient.addColorStop(0, '#f79292'); // Red at the top
    gradient.addColorStop(1, 'white'); // White at the bottom

    return gradient;
};

// Manually define your mock data for different stock portfolios
export const data = {
    labels,
    datasets: [
        {
            fill: true,
            data: [580, 590, 551, 499, 550, 560, 540, 570, 490, 588, 560, 540, 570, 490, 588, 450, 500, 540, 570, 490, 588, 560, 555, 549, 499, 420, 440], // Replace with your actual data
            borderColor: 'red',
            borderWidth: 1,
            backgroundColor: gradient,
            pointRadius: 0
        }
    ],
};

export function StockPortfolioChart() {
    return (
        <div style={containerStyle}>
            <Line options={options} data={data} />
        </div>
    )
};
