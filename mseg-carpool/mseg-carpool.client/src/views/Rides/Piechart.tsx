import React, { useEffect, useRef, useState } from 'react';
import { ChartOptions, ChartData, Chart } from 'chart.js/auto'; // Import from chart.js

interface PieChartProps {
    data: { label: string; value: number }[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null); // Reference to the chart canvas element
    const [chartInstance, setChartInstance] = useState<Chart<'pie'> | null>(null); // State to hold the chart instance

    // Prepare data for Chart.js
    const chartData: ChartData<'pie'> = {
        labels: data.map(item => item.label),
        datasets: [
            {
                data: data.map(item => item.value),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#8A2BE2',
                    '#4CAF50',
                    '#FFA07A',
                    '#00BFFF',
                    '#BA55D3',
                    '#F0E68C',
                    '#D2B48C'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#8A2BE2',
                    '#4CAF50',
                    '#FFA07A',
                    '#00BFFF',
                    '#BA55D3',
                    '#F0E68C',
                    '#D2B48C'
                ]
            }
        ]
    };

    const options: ChartOptions<'pie'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
            },
        },
    };

    useEffect(() => {
        if (chartRef && chartRef.current) {
            // Destroy the previous chart instance if it exists
            if (chartInstance) {
                chartInstance.destroy();
            }
            // Create new chart instance
            const newChartInstance = new Chart<'pie'>(chartRef.current, {
                type: 'pie',
                data: chartData,
                options: options,
            });
            setChartInstance(newChartInstance);
        }
        // Cleanup function to destroy chart instance on unmount
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [data]); // Re-render if data changes

    return (
        <div style={{ height: '300px', width: '100%' }}>
            <canvas ref={chartRef} />
        </div>
    );
};

export default PieChart;
