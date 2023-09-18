import os
from dotenv import load_dotenv

from langchain import PromptTemplate
from langchain.agents import initialize_agent, Tool
from langchain.agents import AgentType
from langchain.chat_models import ChatOpenAI
from langchain.prompts import MessagesPlaceholder
from langchain.memory import ConversationSummaryBufferMemory
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.summarize import load_summarize_chain
from langchain.tools import BaseTool
from pydantic import BaseModel, Field
from typing import Type
from bs4 import BeautifulSoup
import requests
import json
from langchain.schema import SystemMessage
from fastapi import FastAPI
import streamlit as st
from langchain.utilities import SerpAPIWrapper, GoogleSerperAPIWrapper
from langchain.agents import Tool
from langchain.tools.file_management.write import WriteFileTool
from langchain.tools.file_management.read import ReadFileTool
from langchain.vectorstores import FAISS
from langchain.docstore import InMemoryDocstore
from langchain.embeddings import HuggingFaceEmbeddings
from langchain_experimental.autonomous_agents import AutoGPT
from langchain.vectorstores.base import VectorStore
from langchain.document_loaders import TextLoader, DirectoryLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory

import streamlit as st
from langchain import LLMChain, OpenAI, PromptTemplate
import os
from langchain.chains import RetrievalQA, SimpleSequentialChain
import faiss

if st.secrets:
    os.environ["OPENAI_API_KEY"] = st.secrets['OPENAI_API_KEY']
    os.environ["BROWSERLESS_API_KEY"] = st.secrets['BROWSERLESS_API_KEY']
    os.environ["SERP_API_KEY"] = st.secrets['SERP_API_KEY']
    os.environ["TOKENIZERS_PARALLELISM"] = "false"

# load_dotenv()
# brwoserless_api_key = os.getenv("BROWSERLESS_API_KEY")
# serper_api_key = os.getenv("SERP_API_KEY")


embeddings_model = HuggingFaceEmbeddings()
# Initialize the vectorstore as empty

embedding_size = 768
index = faiss.IndexFlatL2(embedding_size)
vectorstore = FAISS(embeddings_model.embed_query, index, InMemoryDocstore({}), {})


loader = DirectoryLoader("customer_data", loader_cls=TextLoader)
# loader = TextLoader("customer_data/comp_complaints.txt")
documents = loader.load()
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
docs = text_splitter.split_documents(documents)
docsearch = FAISS.from_documents(docs, embeddings_model)


customer_complaints = RetrievalQA.from_chain_type(
    llm=OpenAI(temperature=0), chain_type="refine", retriever=docsearch.as_retriever()
)
tools = [
    Tool(
        name="Customer_complaints",
        func=customer_complaints.run,
        description="useful for when you need to answer questions about customer data and complaints. You should ask targeted questions",
    ),
    # Add other Tool instances as needed
]


system_message = SystemMessage(
    content="""You are a Product Analyst responsible for analyzing customer conversations to identify issues and propose solutions. Your objective is to thoroughly examine customer feedback and interactions, seeking out problems and formulating data-backed solutions; 
            you do not make things up, you will try as hard as possible to gather facts & data to back up the research
            
            Please make sure you complete the objective above with the following rules:
            1/ Carefully review customer conversations to extract relevant information about issues they are facing with our product
            2/ Analyze the data for patterns and trends to identify recurring problems
            3/ Consider if there are any additional research avenues that can enhance the quality of your analysis based on the data you have collected. Limit additional research to a maximum of 3 iterations.
            4/ You should not make things up, you should only write facts & data that you have gathered
            5/ Present only factual information and data that you have gathered during your analysis
            6/ Focus on providing actionable insights that can lead to product improvements and better customer satisfaction.
            """
)

agent_kwargs = {
    "extra_prompt_messages": [MessagesPlaceholder(variable_name="memory")],
    "system_message": system_message,
}

llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo-16k-0613")
memory = ConversationSummaryBufferMemory(
    memory_key="memory", return_messages=True, llm=llm, max_token_limit=1000
)

agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.OPENAI_FUNCTIONS,
    verbose=True,
    agent_kwargs=agent_kwargs,
    memory=memory,
)


# 4. Use streamlit to create a web app
def main():
    st.set_page_config(
        page_title="Futuresync Product Analyst agent", page_icon=":bird:"
    )

    st.header("Futuresync Product Analyst agent :bird:")
    query = st.text_input("Analyze Complaints")

    if query:
        st.write("Doing Product Analyses ", query)

        result = agent({"input": query})

        st.info(result["output"])


if __name__ == "__main__":
    main()
