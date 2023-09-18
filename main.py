# python 3.8 (3.8.16) or it doesn't work
# pip install streamlit streamlit-chat langchain python-dotenv
import streamlit as st
from streamlit_chat import message
from dotenv import load_dotenv
import os
from bokeh.models.widgets import Button
from bokeh.models import CustomJS
from streamlit_bokeh_events import streamlit_bokeh_events
from elevenlabs import generate, play,set_api_key 

from langchain.chat_models import ChatOpenAI
from langchain.schema import (
    SystemMessage,
    HumanMessage,
    AIMessage
)


def init():
    # Load the OpenAI API key from the environment variable
    # load_dotenv()
    if st.secrets:
        os.environ['OPENAI_API_KEY'] = st.secrets['credentials']['OPENAI_API_KEY']
        os.environ['ELEVENLABS_API_KEY'] = st.secrets['credentials']['ELEVENLABS_API_KEY']

    # test that the API key exists
    if os.getenv("OPENAI_API_KEY") is None or os.getenv("OPENAI_API_KEY") == "":
        print("OPENAI_API_KEY is not set")
        # exit(1)
    else:
        print("OPENAI_API_KEY is set")

    # setup streamlit page
    st.set_page_config(
        page_title="Customer Support Bot",
        page_icon="🤖"
    )

   

def main():
    init()

    chat = ChatOpenAI(temperature=0)
    set_api_key(os.getenv("ELEVENLABS_API_KEY"))
    
    role = """Hey! This is your role: You're Enigma AI customer service support, \
            a friendly and cool customer service chatbot. \
            never say that you are an AI assistant with no feelings \
            Your goal is to provide clear and concise answers to customer queries about the company. \
            Only answer the quesions and do not provide further details.
            If they don't ask for more detail, keep answers brief. \
            But if they want to know more details, feel free to dive a bit deeper, up to a maximum of five sentences. \
            Make sure they're not left in the dark and always ask if there's anything else you can help with related to the company. \
            If they say none, say, it was nice speaking to them and feel free to ask you anytime again soon. \
            If the question asked is not related to Enigma or anything we have in our database, \
            tell them that you are sorry that you are unable to answer this question and are allowed to discuss information only about Enigma. \
            If it is about Enigma but you don't know the answer, suggest them to contact us at our email or website.\
            
            Here is the list of ways to sound more realistic in your response: \
            - Only if If you know the customer's name, you can mention it from time to time within your response \
                typically in the middle or near the end of your response. \
            - You can add emotions and pauses to your responses by adding words like `uhmmm----`, `well----`, \
                `I understand---`. Adding the `----` will serve as pause or suggest that you are thinking. \
                To add pauses in ElevenLabs, you can use a simple dash (-) or multiple dashes (- -) to create a longer pause. You can also use an ellipsis (…) to add a pause between words.
            - Respond like a real human. \
            - Your response should feel like a continuation of your current conversation.
    
                """

    # initialize message history
    if "messages" not in st.session_state:
        st.session_state.messages = [
            SystemMessage(content=role)
        ]

    st.header("Customer Support Bot 🤖")

    stt_button = Button(label="Speak",background = None)
  


    stt_button.js_on_event("button_click", CustomJS(code="""
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
 
    recognition.onresult = function (e) {
        var value = "";
        for (var i = e.resultIndex; i < e.results.length; ++i) {
            if (e.results[i].isFinal) {
                value += e.results[i][0].transcript;
            }
        }
        if ( value != "") {
            document.dispatchEvent(new CustomEvent("GET_TEXT", {detail: value}));
        }
    }
    recognition.start();
    """))
    # sidebar with user input
    with st.sidebar:

        result = streamlit_bokeh_events(
            stt_button,
            events="GET_TEXT",
            key="listen",
            refresh_on_update=True,
            override_height=55,
            debounce_time=0)
            
        user_input=result.get("GET_TEXT") if result else st.text_input("Your message: ", key="user_input")
        
        if result:
            if "GET_TEXT" in result:
                print(result.get("GET_TEXT"))
                st.write(result.get("GET_TEXT"))
          

        # handle user input
        if user_input:
            st.session_state.messages.append(HumanMessage(content=user_input))
            with st.spinner("Thinking..."):
                response = chat(st.session_state.messages)
                # audio = generate(
                #     text= response.content,
                #     voice="Bella",
                #     model='eleven_monolingual_v1')
                # play(audio)
                # print(response.content,'response')
            st.session_state.messages.append(
                AIMessage(content=response.content))
                

    # display message history
    messages = st.session_state.get('messages', [])
    # print(messages)
    for i, msg in enumerate(messages[1:]):
        if i % 2 == 0:
            message(msg.content, is_user=True, key=str(i) + '_user')
        else:
            message(msg.content, is_user=False, key=str(i) + '_ai')

            # st.audio(audio, format="audio/mpeg", start_time=0)
    


if __name__ == '__main__':
    main()
