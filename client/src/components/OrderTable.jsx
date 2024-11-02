// import * as React from 'react';
// import get from 'lodash/get';
// import Box from '@mui/joy/Box';
// import Button from '@mui/joy/Button';
// import Chip from '@mui/joy/Chip';
// import Divider from '@mui/joy/Divider';
// import FormControl from '@mui/joy/FormControl';
// import FormLabel from '@mui/joy/FormLabel';
// import Input from '@mui/joy/Input';
// import Modal from '@mui/joy/Modal';
// import ModalDialog from '@mui/joy/ModalDialog';
// import ModalClose from '@mui/joy/ModalClose';
// import Select from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
// import Table from '@mui/joy/Table';
// import Sheet from '@mui/joy/Sheet';
// import Checkbox from '@mui/joy/Checkbox';
// import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
// import Typography from '@mui/joy/Typography';
// import Menu from '@mui/joy/Menu';
// import MenuButton from '@mui/joy/MenuButton';
// import MenuItem from '@mui/joy/MenuItem';
// import Dropdown from '@mui/joy/Dropdown';

// import { useNavigate } from 'react-router-dom';
// import configServ from '../services/config';

// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import SearchIcon from '@mui/icons-material/Search';
// import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
// import BlockIcon from '@mui/icons-material/Block';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
// import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

// function descendingComparator(a, b, orderBy) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }

// function getComparator(order, orderBy) {
//     return order === 'desc'
//         ? function (a, b) { return descendingComparator(a, b, orderBy); }
//         : function (a, b) { return -descendingComparator(a, b, orderBy); };
// }

// function stableSort(array, comparator) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) {
//             return order;
//         }
//         return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
// }

// function RowMenu({ id, status, statusChange }) {
//     const navigate = useNavigate()
//     return (
//         <Dropdown>
//             <MenuButton
//                 slots={{ root: IconButton }}
//                 slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
//             >
//                 <MoreHorizRoundedIcon />
//             </MenuButton>
//             <Menu size="sm" sx={{ minWidth: 140 }}>
//                 <MenuItem onClick={() => { navigate(`details/${id}`) }}>Edit</MenuItem>
//                 <Divider />
//                 <MenuItem
//                     color={status ? 'danger' : 'success'}
//                     onClick={() => { statusChange(id) }}
//                 >
//                     {status ? 'Inactive' : 'Active'}
//                 </MenuItem>
//             </Menu>
//         </Dropdown>
//     );
// }

// export default function OrderTable({
//     data,
//     head,
//     pageSwitch,
//     dataPerPage,
//     setDataPerPage,
//     statusChange,
//     searchKeyword,
//     setSearchKeyword,
//     statusFilter,
//     setStatusFilter,
//     categoryFilter = undefined,
//     setCategoryFilter = undefined,
//     setIsChanged
// }) {

//     const [rows, setRows] = React.useState([]);
//     const [order, setOrder] = React.useState('desc');
//     const [selected, setSelected] = React.useState([]);
//     const [open, setOpen] = React.useState(false);
//     const [categoryList, setCategoryList] = React.useState([]);

//     React.useEffect(() => {
//         const fetchCategory = async () => {
//             const data = await configServ.getCategories()
//             setCategoryList(data.data)
//             // console.log(data)
//         }
//         fetchCategory()
//     }, [])

//     const handleDataPerPage = (e, value) => {
//         setDataPerPage(value)
//     }
//     const renderFilters = () => (
//         <React.Fragment>
//             <FormControl size="sm">
//                 <FormLabel>Status</FormLabel>
//                 <Select
//                     size="sm"
//                     placeholder="Filter by status"
//                     slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
//                     value={statusFilter}
//                     onChange={(e, value) => { setStatusFilter(value); setIsChanged((state) => (!state)) }}
//                 >
//                     <Option value={''}>All</Option>
//                     <Option value={true}>Active</Option>
//                     <Option value={false}>Inactive</Option>
//                 </Select>
//             </FormControl>
//             <FormControl size="sm" sx={{ display: categoryFilter === undefined ? 'none' : 'block' }}>
//                 <FormLabel>Category</FormLabel>
//                 <Select
//                     size="sm"
//                     placeholder="Filter by Category"
//                     value={categoryFilter}
//                     onChange={(e, value) => { setCategoryFilter(value); setIsChanged((state) => (!state)) }}
//                 >
//                     <Option value=''>All</Option>
//                     {
//                         categoryList.map((item, index) => (
//                             <Option key={index} value={item._id}>{item.name}</Option>
//                         ))
//                     }
//                 </Select>
//             </FormControl>
//             <FormControl size="sm">
//                 <FormLabel>Data per page</FormLabel>
//                 <Select
//                     size="sm"
//                     value={dataPerPage}
//                     onChange={handleDataPerPage}
//                 >
//                     <Option value={1}>1</Option>
//                     <Option value={10}>10</Option>
//                     <Option value={50}>50</Option>
//                     <Option value={100}>100</Option>
//                 </Select>
//             </FormControl>
//         </React.Fragment>
//     );

