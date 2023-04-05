import React, { useState, useEffect, useRef } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';



export default function Carlist() {
    const [cars, setCars] = useState([]);

    useEffect(() => fetchData(), [])

    const fetchData = () => {
        fetch('http://carrestapi.herokuapp.com/cars')
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
    }

    const gridRef = useRef();

    // Grid
    const [columnDefs] = useState([  // We don't to update it so no need for setColumnDefs
        { field: 'brand', sortable: true, filter: true, floatingFilter: true },
        { field: 'model', sortable: true },
        { field: 'color', sortable: true },
        { field: 'fuel', sortable: true },
        { field: 'year', sortable: true },
        { field: 'price', sortable: true },
        { field: '_links.self.href', sortable: true },

    ])

    return (
        <div>
            <div className="ag-theme-material" style={{ height: 600, width: 1000, margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowSelection="single"
                    rowData={cars}
                    columnDefs={columnDefs}
                    animateRows={true}
                >
                </AgGridReact>
            </div>
        </div>
    );
}
