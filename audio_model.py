from pydub import AudioSegment
import os
import logging
from google.cloud import speech
import io
import json
import openai
import time

logging.basicConfig(level=logging.INFO)
all_transcripts =[]

def split_audio(input_file, split_duration_ms=5000,mode='prod'):
    if mode=='test':
        print('test')
        audio = AudioSegment.from_file(input_file)
        audio.export(f"{input_file[:-4]}.wav", format="wav")
    else:


        audio = AudioSegment.from_file(input_file)
        num_parts = len(audio) // split_duration_ms
        output_folder= "output_parts"

        if not os.path.exists(output_folder):
            os.makedirs(output_folder)

        for i in range(num_parts):
            start_time = i * split_duration_ms
            end_time = (i + 1) * split_duration_ms
            part = audio[start_time:end_time]
            output_file = os.path.join(output_folder, f"part_{i + 1}.wav")
            part.export(output_file, format="wav")

        print(f"Audio file '{input_file}' split into {num_parts} parts in '{output_folder}'.")

def process_audio_file(file_path):
    # Load the audio file
    audio = AudioSegment.from_file(file_path)

    # Extract audio channels
    channels = audio.split_to_mono()
    channels_count = len(channels)
    return channels_count

def get_transcript(file_name, channels_count):
   

    # setting Google credential
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "google_secret.json"
    # create client instance
    client = speech.SpeechClient()
    transcripts = []

    # the path of your audio file
    with io.open(file_name, "rb") as audio_file:
        content = audio_file.read()
        audio = speech.RecognitionAudio(content=content)

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        enable_automatic_punctuation=True,
        audio_channel_count=channels_count,
        language_code="en-US",
    )

    # Sends the request to google to transcribe the audio
    response = client.recognize(request={"config": config, "audio": audio})
    # Reads the response
    for result in response.results:
        logging.info("Transcript: {}".format(result.alternatives[0].transcript))
        transcripts.append("{}".format(result.alternatives[0].transcript))
    global all_transcripts
    all_transcripts.append(transcripts)

    return all_transcripts

def check_llm(transcript):
    with open("secret.json") as config_file:
        config = json.load(config_file)
        api_key = config["openai_api_key"]

    openai.api_key = api_key
    print('transcript',transcript)
    conversation = [
        {"role": "system", "content": "You are the listener."},
        {"role": "user", "content": transcript}
    ]
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=conversation,
            temperature=1,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
            )

    assistant_message_content = response["choices"][0]["message"]["content"]

    # Print the formatted content
    print('model response',assistant_message_content)
    return assistant_message_content



if __name__=="__main__":
    # split_audio('feynman_test.mp3',mode='test')
    start_time = time.time()
    get_transcript(file_name='feynman_test.wav',channels_count=process_audio_file("feynman_test.mp3"))
    if get_transcript:
        check_llm(get_transcript)
    end_time = time.time()  # Record the end time
    execution_time = end_time - start_time
    print(f"Total execution time: {execution_time:.2f} seconds")
    