//     React.useEffect(() => {
//         if (data.data) {
//             setRows(data.data)
//         }
//     }, [data])

//     function createArray(number) {
//         const resultArray = Array.from({ length: number }, (_, index) => index + 1);
//         return resultArray;
//     }

//     const nextPage = () => {
//         if (data.next) {
//             pageSwitch(data.next?.page, data.next?.limit)
//         }
//     }
//     const prevPage = () => {
//         if (data.prev) {
//             pageSwitch(data.prev?.page, data.prev?.limit)
//         }
//     }

//     return (
//         <React.Fragment>
//             <Sheet
//                 className="SearchAndFilters-mobile"
//                 sx={{
//                     display: { xs: 'flex', sm: 'none' },
//                     my: 1,
//                     gap: 1,
//                 }}
//             >
//                 <Input
//                     size="sm"
//                     placeholder="Search"
//                     startDecorator={<SearchIcon />}
//                     sx={{ flexGrow: 1 }}
//                 />
//                 <IconButton
//                     size="sm"
//                     variant="outlined"
//                     color="neutral"
//                     onClick={() => setOpen(true)}
//                 >
//                     <FilterAltIcon />
//                 </IconButton>
//                 <Modal open={open} onClose={() => setOpen(false)}>
//                     <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
//                         <ModalClose />
//                         <Typography id="filter-modal" level="h2">
//                             Filters
//                         </Typography>
//                         <Divider sx={{ my: 2 }} />
//                         <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                             {renderFilters()}
//                             <Button color="primary" onClick={() => setOpen(false)}>
//                                 Submit
//                             </Button>
//                         </Sheet>
//                     </ModalDialog>
//                 </Modal>
//             </Sheet>
//             <Box
//                 className="SearchAndFilters-tabletUp"
//                 sx={{
//                     borderRadius: 'sm',
//                     py: 2,
//                     display: { xs: 'none', sm: 'flex' },
//                     flexWrap: 'wrap',
//                     gap: 1.5,
//                     '& > *': {
//                         minWidth: { xs: '120px', md: '160px' },
//                     },
//                 }}
//             >
//                 <FormControl sx={{ flex: 1 }} size="sm">
//                     <FormLabel>Search</FormLabel>
//                     <Input
//                         size="sm"
//                         placeholder="Search"
//                         value={searchKeyword}
//                         onChange={(e) => { setSearchKeyword(e.target.value) }}
//                         onKeyDown={(e) => {
//                             if (e.key === 'Enter') {
//                                 setIsChanged((state) => (!state))
//                             }
//                         }}
//                         endDecorator={
//                             <IconButton
//                                 onClick={() => { setIsChanged((state) => (!state)) }}
//                             >
//                                 <SearchIcon />
//                             </IconButton>
//                         }
//                     />
//                 </FormControl>
//                 {renderFilters()}
//             </Box>
//             <Sheet
//                 className="OrderTableContainer"
//                 variant="outlined"
//                 sx={{
//                     display: { xs: 'none', sm: 'initial' },
//                     width: '100%',
//                     borderRadius: 'sm',
//                     flexShrink: 1,
//                     overflow: 'auto',
//                     minHeight: 0,
//                 }}
//             >
//                 <Table
//                     aria-labelledby="tableTitle"
//                     stickyHeader
//                     hoverRow
//                     sx={{
//                         '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
//                         '--Table-headerUnderlineThickness': '1px',
//                         '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
//                         '--TableCell-paddingY': '4px',
//                         '--TableCell-paddingX': '8px',
//                     }}
//                 >
//                     <thead>
//                         <tr>
//                             <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
//                                 <Checkbox
//                                     size="sm"
//                                     indeterminate={
//                                         selected.length > 0 && selected.length !== rows.length
//                                     }
//                                     checked={selected.length === rows.length}
//                                     onChange={(event) => {
//                                         setSelected(
//                                             event.target.checked ? rows.map((row) => row._id) : [],
//                                         );
//                                     }}
//                                     color={
//                                         selected.length > 0 || selected.length === rows.length
//                                             ? 'primary'
//                                             : undefined
//                                     }
//                                     sx={{ verticalAlign: 'text-bottom' }}
//                                 />
//                             </th>
//                             {/* <th style={{ width: 100, padding: '12px 6px' }}>Sr. No.</th>
//                             <th style={{ width: 140, padding: '12px 6px' }}>Date</th>
//                             <th style={{ width: 140, padding: '12px 6px' }}>Status</th>
//                             <th style={{ width: 240, padding: '12px 6px' }}>Customer</th>
//                             <th style={{ width: 140, padding: '12px 6px' }}> </th> */}
//                             {head.map((item, index) => (
//                                 <th key={index}>{item.name}</th>
//                             ))}
//                             {head.length <= 4 && (<th style={{ width: 140, padding: '12px 6px' }}> </th>)}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {stableSort(rows, getComparator(order, 'id')).map((row) => (
//                             <tr key={row._id}>
//                                 <td style={{ textAlign: 'center', width: 120 }}>
//                                     <Checkbox
//                                         size="sm"
//                                         checked={selected.includes(row._id)}
//                                         color={selected.includes(row._id) ? 'primary' : undefined}
//                                         onChange={(event) => {
//                                             setSelected((ids) =>
//                                                 event.target.checked
//                                                     ? ids.concat(row._id)
//                                                     : ids.filter((itemId) => itemId !== row._id),
//                                             );
//                                         }}
//                                         slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
//                                         sx={{ verticalAlign: 'text-bottom' }}
//                                     />
//                                 </td>

