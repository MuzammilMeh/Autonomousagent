import styled from "styled-components";

export const ServicesContainer = styled.div`
    min-height: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #010606;
    padding: 50px 0;

    @media screen and (max-width: 768px) {
        min-height: 1100px;
    }

    @media screen and (max-width: 480px) {
        min-height: 1300px;
    }

`

export const ServicesWrapper = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    grid-gap: 16px;
    padding: 20px 50px;

    @media screen and (max-width: 1000px) {
        grid-template-columns: 1fr 1fr;
        padding: 20px 50px;
    }

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        //padding: 0 20px;
        padding: 20px 50px;
    }

`

export const ServicesCard = styled.div`
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    max-height: 900px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;
    width: 100%; /* Set full width by default */

    @media screen and (min-width: 480px) {
        width: 90%; /* Adjust width for small screens */
    }

    @media screen and (min-width: 768px) {
        width: 80%; /* Adjust width for medium screens */
        margin: 0 auto; /* Center the card horizontally */
    }

    @media screen and (min-width: 1000px) {
        width: 900px; /* Set a fixed width for larger screens */
    }

    @media screen and (min-width: 1000px) {
        width: 900px; /* Set a fixed width for larger screens */
    }

    &:hover {
        transform: scale(1.02);
    }
`

export const ServicesIcon = styled.img`
    height: 160px;
    width: 160px;
    margin-bottom: 40px;
    
`

export const ServicesH1 = styled.h1`
    font-size: 2.5rem;
    color: #fff;
    margin-bottom: 64px;

    @media screen and (max-width: 480px) {
        font-size: 2rem;
    }

`

export const ServicesH2 = styled.h2`
    font-size: 1.2rem;
    margin-bottom: 10px;
    font-weight: 900;
    
`

export const ServicesP = styled.p`
    font-size: 1rem;
    text-align: center;

`
export const ServiceButtons = styled.div`
  display: flex;
  margin-bottom: 20px;
`

export const ServiceButton = styled.button`
  background-color: ${({ selected }) => (selected ? "#010606" : "white")};
  color: ${({ selected }) => (selected ? "white" : "#010606")};
  border: 2px solid #010606;
  padding: 10px 20px;
  font-size: 1rem;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background-color: #010606;
    color: white;
  }
`
