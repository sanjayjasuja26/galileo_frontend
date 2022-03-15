import React from 'react'
import LeftContent from '../../components/Auth/LeftContent'
import RightSection from '../../components/Auth/RightSection'

const index = () => {
  return (
    <div class="container-fluid p-0">
        <div class="row">
            <LeftContent />
            <RightSection />
        </div>
    </div>
  )
}

export default index