//                                 {head.map((item, index) => (
//                                     <td key={index}>
//                                         {item.name === 'Status' && (
//                                             <Chip
//                                                 variant="soft"
//                                                 size="sm"
//                                                 startDecorator={row.status ? <CheckRoundedIcon /> : <BlockIcon />}
//                                                 color={row.status ? 'success' : 'danger'}
//                                             >
//                                                 {row.status ? 'Active' : 'Inactive'}
//                                             </Chip>
//                                         )}
//                                         {get(row, item.row)}
//                                     </td>
//                                 ))}

//                                 <td>
//                                     <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
//                                         {/* <Link level="body-xs" component="button">
//                                             Download
//                                         </Link> */}
//                                         <RowMenu id={row._id} status={row.status} statusChange={statusChange} />
//                                     </Box>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             </Sheet>
//             <Box
//                 className="Pagination-laptopUp"
//                 sx={{
//                     pt: 2,
//                     gap: 1,
//                     [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
//                     display: {
//                         xs: 'none',
//                         md: 'flex',
//                     },
//                 }}
//             >
//                 <Button
//                     size="sm"
//                     variant="outlined"
//                     color="neutral"
//                     startDecorator={<KeyboardArrowLeftIcon />}
//                     onClick={prevPage}
//                 >
//                     Previous
//                 </Button>

//                 <Box sx={{ flex: 1 }} />
//                 {createArray(data.totalPage).map((page) => (
//                     <IconButton
//                         key={page}
//                         size="sm"
//                         variant={data.currentPage === page ? 'outlined' : 'plain'}
//                         color="neutral"
//                         onClick={() => pageSwitch(page, data.currentLimit)}
//                     >
//                         {page}
//                     </IconButton>
//                 ))}
//                 <Box sx={{ flex: 1 }} />

//                 <Button
//                     size="sm"
//                     variant="outlined"
//                     color="neutral"
//                     endDecorator={<KeyboardArrowRightIcon />}
//                     onClick={nextPage}
//                 >
//                     Next
//                 </Button>
//             </Box>
//         </React.Fragment >
//     );
// }




