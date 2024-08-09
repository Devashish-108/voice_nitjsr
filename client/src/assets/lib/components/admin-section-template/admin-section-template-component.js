import React from "react";
import './admin-section-template-component.css'

const AdminSectionTemplate = (props) => {
    return <div className={`admin-section-template ${props.className || ''}`}>
        {props.children}
    </div>
}

export default AdminSectionTemplate;