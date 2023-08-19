# AutoResearch

AutoResearch is a backend application that powers an AI research assistant. It uses OpenAI's AutoGPT to generate reports on given research topics.

## Features

- Accept research topics and generate reports using AutoGPT.
- Store reports in text files for future reference.
- Provide a list of generated reports.
- Serve the content of a specific report.

## Installation

1. Clone this repository:

```bash
git clone https://github.com/septiannugraha/autoresearch.git
```

2. Navigate to the project directory:

```bash
cd autoresearch
```

3. Install the dependencies:

```bash
pip install -r requirements.txt
```

## Usage

Start the backend application:

```bash
flask run
```

The application will be available at `http://localhost:5000`.

Endpoints:

- POST `/research`: Accepts a JSON payload with a `keyword` field. The AI research assistant will generate a report on the given keyword.
- GET `/reports`: Returns a list of generated reports.
- GET `/reports/<report-name>`: Returns the content of the specified report.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)