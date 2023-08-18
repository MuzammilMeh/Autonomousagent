// import React from "react";
// import {ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP} from "./ServicesElements";
// // import Icon1 from "../../images/space.svg"
// // import Icon2 from "../../images/online.svg"
// import Icon3 from "../../images/real-time.svg"

// const Services = () => {
//   return (
//     <ServicesContainer id="services">
//       <ServicesH1>Our Services</ServicesH1>
//       <ServicesWrapper>
//         {/* <ServicesCard>
//           <ServicesIcon src={Icon1} />
//           <ServicesH2>Donec quis</ServicesH2>
//           <ServicesP>
//             Fusce fringilla est ut velit finibus ultricies. Pellentesque id
//             eleifend erat.
//           </ServicesP>
//         </ServicesCard>
//         <ServicesCard>
//           <ServicesIcon src={Icon2} />
//           <ServicesH2>Maecenas ac posuere</ServicesH2>
//           <ServicesP>
//             Donec nec maximus sapien. Aenean efficitur urna sed felis varius, ut
//             convallis odio tempor. Sed volutpat nulla aliquam egestas cursus.
//           </ServicesP>
//         </ServicesCard> */}
//         <ServicesCard>
//           <ServicesIcon src={Icon3} />
//           <ServicesH2>Duis et lectus</ServicesH2>
//           <ServicesP>
//             Aenean in egestas lectus. Pellentesque habitant morbi tristique
//             senectus et netus et malesuada fames ac turpis egestas.s
//           </ServicesP>
//         </ServicesCard>
//       </ServicesWrapper>
//     </ServicesContainer>
//   );
// };

// export default Services;
import React, { useState } from "react";
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
  ServiceButtons, ServiceButton,
} from "./ServicesElements";
import Chatbot from "./Chatbot";
// import Icon1 from "../../images/space.svg";
import Icon2 from "../../images/online.svg";
// import Icon3 from "../../images/real-time.svg";

const Services = () => {
  const [selectedService, setSelectedService] = useState("chatbot");

  const handleServiceChange = (service) => {
    setSelectedService(service);
  };

  return (
    <ServicesContainer id="services">
      <ServicesH1>Our Services</ServicesH1>
      <ServiceButtons>
        <ServiceButton
          onClick={() => handleServiceChange("chatbot")}
          selected={selectedService === "chatbot"}
        >
          Chatbot
        </ServiceButton>
        <ServiceButton
          onClick={() => handleServiceChange("callagent")}
          selected={selectedService === "callagent"}
        >
          Call Agent
        </ServiceButton>
      </ServiceButtons>
      <ServicesWrapper>
        {selectedService === "chatbot" && (
          <Chatbot />
        )}
        {selectedService === "callagent" && (
          <ServicesCard>
            <ServicesIcon src={Icon2} />
            <ServicesH2>Call Agent Service</ServicesH2>
            <ServicesP>
              This is the description of the call agent service.
            </ServicesP>
          </ServicesCard>
        )}
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Services;
