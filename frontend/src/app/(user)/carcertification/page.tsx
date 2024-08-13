'use client'

import React from 'react'
import CarCertificationForm from '@/components/carcertification/CarCertificationForm'
import styled from 'styled-components';

const page = () => {
  return (
    <Container>
        <CarCertificationForm/>
    </Container>
  )
}

export default page

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`