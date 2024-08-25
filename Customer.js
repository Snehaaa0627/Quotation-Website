import React,{useEffect, useState} from 'react';
import Navbar from '../Navigation bar/Navbar';
import {Grid, Paper, TextField, Button, Box, Typography, InputAdornment,   IconButton, Select,MenuItem,Snackbar, Alert} from '@mui/material';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import TablePagination from '@mui/material/TablePagination';
import EditIcon from  '@mui/icons-material/Edit';
import MuiAlert from '@mui/material/Alert';
import { getUname } from '../Utilities/User';

  const columns1 = [
    { field: 'id', headerName: 'Sl.No.' },
    { field: 'name', headerName: 'Name' },
    { field: 'edit', headerName: '' },
  ];

  const columns2 = [
    { field: 'partno', headerName: 'Part No.'},
    { field: 'code', headerName: 'HSN Code' },
    { field: 'description', headerName: 'Description'},
    { field: 'unit', headerName: 'Unit' },
    { field: 'price', headerName: 'Price' },
    { field: 'edit', headerName: '' }
  ];

  const Header = styled('div')({
    display: 'flex',
  });

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height:'81%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    height:'98%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  export default function Customer() {
    const [open, setOpen] = React.useState(false);
    const [name,setName] =useState("");
    const [phone, setPhone] = useState("");
    const [mail, setMail]= useState("");
    const [gst, setGst] = useState("");
    const [pan, setPan] = useState("");
    const [address , setAddress]=useState("");
    const [district , setDistrict]=useState("");
    const [pincode, setPincode] = useState("");
    const [state, setState] = useState("");
    const [materialDetails, setMaterialDetails] = useState([]);
    const [editMaterial, setEditMaterial] = useState({
      partNo: '',
      hsnCode: '',
      description: '',
      unit: '',
      price: '',  
    }); 

  const [snackBarOpen, setSnackBarOpen] = useState(false);
 // const [response, setResponse] = useState('');
  const [apiResponseModal, setApiResponseModal] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const openSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const [snackbarOpen1, setSnackbarOpen1] = React.useState(false);
  const [snackbarMessage1, setSnackbarMessage1] = React.useState('');

  const openSnackbar1 = (message) => {
    setSnackbarMessage1(message);
    setSnackbarOpen1(true);
  };

  const closeSnackbar1 = () => {
    setSnackbarOpen1(false);
  };
  
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    handleClose();
  };

  const handleEditPart = (event) => {
    const newPart = event.target.value;
    setEditMaterial([{ ...editMaterial[0], part_no: newPart}]);
    };
    const handleEditCode = (event) => {
      const newCode = event.target.value;
      setEditMaterial([{ ...editMaterial[0], hsn_code: newCode}]);
    };
    const handleEditDes = (event) => {
      const newDes = event.target.value;
      setEditMaterial([{ ...editMaterial[0], description: newDes}]);
    };

    const handleEditUnit = (event) => {
      const newUnit = event.target.value;
      setEditMaterial([{ ...editMaterial[0], unit: newUnit}]);
    };
    const handleEditPrice = (event) => {
      const newPrice= event.target.value;
      setEditMaterial([{ ...editMaterial[0], price: newPrice}]);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      setName("");
      setPhone("");
      setMail("");
      setGst("");
      setPan("");
      setAddress("");
      setDistrict("");
      setPincode("");
      setState("");
     setSnackbarOpen(false);
     setSnackbarMessage('');
      setSnackbarOpen1(false);
      setSnackbarMessage1('');
    };

    const [open1, setOpen1] = React.useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => { setOpen1(false); setMaterialRows([{
      partno: '',
      code: '',
      description: '',
      unit: '',
      price: '',
    },]);
    setSnackBarOpen(false);
    setApiResponseModal([]);
   };

    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    const [openEdit, setOpenEdit] = React.useState(false);
    const handleEditOpen = () => setOpenEdit(true);
    const handleEditClose= () =>  setOpenEdit(false);

    const [customers, setCustomers] = useState([]);

    const [materialRows, setMaterialRows] = useState([
      {
        partno: '',
        code: '',
        description: '',
        unit: '',
        price: '',
      },
    ]);

    const handleRemoveMaterialRow = (index) => {
      const updatedRows = [...materialRows];
      updatedRows.splice(index, 1);
      setMaterialRows(updatedRows);
    };

    const handleMaterialFieldChange = (e, index, field) => {
      const updatedRows = [...materialRows];
      updatedRows[index][field] = e.target.value;
      setMaterialRows(updatedRows);
      //console.log(updatedRows)
    };

    const handleAddMaterialRow = () => {
      setMaterialRows((prevRows) => [
        ...prevRows,
        {
          partno: '',
          code: '',
          description: '',
          unit: '',
          price: '',
        },
      ]);
    };

    const handleCreateValue =() => {
      if (name === "") {
        alert("Please enter the 'Customer Name' before submitting.");
        const nameInput = document.getElementById("name");
        if (nameInput) {
          nameInput.focus();
        }
        return;
      }
      
      if (phone === "") {
        alert("Please enter the 'Phone Number' before submitting.");
        const phoneInput = document.getElementById("phone");
        if (phoneInput) {
          phoneInput.focus();
        }
        return;
      }
      if (mail === ""){
        alert("Please enter the 'Mail Id' before submitting.");
        const mailInput = document.getElementById("mail");
        if (mailInput) {
          mailInput.focus();
        }
        return;
      }
      if (gst === ""){
        alert("Please enter the 'GST No.' before submitting.");
        const gstInput = document.getElementById("gst");
        if (gstInput) {
          gstInput.focus();
        }
        return;
      }
      if (pan === ""){
        alert("Please enter the 'PAN No.' before submitting.");
        const panInput = document.getElementById("pan");
        if (panInput) {
          panInput.focus();
        }
        return;
      }
      if (address === ""){
        alert("Please enter the 'Address' before submitting.");
        const addressInput = document.getElementById("address");
        if (addressInput) {
          addressInput.focus();
        }
        return;
      }
      if (district === ""){
        alert("Please enter the 'District' before submitting.");
        const districtInput = document.getElementById("district");
        if (districtInput) {
          districtInput.focus();
        }
        return;
      }
      if (pincode === ""){
        alert("Please enter the 'Pincode' before submitting.");
        const pincodeInput = document.getElementById("pincode");
        if (pincodeInput) {
          pincodeInput.focus();
        }
        return;
      }
      if (state === ""){
        alert("Please enter the 'State' before submitting.");
        const stateInput = document.getElementById("state");
        if (stateInput) {
          stateInput.focus();
        }
        return;
      }
      const currentDate = new Date();
      const uname = getUname();
      const upd_by = uname;
      const updatedOn = currentDate.toISOString();

      const payload ={
      json_type:"create_cust",
        cust_name: name,
        phone_no: phone,
        mail_id: mail,
        gst_no:gst,
        pan_no:pan,
        address:address,
        district:district,
        pin_code:pincode,
        state:state,
        upd_by:upd_by,
        updatedOn:updatedOn
      }
  console.log(payload)
      axios.post("http://172.29.2.105:9000/SLM_Calib.svc/Create_quotation_data",
      JSON.stringify(payload)).then((response)=>{
      console.log(response.data)
      const JsonData = JSON.parse(response.data)
      if (JsonData.json_status === "1"){
        openSnackbar(" Customer Submitted Successfully")
        handlegetValue();
      } else if (JsonData.json_status === "2") {
        openSnackbar1(" Customer Already exists!");
      }
      })
    }

    const handlegetValue  = () => {
      const payload ={
        json_type:"select_cust",
        id:""
      }
  console.log(payload)

      axios.post("http://172.29.2.105:9000/SLM_Calib.svc/Create_quotation_data",
      JSON.stringify(payload)).then((response)=>{
      console.log(response.data)
      /*  handleClose(); */
      let details = JSON.parse(response.data).data.map((item)=>({
        name:item.cust_name,
        id:item.id
      }))
    setCustomers(details)
    
    })
    .catch((err) => {
      console.error(err);
    });
  };

  useEffect (()=>{
    handlegetValue()
  },[])

  const handleName = (event) => {
    const inputValue = event.target.value;
    const avoidValue = inputValue.replace(/[!'`()><]/g, ''); 
      setName(avoidValue);
    };
  const handleMail =(event) =>{  
    //console.log(event.target.value)
    setMail(event.target.value)
  }
  const handlePhone = (event) => {
    //console.log(event.target.value)
    setPhone(event.target.value)
  }
  const handleGst = (event) => {
  // console.log(event.target.value)
    setGst(event.target.value)

  } 
  const handlePan = (event) => {
  // console.log(event.target.value)
    setPan(event.target.value)
  }
  const handleAddress = (event) => {
    //console.log(event.target.value)
    setAddress(event.target.value)
  }
  const handleDistrict = (event) => {
    //console.log(event.target.value)
    setDistrict(event.target.value)
  }
  const handlePincode = (event) => {
    //console.log(event.target.value)
    setPincode(event.target.value)
  }
  const handleState = (event) => {
    //console.log(event.target.value)
    setState(event.target.value)
  }
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event,newPage) => {
    setPage(newPage); 
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [page1, setPage1] = useState(0);
  const [rowsPerPage1, setRowsPerPage1] = useState(5);

  const handleChangePage1 = (event,newPage) => {
    setPage1(newPage);
  };

  const handleChangeRowsPerPage1 = (event) => {
    setRowsPerPage1(parseInt(event.target.value, 10));
    setPage1(0);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange =(e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const [searchQuery1, setSearchQuery1] = useState("");
  const handleSearchChange1 =(e) => {
    setSearchQuery1(e.target.value);
    setPage1(0);
  };

  const [editCustomer, setEditCustomer] = useState([{
    cust_name: "",
    phone_no: "",
    mail_id: "",
    gst_no: "",
    pan_no: "",
    address: "",
    district: "",
    pin_code: "",
    state: ""
  }]);

  const handleEditName = (event) => {
    const newName = event.target.value;
    setEditCustomer([{ ...editCustomer[0], cust_name: newName }]);
  };
  const handleEditPhone = (event) => {
    const newPhone = event.target.value;
    setEditCustomer([{ ...editCustomer[0], phone_no: newPhone }]);
  };
  const handleEditMail = (event) => {
    const newMail = event.target.value;
    setEditCustomer([{ ...editCustomer[0], mail_id: newMail }]);
  };
  const handleEditGst = (event) => {
    const newGst = event.target.value;
    setEditCustomer([{ ...editCustomer[0], gst_no: newGst }]);
  };
  const handleEditPan = (event) => {
    const newPan = event.target.value;
    setEditCustomer([{ ...editCustomer[0], pan_no: newPan }]);
  };
  const handleEditAddress = (event) => {
    const newAdd = event.target.value;
    setEditCustomer([{ ...editCustomer[0], address: newAdd }]);

  };
  const handleEditDistrict = (event) => {
    const newDist= event.target.value;
    setEditCustomer([{ ...editCustomer[0], district: newDist }]);
  };
  const handleEditPincode = (event) => {
    const newPin = event.target.value;
    setEditCustomer([{ ...editCustomer[0], pin_code: newPin}]);
  };
  const handleEditState = (event) => {
    const newState = event.target.value;
    setEditCustomer([{ ...editCustomer[0], state: newState }]);
  };

  const handleEdit = (id) => { 
    const payload = {
      json_type: "select_cust",
      id:id
    };
  console.log(payload)
    axios
      .post("http://172.29.2.105:9000/SLM_Calib.svc/Create_quotation_data", JSON.stringify(payload))
      .then((response) => {
        console.log(response.data)
        const JsonData=JSON.parse(response.data).data
          setEditCustomer(JsonData);
          console.log(JsonData) 
          handleOpen2();
        }
      )
      .catch((err) => {
        console.error(err);
      });
  };
        
  const handleUpdateValue = () => {
    if (editCustomer[0].cust_name === "") {
      alert("Please enter the Customer Name");
      document.getElementById("cust_name").focus();
    } else if (editCustomer[0].phone_no === "") {
      alert("Please enter the Phone Number");
      document.getElementById("phone_no").focus();
    } else if (editCustomer[0].mail_id === "") {
      alert("Please enter the Mail ID");
      document.getElementById("mail_id").focus();
    } else if (editCustomer[0].gst_no === "") {
      alert("Please enter the GST Number");
      document.getElementById("gst_no").focus();
    } else if (editCustomer[0].pan_no === "") {
      alert("Please enter the PAN Number");
      document.getElementById("pan_no").focus();
    } else if (editCustomer[0].address === "") {
      alert("Please enter the Address");
      document.getElementById("address").focus();
    } else if (editCustomer[0].district === "") {
      alert("Please enter the District");
      document.getElementById("district").focus();
    } else if (editCustomer[0].pin_code === "") {
      alert("Please enter the Pin Code");
      document.getElementById("pin_code").focus();
    } else if (editCustomer[0].state === "") {
      alert("Please enter the State");
      document.getElementById("state").focus();
    } else {
      const payload3 = {
        json_type: "update_cust",
        id: editCustomer[0].id,
        cust_name: editCustomer[0].cust_name,
        phone_no: editCustomer[0].phone_no,
        mail_id: editCustomer[0].mail_id,
        gst_no: editCustomer[0].gst_no,
        pan_no: editCustomer[0].pan_no,
        address: editCustomer[0].address,
        district: editCustomer[0].district,
        pin_code: editCustomer[0].pin_code,
        state: editCustomer[0].state,
      };

      console.log(payload3);

      axios
        .post("http://172.29.2.105:9000/SLM_Calib.svc/Create_quotation_data", JSON.stringify(payload3))
        .then((response) => {
          console.log(response.data);
          handleClose2();
          alert("Updated Successfully");
          handlegetValue();
        });
    }
  };

  const handleMaterialSubmit = () => {
    let focusField = null;
    let fieldName = ""; 

    materialRows.forEach((row, index) => {
      if (row.partno === "") {
        focusField = `part_no_${index}`;
        fieldName = "Part No";
        return;
      }
      if (row.code === "") {
        focusField = `hsnCode_${index}`;
        fieldName = "Code";
        return;
      }
      if (row.description === "") {
        focusField = `description_${index}`;
        fieldName = "Description";
        return;
      }
      if (row.unit === "") {
        focusField = `unit_${index}`;
        fieldName = "Unit";
        return;
      }
      if (row.price === "") {
        focusField = `price_${index}`;
        fieldName = "Price";
        return;
      }
    });

  if (focusField) {
    alert(`Please enter the "${fieldName}" before submitting.`);
    document.getElementById(focusField).focus();
    return;
  }
   
  const uname = getUname();
  const upd_by = uname;
    const payload1 = {
      json_type: "create_material",
      data: materialRows.map((row) => ({
        part_no: row.partno,
        hsn_code: row.code,
        description: row.description,
        unit: row.unit,
        price: row.price,
        upd_by: upd_by,
      })),
    };
    axios.post("http://172.29.2.105:9000/SLM_Calib.svc/Create_quotation_data", JSON.stringify(payload1))
    .then((response) => {
      const responseData = JSON.parse(response.data).data;
      console.log(responseData);
     let json_sts = JSON.parse(response.data).data.map((item)=>({
      jsonstatus:item.json_status,
      errormsg:item.error_msg,
      partNo:item.part_no
     }))
     setApiResponseModal(json_sts)
     setSnackBarOpen(true)
    })
    .catch((err) => {
      console.error(err);
    });
};

const handleCloseAlert = (index) => {
  setApiResponseModal((prevData) => {
    const newData = [...prevData];
    newData.splice(index, 1);
    return newData;
  }); 
};

  const handleGetMaterialDetails = () => {
    const payload = {
      json_type: "select_material",
      id:""
    };
  console.log(payload)
    axios
      .post("http://172.29.2.105:9000/SLM_Calib.svc/Create_quotation_data", JSON.stringify(payload))
      .then((response) => {
        console.log(response.data)
        const materialData = JSON.parse(response.data).data.map((item)=>({  
          partnumber:item.part_no,
          hsncode:item.hsn_code,
          descrip:item.description,
          unit:item.unit,
          price:item.price,
          id:item.id
        }))
        setMaterialDetails(materialData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    handleGetMaterialDetails();
  }, []);         

  const handleEditMaterial = (id) => {
    handleEditOpen()
  const payload ={
      json_type:"select_material",
      id:id
    };
    console.log(payload)
    axios
      .post("http://172.29.2.105:9000/SLM_Calib.svc/Create_quotation_data", JSON.stringify(payload))
      .then((response) => {
        console.log(response.data)
        const JsonData=JSON.parse(response.data).data
          setEditMaterial(JsonData);
          console.log(JsonData)
        }
      )
      .catch((err) => {
        console.error(err);
      });
  }; 

  const handleUpdateMaterial = () => {
    if (editMaterial[0].part_no === "") {
      alert("Please enter the Part No.");
      document.getElementById("part_no").focus();
    } else if (editMaterial[0].hsn_code === "") {
      alert("Please enter the HSN Code");
      document.getElementById("hsn_code").focus();
    } else if (editMaterial[0].description === "") {
      alert("Please enter the Description");
      document.getElementById("description").focus();
    } else if (editMaterial[0].unit === "") {
      alert("Please enter the Unit");
      document.getElementById("unit").focus();
    } else if (editMaterial[0].price === "") {
      alert("Please enter the Price");
      document.getElementById("price").focus();
    } else {
    const currentDate1 = new Date();
    const uname = getUname();
    const upd_by = uname;
    const upd_on = currentDate1.toISOString();
    const payload = {
      json_type: "update_material", 
      id: editMaterial[0].id,
      part_no: editMaterial[0].part_no,
      hsn_code: editMaterial[0].hsn_code,
      description: editMaterial[0].description,
      unit: editMaterial[0].unit,
      price: editMaterial[0].price,
      upd_by: upd_by,
        upd_on: upd_on,
    };
    console.log(payload)

    axios
      .post("http://172.29.2.105:9000/SLM_Calib.svc/Create_quotation_data", JSON.stringify(payload))
      .then((response) => {
        console.log(response.data);
        handleEditClose();

        alert("Updated Successfully");
        handleGetMaterialDetails();
      });
      }
  };
    return (
      <React.Fragment>
        <Navbar/>
        <Grid
          container
          spacing={1}
          style={{ marginTop: '6rem', paddingLeft: '1rem', paddingRight: '1rem' }}
        >
          <Grid item xs={5}>
            <Paper>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'centers', alignItems: 'center' }}>
                <Grid item xs={4}>  
                  <Header sx={{ fontSize: '12px', alignItems: 'center', paddingLeft: '10px' }}>
                    <h2>Customer Master</h2>
                  </Header>
                </Grid>
                <Grid item xs={4} sx={{ paddingTop: '2px', paddingBottom: '2px' }}>
                  <TextField
                    sx={{ width: 220, paddingTop: '2px', paddingBottom: '2px' }}
                    label="Search"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </Grid>
                <Grid item xs={4} sx={{ paddingLeft: '80px' }}>
                  <Button
                    onClick={handleOpen}
                    sx={{ width: 80, padding:0, height: 30, backgroundColor: '#005000' }}
                    variant="contained"
                    size="large"
                    color="primary"
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
              <Grid style={{ marginTop: '1rem' }}>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {columns1.map((column) => (
                          <TableCell 
                            key={column.field}
                            align="center"
                            sx={{ fontWeight: 'bold', fontSize: '16px', color: 'white', background: '#005000' }}
                          >
                            {column.headerName}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <React.Fragment>
                      {customers
                      .filter(row => row.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                      .map((row, index) => {
                        const ids = page * rowsPerPage + index + 1;
                      return(
  <TableRow key={row.id}>       
                    <TableCell align="center" sx={{fontSize:'16px'}}>{ids}</TableCell>
                    <TableCell align="center" sx={{fontSize:'16px'}}>{row.name}</TableCell>
                    <TableCell>
                      <EditIcon sx={{color:'#005000'}} onClick={(e)=>{handleEdit(row.id)}} />
                    </TableCell>
                    </TableRow>
                      )             
  })
                    }
                      </React.Fragment>
                  </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5,10,15]} 
                  component="div"
                  count={customers.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={7}>
            <Paper>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'centers', alignItems: 'center' }}>
                <Grid item xs={4}>
                  <Header sx={{ fontSize: '12px', alignItems: 'center', paddingLeft: '10px' }}>
                    <h2>Material Master</h2>
                  </Header>
                </Grid>
              <Grid item xs={4} sx={{ paddingTop: '2px', paddingBottom: '2px', paddingLeft: '140px' }}>
                  <TextField
                    sx={{ width: 220, paddingTop: '2px', paddingBottom: '2px' }}
                    label="Search"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={searchQuery1}
                    onChange={handleSearchChange1}
                  />
                </Grid>
                <Grid item xs={4} sx={{ paddingLeft: '150px' }}>
                  <Button
                    onClick={handleOpen1}
                    sx={{ width: 80, padding: 0, height: 30, backgroundColor: '#005000' }}
                    variant="contained"
                    size="large"
                    color="primary"
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
              <Grid style={{ marginTop: '1rem' }}>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {columns2.map((column) => (
                          <TableCell
                            key={column.field}
                            align="center"
                            sx={{ fontWeight: 'bold', fontSize: '16px', color: 'white', background: '#005000' }}
                          >
                            {column.headerName}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {materialDetails
                    .filter((row) =>
                    Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(searchQuery1.toLowerCase())
                    )
                  )
                    .slice(page1 * rowsPerPage1, (page1 +1) * rowsPerPage1)
                    .map((row) => (
                      <TableRow key={row.id}>
                        <TableCell align="center" sx={{fontSize:'16px'}}>{row.partnumber}</TableCell>
                        <TableCell align="center" sx={{fontSize:'16px'}}>{row.hsncode}</TableCell>
                        <TableCell align="center" sx={{fontSize:'16px'}}>{row.descrip}</TableCell>
                        <TableCell align="center" sx={{fontSize:'16px'}}>{row.unit}</TableCell>
                        <TableCell align="center" sx={{fontSize:'16px'}}>{row.price}</TableCell>
                        <TableCell>
                          <EditIcon  sx={{color:'#005000'}} onClick={(e) => handleEditMaterial(row.id)} />
                        </TableCell>
                      </TableRow>
                    ))} 
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                      rowsPerPageOptions={[5, 10,15]} 
                      component="div"
                      count={materialDetails.length}
                      rowsPerPage={rowsPerPage1}
                      page={page1}
                      onPageChange={handleChangePage1}
                      onRowsPerPageChange={handleChangeRowsPerPage1}
                />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      <Modal
          open={open}
          onClose={handleClose}
  >
    <Box sx={style}>
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleClose}
        aria-label="close"
        sx={{ position: 'absolute',top: 6, right: 15}}
        >
          <CloseIcon />
      </IconButton>

      <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center" sx={{fontSize:'20px'}}>
        <b>Customer Master</b>
      </Typography>

      <TableContainer >
        <Table>
          <TableBody>
            <TableRow>
            <TableCell  sx={{fontSize:'18px'}}>Name</TableCell>
            <TableCell sx={{padding:'0'}}><TextField variant="outlined" id="name" size="small" required  value={name} placeholder='Name' sx={{width:'100%'}} onChange={handleName}/></TableCell>
            </TableRow>
            <TableRow>
            <TableCell  sx={{fontSize:'18px'}} >Phone No.</TableCell>
            <TableCell sx={{padding:'0'}}><TextField variant="outlined" id="phone" type="number" size="small" value={phone} required  placeholder='PhoneNumber' sx={{width:'100%'}} onChange={handlePhone} /></TableCell>
            </TableRow>
            <TableRow>
            <TableCell  sx={{fontSize:'18px'}}>Mail ID</TableCell>
            <TableCell sx={{padding:'0'}}><TextField variant="outlined" id="mail" size="small" required  value={mail} placeholder='Mail ID' sx={{width:'100%'}} onChange={handleMail} /></TableCell>
            </TableRow>
            <TableRow>
            <TableCell  sx={{fontSize:'18px'}}>GST No.</TableCell>
            <TableCell sx={{padding:'0'}}><TextField variant="outlined" id="gst"size="small" required  value={gst} placeholder='GST No.' sx={{width:'100%'}} onChange={handleGst}/></TableCell>
            </TableRow>
            <TableRow>
            <TableCell  sx={{fontSize:'18px'}} >PAN No.</TableCell>
            <TableCell sx={{padding:'0'}}><TextField variant="outlined" id="pan" size="small" required  value={pan} placeholder='PAN No.' sx={{width:'100%'}} onChange={handlePan}/></TableCell>
            </TableRow>
            <TableRow>
            <TableCell  sx={{fontSize:'18px'}}>Address</TableCell>
            <TableCell sx={{padding:'0'}}><TextField variant="outlined" id="address" multiline size="small" value={address} required  placeholder='Address' sx={{width:'100%'}}  onChange={handleAddress}/></TableCell>
            </TableRow>
            <TableRow>
            <TableCell  sx={{fontSize:'18px'}}>District</TableCell>
            <TableCell sx={{padding:'0'}}><TextField variant="outlined" id="district" size="small" required  value={district} placeholder='District' sx={{width:'100%'}} onChange={handleDistrict} /></TableCell>
            </TableRow>
            <TableRow>
            <TableCell  sx={{fontSize:'18px'}} >Pincode</TableCell>
            <TableCell sx={{padding:'0'}}><TextField variant="outlined" id="pincode" type="number" size="small" value={pincode} required  placeholder='pincode' sx={{width:'100%'}} onChange={handlePincode}/></TableCell>
            </TableRow>
            <TableRow>
            <TableCell  sx={{fontSize:'18px'}}>State</TableCell>
            <TableCell sx={{padding:'0'}}><TextField variant="outlined" id="state" size="small" required  placeholder='State'value={state} sx={{width:'100%'}} onChange={handleState}/></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center", 
      }}
       open={snackbarOpen}
        autoHideDuration={5000} 
        onClose={handleSnackbarClose}>
      <MuiAlert onClose={closeSnackbar} severity="success">
        {snackbarMessage}
      </MuiAlert>
    </Snackbar>
      <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center", 
      }}
       open={snackbarOpen1} autoHideDuration={10000}  onClose={closeSnackbar1}>
      <MuiAlert onClose={closeSnackbar1} severity="error">
        {snackbarMessage1}
      </MuiAlert>
    </Snackbar>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
      <Button 
          sx={{ backgroundColor: '#005000',alignItems:"center"}}
          type="submit"
          variant="contained" 
          color="primary" onClick={handleCreateValue}>Submit</Button>
      </Box>
    </Box>
  </Modal>
        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style1}>
          <IconButton
            edge="end"
            color="inherit" 
            onClick={handleClose1}
            aria-label="close"
            sx={{ position: 'absolute',top: 5,right:15}}
        > 
          <CloseIcon />
      </IconButton>
            <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center" sx={{fontSize:'20px'}} >
            <b>Material Master</b> 
            </Typography>
            <TableContainer>
        <Table>
          <TableHead>
          <TableRow sx={{backgroundColor:'#005000'}}>
              <TableCell align="center"sx={{ fontWeight: 'bold', fontSize: '15px', color: 'white'}}>
                <Typography> Part No.</Typography>
              </TableCell>
              <TableCell align="center"sx={{ fontWeight: 'bold', fontSize: '15px', color: 'white'}}>
                <Typography> HSN Code</Typography>
              </TableCell>  
              <TableCell align="center"sx={{ fontWeight: 'bold', fontSize: '15px', color: 'white',paddingLeft:'280px'}}>
                <Typography>Description</Typography>
              </TableCell> 
              <TableCell sx={{ fontWeight: 'bold', fontSize: '15px', color: 'white',paddingLeft:'310px'}}>
                <Typography>Unit</Typography>
              </TableCell>
              <TableCell align="center"sx={{ fontWeight: 'bold', fontSize: '15px', color: 'white'}}>
                <Typography>Price</Typography>
              </TableCell>
              <TableCell align="center"sx={{ fontWeight: 'bold', fontSize: '15px', color: 'white', background: '#005000' }}>
                <Button
                  onClick={()=>{
                    handleAddMaterialRow();
                  }
                  }
                  sx={{ width: 80, padding: 0, height: 30, background:'#005000', color:'#FFFFF' }}
                  variant="contained"
                  size="large"
                  color="primary"  
                >
                  Add
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {materialRows.map((row, index) => (
                    <TableRow key={index} >
                      <TableCell align='center' sx={{paddingTop:'12px',paddingBottom:'0'}} >
                        <TextField
                        id={`part_no_${index}`}
                        variant="standard"
                        placeholder='Part No.'
                        sx={{ width: '100%'}}
                        value={row.partno}
                        onChange={(e) => handleMaterialFieldChange(e, index, 'partno')}
                        />
                      </TableCell>
                      <TableCell align='center'sx={{paddingTop:'12px',paddingBottom:'0',paddingLeft:'5px'}} >
                        <TextField
                        id={`hsnCode_${index}`}
                        variant="standard"
                        placeholder='Code'
                        sx={{ width: '100%',marginBottom:0,marginTop:0, paddingLeft:'25px'}}
                        value={row.code}
                        onChange={(e) => handleMaterialFieldChange(e, index, 'code')}
                        />
                      </TableCell>
                        <TableCell align='center' sx={{paddingTop:'12px',paddingBottom:'0'}} >
                          <TextField
                          id={`description_${index}`}
                            variant="standard"
                            placeholder='Description'
                            sx={{ width: '180%' ,paddingLeft:'15px',marginBottom:0,marginTop:0}}
                            value={row.description}
                            onChange={(e) => handleMaterialFieldChange(e, index, 'description')}
                          />
                        </TableCell>
                      <TableCell align='center' sx={{paddingTop:'12px',paddingBottom:'0',paddingLeft:'300px'}}>
                        <Select
                          id={`unit_${index}`}
                          variant="standard"
                          placeholder='Unit'
                          sx={{marginBottom:0,marginTop:0,paddingLeft:'0',width:'100%'}}
                          value={row.unit} 
                          onChange={(e) => handleMaterialFieldChange(e, index, 'unit')}
                          > 
                          <MenuItem value="mtr">mtr</MenuItem>
                          <MenuItem value="pc">pc</MenuItem>
                          </Select>
                      </TableCell>  
                      <TableCell align='center' sx={{paddingTop:'12px',paddingBottom:'0'}}>
                        <TextField
                          id={`price_${index}`}
                          variant="standard"
                          placeholder='Price'
                          sx={{ width: '100%',marginBottom:0,marginTop:0}}
                          value={row.price}
                          onChange={(e) => handleMaterialFieldChange(e, index, 'price')}
                        />
                      </TableCell>
                      <TableCell align='center' sx={{paddingTop:'12px',paddingBottom:'0'}}>
                        <IconButton onClick={() => handleRemoveMaterialRow(index)}>
                          <DeleteIcon sx={{color:'red'}}/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
          </TableBody> 
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center',marginTop: '1rem' }}>
      <Button 
          sx={{ backgroundColor: '#005000',alignItems:"center"}}
          type="submit"
          variant="contained" 
          color="primary"
          onClick={handleMaterialSubmit}
          >Submit</Button>
    {apiResponseModal.length !== 0 && (
  <Snackbar
    style={{
      width: "100%",
    }}
    open={snackBarOpen}               
    autoHideDuration={2000}
    onClose={()=>handleCloseAlert()}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center", 
    }}
    action={
      apiResponseModal.map((item, index) => (
        <React.Fragment key={index}>
          {item.jsonstatus === "1"?(
            <Alert
              severity="success"
              onClose={() => handleCloseAlert(index)}
            >
              Part Number: {item.partNo} is submitted successfully!
            </Alert>
          ) : item.jsonstatus === "2" ? (
            <Alert
              severity="error"
              onClose={() => handleCloseAlert(index)}
            > 
              Part Number: {item.partNo} is already exists!
            </Alert>
          ) : null}
        </React.Fragment>
      ))
    } 
  />
)}
      </Box>
          </Box>
        </Modal>
        <Modal
          open={open2}
          onClose={handleClose2}
  >
    <Box sx={style}>
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleClose2}
        aria-label="close"
        sx={{ position: 'absolute',top: 6, right: 15}}
        >
          <CloseIcon />
      </IconButton>

      <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center" sx={{fontSize:'20px'}}>
        <b>Customer Master</b>
      </Typography>

      <TableContainer >
        <Table >
          <TableBody>
            <TableRow>
            <TableCell  sx={{fontSize:'18px'}}>Name</TableCell>
            <TableCell sx={{padding:'0'}}><TextField variant="outlined" size="small" required id="cust_name" value={editCustomer.length>0?editCustomer[0].cust_name:""} placeholder='Name' sx={{width:'100%'}}  onChange={handleEditName}/></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{fontSize:'18px'}}> Phone No.</TableCell>
            <TableCell sx={{padding:'0'}}><TextField variant="outlined" type="number" id="phone_no" size="small"  value={editCustomer.length>0?editCustomer[0].phone_no:""} required  placeholder='PhoneNumber' sx={{width:'100%'}} onChange={handleEditPhone} /></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{fontSize:'18px'}}>Mail ID</TableCell>
            <TableCell sx={{padding:'0'}}><TextField variant="outlined" size="small" id="mail_id" required  value={editCustomer.length>0?editCustomer[0].mail_id:""} placeholder='Mail ID' sx={{width:'100%'}}  onChange={handleEditMail} /></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{fontSize:'18px'}}>GST No.</TableCell>
            <TableCell sx={{padding:'0'}}><TextField variant="outlined" size="small" id="gst_no" required value={editCustomer.length>0?editCustomer[0].gst_no:""} placeholder='GST No.' sx={{width:'100%'}}  onChange={handleEditGst}/></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{fontSize:'18px'}} >PAN No.</TableCell>
            <TableCell sx={{padding:'0'}}><TextField variant="outlined" size="small" id="pan_no" required value={editCustomer.length>0?editCustomer[0].pan_no:""} placeholder='PAN No.' sx={{width:'100%'}}  onChange={handleEditPan}/></TableCell>
            </TableRow>
            <TableRow>
            <TableCell  sx={{fontSize:'18px'}}>Address</TableCell>
            <TableCell sx={{padding:'0'}}><TextField variant="outlined" multiline id="address" size="small" value={editCustomer.length>0?editCustomer[0].address:""} required  placeholder='Address' sx={{width:'100%'}}  onChange={handleEditAddress}/></TableCell>
            </TableRow>
            <TableRow>
            <TableCell  sx={{fontSize:'18px'}}>District</TableCell>
            <TableCell sx={{padding:'0'}}><TextField variant="outlined" size="small" id="district" required value={editCustomer.length>0?editCustomer[0].district:""} placeholder='District' sx={{width:'100%'}}  onChange={handleEditDistrict} /></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{fontSize:'18px'}} >Pincode</TableCell>
            <TableCell sx={{padding:'0'}}><TextField variant="outlined"  type="number" id="pin_code" size="small"  value={editCustomer.length>0?editCustomer[0].pin_code:""} required  placeholder='pincode' sx={{width:'100%'}}  onChange={handleEditPincode}/></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{fontSize:'18px'}}>State</TableCell>
            <TableCell sx={{padding:'0'}}><TextField variant="outlined" size="small" required id="state" placeholder='State'value={editCustomer.length>0?editCustomer[0].state:""} sx={{width:'100%'}}  onChange={handleEditState}/></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
      <Button 
          sx={{ backgroundColor: '#005000',alignItems:"center"}}
          type="update"
          variant="contained" 
          color="primary" onClick={handleUpdateValue}> Update</Button>
      </Box>
    </Box>
  </Modal>
  <Modal
          open={openEdit}
          onClose={handleEditClose}
        >
          <Box sx={style1}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleEditClose}
            aria-label="close"
            sx={{ position: 'absolute',top: 5,right:15,}}
        >
          <CloseIcon />
      </IconButton>
            <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center" sx={{fontSize:'20px'}} >
            <b>Material Master</b> 
            </Typography>
            <TableContainer>
        <Table>
          <TableHead>
          <TableRow sx={{backgroundColor:'#005000'}}>
              <TableCell align="center"sx={{ fontWeight: 'bold', fontSize: '15px', color: 'white'}}>
                <Typography> Part No.</Typography>
              </TableCell>
              <TableCell align="center"sx={{ fontWeight: 'bold', fontSize: '15px', color: 'white'}}>
                <Typography> HSN Code</Typography>
              </TableCell>  
              <TableCell align="center"sx={{ fontWeight: 'bold', fontSize: '15px', color: 'white',paddingLeft:'250px'}}>
                <Typography>Description</Typography>
              </TableCell>   
              <TableCell sx={{ fontWeight: 'bold', fontSize: '15px', color: 'white',paddingLeft:'330px'}}>
                <Typography> Unit</Typography>
              </TableCell>
              <TableCell align="center"sx={{ fontWeight: 'bold', fontSize: '15px', color: 'white'}}>
                <Typography>Price</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          <TableRow>
          <TableCell align='center' sx={{paddingTop:'12px',paddingBottom:'0'}}>
                  <TextField
                    variant="standard"
                    fullWidth
                    id="part_no"
                    value={editMaterial.length>0?editMaterial[0].part_no:""}
                    placeholder='Part No'
                    onChange={handleEditPart}
                  />
          </TableCell>
          <TableCell align='center' sx={{paddingTop:'12px',paddingBottom:'0'}}>
                  <TextField
                    variant="standard"
                    fullWidth
                    id="hsn_code"
                    value={editMaterial.length>0?editMaterial[0].hsn_code:""}
                    placeholder='HSN Code'
                    onChange={handleEditCode}
                  />
                </TableCell>
          <TableCell align='center' sx={{paddingTop:'12px',paddingBottom:'0'}}>
                  <TextField
                    variant="standard"
                    fullWidth
                    id="description"
                    value={editMaterial.length>0?editMaterial[0].description:""}
                    placeholder='Description'
                    sx={{width:'180%'}}
                    onChange={handleEditDes}
                  />
                </TableCell>
                    <TableCell align='center' sx={{paddingTop:'12px',paddingBottom:'0',paddingLeft:'300px'}}>
                        <Select 
                          variant="standard"
                          placeholder='Unit'
                          id="unit"
                          value={editMaterial.length>0?editMaterial[0].unit:""}
                          onChange={handleEditUnit}
                          > 
                          <MenuItem value="mtr">mtr</MenuItem>
                          <MenuItem value="pc">pc</MenuItem>
                        </Select>
                    </TableCell>
                        <TableCell align='center' sx={{paddingTop:'12px',paddingBottom:'0'}}>
                  <TextField
                    variant="standard"
                    fullWidth
                    id="price"
                    value={editMaterial.length>0?editMaterial[0].price:""}
                    placeholder='Price'
                    sx={{width:'80%'}}
                    onChange={handleEditPrice}
                  />
                </TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center',marginTop: '1rem' }}>
      <Button 
          sx={{ backgroundColor: '#005000',alignItems:"center"}}
          type="update"
          variant="contained" 
          color="primary"
          onClick={handleUpdateMaterial}
          >Update</Button>
      </Box>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }