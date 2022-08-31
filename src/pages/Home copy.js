import React, { useState, useEffect } from 'react';
//import './App.css';
import MaterialTable from "material-table";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Grid, Button } from '@material-ui/core'
import FormDialog from '../components/dialog';
const initialValue = { name: "", email: "", phone: "", dob: "" }
function Home() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [tableData, setTableData] = useState(null)
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue)
  };
  const url = `http://localhost:3001/users`
  const columns = [
    // { title: "ID", field: 'id' },
    {
      title: "",
      field: "avatar",
      render: (row) => <NameCustomComponent name={row.properties.firstName} />,
    },
    {
      title: "User",
      field: "user",
      render: (row) => <UserComponent row={row.properties} />,
    },
    { title: "Role", field: "properties.role" },
    {
      title: "Status",
      field: "status",
      render: (row) => (
        <div className={row.status ? "active" : "deactive"}>
          {row.status ? "Active" : "Deactive"}
        </div>
      ),
    },
    {
      title: "Actions",
      field: "actions",
      render: (row) => <ActionsComponent id={row.id} />,
    },
    
  ];
  // calling getUsers function for first time 
  useEffect(() => {
    getUsers()
  }, [])

  //fetching user data from server
  const getUsers = () => {
    fetch(url).then(resp => resp.json()).then(resp => setTableData(resp))
  }
  const onChange = (e) => {
    const { value, id } = e.target
    // console.log(value,id)
    setFormData({ ...formData, [id]: value })
  }
  const onGridReady = (params) => {
    setGridApi(params)
    setGridColumnApi(params.columnApi);
  }

  const onFilterTextChange=(e)=>{
    gridApi.setQuickFilter(e.target.value)
  }

  // setting update row data to form data and opening pop up window
  const handleUpdate = (oldData) => {
    setFormData(oldData)
    handleClickOpen()
  }
  //deleting a user
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure, you want to delete this row", id)
    if (confirm) {
      fetch(url + `/${id}`, { method: "DELETE" }).then(resp => resp.json()).then(resp => getUsers())

    }
  }
  const handleFormSubmit = () => {
    if (formData.id) {
      //updating a user 
      const confirm = window.confirm("Are you sure, you want to update this row ?")
      confirm && fetch(url + `/${formData.id}`, {
        method: "PUT", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()

        })
    } else {
      // adding new user
      fetch(url, {
        method: "POST", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()
        })
    }
  }

  const defaultColDef = {
    sortable: true,
    flex: 1, filter: true,
    floatingFilter: true
  }
  return (
    <div className="App">
      <h1 align="center">React-App</h1>
      <h3>CRUD Operation with Json-server in ag-Grid</h3>
      <Grid align="left">
        <Button variant="contained" color="primary" onClick={handleClickOpen}>Add user</Button>
      </Grid>
      <Grid align="left">
      <input type="search" onChange={onFilterTextChange} placeholder="search somethings..."/>
      </Grid>
      <div className="ag-theme-alpine" style={{ height: '400px' }}>
        <MaterialTable
           container
           title=""
           data={tableData}
           columns={columns}
           options={{
             actionsColumnIndex: -1,
             addRowPosition: "first",
             //columnsButton: true,
             //filtering: true,
             hideFilterIcons: false,
             showFirstLastPageButtons: true,
             pageSize: 5,
             padding: "dense",
             debounceInterval: 700,
             pageSizeOptions: [5, 20, 50],
           }}
         />
          
          
          {/* rowData={tableData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          //pageSizeOptions: [5, 20, 50]
        /> */}
      </div>
      <FormDialog open={open} handleClose={handleClose}
        data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
    </div>
  );
}

export default Home;