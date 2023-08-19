import React from "react";
import {ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP} from "./ServicesElements";
import Icon1 from "../../images/space.svg"
import Icon2 from "../../images/online.svg"
import Icon3 from "../../images/real-time.svg"
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <ServicesContainer id="services">
      <ServicesH1>Our Services</ServicesH1>
      <ServicesWrapper>
        <Link to="/query-response" style={{textDecoration:"none"}}>
          <ServicesCard>
            <ServicesIcon src={Icon1} />
            <ServicesH2>ConvoGenius</ServicesH2>
            <ServicesP>
              Make customer talks special with ConvoGenius – where AI creates friendly chats, turning questions into important conversations.
            </ServicesP>
          </ServicesCard>
        </Link>
        <Link to="/market" style={{textDecoration:"none"}}>
          <ServicesCard>
            <ServicesIcon src={Icon2} />
            <ServicesH2>InfoSage</ServicesH2>
            <ServicesP>
              Confidently explore markets with InfoSage's AI wisdom revealing trends, rivals, and chances for smarter choices.
            </ServicesP>
          </ServicesCard>
        </Link>
        <Link to="/ai_agent" style={{textDecoration:"none"}}>
          <ServicesCard>
            <ServicesIcon src={Icon3} />
            <ServicesH2>TalkFlow</ServicesH2>
            <ServicesP>
              Your AI call support partner. Streamlining conversations and inquiries, CallBuddy enhances call experiences, making communication effortless and effective.
            </ServicesP>
          </ServicesCard>
        </Link>
        <Link to="/ai_agent" style={{textDecoration:"none"}}>
          <ServicesCard>
            <ServicesIcon src={Icon3} />
            <ServicesH2>StrategiMind</ServicesH2>
            <ServicesP>
              Boost your business smarts with StrategiMind your AI buddy that sharpens tasks and shapes ideas for better decisions.
            </ServicesP>
          </ServicesCard>
        </Link>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Services;

