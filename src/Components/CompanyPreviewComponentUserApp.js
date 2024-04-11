import { React, useState, useEffect } from 'react'

const CompanyPreviewComponentUserApp = ({selectedPost}) => {
    let context = JSON.parse(localStorage.getItem('context'))

    if(selectedPost != null) {
        return (
            <div>
                <h4>{selectedPost.post.job_title}</h4>
                <h6>{selectedPost.company.name}</h6>
                <p>{selectedPost.post.description}</p>
            </div>
        )
    }
    else {
        return (
            <p>loading...</p>
        )
    }
}

export default CompanyPreviewComponentUserApp