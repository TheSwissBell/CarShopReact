import React, { useState, useEffect, useRef, useMemo } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';



export default function Carlist() {
    const [cars, setCars] = useState([]);

    useEffect(() => fetchData(), [])

    const fetchData = () => {
        fetch('http://carrestapi.herokuapp.com/cars')
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
    }

    const gridRef = useRef();

    const deleteButtonRender = value => {
        const cellValue = value;
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
        alert(`Car ${value} deleted!!`);
        fetch(value.data._links.car.href, { method: 'DELETE' })
            .then(res => fetchData())
            .catch(err => console.error(err))
    }

    // Grid
    const [columnDefs] = useState([  // We don't to update it so no need for setColumnDefs
        { field: 'brand' },
        { field: 'model' },
        { field: 'color' },
        { field: 'fuel' },
        { field: 'year' },
        { field: 'price' },
        { field: '_links.self.href', headerName: 'Delete', cellRenderer: deleteButtonRender },

    ]);
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true
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
        </div>
    );
}
