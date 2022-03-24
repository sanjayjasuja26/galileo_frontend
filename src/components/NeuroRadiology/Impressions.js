import React from 'react'

const Impressions = () => {
  return (
    <>
        <div className="impression row">
                            <div>
                                <h5>impressions</h5>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="diagnosis">
                                    <p>1st Clinical Diagnosis</p>
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected>Glioma</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="diagnosis mx-sm-4 mx-lg-4">
                                    <p>2nd Clinical Diagnosis</p>
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected>Lymphoma</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="diagnosis">
                                    <p>3rd Clinical Diagnosis</p>
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected>Infarction, subacute</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>
        </div>
        <div className="next d-flex justify-content-end mt-3 mb-5">
            <button type="button" className="btn btn-primary">Next</button>
        </div>
    </>
  )
}

export default Impressions