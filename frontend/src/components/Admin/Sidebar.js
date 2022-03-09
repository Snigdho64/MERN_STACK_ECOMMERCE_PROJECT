import React from 'react'
import { Link } from 'react-router-dom'
import { TreeView, TreeItem } from '@mui/lab'
import './Sidebar.css'
import logo from '../../images/logo.png'
import {
    AddCircleTwoTone,
    ExpandMoreTwoTone,
    ImportExportTwoTone,
    ListTwoTone,
    PeopleAlt,
    PostAddTwoTone,
    RateReview,
} from '@mui/icons-material'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/">
                <img src={logo} alt='Ecommerce Logo'/>
            </Link>
            <Link to="/admin/dashboard">
                <p>Dashboard</p>
            </Link>

            <TreeView
                defaultCollapseIcon={<ExpandMoreTwoTone />}
                defaultExpandIcon={<ImportExportTwoTone />}
            >
                <TreeItem nodeId="1" label="Products">
                    <Link to="/admin/products">
                        <TreeItem
                            nodeId="2"
                            label="All"
                            icon={<PostAddTwoTone />}
                        ></TreeItem>
                    </Link>

                    <Link to="/admin/product">
                        <TreeItem
                            nodeId="3"
                            label="Create"
                            icon={<AddCircleTwoTone />}
                        ></TreeItem>
                    </Link>
                </TreeItem>
                <Link to="/admin/orders">
                    <p>
                        <ListTwoTone />
                        Orders
                    </p>
                </Link>
                <Link to="/admin/users">
                    <p>
                        <PeopleAlt />
                        Users
                    </p>
                </Link>
                <Link to="/admin/reviews">
                    <p>
                        <RateReview />
                        Reviews
                    </p>
                </Link>
            </TreeView>
        </div>
    )
}

export default Sidebar
