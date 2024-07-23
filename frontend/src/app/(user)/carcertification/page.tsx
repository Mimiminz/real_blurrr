'use client'

import React from 'react'
import CarCertificationForm from '@/components/carcertification/CarCertificationForm'
import styled from 'styled-components';


type Props = {}

const page = (props: Props) => {
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