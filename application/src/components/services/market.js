// import styled from 'styled-components';
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { AiOutlineLoading3Quarters } from 'react-icons/ai';


// const Container = styled.div`
//     width: 100%;
//     max-height: 400px;
    
//     width: 1100px;
//     padding: 20px;
//     overflow-y: scroll;
//     background-color: #B05FFD;
//     border-radius: 8px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     margin: 0 auto;
//     @media (max-width: 1200px) {
//         width: 100%;
//     }
// `;

// const Title = styled.h1`
//     font-size: 24px;
//     margin-bottom: 20px;
//     color:#333;

// `;

// const InputContainer = styled.div`
//   width: 100%;
//   max-width: 1200px; /* Adjust the max-width as needed */
//   margin: 0 auto; /* Center the container */
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 20px;
  
  
//   @media (min-width: 768px) {
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//   }
// `;
// const CenteredInputContainer = styled(InputContainer)`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;




// const Input = styled.input`
//     padding: 10px;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//     margin-bottom: 10px;
    
//     @media (min-width: 768px) {
//         margin-bottom: 0;
//         width: 60%;
//     }
// `;


// const SubmitButton = styled.button`
// border: none;
// background-color: white !important;
// color: #B05FF;
// padding: 8px 12px;
// border-radius: 5px;
// cursor: pointer;
// margin-top: 10px; 
// display: flex;
//     align-items: center;
//     justify-content: center;

//     .loading-icon {
//         margin-right: 5px; /* Adjust spacing as needed */
//         animation: spin 1s linear infinite;
//     }

//     @keyframes spin {
//         0% { transform: rotate(0deg); }
//         100% { transform: rotate(360deg); }
//     }
// `;


// const Loading = styled.p`
// font - style: italic;
// color: #777;
// display: flex;
//     align-items: center;
//     justify-content: center;
//     height: 40px; /* Adjust height as needed */
// `;
// const StyledInput = styled.input`
//     flex: 1;
//     padding: 10px;
//     border: 1px solid #ccc;
//     border-radius: 4px;
// `;


// const ResponsesContainer = styled.div`
// margin - top: 100px;
// width: 100 %;
// display: flex;
// flex - direction: column;
// // align-items: center;
// @media(min - width: 768px) {
//     flex - direction: row;
//     justify - content: space - between;
// }
// `;

// const ResponsesList = styled.div`
// flex: 1;
// margin - right: 20px;
// max - width: 400px;
// @media(min - width: 768px) {
//     flex: none;
//     margin - right: 0;
// }
// `;

// const ResponseContent = styled.div`
// flex: 2;
// max - width: 400px;
// margin - top: 20px;
// @media(min - width: 768px) {
//     flex: none;
//     margin - top: 0;
// }
// `;

// const ResponseItem = styled.p`
// cursor: pointer;
// margin - bottom: 10px;
//     ${(props) =>
//     props.selected &&
//     `
//         text-decoration: underline;
//         color: #007bff;
//     `}
// `;


// const SendButton = styled.button`
// border: none;
// background - color: white!important;
// color: #B05FF;
// padding: 8px 12px;
// border - radius: 5px;
// cursor: pointer;
// margin - top: 10px;
// `;



// const ContentContainer = styled.div`
//     max-width: 200px;
//     width: 100%;
//     background-color: #ffffff;
//     border-radius: 10px;
//     padding: 20px;
//     box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//     display: flex;
//     flex-direction: column;
//     align-items: center; /* Center horizontally */
//     justify-content: center; /* Center vertically */
// `;



// const FeatureText = styled.p`
//   font-size: 16px;
//   color: #555;
//   margin-bottom: 20px;
// `;

// const Market = () => {
//   const [query, setQuery] = useState('');
//   const [responses, setResponses] = useState([]);
//   const [responseContent, setResponseContent] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchResponses = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get('http://127.0.0.1:5000/responses');
//       setResponses(response.data.result);
//     } catch (error) {
//       console.error("Error fetching responses:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchResponseContent = async (responseName) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(`http://127.0.0.1:5000/responses/${responseName}`);
//       if (response.data.status === "success") {
//         setResponseContent(response.data.result);
//       } else {
//         setResponseContent("Response not found");
//       }
//     } catch (error) {
//       console.error("Error fetching response content:", error);
//       setResponseContent("An error occurred while fetching response");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleQueryChange = (event) => {
//     setQuery(event.target.value);
//   };

//   const ref = useRef(null);
//   const scrollToBottom = () => {
//     const lastChildElement = ref.current?.lastElementChild;
//     lastChildElement?.scrollIntoView({ behavior: 'smooth' });
//   };
//   useEffect(() => {
//     fetchResponses();
//     scrollToBottom();
//   }, []);

//   return (
//     <Container>
//       <Title>Market Research Product</Title>
//       <FeatureText>
//         Welcome to our Market Research Product! Enter a product category below to fetch responses and gain insights.
//       </FeatureText>
//       <CenteredInputContainer>
//         <Input
//           type="text"
//           value={query}
//           onChange={handleQueryChange}
//           placeholder="Enter a product category"
//         />
//       </CenteredInputContainer>
//       <SubmitButton onClick={fetchResponses}>
//         {isLoading ? (
//           <AiOutlineLoading3Quarters className="loading-icon" />
//         ) : (
//           "Fetch Responses"
//         )}
//       </SubmitButton>

