from google.cloud import speech
from pydub import AudioSegment
import os
import threading
import time
import json
import logging
from vertexai.preview.language_models import TextGenerationModel
import vertexai
from google.oauth2 import service_account
import google.cloud.aiplatform as aiplatform
import openai
import tempfile
from elevenlabs import generate, play,set_api_key


transcription_dict = {}
response_dict = {}

def split_audio(input_file, split_duration_ms):
    audio = AudioSegment.from_file(input_file)
    audio_duration = len(audio)
    if audio_duration < 5000:  # 5000 milliseconds = 5 seconds
        return [audio] 

    num_parts = len(audio) // split_duration_ms
    audio_parts = []

    for i in range(num_parts):
        start_time = i * split_duration_ms
        end_time = (i + 1) * split_duration_ms
        part = audio[start_time:end_time]
        audio_parts.append(part)

    return audio_parts



def transcribe_audio(input_file, channels_count=1):
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "google_secret.json"
    client = speech.SpeechClient()
    transcripts = []

    with open(input_file, "rb") as audio_file:
        content = audio_file.read()
        audio = speech.RecognitionAudio(content=content)
   
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        enable_automatic_punctuation=True,
        audio_channel_count=channels_count,
        language_code="en-US",
    )

    response = client.recognize(request={"config": config, "audio": audio})

    for result in response.results:
        transcripts.append(result.alternatives[0].transcript)

    return transcripts

def get_channels(file_path):
    # Load the audio file
    audio = AudioSegment.from_file(file_path)

    # Extract audio channels
    channels = audio.split_to_mono()
    channels_count = len(channels)  
    return channels_count

def process_audio_parts(audio_parts, channels_count):
    threads = []
    for i, audio_part in enumerate(audio_parts):
        thread = threading.Thread(target=transcribe_and_save, args=(audio_part, channels_count, i + 1))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()



def transcribe_and_save(input_file, channels_count,part_num):
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
    temp_file_path = temp_file.name
    input_file.export(temp_file_path, format="wav")
    temp_file.close()
    transcripts = transcribe_audio(temp_file_path, channels_count)

    global transcription_dict
    transcription_dict[part_num] = transcripts
    os.remove(temp_file_path)


def get_llm_response(transcript):
    set_api_key("f6c901a9e1db35ac8b7df9dc70932d0d")
    with open("secret.json") as config_file:
        config = json.load(config_file)
        api_key = config["openai_api_key"]

    openai.api_key = api_key

    sorted_data = dict(sorted(transcript.items()))

    paragraph = ' '.join(' '.join(sentences) for sentences in sorted_data.values())
    

    conversation = [
        {"role": "system", "content": "You are the listener, who gives short and precise answers with very little elaboration only."},
        {"role": "user", "content":f"{paragraph}"}
    ]
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=conversation,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
            )

    assistant_message_content = response["choices"][0]["message"]["content"]
    audio = generate(
    text= assistant_message_content,
    voice="Bella",
    model='eleven_monolingual_v1'
    
    )
    play(audio)
    print(assistant_message_content)



if __name__ == "__main__":
    input_audio_file = "hello.mp3"
    # output_folder = "output_parts"
    split_duration_ms = 5000
    # channels_count = 2  # Adjust this based on your audio channels
    
    start_time = time.time()
    audio_parts = split_audio(input_audio_file, split_duration_ms)
    process_audio_parts(audio_parts, get_channels(input_audio_file))

    get_llm_response(transcription_dict)
    end_time = time.time()  # Record the end time
    execution_time = end_time - start_time
    print(f"\n Total execution time: {execution_time:.2f} seconds")
   
