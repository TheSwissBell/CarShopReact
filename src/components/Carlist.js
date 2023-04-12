import React, { useState, useEffect, useRef, useMemo } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';


export default function Carlist() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => fetchData(), [])

    const fetchData = () => {
        fetch('http://carrestapi.herokuapp.com/cars')
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
    }

    const gridRef = useRef();

    const deleteButtonRender = value => {
        return (
            <>
                <Button
                    size='small'
                    color='error'
                    onClick={() => deleteCar(value)}
                >
                    Delete
                </Button>
            </>

        )
    }

    const deleteCar = (value) => {
        if (window.confirm(`Are you sure you want to delete this car (${value.data.brand} ${value.data.model}) ?`)) {
            alert(`${value.data.brand} ${value.data.model} deleted!!`);
            fetch(value.data._links.car.href, { method: 'DELETE' })
                .then(res => {
                    if (res.ok) {
                        setOpen(true);
                        fetchData();
                    }
                    else {
                        alert('Something went wrong in DELETE request');
                    };
                }).catch(err => console.error(err))
        }
    };


    // Grid
    const [columnDefs] = useState([  // We don't to update it so no need for setColumnDefs
        { field: 'brand', width: 160 },
        { field: 'model', width: 130 },
        { field: 'color' },
        { field: 'fuel' },
        { field: 'year' },
        { field: 'price' },
        { field: '_links.self.href', headerName: 'Delete', cellRenderer: deleteButtonRender, sortable: false, filter: false, width: 120 },

    ]);
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        width: 100,
        cellClass: 'ag-left-aligned-cell'
    }))

    return (
        <div>
            <div className="ag-theme-material" style={{ height: 600, width: 1000, margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowSelection="single"
                    rowData={cars}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                >
                </AgGridReact>
            </div>
            <Snackbar
                open={open}
                message="Car deleted successfully"
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            />
        </div>
    );
}