/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

const rows = [
    {
      id: "INV-1234",
      date: "Feb 3, 2023",
      status: "Refunded",
      customer: {
        initial: "A",
        name: "Anjali Sharma",
        email: "anjali.sharma@email.com",
      },
    },
    {
      id: "INV-1233",
      date: "Feb 3, 2023",
      status: "Paid",
      customer: {
        initial: "R",
        name: "Rahul Verma",
        email: "rahul.verma@email.com",
      },
    },
    {
      id: "INV-1232",
      date: "Feb 3, 2023",
      status: "Refunded",
      customer: {
        initial: "P",
        name: "Priya Singh",
        email: "priya.singh@email.com",
      },
    },
    {
      id: "INV-1231",
      date: "Feb 3, 2023",
      status: "Refunded",
      customer: {
        initial: "K",
        name: "Karan Gupta",
        email: "karan.gupta@email.com",
      },
    },
    {
      id: "INV-1230",
      date: "Feb 3, 2023",
      status: "Cancelled",
      customer: {
        initial: "S",
        name: "Sneha Patel",
        email: "sneha.patel@email.com",
      },
    },
    {
      id: "INV-1229",
      date: "Feb 3, 2023",
      status: "Cancelled",
      customer: {
        initial: "V",
        name: "Vikram Joshi",
        email: "vikram.joshi@email.com",
      },
    },
    {
      id: "INV-1228",
      date: "Feb 3, 2023",
      status: "Refunded",
      customer: {
        initial: "N",
        name: "Neha Reddy",
        email: "neha.reddy@email.com",
      },
    },
    {
      id: "INV-1227",
      date: "Feb 3, 2023",
      status: "Paid",
      customer: {
        initial: "M",
        name: "Mohit Yadav",
        email: "mohit.yadav@email.com",
      },
    },
    {
      id: "INV-1226",
      date: "Feb 3, 2023",
      status: "Cancelled",
      customer: {
        initial: "D",
        name: "Deepika Nair",
        email: "deepika.nair@email.com",
      },
    },
    {
      id: "INV-1225",
      date: "Feb 3, 2023",
      status: "Paid",
      customer: {
        initial: "A",
        name: "Anjali Sharma",
        email: "anjali.sharma@email.com",
      },
    },
    {
      id: "INV-1224",
      date: "Feb 3, 2023",
      status: "Cancelled",
      customer: {
        initial: "R",
        name: "Rahul Verma",
        email: "rahul.verma@email.com",
      },
    },
    {
      id: "INV-1223",
      date: "Feb 3, 2023",
      status: "Paid",
      customer: {
        initial: "P",
        name: "Priya Singh",
        email: "priya.singh@email.com",
      },
    },
    {
      id: "INV-1221",
      date: "Feb 3, 2023",
      status: "Refunded",
      customer: {
        initial: "K",
        name: "Karan Gupta",
        email: "karan.gupta@email.com",
      },
    },
    {
      id: "INV-1220",
      date: "Feb 3, 2023",
      status: "Paid",
      customer: {
        initial: "S",
        name: "Sneha Patel",
        email: "sneha.patel@email.com",
      },
    },
    {
      id: "INV-1219",
      date: "Feb 3, 2023",
      status: "Cancelled",
      customer: {
        initial: "V",
        name: "Vikram Joshi",
        email: "vikram.joshi@email.com",
      },
    },
    {
      id: "INV-1218",
      date: "Feb 3, 2023",
      status: "Cancelled",
      customer: {
        initial: "N",
        name: "Neha Reddy",
        email: "neha.reddy@email.com",
      },
    },
    {
      id: "INV-1217",
      date: "Feb 3, 2023",
      status: "Paid",
      customer: {
        initial: "M",
        name: "Mohit Yadav",
        email: "mohit.yadav@email.com",
      },
    },
    {
      id: "INV-1216",
      date: "Feb 3, 2023",
      status: "Cancelled",
      customer: {
        initial: "D",
        name: "Deepika Nair",
        email: "deepika.nair@email.com",
      },
    },
  ];
  

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function OrderTable() {
  const [order, setOrder] = React.useState("desc");
  const [selected, setSelected] = React.useState([]);
  const [open, setOpen] = React.useState(false);


  // Pagination states
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 7; // Display 5 rows per page
  const totalPage = Math.ceil(rows.length / rowsPerPage);

  // Handle page change functions
  const prevPage = () => setCurrentPage((page) => Math.max(page - 1, 1));
  const nextPage = () => setCurrentPage((page) => Math.min(page + 1, totalPage));
  const pageSwitch = (page) => setCurrentPage(page);

  // Paginate rows to display
  const displayedRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );



