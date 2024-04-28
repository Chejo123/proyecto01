import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SalesChart = ({ sales }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        // destruir gráfico anterior si existe
        if (chartRef.current !== null) {
            chartRef.current.destroy();
        }

        // crear gráfico solo si hay ventas
        if (sales && sales.length > 0) {
            const ctx = document.getElementById('salesChart');
            if (ctx) {
                const labels = sales.map(sale => sale.date); 
                const data = sales.map(sale => sale.price); 
                chartRef.current = new Chart(ctx, {
                    type: 'line', 
                    data: {
                        labels: labels,
                        datasets: [{
                            label: "Monto de ventas",
                            data: data,
                            backgroundColor: '#F1BF98',
                            borderColor: '#CC2936',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        }

        
        return () => {
            if (chartRef.current !== null) {
                chartRef.current.destroy();
            }
        };
    }, [sales]);

    return (
        <div>
            <h2>Gráfico de ventas</h2>
            <canvas id="salesChart" width="400" height="200"></canvas>
        </div>
    );
};

export default SalesChart;