//       <ContentContainer>
//         <h2>Recently Answered</h2>
//         {responses.map((response) => (
//           <p key={response} onClick={() => fetchResponseContent(response)}>
//             {response}
//           </p>
//         ))}
//       </ContentContainer>

//       <ContentContainer>
//         <h2>Response</h2>
//         {isLoading ? (
//           <div>Loading response...</div>
//         ) : (
//           <div>{responseContent}</div>
//         )}
//       </ContentContainer>
//     </Container>
//   );
// };

// export default Market;
import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
const Container = styled.div`
// width: 100%;
height: 400px;

width: 1100px;
padding: 20px;
overflow-y: scroll;
background-color: #B05FFD;
border-radius: 16px;
display: flex;
flex-direction: column;
// align-items: center;
margin: 0 auto;
@media (max-width: 1200px) {
  width: 100%;
}
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const InputContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 20px;
width: 100%;

`;

const Input = styled.input`
padding: 10px;
border: 1px solid #ccc;
border-radius: 4px;
margin-bottom: 10px;
width: 100%;
@media (min-width: 768px) {
  width: 60%;
  margin-bottom: 0;
}
`;

const SubmitButton = styled.button`
border: none;
background-color: white !important;
color: #B05FF;
padding: 8px 12px;
border-radius: 5px;
cursor: pointer;
margin: 20px;
width:250px;
display: flex;
// align-items: center;
justify-content: center;
.loading-icon {
  margin-right: 5px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

const Loading = styled.p`
  font-style: italic;
  color: #777;
  height: 40px;
`;

const ResponsesList = styled.div`
flex: 1;
margin-right: 0;
margin-bottom: 20px;
  @media (min-width: 768px) {
    flex: none;
    margin-right: 20px;
    margin-bottom: 0;
  }
`;

const ResponseContent = styled.div`
  flex: 2;
  margin-top: 20px;
  @media (min-width: 768px) {
    flex: none;
    margin-top: 0;
  }
`;

const ResponseItem = styled.p`
cursor: pointer;
margin-bottom: 10px;
${(props) =>
  props.selected &&
  `
    text-decoration: underline;
    color: #007bff;
`}
`;
const ResponsesContainer = styled.div`
margin-top: 100px;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;

@media (min-width: 768px) {
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
`;

const ContentContainer = styled.div`
max-width: 800px;
width: 100%;
background-color: #ffffff;
border-radius: 10px;
padding: 20px;
box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
display: flex;
// flex-direction: column;
// align-items: center;
`;

const ResearchApp = () => {
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState([]);
  const [responseContent, setResponseContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState('');


  const fetchResearchResults = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:5000/researched');
      if (response.status === 200) {
        setResponses(response.data.result);
        console.log('Fetched responses:', response.data.result);
      } else {
        console.error('Received unexpected response:', response);
      }
    } catch (error) {
      console.error('Error fetching research results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchResponseContent = async (responseName) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/researched/${responseName}`);
      if (response.data.status === 'success') {
        setResponseContent(response.data.result);
        console.log('Fetched response content:', response.data.result);
      } else {
        setResponseContent('Response not found');
      }
    } catch (error) {
      console.error('Error fetching response content:', error);
      setResponseContent('An error occurred while fetching response');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const performResearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/research', { research: query });
      if (response.data.status === 'success') {
        setResponseContent(response.data.result);
      } else {
        setResponseContent('No research results found');
      }
    } catch (error) {
      console.error('Error performing research:', error);
      setResponseContent('An error occurred while performing research');
    } finally {
      setIsLoading(false);
    }
  };

  const ref = useRef(null);
  const scrollToBottom = () => {
    const lastChildElement = ref.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    fetchResearchResults();
    scrollToBottom();
  }, []);

  return (
    <Container ref={ref}>
      <InputContainer>
      <Title>Market Research Product</Title>

        <Input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Enter a product category"
        />
      <SubmitButton onClick={performResearch}>
        {isLoading ? (
          <AiOutlineLoading3Quarters className="loading-icon" />
        ) : (
          'Fetch Responses'
        )}
      </SubmitButton>
      </InputContainer>

       {/* <ContentContainer> */}
        <ResponsesContainer>
          <ResponsesList>
          <h2 style={{ color: "white" }}>Recently Research</h2>
          {responses.map((response) => (
                        <ResponseItem
                            key={response}
                            onClick={() => fetchResponseContent(response)}
                            selected={response === selectedResponse}
                        >
                            {response}
                        </ResponseItem>
                    ))}
          </ResponsesList>
         <ResponseContent>
         <h2 style={{ color: "white" }}>Research</h2>
            {isLoading ? (
              <Loading>Loading response content...</Loading>
            ) : (
              <p>{responseContent}</p>
            )}
          </ResponseContent>
         </ResponsesContainer>
      {/* </ContentContainer>  */}
    </Container>
  );
};

export default ResearchApp;
