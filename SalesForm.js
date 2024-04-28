import React, { useState, useEffect } from 'react';
import './Style.css'; 
import SalesChart from './SalesChart'; // Importa el componente SalesChart

const SalesForm = () => {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');
    const [sales, setSales] = useState(() => {
        const storedSales = localStorage.getItem('sales');
        return storedSales ? JSON.parse(storedSales) : [];
    });
    const [editIndex, setEditIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleClearLocalStorage = () => {
        localStorage.removeItem('sales');
        setSales([]);
    };

    useEffect(() => {
        localStorage.setItem('sales', JSON.stringify(sales));
    }, [sales]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editIndex !== null) {
            const updatedSales = [...sales];
            updatedSales[editIndex] = { productName, quantity, price, date };
            setSales(updatedSales);
            setEditIndex(null);
        } else {
            const newSale = { productName, quantity, price, date };
            setSales([...sales, newSale]);
        }

        setProductName('');
        setQuantity('');
        setPrice('');
        setDate('');

        setShowModal(true);

        setTimeout(() => {
            setShowModal(false);
        }, 3000);
    };

    const handleEdit = (index) => {
        const saleToEdit = sales[index];
        setProductName(saleToEdit?.productName || '');
        setQuantity(saleToEdit?.quantity || '');
        setPrice(saleToEdit?.price || '');
        setDate(saleToEdit?.date || '');
        setEditIndex(index);
    };

    return (
        <div>
            <div style={{ float: 'left', width: '50%' }}>
                <h2>Registro de Ventas</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Producto:</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Cantidad:</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Precioc/d:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Fecha:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <button type="submit">{editIndex !== null ? 'Guardar Cambios' : 'Registrar Venta'}</button>
                </form>
            </div>
            <div style={{ float: 'right', width: '50%' }}>
                <h2>Historial de Ventas</h2>
                <ul>
                    {sales.map((sale, index) => (
                        <li key={index}>
                            <strong>Producto:</strong> {sale?.productName}<br />
                            <strong>Cantidad:</strong> {sale?.quantity}<br />
                            <strong>Precio Unitario:</strong> {sale?.price}<br />
                            <strong>Fecha:</strong> {sale && sale.date}<br /> {/* Agregado */}
                            <button onClick={() => handleEdit(index)}>Editar</button>
                            <hr />
                        </li>
                    ))}
                </ul>
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            <h1>{editIndex !== null ? '¡Cambios Guardados!' : '¡Venta Registrada!'}</h1>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={handleClearLocalStorage}>Borrar Historial de Ventas</button>
            <div>
                <SalesChart sales={sales} /> {/* Agrega el componente SalesChart */}
            </div>
        </div>
    );
};

export default SalesForm;