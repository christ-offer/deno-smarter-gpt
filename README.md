# Experimental implementation of AI-Explained Smarter-GTP

## Chain

* The question get's passed to 3 workers/researchers that provide answers with different temperature settings.

* These answers are then passed to an analyzer that points out flaws and logical errors in the answers.

* Finally the entire chain is passed to the "Professor" that analyzes the answers and provides an improved final answer.


## Usage

Add a .env file with the following content:

```
OPENAI_API_KEY="YOUR_API_KEY"
```

Then run the following command:

```
deno run -A main.ts
```

## Limitations

At the moment its a purely basic example for experimenting, to change the question, manually edit it in the main.ts file.


## Credit

All credit goes to AI-Explained https://www.youtube.com/@ai-explained- for the idea and prompts.