// Render the pagination component dynamically
const renderPagination = () => (
    <Box
      className="Pagination-laptopUp"
      sx={{
        pt: 2,
        gap: 1,
        [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
        display: { xs: "none", md: "flex" },
      }}
    >
      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        startDecorator={<KeyboardArrowLeftIcon />}
        onClick={prevPage}
      >
        Previous
      </Button>

      <Box sx={{ flex: 1 }} />
      {[...Array(totalPage)].map((_, index) => (
        <IconButton
          key={index + 1}
          size="sm"
          variant={currentPage === index + 1 ? "outlined" : "plain"}
          color="neutral"
          onClick={() => pageSwitch(index + 1)}
        >
          {index + 1}
        </IconButton>
      ))}
      <Box sx={{ flex: 1 }} />

      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        endDecorator={<KeyboardArrowRightIcon />}
        onClick={nextPage}
      >
        Next
      </Button>
    </Box>
  );








  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        >
          <Option value="paid">Paid</Option>
          <Option value="pending">Pending</Option>
          <Option value="refunded">Refunded</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Category</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="refund">Refund</Option>
          <Option value="purchase">Purchase</Option>
          <Option value="debit">Debit</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Customer</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="olivia">Olivia Rhye</Option>
          <Option value="steve">Steve Hampton</Option>
          <Option value="ciaran">Ciaran Murray</Option>
          <Option value="marina">Marina Macdonald</Option>
          <Option value="charles">Charles Fulton</Option>
          <Option value="jay">Jay Hoper</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Sheet
         className="SearchAndFilters-mobile"
         sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for order</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
            display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{ width: 48, textAlign: "center", padding: "12px 6px" }}
              >
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== rows.length
                  }
                  checked={selected.length === rows.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked ? rows.map((row) => row.id) : []
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === rows.length
                      ? "primary"
                      : undefined
                  }
                  sx={{ verticalAlign: "text-bottom" }}
                />
              </th>
              <th style={{ width: 120, padding: "12px 6px" }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  endDecorator={<ArrowDropDownIcon />}
                  sx={[
                    {
                      fontWeight: "lg",
                      "& svg": {
                        transition: "0.2s",
                        transform:
                          order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                      },
                    },
                    order === "desc"
                      ? { "& svg": { transform: "rotate(0deg)" } }
                      : { "& svg": { transform: "rotate(180deg)" } },
                  ]}
                >
                  Invoice
                </Link>
              </th>
              <th style={{ width: 140, padding: "12px 6px" }}>Date</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Status</th>
              <th style={{ width: 240, padding: "12px 6px" }}>Customer</th>
              <th style={{ width: 48, padding: "12px 6px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedRows.map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: "center" }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(row.id)}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(row.id)
                          : ids.filter((itemId) => itemId !== row.id)
                      );
                    }}
                    sx={{ verticalAlign: "text-bottom" }}
                  />
                </td>
                <td>
                  <Typography fontWeight="md">{row.id}</Typography>
                </td>
                <td>{row.date}</td>
                <td>
                  <Chip
                    size="sm"
                    variant="soft"
                    color={
                      row.status === "Paid"
                        ? "success"
                        : row.status === "Cancelled"
                        ? "danger"
                        : row.status === "Refunded"
                        ? "neutral"
                        : "warning"
                    }
                  >
                    {row.status}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar size="sm">{row.customer.initial}</Avatar>
                    <div>
                      <Typography
                        fontWeight="lg"
                        level="body3"
                        textColor="text.primary"
                      >
                        {row.customer.name}
                      </Typography>
                      <Typography level="body3" textColor="text.tertiary">
                        {row.customer.email}
                      </Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  <RowMenu />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

      {renderPagination()}
    </React.Fragment>
  );
}
